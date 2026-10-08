"use client";
import FoodAccent from '../../components/FoodAccent';
import { Lang } from '../../content/site';
import { useContent } from '../../content/ContentProvider';
import { Heading } from '../../components/Ui';
import BrandCards from '../brands/BrandCards';
export default function BrandsSection({ l }: {
    l: Lang;
}) { const { pick } = useContent(); return <section className="section brand-section" id="brands"><div className="section-number">01 / {pick(l, 'DIE MARKEN', 'THE BRANDS')}</div><div data-reveal><Heading label={pick(l, 'EIGENER CHARAKTER. EIGENER GESCHMACK.', 'DISTINCT CHARACTER. DISTINCT FLAVOUR.')} title={pick(l, 'ZWEI MARKEN.\nKEIN EINHEITSBREI.', 'TWO BRANDS.\nNO SAME OLD TASTE.')} text={pick(l, 'Crispy Chicken oder Pizza und Pasta: zwei eigenständige Konzepte für deine bestehende Restaurantküche.', 'Crispy chicken or pizza and pasta: two distinct concepts for your existing restaurant kitchen.')}/></div><BrandCards l={l}/><FoodAccent pizza={true}/></section>; }

