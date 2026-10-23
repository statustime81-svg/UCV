"use client";

import PageDetails from "../../components/PageDetails";
import FoodAccent from "../../components/FoodAccent";
import { useContent } from "../../content/ContentProvider";
import type { Lang } from "../../content/site";
import { Cta } from "../../components/Ui";
import Steps from "./Steps";
import Responsibilities from "./Responsibilities";
import FaqSection from "../home/FaqSection";

export default function How({ l }: { l: Lang }) {
  const { pick } = useContent();

  return (
    <>
      <section className="page-intro" data-reveal>
        <span className="eyebrow">
          {pick(
            l,
            "DAS PARTNERSCHAFTSMODELL",
            "THE PARTNERSHIP MODEL"
          )}
        </span>

        <h1>
          {pick(l, "Bestehende Küche.", "Existing kitchen.")}
          <br />
          {pick(l, "Neue Möglichkeiten.", "New possibilities.")}
        </h1>

        <p>
          {pick(
            l,
            "Ergänze dein bestehendes Restaurant um ein zusätzliches Lieferangebot mit Fry Rebels, Fresh Crust Pizza oder Bharat Origins. Gemeinsam prüfen wir Standort, Ausstattung, verfügbare Mitarbeitende und Liefermöglichkeiten, um das passende Konzept für deinen Betrieb zu finden.",
            "Add an additional delivery offering to your existing restaurant with Fry Rebels, Fresh Crust Pizza, or Bharat Origins. Together, we assess your location, equipment, staffing, and delivery arrangements to find a suitable concept for your business."
          )}
        </p>

        <p>
          {pick(
            l,
            "Vor dem Start vereinbaren wir das Menü, die Zuständigkeiten und die kommerziellen Bedingungen. UCV unterstützt die vereinbarten Marken-, Plattform- und Marketingaufgaben sowie die Schulung deines Teams. Dein Restaurant bereitet die Bestellungen zu und organisiert den täglichen Küchenbetrieb.",
            "Before launch, we agree on the menu, responsibilities, and commercial terms. UCV supports the agreed brand, platform, and marketing activities, along with team training. Your restaurant prepares the orders and manages day-to-day kitchen operations."
          )}
        </p>

        <FoodAccent pizza={false} />
      </section>

      <section className="section compact">
        <Steps l={l} />
        <FoodAccent pizza={false} />
      </section>

      <Responsibilities l={l} />

      <FaqSection l={l} />

      <PageDetails l={l} page="how-it-works" />

      <Cta l={l} />
    </>
  );
}
