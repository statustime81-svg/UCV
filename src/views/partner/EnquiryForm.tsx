"use client";

import {
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useContent } from "../../content/ContentProvider";
import { usePartnerBrand } from "../../components/PartnerProvider";
import { contact as businessContact, url } from "../../content/site";
import type { Lang } from "../../content/site";

type SubmissionStatus =
  | ""
  | "success"
  | "received"
  | "rate"
  | "validation"
  | "error";

export default function EnquiryForm({ l }: { l: Lang }) {
  const { pick, contact, content } = useContent();
  const preferredBrand = usePartnerBrand();

  const formId = useId();
  const [status, setStatus] = useState<SubmissionStatus>("");
  const [busy, setBusy] = useState(false);

  const started = useRef(Date.now());
  const submitting = useRef(false);

  const enabledBrands = content.brands.filter(
    (brand) => brand.enabled
  );

  // Keep the existing API values: brand names or "both".
  const preferredBrandValue =
    enabledBrands.find((brand) => brand.slug === preferredBrand)
      ?.name ?? "both";

  const successful =
    status === "success" || status === "received";

  const failed =
    status === "rate" ||
    status === "validation" ||
    status === "error";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting.current) return;

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const fields = Object.fromEntries(new FormData(form));

    const name = String(fields.name ?? "").trim();
    const restaurant = String(fields.restaurant ?? "").trim();
    const city = String(fields.city ?? "").trim();
    const email = String(fields.email ?? "").trim();

    if (!name || !restaurant || !city || !email) {
      setStatus("validation");
      return;
    }

    submitting.current = true;
    setBusy(true);
    setStatus("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...fields,
          name,
          restaurant,
          city,
          email,
          phone: String(fields.phone ?? "").trim(),
          message: String(fields.message ?? "").trim(),
          lang: l,
          started: started.current,
        }),
      });

      if (!response.ok) {
        setStatus(
          response.status === 429
            ? "rate"
            : response.status === 400 ||
                response.status === 422
              ? "validation"
              : "error"
        );
        return;
      }

      const result: {
        emailSent?: boolean;
        success?: boolean;
        error?: unknown;
      } = await response.json();

      if (result.success === false || result.error) {
        setStatus("error");
        return;
      }

      // Preserve the API distinction between saved enquiries
      // and enquiries whose email notification was also sent.
      setStatus(result.emailSent ? "success" : "received");

      form.reset();
      started.current = Date.now();
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="enquiry-form"
      aria-busy={busy}
      aria-labelledby={`${formId}-title`}
    >
      <h2 id={`${formId}-title`}>
        {pick(
          l,
          "Dein Restaurant kennenlernen.",
          "Let’s meet your restaurant."
        )}
      </h2>

      <p>
        {pick(
          l,
          "Erzähl uns kurz von deinem Restaurant. Wir prüfen, ob eines unserer Konzepte zu deiner Küche passt, und besprechen die nächsten Schritte mit dir.",
          "Tell us briefly about your restaurant. We will assess whether one of our concepts fits your kitchen and discuss the next steps with you."
        )}
      </p>

      <div className="form-grid">
        <label htmlFor={`${formId}-name`}>
          {pick(l, "Name", "Name")}
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            maxLength={160}
            autoComplete="name"
          />
        </label>

        <label htmlFor={`${formId}-restaurant`}>
          {pick(l, "Restaurantname", "Restaurant name")}
          <input
            id={`${formId}-restaurant`}
            name="restaurant"
            type="text"
            required
            maxLength={160}
            autoComplete="organization"
          />
        </label>

        <label htmlFor={`${formId}-city`}>
          {pick(l, "Stadt und Postleitzahl", "City and postcode")}
          <input
            id={`${formId}-city`}
            name="city"
            type="text"
            required
            maxLength={160}
            autoComplete="off"
            placeholder={pick(
              l,
              "Zum Beispiel: Berlin, 10115",
              "For example: Berlin, 10115"
            )}
          />
        </label>

        <label htmlFor={`${formId}-email`}>
          {pick(l, "E-Mail", "Email")}
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
          />
        </label>

        <label htmlFor={`${formId}-phone`}>
          {pick(
            l,
            "Telefonnummer (optional)",
            "Phone number (optional)"
          )}
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            maxLength={160}
            autoComplete="tel"
          />
        </label>

        <label htmlFor={`${formId}-brand`}>
          {pick(l, "Interesse an", "Interested in")}

          <select
            id={`${formId}-brand`}
            name="brand"
            defaultValue={preferredBrandValue}
          >
            <option value="both">
              {pick(
                l,
                "Beide Marken / Beratung",
                "Both brands / advice"
              )}
            </option>

            {enabledBrands.map((brand) => (
              <option key={brand.slug} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label htmlFor={`${formId}-message`}>
        {pick(
          l,
          "Nachricht (optional)",
          "Message (optional)"
        )}

        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          maxLength={3000}
        />
      </label>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>
          Website
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          required
        />

        <span>
          {pick(
            l,
            "Ich habe die Datenschutzerklärung gelesen. Meine Angaben dürfen zur Bearbeitung meiner Anfrage verwendet werden.",
            "I have read the Privacy Policy. My details may be used to respond to my enquiry."
          )}{" "}
          <a
            href={url(l, "privacy")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {pick(
              l,
              "Datenschutzerklärung",
              "Privacy Policy"
            )}
          </a>
        </span>
      </label>

      <button
        type="submit"
        className="button"
        disabled={busy}
      >
        {busy
          ? pick(l, "Wird gesendet…", "Sending…")
          : pick(
              l,
              "Unverbindliche Anfrage senden",
              "Send a non-binding enquiry"
            )}
      </button>

      <div aria-live="polite" aria-atomic="true">
        {successful && (
          <div className={`form-status ${status}`}>
            {pick(
              l,
              "Vielen Dank für deine Anfrage! Wir haben deine Angaben erhalten und melden uns über die angegebenen Kontaktdaten, um die nächsten Schritte zu besprechen.",
              "Thank you for your enquiry! We have received your details and will contact you using the information provided to discuss the next steps."
            )}
          </div>
        )}
      </div>

      {failed && (
        <div
          role="alert"
          className={`form-status ${status}`}
        >
          <p>
            {status === "rate"
              ? pick(
                  l,
                  "Zu viele Anfragen. Bitte versuche es später erneut oder kontaktiere uns direkt.",
                  "Too many enquiries. Please try again later or contact us directly."
                )
              : status === "validation"
                ? pick(
                    l,
                    "Bitte prüfe deine Angaben und warte kurz, bevor du erneut sendest. Du kannst uns auch direkt kontaktieren.",
                    "Please check your details and wait briefly before submitting again. You can also contact us directly."
                  )
                : pick(
                    l,
                    "Die Übermittlung konnte nicht bestätigt werden. Bitte kontaktiere uns per E-Mail, Telefon oder WhatsApp.",
                    "We could not confirm your submission. Please contact us by email, phone, or WhatsApp."
                  )}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              overflowWrap: "anywhere",
            }}
          >
            <a href={`mailto:${contact.email}`}>
              {contact.email}
            </a>

            <a href={businessContact.phoneHref}>
              {pick(l, "Anrufen", "Call")}
            </a>

            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
