"use client";
import PageDetails from '../../components/PageDetails';
import FoodAccent from '../../components/FoodAccent';
import { useContent } from "../../content/ContentProvider";
import { Lang } from '../../content/site';
import BrandCards from './BrandCards';
import { Cta } from '../../components/Ui';
export default function Brands({ l }: {
    l: Lang;
}) { const { pick, contact } = useContent(); return <><section className="page-intro" data-reveal><span className="eyebrow">{pick(l, 'DIE UCV MARKENWELT', 'THE UCV BRAND FAMILY')}</span><h1>{pick(l, 'Eigener Charakter.\nGemeinsame Küche.', 'Distinct character.\nA shared kitchen.')}</h1><p>{pick(l, 'Zwei eigenständige Food-Marken für den Lieferbetrieb. Gemeinsam prüfen wir, welches Konzept zu deinem Restaurant passt.', 'Two distinct food brands designed for delivery. Together, we explore which concept fits your restaurant.')}</p><FoodAccent pizza={true}/></section><section className="section compact"><BrandCards l={l}/><FoodAccent pizza={true}/></section><PageDetails l={l} page="brands"/><Cta l={l}/></>; }

