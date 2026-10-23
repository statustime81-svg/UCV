"use client";

import { useContent } from "../../content/ContentProvider";
import { assets } from "../../content/assets";
import { url } from "../../content/site";
import type { Lang } from "../../content/site";
import { Button } from "../../components/Ui";

export default function Hero({ l }: { l: Lang }) {
  const { pick, content } = useContent();

  return (
    <section className="hero hero-editorial">
      <div className="hero-topline">
        <span>
          {pick(
            l,
            "BERLIN · FOOD-MARKEN-PARTNERSCHAFTEN",
            "BERLIN · FOOD BRAND PARTNERSHIPS"
          )}
        </span>

        <span>
          {pick(
            l,
            "BESTEHENDE KÜCHEN. NEUE IDEEN.",
            "EXISTING KITCHENS. NEW IDEAS."
          )}
        </span>
      </div>

      <div className="hero-copy">
        <span className="eyebrow">
          {pick(
            l,
            "FÜR BESTEHENDE RESTAURANTS",
            "FOR EXISTING RESTAURANTS"
          )}
        </span>

        <h1>
          <span>
            {pick(l, "MEHR AUS", "MAKE MORE")}
          </span>{" "}
          <span className="hero-outline">
            {pick(l, "DEINER KÜCHE MACHEN.", "OF YOUR KITCHEN.")}
          </span>{" "}
          <span className="hero-accent">
            {pick(
              l,
              "MIT NEUEN FOOD-MARKEN.",
              "WITH NEW FOOD BRANDS."
            )}
          </span>
        </h1>

        <div className="hero-bottom-copy">
          <p>
            {pick(
              l,
              "Ergänze deine bestehende Restaurantküche mit Fry Rebels, Fresh Crust Pizza oder Bharat Origins. UCV unterstützt bei Menü, Preisgestaltung, Lieferplattformen, Marketing und Mitarbeiterschulung. Dein Team bereitet die Bestellungen zu.",
              "Add Fry Rebels, Fresh Crust Pizza, or Bharat Origins to your existing restaurant kitchen. UCV supports menus, pricing, delivery platforms, marketing, and staff training. Your team prepares the orders."
            )}
          </p>

          <div>
            <Button l={l}>
              {pick(
                l,
                "Unverbindlich anfragen",
                "Enquire without obligation"
              )}
            </Button>

            <a
              className="hero-secondary"
              href={url(l, "how-it-works")}
            >
              {pick(
                l,
                "So funktioniert die Partnerschaft",
                "How the partnership works"
              )}
            </a>
          </div>
        </div>

        <p
          className="hero-supporting-note"
          style={{
            maxWidth: "64ch",
            marginTop: "20px",
            fontSize: "0.875rem",
            lineHeight: 1.6,
          }}
        >
          {pick(
            l,
            "Die Zusammenarbeit wird auf deinen Standort und deine Küche abgestimmt. Zusätzliche Kosten, zum Beispiel für Zutaten, Verpackung oder erforderliche Ausstattung, werden vor dem Start besprochen.",
            "The partnership is tailored to your location and kitchen. Additional costs, such as ingredients, packaging, or required equipment, are discussed before launch."
          )}
        </p>
      </div>

      <div className="hero-food-stage" aria-hidden="true">
        <div className="food-orbit orbit-one" />
        <div className="food-orbit orbit-two" />
        <div className="food-spotlight" />

        <img
          className="hero-food-cutout"
          src={content.images.hero || assets.hero}
          alt=""
        />

        <div className="food-note">
          CRISPY.
          <br />
          BOLD.
          <br />
          <i>REBELS.</i>
        </div>

        <div className="rotating-label">
          <span>FOOD BRANDS · BERLIN ·</span>
          <b>UCV</b>
        </div>
      </div>

      <div className="hero-footline">
        <span>
          {pick(
            l,
            "DU KOCHST. WIR BEGLEITEN.",
            "YOU COOK. WE SUPPORT."
          )}
        </span>

        <a href="#brands">
          <span className="scroll-line" aria-hidden="true" />
          {pick(
            l,
            "WEITER ENTDECKEN",
            "KEEP EXPLORING"
          )}
        </a>

        <span>DE / EN</span>
      </div>
    </section>
  );
}
