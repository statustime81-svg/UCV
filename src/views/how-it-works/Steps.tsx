"use client";

import { Lang, steps } from "../../content/site";
import { useContent } from "../../content/ContentProvider";
import {
  MessagesSquare,
  UtensilsCrossed,
  ClipboardCheck,
  ChefHat,
} from "lucide-react";

const icons = [MessagesSquare, UtensilsCrossed, ClipboardCheck, ChefHat];

const stepImages = [
  "/assets/placeholders/restaurant-vorstellen.png",
  "/assets/placeholders/find-right-fit.png",
  "/assets/placeholders/prepare-to-launch.png",
  "/assets/placeholders/launch-together.png",
];

export default function Steps({ l }: { l: Lang }) {
  const { pick } = useContent();

  return (
    <div className="steps">
      {steps.map(([de, en, d, e], i) => {
        const Icon = icons[i];

        return (
          <article
            tabIndex={0}
            key={de}
            data-reveal
            style={{ "--delay": `${i * 75}ms` } as React.CSSProperties}
          >
            <img
              className="step-image"
              src={stepImages[i]}
              alt={pick(l, de, en)}
              loading="lazy"
            />

            <div className="step-content">
              <div className="step-top">
                <span className="step-number">0{i + 1}</span>
                <Icon strokeWidth={1.4} />
              </div>
              <h3>{pick(l, de, en)}</h3>
              <p>{pick(l, d, e)}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}