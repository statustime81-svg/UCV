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
            "ZWEI MARKEN.\nFÜR DEINE KÜCHE.",
            "TWO BRANDS.\nFOR YOUR KITCHEN."
          )}
          text={pick(
            l,
            "Fry Rebels für Chicken Burger, Fried Chicken, Wings, Tenders, Fries und Loaded Fries. Fresh Crust Pizza für Pizza und Pasta. Gemeinsam prüfen wir, welche Marke zu deiner Küche passt. Dein bestehendes Restaurant und Menü können weitergeführt werden.",
            "Fry Rebels for chicken burgers, fried chicken, wings, tenders, fries, and loaded fries. Fresh Crust Pizza for pizza and pasta. Together, we assess which brand fits your kitchen. You can continue operating your existing restaurant and menu."
          )}
        />
      </div>

      <BrandCards l={l} />

      <FoodAccent pizza={true} />
    </section>
  );
}
