"use client";

import type { CSSProperties } from "react";
import type { Lang } from "../../content/site";
import { url } from "../../content/site";
import { assets } from "../../content/assets";
import { useContent } from "../../content/ContentProvider";

export default function BrandCards({ l }: { l: Lang }) {
  const { content, pick } = useContent();

  return (
    <div className="brand-grid editorial-brands">
      {content.brands
        .filter((brand) => brand.enabled)
        .map((brand, index) => {
          const isPizza = brand.slug === "fresh-crust-pizza";
          const isFry = brand.slug === "fry-rebels";
          const isIndian = brand.slug === "bharat-origins";

          const logo = isPizza
            ? assets.pizzaLogo
            : isIndian
              ? assets.bharatLogo
              : assets.fryLogo;
          const image = isPizza
            ? assets.pizzaFood
            : isIndian
              ? assets.bharatFood
              : assets.fryFood;

          const tag = isPizza ? "PIZZA & PASTA" : brand.tag;

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
              : pick(l, brand.de, brand.en);

          const pizzaPanelStyle: CSSProperties | undefined =
            isPizza
              ? {
                  background: "#fff8ee",
                  color: "#17171f",
                  borderColor: "#e5c8b5",
                }
              : isIndian
                ? { background: "#fbf4e7", color: "#401322", borderColor: "#d9b88b" }
                : undefined;

          return (
            <article
              className={`brand-panel ${brand.theme}`}
              key={brand.slug}
              data-reveal
              style={pizzaPanelStyle}
            >
              <a
                href={url(l, brand.slug)}
                className="brand-panel-link"
                data-cursor={pick(l, "ENTDECKEN", "EXPLORE")}
                style={
                  isPizza
                    ? { color: "#17171f" }
                    : isIndian
                      ? { color: "#401322" }
                      : undefined
                }
              >
                <div className="brand-panel-header">
                  <span>
                    {String(index + 1).padStart(2, "0")} / {tag}
                  </span>

                  <span>UCV FOOD BRANDS</span>
                </div>

                <h3
                  className="brand-display"
                  style={
                    isPizza
                      ? { color: "#b92318" }
                      : isIndian
                        ? { color: "#641b34" }
                        : undefined
                  }
                >
                  {brand.name}
                </h3>

                <div className="brand-photo">
                  <img
                    src={image}
                    alt={pick(
                      l,
                      `${brand.name} – Food-Konzept`,
                      `${brand.name} – food concept`
                    )}
                    loading="lazy"
                    decoding="async"
                  />

                  <span
                    className="photo-tag"
                    style={
                      isPizza || isIndian
                        ? {
                            background: isIndian ? "#641b34" : "#17171f",
                            color: isIndian ? "#fff4e5" : "#ffffff",
                          }
                        : undefined
                    }
                  >
                    {tag}
                  </span>

                  {logo && (
                    <div className={`brand-logo-badge ${brand.slug}-logo-badge`}>
                      <img
                        src={logo}
                        alt={`${brand.name} logo`}
                        loading="lazy"
                        decoding="async"
                        className="brand-logo-image"
                      />
                    </div>
                  )}
                </div>

                <div className="brand-copy">
                  <p
                    style={
                      isPizza
                        ? { color: "#45454d" }
                        : isIndian
                          ? { color: "#5a4c43" }
                          : undefined
                    }
                  >
                    {description}
                  </p>

                  <span
                    className="brand-pill"
                    style={
                      isPizza
                        ? {
                            background: "#f2b632",
                            color: "#17171f",
                            borderColor: "#17171f",
                          }
                        : isIndian
                          ? { background: "#c88f45", color: "#401322", borderColor: "#641b34" }
                          : undefined
                    }
                  >
                    {pick(l, "Marke entdecken", "Explore brand")}
                    <span aria-hidden="true">+</span>
                  </span>
                </div>
              </a>
            </article>
          );
        })}
    </div>
  );
}
