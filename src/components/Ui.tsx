"use client";

import { Fragment, type ReactNode } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { usePartner } from "./PartnerProvider";
import EnquirySection from "./EnquirySection";
import { useContent } from "../content/ContentProvider";
import { contact as businessContact } from "../content/site";
import type { Lang } from "../content/site";
import { assets } from "../content/assets";

// Handles both actual newlines and visible "\n" text.
function renderLineBreaks(value: string): ReactNode {
  const lines = value
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n?/g, "\n")
    .split("\n");

  return lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}

type ButtonProps = {
  l: Lang;
  children?: ReactNode;
  secondary?: boolean;
};

export function Button({
  l,
  children,
  secondary = false,
}: ButtonProps) {
  const { pick } = useContent();
  const openPartner = usePartner();

  return (
    <button
      type="button"
      onClick={() => openPartner()}
      className={`button${secondary ? " secondary" : ""}`}
    >
      <span>
        {children ??
          pick(
            l,
            "Unverbindlich anfragen",
            "Enquire without obligation"
          )}
      </span>

      <span className="button-symbol" aria-hidden="true">
        +
      </span>
    </button>
  );
}

type HeadingProps = {
  label: string;
  title: string;
  text?: string;
};

export function Heading({
  label,
  title,
  text,
}: HeadingProps) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        {renderLineBreaks(label)}
      </span>

      <h2>{renderLineBreaks(title)}</h2>

      {text && <p>{renderLineBreaks(text)}</p>}
    </div>
  );
}

export function Cta({ l }: { l: Lang }) {
  const { pick, contact } = useContent();

  return (
    <>
      <section className="cta editorial-cta">
        <div className="cta-meta">
          <span>URBAN CULINARY VENTURE</span>

          <span>
            {pick(
              l,
              "BERLIN · DEUTSCHLAND",
              "BERLIN · GERMANY"
            )}
          </span>
        </div>

        <div className="cta-content" data-reveal>
          <span className="eyebrow">
            {pick(
              l,
              "LASS UNS GEMEINSAM STARTEN.",
              "LET’S GET STARTED TOGETHER."
            )}
          </span>

          <h2>
            {renderLineBreaks(
              pick(
                l,
                "DEINE KÜCHE.\nNEUES KAPITEL.",
                "YOUR KITCHEN.\nA NEW CHAPTER."
              )
            )}
          </h2>

          <p>
            {pick(
              l,
              "Erzähl uns kurz von deinem Restaurant. Wir prüfen, ob eines unserer Konzepte zu deiner Küche passt, und besprechen die nächsten Schritte mit dir.",
              "Tell us briefly about your restaurant. We will assess whether one of our concepts fits your kitchen and discuss the next steps with you."
            )}
          </p>

          <div
            className="cta-actions"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Button l={l} />

            <a
              className="whatsapp-link"
              href={businessContact.phoneHref}
              aria-label={pick(
                l,
                "UCV anrufen",
                "Call UCV"
              )}
            >
              <Phone size={18} aria-hidden="true" />
              <span>{pick(l, "Anrufen", "Call")}</span>
            </a>

            <a
              className="whatsapp-link"
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={pick(
                l,
                "UCV über WhatsApp kontaktieren",
                "Contact UCV on WhatsApp"
              )}
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <img
          className="cta-pizza"
          data-scroll-spin
          src={assets.pizzaCutout}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{ pointerEvents: "none" }}
        />

        <div className="cta-bottom">
          {pick(
            l,
            "GUTE MARKEN. GUTE KÜCHEN.",
            "GOOD BRANDS. GOOD KITCHENS."
          )}
        </div>
      </section>

      <EnquirySection l={l} />
    </>
  );
}
