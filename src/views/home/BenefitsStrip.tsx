"use client";

import type { Lang } from "../../content/site";
import { useContent } from "../../content/ContentProvider";

export default function BenefitsStrip({ l }: { l: Lang }) {
  const { pick } = useContent();

  const benefits = [
    pick(
      l,
      "Keine Einstiegsgebühr",
      "No joining fee"
    ),
    pick(
      l,
      "Bestehende Küchenkapazitäten nutzen",
      "Use existing kitchen capacity"
    ),
    pick(
      l,
      "Unterstützung bei Lieferplattformen und Marketing",
      "Delivery-platform and marketing support"
    ),
    pick(
      l,
      "Mitarbeiterschulung und persönliche Betreuung",
      "Staff training and personal support"
    ),
  ];

  return (
    <div
      className="food-marquee"
      role="region"
      aria-label={pick(
        l,
        "Vorteile der Partnerschaft",
        "Partnership benefits"
      )}
    >
      <ul className="sr-only">
        {benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      <div className="marquee-track" aria-hidden="true">
        {[0, 1, 2, 3].map((copy) => (
          <div className="marquee-copy" key={copy}>
            {benefits.map((benefit) => (
              <span key={benefit}>
                {benefit}
                <b>✳</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
