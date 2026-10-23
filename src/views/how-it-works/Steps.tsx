"use client";

import type { CSSProperties } from "react";
import { steps } from "../../content/site";
import type { Lang } from "../../content/site";
import { useContent } from "../../content/ContentProvider";
import {
  MessagesSquare,
  UtensilsCrossed,
  ClipboardCheck,
  ChefHat,
} from "lucide-react";

const icons = [
  MessagesSquare,
  UtensilsCrossed,
  ClipboardCheck,
  ChefHat,
];

const stepImages = [
  "/assets/placeholders/restaurant-vorstellen.webp",
  "/assets/placeholders/find-right-fit.webp",
  "/assets/placeholders/prepare-to-launch.webp",
  "/assets/placeholders/launch-together.webp",
];

export default function Steps({ l }: { l: Lang }) {
  const { pick } = useContent();

  return (
    <div className="steps">
      {steps.map(([titleDe, titleEn, textDe, textEn], index) => {
        const Icon = icons[index] ?? ClipboardCheck;
        const image = stepImages[index];

        return (
          <article
            tabIndex={0}
            key={titleDe}
            data-reveal
            style={
              {
                "--delay": `${index * 75}ms`,
              } as CSSProperties
            }
          >
            {image && (
              <img
                className="step-image"
                src={image}
                alt=""
                loading="lazy"
                decoding="async"
              />
            )}

            <div className="step-content">
              <div className="step-top">
                <span className="step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Icon
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </div>

              <h3>{pick(l, titleDe, titleEn)}</h3>

              <p>{pick(l, textDe, textEn)}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
