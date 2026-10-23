"use client";

import FoodAccent from "../../components/FoodAccent";
import type { Lang } from "../../content/site";
import { useContent } from "../../content/ContentProvider";
import { Heading } from "../../components/Ui";
import BrandCards from "../brands/BrandCards";

export default function BrandsSection({ l }: { l: Lang }) {
  const { pick } = useContent();

  return (
    <section className="section brand-section" id="brands">
      <div className="section-number">
        01 / {pick(l, "DIE MARKEN", "THE BRANDS")}
      </div>

      <div data-reveal>
        <Heading
          label={pick(
            l,
            "ZUSÄTZLICHE LIEFERANGEBOTE",
            "ADDITIONAL DELIVERY OFFERINGS"
          )}
          title={pick(
            l,
            "DREI MARKEN.\nFÜR DEINE KÜCHE.",
            "THREE BRANDS.\nFOR YOUR KITCHEN."
          )}
          text={pick(
            l,
            "Fry Rebels für Chicken Burger, Fried Chicken, Wings, Tenders, Fries und Loaded Fries. Fresh Crust Pizza für Pizza und Pasta. Bharat Origins ergänzt das Portfolio als modernes indisches Küchenkonzept. Gemeinsam prüfen wir, welche Marke zu deiner Küche passt.",
            "Fry Rebels for chicken burgers, fried chicken, wings, tenders, fries, and loaded fries. Fresh Crust Pizza for pizza and pasta. Bharat Origins adds a modern Indian kitchen concept. Together, we assess which brand fits your kitchen."
          )}
        />
      </div>

      <BrandCards l={l} />

      <FoodAccent pizza={true} />
    </section>
  );
}
