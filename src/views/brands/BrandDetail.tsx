"use client";

import type { CSSProperties } from "react";
import PageDetails from "../../components/PageDetails";
import FoodAccent from "../../components/FoodAccent";
import type { Lang } from "../../content/site";
import { assets } from "../../content/assets";
import { useContent } from "../../content/ContentProvider";
import { Button, Cta } from "../../components/Ui";
import FryProducts from "../fry-rebels/FryProducts";

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
  const isIndian = slug === "bharat-origins";

  const logo = isPizza
    ? assets.pizzaLogo
    : isIndian
      ? assets.bharatLogo
      : assets.fryLogo;
  const brandImage = isPizza
    ? assets.pizzaFood
    : isIndian
      ? assets.bharatFood
      : assets.fryFood;

  const subtitle = isPizza
    ? pick(l, "Pizza & Pasta", "Pizza & Pasta")
    : isIndian
      ? "MODERN INDIAN KITCHEN"
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
    : isIndian
      ? pick(
          l,
          "Bharat Origins ist ein modernes indisches Küchenkonzept für bestehende Restaurants. Dein Team bereitet die Bestellungen zu; UCV unterstützt den vereinbarten Markenauftritt und die Abläufe. Die konkreten Gerichte und das Launch-Menü werden vor dem Start gemeinsam festgelegt.",
          "Bharat Origins is a modern Indian kitchen concept for existing restaurants. Your team prepares orders; UCV supports the agreed brand presentation and operations. Specific dishes and the launch menu are agreed together before launch."
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
    : isIndian
      ? { background: "#fbf4e7", color: "#401322", borderBottom: "1px solid rgba(100, 27, 52, 0.18)" }
      : undefined;

  const logoStyle: CSSProperties = {
    position: "relative",
    display: "block",
    width: "108px",
    height: "108px",
    maxWidth: "100%",
    maxHeight: "108px",
    objectFit: "contain",
    objectPosition: "center",
    margin: "0 0 16px",
    padding: "9px",
    background: isIndian ? "#fbf4e7" : "#ffffff",
    borderRadius: "50%",
    border: "1px solid rgba(21, 27, 22, 0.14)",
    boxSizing: "border-box",
    transform: "none",
    filter: "none",
  };

  return (
    <>
      <section
        className={`brand-hero ${isPizza ? "pizza-detail" : isIndian ? "indian-detail" : "fry-detail"}`}
        style={pizzaHeroStyle}
      >
        <div data-reveal>
          <span
            className="eyebrow"
            style={isPizza ? { color: "#b92318" } : isIndian ? { color: "#8a542d" } : undefined}
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

          <h1 style={isPizza ? { color: "#17171f" } : isIndian ? { color: "#641b34" } : undefined}>
            {brand.name}
          </h1>

          <h2 style={isPizza ? { color: "#b92318" } : isIndian ? { color: "#8a542d" } : undefined}>
            {subtitle}
          </h2>

          <p style={isPizza ? { color: "#45454d" } : isIndian ? { color: "#5a4c43" } : undefined}>
            {description}
          </p>

          <Button l={l} />
        </div>

        <img
          src={brandImage}
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
            background: isIndian ? "#fbf4e7" : isPizza ? "#fff8ee" : "#f3f0e8",
          }}
        />

        <span className="brand-hero-caption">
          {pick(
            l,
            "Food-Konzeptvisualisierung · kein bestätigtes Produktfoto",
            "Food concept visual · not a confirmed product photograph"
          )}
        </span>

        <FoodAccent
          pizza={isPizza}
          spin
          src={isIndian ? assets.bharatBiryaniPlate : isFry ? assets.burgerSpin : assets.pizzaCutout}
        />
      </section>

      <section className="section" data-reveal>
        <span
          className="eyebrow"
          style={isPizza ? { color: "#b92318" } : isIndian ? { color: "#641b34" } : undefined}
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
            : isIndian
              ? pick(l, "Ein modernes indisches Küchenkonzept.", "A modern Indian kitchen concept.")
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
                  ...((isPizza || isIndian)
                    ? {
                        background: isIndian ? "#fbf4e7" : "#fff8ee",
                        color: isIndian ? "#401322" : "#17171f",
                        border: isIndian ? "1px solid rgba(100, 27, 52, 0.18)" : "1px solid rgba(201, 32, 24, 0.18)",
                        borderTop: isIndian ? "4px solid #c88f45" : "4px solid #f2b632",
                      }
                    : {}),
                } as CSSProperties
              }
            >
              <span
                style={isPizza ? { color: "#b92318" } : isIndian ? { color: "#8a542d" } : undefined}
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

        <FoodAccent
          pizza={isPizza}
          spin
          src={isIndian ? assets.bharatBiryaniPlate : isFry ? assets.burgerSpin : assets.pizzaCutout}
        />
      </section>

      {isFry && <FryProducts l={l} />}

      {(slug === "fry-rebels" || slug === "fresh-crust-pizza" || slug === "bharat-origins") && (
        <PageDetails l={l} page={slug} />
      )}

      <Cta
        l={l}
        foodImage={isIndian ? assets.bharatBiryaniPlate : isPizza ? assets.pizzaCutout : assets.burgerSpin}
      />
    </>
  );
}
