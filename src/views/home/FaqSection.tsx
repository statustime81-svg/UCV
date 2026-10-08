"use client";
import FoodAccent from '../../components/FoodAccent';
import { useContent } from "../../content/ContentProvider";
import { assets } from '../../content/assets';
import { Lang } from '../../content/site';
import { Heading } from '../../components/Ui';
export default function FaqSection({ l }: {
    l: Lang;
}) { const { pick, content } = useContent(); const faqs = content.faqs; return <section className="section faq-section" data-reveal><div className="faq-copy"><Heading label={pick(l, 'GUT ZU WISSEN', 'GOOD TO KNOW')} title={pick(l, 'Deine Fragen.\nUnsere Antworten.', 'Your questions.\nOur answers.')} text={pick(l, 'Jede Küche ist anders. Die Details stimmen wir persönlich mit dir ab.', 'Every kitchen is different. We agree the details with you personally.')}/><div className="faqs">{faqs.map(([de, en, d, e]) => <details key={de}><summary>{l === 'de' ? de : en}<span>+</span></summary><p>{l === 'de' ? d : e}</p></details>)}</div></div><div className="faq-visual"><span className="faq-stamp">{l === 'de' ? 'GUTES ESSEN.' : 'GOOD FOOD.'}<br />{l === 'de' ? 'GUTE FRAGEN.' : 'GOOD QUESTIONS.'}</span><img src={assets.faqFood} alt="" loading="lazy"/><img className="faq-pizza" src={assets.pizzaCutout} alt="" data-scroll-spin/></div><FoodAccent pizza={false}/></section>; }

