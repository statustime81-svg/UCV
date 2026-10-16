"use client";

import FoodAccent from "../../components/FoodAccent";
import { useContent } from "../../content/ContentProvider";
import { assets } from "../../content/assets";
import { faqs } from "../../content/site";
import type { Lang } from "../../content/site";
import { Heading } from "../../components/Ui";

export default function FaqSection({ l }: { l: Lang }) {
  const { pick } = useContent();

  return (
    <section className="section faq-section" data-reveal>
      <div className="faq-copy">
        <Heading
          label={pick(
            l,
            "GUT ZU WISSEN",
            "GOOD TO KNOW"
          )}
          title={pick(
            l,
            "Deine Fragen.\nUnsere Antworten.",
            "Your questions.\nOur answers."
          )}
          text={pick(
            l,
            "Jede Küche ist anders. Die Details stimmen wir persönlich mit dir ab.",
            "Every kitchen is different. We agree the details with you personally."
          )}
        />

        <div className="faqs">
          {faqs.map(([questionDe, questionEn, answerDe, answerEn]) => (
            <details key={questionDe}>
              <summary>
                {l === "de" ? questionDe : questionEn}
                <span aria-hidden="true">+</span>
              </summary>

              <p>{l === "de" ? answerDe : answerEn}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="faq-visual" aria-hidden="true">
        <span className="faq-stamp">
          {pick(l, "GUTES ESSEN.", "GOOD FOOD.")}
          <br />
          {pick(l, "GUTE FRAGEN.", "GOOD QUESTIONS.")}
        </span>

        <img
          src={assets.faqFood}
          alt=""
          loading="lazy"
          decoding="async"
        />

        <img
          className="faq-pizza"
          src={assets.pizzaCutout}
          alt=""
          loading="lazy"
          decoding="async"
          data-scroll-spin
        />
      </div>

      <FoodAccent pizza={false} />
    </section>
  );
}
