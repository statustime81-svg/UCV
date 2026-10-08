"use client";

import FoodAccent from "../../components/FoodAccent";
import { Lang, support } from "../../content/site";
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
  "/assets/placeholders/our-support/brand-menu.png",
  "/assets/placeholders/our-support/delivery-platforms.png",
  "/assets/placeholders/our-support/team-training.png",
  "/assets/placeholders/our-support/marketing.png",
  "/assets/placeholders/our-support/packaging.png",
  "/assets/placeholders/our-support/personal-support.png",
];

export default function SupportSection({ l }: { l: Lang }) {
  const { pick, content } = useContent();

  return (
    <section className="section support">
      <div className="section-number">
        03 / {pick(l, "UNSER SUPPORT", "OUR SUPPORT")}
      </div>

      <div className="support-intro" data-reveal>
        <Heading
          label={pick(l, "WAS WIR MITBRINGEN", "WHAT WE BRING")}
          title={pick(
            l,
            "DU MACHST DAS ESSEN.\nWIR MACHEN GEMEINSAM WEITER.",
            "YOU MAKE THE FOOD.\nWE MOVE FORWARD TOGETHER."
          )}
          text={pick(
            l,
            "Von der ersten Menüidee bis zur laufenden Abstimmung: Unterstützung für den Alltag deiner Küche.",
            "From the first menu idea to ongoing conversations: support for your everyday kitchen operations."
          )}
        />

        <div className="support-food-image">
          <img
            src={content.brands[0]?.image}
            alt={pick(l, "Food-Marken Konzept", "Food brand concept")}
          />
          <span>BRAND / MENU / SUPPORT</span>
        </div>
      </div>

      <div className="support-grid">
        {support.map(([de, en, d, e], i) => {
          const Icon = icons[i];

          return (
            <article
              key={de}
              data-reveal
              style={{ "--delay": `${(i % 3) * 65}ms` } as React.CSSProperties}
            >
              <img
                className="support-bg"
                src={supportImages[i]}
                alt=""
                loading="lazy"
              />

              <div className="support-card-content">
                <div className="support-icon">
                  <Icon size={31} strokeWidth={1.5} />
                  <span>0{i + 1}</span>
                </div>

                <h3>{pick(l, de, en)}</h3>
                <p>{pick(l, d, e)}</p>
              </div>
            </article>
          );
        })}
      </div>

      <FoodAccent pizza={false} />
    </section>
  );
}