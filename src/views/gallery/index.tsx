import PageDetails from "../../components/PageDetails";
import FoodAccent from "../../components/FoodAccent";
import type { Lang } from "../../content/site";
import GalleryGrid from "./GalleryGrid";
import { Cta } from "../../components/Ui";

export default function Gallery({ l }: { l: Lang }) {
  return (
    <>
      <section className="section gallery-page">
        <span className="eyebrow" data-reveal>
          UCV / {l === "de" ? "GALERIE" : "GALLERY"}
        </span>

        <h1 data-reveal>
          {l === "de" ? "GUTER GESCHMACK." : "GOOD TASTE."}
          <br />
          {l === "de" ? "IN BILDERN." : "IN PICTURES."}
        </h1>

        <p data-reveal>
          {l === "de"
            ? "Entdecke Fry Rebels, Fresh Crust Pizza und Bharat Origins. Unser aktueller Fokus liegt auf zusätzlichen Lieferangeboten aus bestehenden Restaurantküchen."
            : "Explore Fry Rebels, Fresh Crust Pizza, and Bharat Origins. Our current focus is on additional delivery offerings from existing restaurant kitchens."}
        </p>

        <FoodAccent pizza={true} />
      </section>

      <PageDetails l={l} page="gallery" />

      <section className="section gallery-page">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">
            {l === "de" ? "UNSERE BILDWELT" : "OUR VISUAL WORLD"}
          </span>

          <h2>
            {l === "de"
              ? "Food und Konzepte entdecken."
              : "Explore food and concepts."}
          </h2>

          <p>
            {l === "de"
              ? "Die folgenden Bilder zeigen Food- und Designkonzepte. Restaurant- und Food-Truck-Entwürfe stellen mögliche Zukunftsideen dar, keine bestätigten Betriebsstandorte."
              : "The images below show food and design concepts. Restaurant and food-truck designs represent possible future ideas, not confirmed operating locations."}
          </p>
        </div>

        <GalleryGrid l={l} />
      </section>

      <Cta l={l} />
    </>
  );
}
