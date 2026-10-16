"use client";

import type { CSSProperties } from "react";
import PageDetails from "../../components/PageDetails";
import FoodAccent from "../../components/FoodAccent";
import type { Lang } from "../../content/site";
import { assets } from "../../content/assets";
import { useContent } from "../../content/ContentProvider";
import { Button, Cta } from "../../components/Ui";

type BrandDetailProps = {
  l: Lang;
  slug: string;
};

export default function BrandDetail({ l, slug }: BrandDetailProps) {
  const { content, pick } = useContent();

  const brand = content.brands.find(
    (item) => item.slug === slug && item.enabled
  );

  if (!brand) return null;

  const isPizza = slug === "fresh-crust-pizza";
  const isFry = slug === "fry-rebels";

  const logo = isPizza ? assets.pizzaLogo : brand.logo;

  const subtitle = isPizza
    ? pick(l, "Pizza & Pasta", "Pizza & Pasta")
    : isFry
      ? pick(
          l,
          "Crispy Chicken, Burger & Loaded Fries",
          "Crispy chicken, burgers & loaded fries"
        )
      : pick(l, brand.de, brand.en);

  const description = isPizza
    ? pick(
        l,
        "Fresh Crust Pizza ist unsere Marke für Pizza und Pasta. Gemeinsam prüfen wir, wie sich das Konzept mit deiner vorhandenen Ausstattung und deinen Küchenabläufen umsetzen lässt.",
        "Fresh Crust Pizza is our pizza and pasta brand. Together, we assess how the concept can work with your existing equipment and kitchen operations."
      )
    : isFry
      ? pick(
          l,
          "Fry Rebels ist unsere Marke für Chicken Burger, Fried Chicken, Wings, Tenders, Fries und Loaded Fries. Das Konzept verbindet einen eigenständigen Markenauftritt mit klaren Zubereitungs- und Verpackungsabläufen.",
          "Fry Rebels is our brand for chicken burgers, fried chicken, wings, tenders, fries, and loaded fries. The concept combines a distinctive brand identity with clear preparation and packaging procedures."
        )
      : pick(
          l,
          "Eine Food-Marke für bestehende Restaurantküchen. Dein Team bereitet die Bestellungen zu. UCV unterstützt die vereinbarten Marken- und Betriebsabläufe.",
          "A food brand for existing restaurant kitchens. Your team prepares the orders. UCV supports the agreed brand and operational processes."
        );

  // Fresh Crust categories follow the approved PDF.
  const categories = isPizza
    ? ["Pizza", "Pasta"]
    : isFry
      ? [
          pick(l, "Chicken Burger", "Chicken burgers"),
          "Fried Chicken",
          "Wings",
          "Tenders",
          "Fries",
          "Loaded Fries",
        ]
      : brand.categories;

  const pizzaHeroStyle: CSSProperties | undefined = isPizza
    ? {
        background: "#fff8ee",
        color: "#17171f",
        borderBottom: "1px solid rgba(201, 32, 24, 0.16)",
      }
    : undefined;

  const logoStyle: CSSProperties = {
    position: "relative",
    display: "block",
    width: isPizza ? "clamp(180px, 24vw, 300px)" : "220px",
    maxWidth: "100%",
    height: "auto",
    maxHeight: isPizza ? "220px" : "150px",
    objectFit: "contain",
    objectPosition: "left center",
    margin: "0 0 24px",
    padding: isPizza ? "12px" : 0,
    background: isPizza ? "#ffffff" : undefined,
    borderRadius: isPizza ? "18px" : undefined,
    boxSizing: "border-box",
    transform: "none",
    filter: "none",
  };

  return (
    <>
      <section
        className={`brand-hero ${
          isPizza ? "pizza-detail" : "fry-detail"
        }`}
        style={pizzaHeroStyle}
      >
        <div data-reveal>
          <span
            className="eyebrow"
            style={isPizza ? { color: "#b92318" } : undefined}
          >
            URBAN CULINARY VENTURE / {brand.tag}
          </span>

          {logo && (
            <img
              className="detail-logo"
              src={logo}
              alt={`${brand.name} logo`}
              style={logoStyle}
              decoding="async"
            />
          )}

          <h1 style={isPizza ? { color: "#17171f" } : undefined}>
            {brand.name}
          </h1>

          <h2 style={isPizza ? { color: "#b92318" } : undefined}>
            {subtitle}
          </h2>

          <p style={isPizza ? { color: "#45454d" } : undefined}>
            {description}
          </p>

          <Button l={l} />
        </div>

        <img
          src={brand.image}
          alt={pick(
            l,
            `${brand.name} – Food-Konzept`,
            `${brand.name} – food concept`
          )}
          data-reveal
          decoding="async"
          style={{
            display: "block",
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            height: "auto",
            maxHeight: "560px",
            objectFit: "contain",
            alignSelf: "center",
            borderRadius: "24px",
          }}
        />

        <FoodAccent pizza={isPizza} />
      </section>

      <section className="section" data-reveal>
        <span
          className="eyebrow"
          style={isPizza ? { color: "#b92318" } : undefined}
        >
          {pick(l, "DAS KONZEPT", "THE CONCEPT")}
        </span>

        <h2>
          {isPizza
            ? pick(
                l,
                "Pizza und Pasta für dein Lieferangebot.",
                "Pizza and pasta for your delivery offering."
              )
            : isFry
              ? pick(
                  l,
                  "Chicken, Burger und Beilagen.",
                  "Chicken, burgers and sides."
                )
              : pick(
                  l,
                  "Entdecke die Produktkategorien.",
                  "Explore the food categories."
                )}
        </h2>

        <div className="categories">
          {categories.map((category, index) => (
            <article
              key={`${slug}-${category}`}
              data-reveal
              style={
                {
                  "--delay": `${index * 50}ms`,
                  ...(isPizza
                    ? {
                        background: "#fff8ee",
                        color: "#17171f",
                        border: "1px solid rgba(201, 32, 24, 0.18)",
                        borderTop: "4px solid #f2b632",
                      }
                    : {}),
                } as CSSProperties
              }
            >
              <span
                style={isPizza ? { color: "#b92318" } : undefined}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{category}</h3>
            </article>
          ))}
        </div>

        <p className="muted">
          {pick(
            l,
            "Das Launch-Menü, die Rezepturen, Preise und Verpackungsstandards werden vor dem Start gemeinsam abgestimmt.",
            "The launch menu, recipes, pricing, and packaging standards are agreed together before launch."
          )}
        </p>

        <FoodAccent pizza={isPizza} />
      </section>

      {(slug === "fry-rebels" || slug === "fresh-crust-pizza") && (
        <PageDetails l={l} page={slug} />
      )}

      <Cta l={l} />
    </>
  );
}
