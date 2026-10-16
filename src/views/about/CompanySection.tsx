"use client";

import FoodAccent from "../../components/FoodAccent";
import type { Lang } from "../../content/site";
import { useContent } from "../../content/ContentProvider";
import { assets } from "../../content/assets";

export default function CompanySection({ l }: { l: Lang }) {
  const { pick, content } = useContent();

  const kitchenImage = content.images.kitchen || assets.kitchen;
  const companyLogo = content.images.aboutLogo || assets.aboutLogo;

  return (
    <section className="company">
      <div className="company-visual" data-reveal>
        <img
          src={kitchenImage}
          alt={pick(
            l,
            "Konzeptdarstellung einer Restaurantküche",
            "Restaurant kitchen concept illustration"
          )}
          loading="lazy"
          decoding="async"
        />

        <span className="concept-caption">
          {pick(
            l,
            "KONZEPTVISUALISIERUNG · KEIN BESTÄTIGTER STANDORT",
            "CONCEPT VISUAL · NOT A CONFIRMED LOCATION"
          )}
        </span>

        <div className="company-brand">
          <img
            src={companyLogo}
            alt="Urban Culinary Venture"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div data-reveal>
        <span className="eyebrow">
          {pick(l, "UNSER ANSATZ", "OUR APPROACH")}
        </span>

        <h2>
          {pick(l, "GUTE MARKEN.", "GOOD BRANDS.")}
          <br />
          {pick(l, "GUTE KÜCHEN.", "GOOD KITCHENS.")}
        </h2>

        <p>
          {pick(
            l,
            "Urban Culinary Venture (UCV) ist ein Food-Brand-Unternehmen aus Berlin, das bestehenden Restaurants hilft, verfügbare Küchenkapazitäten durch zusätzliche Lieferkonzepte zu nutzen.",
            "Urban Culinary Venture (UCV) is a Berlin-based food-brand business helping existing restaurants put available kitchen capacity to work through additional delivery concepts."
          )}
        </p>

        <p>
          {pick(
            l,
            "Unser Partnerschaftsmodell ermöglicht es geeigneten Restaurants, UCV-Marken einzuführen und gleichzeitig ihren bestehenden Betrieb weiterzuführen.",
            "Our partnership model allows suitable restaurants to introduce UCV brands while continuing to operate their existing business."
          )}
        </p>
      </div>

      <FoodAccent pizza={true} />
    </section>
  );
}
