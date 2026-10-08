"use client";
import FoodAccent from '../../components/FoodAccent';
import { useContent } from "../../content/ContentProvider";
import { Lang } from '../../content/site';
export default function FoodCategories({ l }: {
    l: Lang;
}) { const { pick, contact } = useContent(); return <section className="section"><span className="eyebrow">{pick(l, 'DAS KONZEPT', 'THE CONCEPT')}</span><h2>{pick(l, 'Geschmack mit Vielfalt.', 'Flavour with variety.')}</h2><div className="categories">{['Chicken Burger', 'Fried Chicken', 'Wings', 'Tenders', 'Fries', 'Loaded Fries'].map((x: string, i: number) => <article key={x}><span>0{i + 1}</span><h3>{x}</h3></article>)}</div><p className="muted">{pick(l, 'Das konkrete Menü und die Produktzusammenstellung werden gemeinsam abgestimmt.', 'The specific menu and product selection are agreed together.')}</p><FoodAccent pizza={false}/></section>; }

