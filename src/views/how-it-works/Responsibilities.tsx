"use client";
import FoodAccent from '../../components/FoodAccent';
import { useContent } from "../../content/ContentProvider";
import { Lang } from '../../content/site';
export default function Responsibilities({ l }: {
    l: Lang;
}) { const { pick, contact } = useContent(); return <section className="responsibilities"><article data-reveal><span className="eyebrow">UCV</span><h2>{pick(l, 'Wir entwickeln die Marke.', 'We develop the brand.')}</h2><p>{pick(l, 'Menüs und Preisgestaltung, Plattform-Onboarding, Marketing, Verpackungsberatung, Training und laufende Begleitung.', 'Menus and pricing, platform onboarding, marketing, packaging guidance, training and ongoing support.')}</p></article><article data-reveal><span className="eyebrow">{pick(l, 'DEIN RESTAURANT', 'YOUR RESTAURANT')}</span><h2>{pick(l, 'Dein Team kocht.', 'Your team cooks.')}</h2><p>{pick(l, 'Du bringst deine geeignete Küche, dein Team und Erfahrung im Restaurantalltag ein. Die konkreten Abläufe stimmen wir gemeinsam ab.', 'You bring your suitable kitchen, team and restaurant experience. We agree the specific workflows together.')}</p></article><FoodAccent pizza={false}/></section>; }

