import {
  supabaseSettings,
  supabaseRequest,
} from "../../../lib/supabase";

const ENQUIRY_EMAIL = "partners@urbanculinaryventure.de";

function errorResponse(message: string, status: number) {
  return Response.json(
    {
      success: false,
      received: false,
      message,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return errorResponse("Invalid request format.", 415);
  }

  const origin = req.headers.get("origin");

  if (origin && origin !== new URL(req.url).origin) {
    return errorResponse("Invalid origin.", 403);
  }

  const now = Date.now();

  let body: Record<string, unknown>;

  try {
    const raw = await req.text();

    if (new TextEncoder().encode(raw).byteLength > 12000) {
      return errorResponse("Request is too large.", 413);
    }

    const parsed: unknown = JSON.parse(raw);

    if (
      parsed === null ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return errorResponse("Invalid request.", 400);
    }

    body = parsed as Record<string, unknown>;
  } catch {
    return errorResponse("Invalid request.", 400);
  }

  // Honeypot field must be empty.
  if (
    body.website !== undefined &&
    body.website !== ""
  ) {
    return errorResponse("Invalid request.", 400);
  }

  if (body.consent !== "on") {
    return errorResponse("Please confirm the privacy information.", 400);
  }

  // Keep the existing timing-based spam protection.
  if (
    typeof body.started !== "number" ||
    !Number.isFinite(body.started) ||
    now - body.started < 3000 ||
    now - body.started > 86400000
  ) {
    return errorResponse(
      "Please wait briefly or reload the form and try again.",
      400
    );
  }

  // Required fields.
  for (const field of [
    "name",
    "restaurant",
    "email",
    "city",
  ]) {
    const value = body[field];

    if (
      typeof value !== "string" ||
      !value.trim() ||
      value.length > 160
    ) {
      return errorResponse("Please check the required fields.", 400);
    }
  }

  // Optional fields may be empty or absent.
  const optionalFields = [
    ["phone", 160],
    ["message", 3000],
    ["brand", 160],
    ["lang", 160],
  ] as const;

  for (const [field, maxLength] of optionalFields) {
    const value = body[field];

    if (
      value !== undefined &&
      (typeof value !== "string" || value.length > maxLength)
    ) {
      return errorResponse("Please check your details.", 400);
    }
  }

  const clean = {
    name: (body.name as string).trim(),
    restaurant: (body.restaurant as string).trim(),
    email: (body.email as string).trim(),
    phone: String(body.phone ?? "").trim(),
    city: (body.city as string).trim(),
    brand: String(body.brand ?? "").trim() || "both",
    message: String(body.message ?? "").trim(),
    lang: String(body.lang ?? "").trim() || "de",
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) {
    return errorResponse("Please enter a valid email address.", 400);
  }

  if (clean.lang !== "de" && clean.lang !== "en") {
    return errorResponse("Invalid language.", 400);
  }

  try {
    const supabase = supabaseSettings();

    if (
      !supabase.url ||
      !supabase.anon ||
      !supabase.secret
    ) {
      console.error("Enquiry service configuration is incomplete.");

      return errorResponse(
        "Enquiry service is unavailable. Please contact us directly.",
        503
      );
    }

    // Use the existing Supabase rate-limit function.
    const ip =
      req.headers.get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() || "unknown";

    const hour = Math.floor(now / 3600000);

    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(`${ip}:${hour}`)
    );

    const bucket = Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    const rateResponse = await supabaseRequest(
      "rpc/consume_enquiry_rate",
      {
        p_bucket: bucket,
        p_expires: new Date(now + 3600000).toISOString(),
      }
    );

    if (!rateResponse.ok) {
      console.error(
        "Enquiry rate-limit check failed:",
        rateResponse.status
      );

      return errorResponse(
        "Submission is temporarily unavailable. Please contact us directly.",
        503
      );
    }

    const allowed: unknown = await rateResponse.json();

    if (allowed === false) {
      return errorResponse(
        "Too many requests. Please try again later.",
        429
      );
    }

    if (allowed !== true) {
      console.error("Unexpected enquiry rate-limit response.");

      return errorResponse(
        "Submission is temporarily unavailable. Please contact us directly.",
        503
      );
    }

    // Save the enquiry before sending its email notification.
    const id = crypto.randomUUID();

    const saveResponse = await supabaseRequest(
      "partner_enquiries",
      {
        id,
        ...clean,
        consent: true,
        created_at: new Date(now).toISOString(),
      }
    );

    if (!saveResponse.ok) {
      console.error(
        "Enquiry database save failed:",
        saveResponse.status
      );

      return errorResponse(
        "Your enquiry could not be saved. Please contact us directly.",
        503
      );
    }

    let emailSent = false;

    const emailApiKey = process.env.EMAIL_API_KEY;
    const emailFrom = process.env.EMAIL_FROM;

    if (emailApiKey && emailFrom) {
      try {
        const emailResponse = await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${emailApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: emailFrom,
              to: [ENQUIRY_EMAIL],
              reply_to: clean.email,
              subject: "UCV partnership enquiry",
              text: [
                "New UCV Partnership Enquiry",
                "",
                `Reference: ${id}`,
                `Name: ${clean.name}`,
                `Restaurant: ${clean.restaurant}`,
                `City and postcode: ${clean.city}`,
                `Email: ${clean.email}`,
                `Phone: ${clean.phone || "Not provided"}`,
                `Interested in: ${
                  clean.brand === "both"
                    ? "Both brands / advice"
                    : clean.brand
                }`,
                `Language: ${clean.lang.toUpperCase()}`,
                "",
                "Message:",
                clean.message || "No additional message provided.",
                "",
                "Privacy acknowledgement: confirmed",
              ].join("\n"),
            }),
            signal: AbortSignal.timeout(10000),
          }
        );

        emailSent = emailResponse.ok;

        if (!emailSent) {
          console.error(
            "Enquiry saved, but email notification failed:",
            emailResponse.status
          );
        }
      } catch {
        console.error(
          "Enquiry saved, but email notification could not be sent."
        );
      }
    } else {
      console.warn(
        "Enquiry saved. EMAIL_API_KEY or EMAIL_FROM is missing."
      );
    }

    // A failed email notification does not discard a saved enquiry.
    return Response.json(
      {
        success: true,
        received: true,
        emailSent,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    console.error("Enquiry processing failed.");

    return errorResponse(
      "Submission unavailable. Please contact us directly.",
      503
    );
  }
}
