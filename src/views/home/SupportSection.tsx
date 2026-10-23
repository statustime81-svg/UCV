"use client";

import type { CSSProperties } from "react";
import FoodAccent from "../../components/FoodAccent";
import { support } from "../../content/site";
import type { Lang } from "../../content/site";
import { assets } from "../../content/assets";
import { useContent } from "../../content/ContentProvider";
import { Heading } from "../../components/Ui";
import {
  UtensilsCrossed,
  MonitorSmartphone,
  ChefHat,
  Megaphone,
  Package,
  MessagesSquare,
} from "lucide-react";

const icons = [
  UtensilsCrossed,
  MonitorSmartphone,
  ChefHat,
  Megaphone,
  Package,
  MessagesSquare,
];

const supportImages = [
  "/assets/placeholders/our-support/brand-menu.webp",
  "/assets/placeholders/our-support/delivery-platforms.webp",
  "/assets/placeholders/our-support/team-training.webp",
  "/assets/placeholders/our-support/marketing.webp",
  "/assets/placeholders/our-support/packaging.webp",
  "/assets/placeholders/our-support/personal-support.webp",
];

export default function SupportSection({ l }: { l: Lang }) {
  const { pick, content } = useContent();

  const supportFoodImage =
    content.brands.find(
      (brand) => brand.enabled && brand.slug === "fry-rebels"
    )?.image || assets.fryFood;

  return (
    <section className="section support">
      <div className="section-number">
        03 / {pick(l, "UNSER SUPPORT", "OUR SUPPORT")}
      </div>

      <div className="support-intro" data-reveal>
        <Heading
          label={pick(
            l,
            "WAS WIR MITBRINGEN",
            "WHAT WE BRING"
          )}
          title={pick(
            l,
            "DU BEREITEST ZU.\nWIR UNTERSTÜTZEN DEIN LIEFERGESCHÄFT.",
            "YOU PREPARE THE FOOD.\nWE SUPPORT YOUR DELIVERY BUSINESS."
          )}
          text={pick(
            l,
            "UCV unterstützt dich bei Menü, Preisgestaltung, Lieferplattformen, Marketing und Mitarbeiterschulung. Dein Team bereitet die Bestellungen zu. Den konkreten Leistungsumfang stimmen wir vor dem Start gemeinsam ab.",
            "UCV supports you with menus, pricing, delivery platforms, marketing, and staff training. Your team prepares the orders. The specific support scope is agreed together before launch."
          )}
        />

        <div className="support-food-image">
          <img
            src={supportFoodImage}
            alt={pick(
              l,
              "Fry Rebels – Food-Konzept",
              "Fry Rebels – food concept"
            )}
            loading="lazy"
            decoding="async"
          />

          <span>
            {pick(
              l,
              "MARKE / MENÜ / SUPPORT",
              "BRAND / MENU / SUPPORT"
            )}
          </span>
        </div>
      </div>

      <div className="support-grid">
        {support.map(
          ([titleDe, titleEn, textDe, textEn], index) => {
            const Icon = icons[index] ?? MessagesSquare;
            const image = supportImages[index];

            return (
              <article
                key={titleDe}
                data-reveal
                style={
                  {
                    "--delay": `${(index % 3) * 65}ms`,
                  } as CSSProperties
                }
              >
                {image && (
                  <img
                    className="support-bg"
                    src={image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                )}

                <div className="support-card-content">
                  <div className="support-icon">
                    <Icon
                      size={31}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />

                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3>{pick(l, titleDe, titleEn)}</h3>

                  <p>{pick(l, textDe, textEn)}</p>
                </div>
              </article>
            );
          }
        )}
      </div>

      <FoodAccent pizza={false} />
    </section>
  );
}
