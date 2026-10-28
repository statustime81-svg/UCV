import { Lang } from "../content/site";
import { pageDetails } from "../content/page-details";
import { assets } from "../content/assets";
import { Button } from "./Ui";

type DetailPage = keyof typeof pageDetails;

const pageImages: Partial<Record<DetailPage, string[]>> = {
  brands: [
    assets.brandDetailFry,
    assets.brandDetailPizza,
    assets.brandDetailBharat,
  ],
  "how-it-works": [
    assets.howStep1,
    assets.howStep2,
    assets.howStep3,
  ],
  about: [
    assets.about01,
    assets.about02,
    assets.about03,
  ],
  gallery: [
    assets.galleryDetail01,
    assets.galleryDetail02,
  ],
  "fry-rebels": [
    assets.fryRebelsDetail01,
    assets.fryRebelsDetail02,
  ],
  "fresh-crust-pizza": [
    assets.freshCrustDetail01,
    assets.freshCrustDetail02,
  ],
  "bharat-origins": [
    assets.bharatFood,
    assets.bharatFood,
  ],
};

const brandLogos = [
  assets.fryLogo,
  assets.pizzaLogo,
  assets.bharatLogo,
];

function getDetailImage(page: DetailPage, index: number): string {
  return pageImages[page]?.[index] || assets.kitchen;
}

function getStampLogo(page: DetailPage, index: number): string {
  if (page === "fry-rebels") return assets.fryLogo;
  if (page === "fresh-crust-pizza") return assets.pizzaLogo;
  if (page === "bharat-origins") return assets.bharatLogo;

  if (
    page === "brands" ||
    page === "about" ||
    page === "how-it-works"
  ) {
    return brandLogos[index % brandLogos.length];
  }

  if (page === "gallery") {
    return index === 0 ? assets.fryLogo : assets.pizzaLogo;
  }

  return brandLogos[index % brandLogos.length];
}

export default function PageDetails({
  l,
  page,
}: {
  l: Lang;
  page: DetailPage;
}) {
  const sections = pageDetails[page];

  return (
    <>
      {sections.map((section, index) => {
        const image = getDetailImage(page, index);
        const stampLogo = getStampLogo(page, index);
        const title = section[l === "de" ? 0 : 1];

        // Hide logos on How It Works and About.
        // On Gallery, hide only the second card's logo (the car card).
        const showLogo =
          page !== "how-it-works" &&
          page !== "about" &&
          !(page === "gallery" && index === 1);

        return (
          <section
            className={`section detail-story ${
              index % 2 ? "detail-story-reverse" : ""
            }`}
            key={title}
          >
            <div className="detail-story-visual" data-reveal>
              <img
                className="detail-story-image"
                src={image}
                alt={title}
                loading="lazy"
              />

              {showLogo && (
                <span className="detail-story-brand-stamp" aria-hidden="true">
                  <img
                    className="detail-story-brand-logo"
                    src={stampLogo}
                    alt=""
                  />
                </span>
              )}

              <span className="detail-story-caption">
                UCV / {String(index + 1).padStart(2, "0")} ·{" "}
                {l === "de" ? "KONZEPTBILD" : "CONCEPT IMAGE"}
              </span>
            </div>

            <div className="detail-story-copy" data-reveal>
              <span className="eyebrow">{title}</span>
              <h2>{section[l === "de" ? 2 : 3]}</h2>
              <p className="detail-lead">
                {section[l === "de" ? 4 : 5]}
              </p>

              {section[l === "de" ? 6 : 7].map((text) => (
                <p key={text}>{text}</p>
              ))}

              <Button l={l} />
            </div>
          </section>
        );
      })}
    </>
  );
}