"use client";

import PageDetails from "../../components/PageDetails";
import FoodAccent from "../../components/FoodAccent";
import { useContent } from "../../content/ContentProvider";
import type { Lang } from "../../content/site";
import CompanySection from "./CompanySection";
import { Cta } from "../../components/Ui";

const values = [
  [
    "Klare Verantwortung",
    "Clear responsibilities",
    "Aufgaben, Leistungsumfang und kommerzielle Bedingungen werden vor dem Start gemeinsam vereinbart.",
    "Responsibilities, support scope, and commercial terms are agreed together before launch.",
  ],
  [
    "Passende Umsetzung",
    "A practical fit",
    "Standort, Ausstattung, Team und Lieferabläufe bilden die Grundlage für die Auswahl und Umsetzung eines Konzepts.",
    "Location, equipment, staffing, and delivery arrangements guide the selection and implementation of a concept.",
  ],
  [
    "Schrittweise Entwicklung",
    "Step-by-step development",
    "Wir stärken unseren ersten Standort, entwickeln einheitliche Standards und bereiten sorgfältig ausgewählte Partnerschaften vor.",
    "We are strengthening our first location, developing consistent standards, and preparing carefully selected partnerships.",
  ],
] as const;

export default function About({ l }: { l: Lang }) {
  const { pick } = useContent();

  return (
    <>
      <section className="page-intro" data-reveal>
        <span className="eyebrow">
          {pick(
            l,
            "ÜBER URBAN CULINARY VENTURE",
            "ABOUT URBAN CULINARY VENTURE"
          )}
        </span>

        <h1>
          {pick(
            l,
            "Food-Marken entwickeln.",
            "Develop food brands."
          )}
          <br />
          {pick(
            l,
            "Küchen verbinden.",
            "Connect kitchens."
          )}
        </h1>

        <p>
          {pick(
            l,
            "In Berlin ansässig. Mit Fry Rebels Buchholz gestartet. Offen für passende Restaurantpartnerschaften in Deutschland.",
            "Based in Berlin. Launched with Fry Rebels Buchholz. Open to suitable restaurant partnerships across Germany."
          )}
        </p>

        <FoodAccent pizza={false} />
      </section>

      <CompanySection l={l} />

      <section className="section">
        <div className="values" data-reveal>
          {values.map(([titleDe, titleEn, textDe, textEn]) => (
            <article key={titleDe}>
              <h3>{pick(l, titleDe, titleEn)}</h3>
              <p>{pick(l, textDe, textEn)}</p>
            </article>
          ))}
        </div>

        <FoodAccent pizza={false} />
      </section>

      <PageDetails l={l} page="about" />

      <Cta l={l} />
    </>
  );
}
