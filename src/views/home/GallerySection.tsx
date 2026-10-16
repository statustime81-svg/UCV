import FoodAccent from "../../components/FoodAccent";
import { Lang, url } from "../../content/site";
import GalleryGrid from "../gallery/GalleryGrid";

export default function GallerySection({ l }: { l: Lang }) {
  const isGerman = l === "de";

  return (
    <section className="section gallery-section">
      <div className="gallery-heading" data-reveal>
        <div>
          <span className="eyebrow">
            UCV / {isGerman ? "GALERIE" : "GALLERY"}
          </span>

          <h2>
            {isGerman ? "EIN BLICK." : "ONE LOOK."}
            <br />
            {isGerman ? "VIEL GESCHMACK." : "PLENTY OF FLAVOUR."}
          </h2>

          <p>
            {isGerman
              ? "Entdecke unsere Food-Marken und die Ideen hinter dem Partnerschaftsmodell. Konzeptbilder sind gekennzeichnet und zeigen keine bestätigten UCV-Standorte."
              : "Explore our food brands and the ideas behind our partnership model. Concept visuals are labelled and do not represent confirmed UCV locations."}
          </p>
        </div>

        <a className="brand-pill" href={url(l, "gallery")}>
          {isGerman ? "Galerie ansehen" : "View gallery"} +
        </a>
      </div>

      <GalleryGrid l={l} preview />

      <FoodAccent pizza={true} />
    </section>
  );
}
