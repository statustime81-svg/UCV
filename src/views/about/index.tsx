"use client";
import PageDetails from '../../components/PageDetails';
import FoodAccent from '../../components/FoodAccent';
import { useContent } from "../../content/ContentProvider";
import { Lang } from '../../content/site';
import CompanySection from './CompanySection';
import { Cta } from '../../components/Ui';
export default function About({ l }: {
    l: Lang;
}) { const { pick, contact } = useContent(); return <><section className="page-intro" data-reveal><span className="eyebrow">{pick(l, 'ÜBER URBAN CULINARY VENTURE', 'ABOUT URBAN CULINARY VENTURE')}</span><h1>{pick(l, 'Food-Marken entwickeln.\nKüchen verbinden.', 'Develop food brands.\nConnect kitchens.')}</h1><p>{pick(l, 'In Berlin zu Hause. Gemeinsam mit Restaurantpartnern gedacht.', 'Based in Berlin. Built around restaurant partnerships.')}</p><FoodAccent pizza={false}/></section><CompanySection l={l}/><section className="section"><div className="values" data-reveal>{[['Zusammenarbeit', 'Collaboration', 'Klare Aufgaben und ein persönlicher Austausch.', 'Clear responsibilities and personal communication.'], ['Praxisnähe', 'Practicality', 'Menüs und Abläufe passend zum Küchenalltag.', 'Menus and workflows that fit daily kitchen operations.'], ['Markencharakter', 'Brand character', 'Eigenständige Konzepte mit einer klaren Identität.', 'Distinct concepts with a clear identity.']].map(([de, en, d, e]) => <article key={de}><h3>{pick(l, de, en)}</h3><p>{pick(l, d, e)}</p></article>)}</div><FoodAccent pizza={false}/></section><PageDetails l={l} page="about"/><Cta l={l}/></>; }

