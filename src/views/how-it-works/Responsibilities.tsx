"use client";

import FoodAccent from "../../components/FoodAccent";
import { useContent } from "../../content/ContentProvider";
import type { Lang } from "../../content/site";

export default function Responsibilities({ l }: { l: Lang }) {
  const { pick } = useContent();

  const ucvResponsibilities = [
    pick(
      l,
      "Markenentwicklung und -betreuung",
      "Brand development and management"
    ),
    pick(
      l,
      "Menüstruktur und abgestimmte Preise",
      "Menu structure and agreed pricing"
    ),
    pick(
      l,
      "Vereinbartes Plattform-Onboarding und laufende Verwaltung",
      "Agreed platform onboarding and ongoing management"
    ),
    pick(
      l,
      "Produktpräsentation und Marketingkoordination",
      "Product presentation and marketing coordination"
    ),
    pick(
      l,
      "Schulung zu Zubereitung und Verpackung",
      "Preparation and packaging training"
    ),
    pick(
      l,
      "Persönlichen Austausch und WhatsApp-Support",
      "Personal communication and WhatsApp support"
    ),
  ];

  const restaurantResponsibilities = [
    pick(
      l,
      "Geeignete Küche und Ausstattung",
      "Suitable kitchen and equipment"
    ),
    pick(
      l,
      "Küchenpersonal und Arbeitsorganisation",
      "Kitchen staff and work organisation"
    ),
    pick(
      l,
      "Lagerung, Hygiene und Zubereitung",
      "Storage, hygiene, and food preparation"
    ),
    pick(
      l,
      "Einhaltung vereinbarter Rezepturen und Qualitätsstandards",
      "Following agreed recipes and quality standards"
    ),
    pick(
      l,
      "Zuverlässige Bestellbearbeitung zu den vereinbarten Zeiten",
      "Reliable order handling during agreed operating hours"
    ),
  ];

  return (
    <section className="responsibilities">
      <div
        className="section-heading"
        data-reveal
        style={{
          gridColumn: "1 / -1",
          flexBasis: "100%",
          minWidth: 0,
        }}
      >
        <span className="eyebrow">
          {pick(
            l,
            "AUFGABENVERTEILUNG",
            "RESPONSIBILITIES"
          )}
        </span>

        <h2>
          {pick(
            l,
            "Du bereitest zu. Wir unterstützen dein Liefergeschäft.",
            "You prepare the food. We support your delivery business."
          )}
        </h2>
      </div>

      <article data-reveal>
        <span className="eyebrow">UCV</span>

        <h3>
          {pick(l, "UCV übernimmt", "UCV handles")}
        </h3>

        <ul
          style={{
            margin: "20px 0 0",
            paddingInlineStart: "20px",
            listStyleType: "disc",
            lineHeight: 1.7,
          }}
        >
          {ucvResponsibilities.map((item) => (
            <li
              key={item}
              style={{ marginBottom: "12px" }}
            >
              {item}
            </li>
          ))}
        </ul>
      </article>

      <article data-reveal>
        <span className="eyebrow">
          {pick(l, "DEIN RESTAURANT", "YOUR RESTAURANT")}
        </span>

        <h3>
          {pick(
            l,
            "Dein Restaurant übernimmt",
            "Your restaurant handles"
          )}
        </h3>

        <ul
          style={{
            margin: "20px 0 0",
            paddingInlineStart: "20px",
            listStyleType: "disc",
            lineHeight: 1.7,
          }}
        >
          {restaurantResponsibilities.map((item) => (
            <li
              key={item}
              style={{ marginBottom: "12px" }}
            >
              {item}
            </li>
          ))}
        </ul>
      </article>

      <div
        data-reveal
        style={{
          gridColumn: "1 / -1",
          flexBasis: "100%",
          minWidth: 0,
          lineHeight: 1.7,
        }}
      >
        <p>
          {pick(
            l,
            "Zutatenbeschaffung, Verpackung, Lieferung und Werbebudgets werden vor dem Start gemeinsam festgelegt. Die Aufgaben und Kosten werden in der Partnerschaftsvereinbarung dokumentiert.",
            "Ingredient purchasing, packaging, delivery, and advertising budgets are agreed before launch. Responsibilities and costs are documented in the partnership agreement."
          )}
        </p>

        <p style={{ marginTop: "12px" }}>
          {pick(
            l,
            "Verpackungsberatung bedeutet keine kostenlose Verpackungslieferung. Marketingkoordination umfasst kein unbegrenztes Werbebudget. Umfang und Kosten werden gemeinsam abgestimmt.",
            "Packaging guidance does not mean free packaging supplies. Marketing coordination does not include an unlimited advertising budget. Scope and costs are agreed together."
          )}
        </p>
      </div>

      <FoodAccent pizza={false} />
    </section>
  );
}
