"use client";

import PageDetails from "../../components/PageDetails";
import FoodAccent from "../../components/FoodAccent";
import { useContent } from "../../content/ContentProvider";
import type { Lang } from "../../content/site";
import BrandCards from "./BrandCards";
import { Cta } from "../../components/Ui";

export default function Brands({ l }: { l: Lang }) {
  const { pick } = useContent();

  return (
    <>
      <section className="page-intro" data-reveal>
        <span className="eyebrow">
          {pick(l, "DIE UCV MARKENWELT", "THE UCV BRAND FAMILY")}
        </span>

        <h1>
          {pick(l, "Eigener Charakter.", "Distinct character.")}
          <br />
          {pick(l, "Gemeinsame Küche.", "A shared kitchen.")}
        </h1>

        <p>
          {pick(
            l,
            "Fry Rebels steht für Chicken Burger, Fried Chicken, Wings, Tenders, Fries und Loaded Fries. Fresh Crust Pizza ergänzt unser Portfolio mit Pizza und Pasta. Zwei eigenständige Food-Marken, mit denen geeignete Restaurants ihr bestehendes Angebot um zusätzliche Lieferkonzepte erweitern können.",
            "Fry Rebels offers chicken burgers, fried chicken, wings, tenders, fries, and loaded fries. Fresh Crust Pizza adds pizza and pasta to our portfolio. Two distinct food brands that allow suitable restaurants to add delivery concepts alongside their existing offering."
          )}
        </p>

        <p>
          {pick(
            l,
            "Gemeinsam prüfen wir, welche Marke zu deiner Ausstattung, deinem Team und der lokalen Nachfrage passt. Dein Restaurantname und dein bisheriges Menü können erhalten bleiben. Produktauswahl, Preise, Abläufe und die vereinbarte Unterstützung stimmen wir vor dem Start ab.",
            "Together, we assess which brand fits your equipment, team, and local demand. You can retain your restaurant name and existing menu. Product selection, pricing, workflows, and the agreed support are discussed before launch."
          )}
        </p>

        <FoodAccent pizza={true} />
      </section>

      <section className="section compact">
        <BrandCards l={l} />
        <FoodAccent pizza={true} />
      </section>

      <PageDetails l={l} page="brands" />

      <Cta l={l} />
    </>
  );
}
