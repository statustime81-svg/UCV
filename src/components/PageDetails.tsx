import { Lang } from "../content/site";
import { pageDetails } from "../content/page-details";
import { assets } from "../content/assets";
import { Button } from "./Ui";

type DetailPage = keyof typeof pageDetails;

const pageImages: Partial<Record<DetailPage, string[]>> = {
  brands: [assets.brandIdea, assets.brandComparison, assets.brandLaunch],
  "how-it-works": [assets.howStep1, assets.howStep2, assets.howStep3],
  about: [assets.about01, assets.about02, assets.about03],
  gallery: [assets.galleryDetail01, assets.galleryDetail02],
};

function getDetailImage(page: DetailPage, index: number): string {
  const image = pageImages[page]?.[index];

  if (image) {
    return image;
  }

  return index % 2 === 0 ? assets.fryFood : assets.pizzaFood;
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
        const title = section[l === "de" ? 0 : 1];

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

              <span className="detail-story-brand-stamp" aria-hidden="true">
                <img
                  className="detail-story-brand-logo"
                  src={assets.ucvLogo}
                  alt=""
                />
              </span>

              <span className="detail-story-caption">
                UCV / {String(index + 1).padStart(2, "0")} ·{" "}
                {l === "de" ? "KONZEPTBILD" : "CONCEPT IMAGE"}
              </span>
            </div>

            <div className="detail-story-copy" data-reveal>
              <span className="eyebrow">{title}</span>
              <h2>{section[l === "de" ? 2 : 3]}</h2>
              <p className="detail-lead">{section[l === "de" ? 4 : 5]}</p>

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