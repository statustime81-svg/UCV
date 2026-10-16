"use client";

import FoodAccent from "../../components/FoodAccent";
import { url } from "../../content/site";
import type { Lang } from "../../content/site";
import { useContent } from "../../content/ContentProvider";
import { Heading } from "../../components/Ui";
import Steps from "../how-it-works/Steps";

export default function ProcessSection({ l }: { l: Lang }) {
  const { pick } = useContent();

  return (
    <section className="section process">
      <div className="section-number">
        02 / {pick(l, "DIE PARTNERSCHAFT", "THE PARTNERSHIP")}
      </div>

      <div className="process-heading" data-reveal>
        <Heading
          label={pick(
            l,
            "EIN KLARER ABLAUF",
            "A CLEAR PROCESS"
          )}
          title={pick(
            l,
            "DEINE KÜCHE.\nUNSER GEMEINSAMER START.",
            "YOUR KITCHEN.\nOUR SHARED START."
          )}
          text={pick(
            l,
            "Gemeinsam prüfen wir Standort, Küchenausstattung, Team und Lieferabläufe. Anschließend stimmen wir Marke, Launch-Menü, Verantwortlichkeiten und Konditionen ab. Dein bestehendes Restaurant kann weitergeführt werden.",
            "Together, we assess your location, kitchen equipment, team, and delivery arrangements. We then agree on the brand, launch menu, responsibilities, and commercial terms. You can continue operating your existing restaurant."
          )}
        />

        <div className="process-token" aria-hidden="true">
          UCV
          <br />
          <span>×</span>
          <br />
          {pick(l, "DEINE KÜCHE", "YOUR KITCHEN")}
        </div>
      </div>

      <Steps l={l} />

      <a
        className="text-link"
        href={url(l, "how-it-works")}
      >
        {pick(
          l,
          "So funktioniert die Partnerschaft",
          "How the partnership works"
        )}
      </a>

      <FoodAccent pizza={true} />
    </section>
  );
}
