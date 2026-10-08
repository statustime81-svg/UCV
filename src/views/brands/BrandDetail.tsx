"use client";
import PageDetails from '../../components/PageDetails';
import FoodAccent from '../../components/FoodAccent';
import { Lang } from '../../content/site';
import { useContent } from '../../content/ContentProvider';
import { Button, Cta } from '../../components/Ui';
export default function BrandDetail({ l, slug }: {
    l: Lang;
    slug: string;
}) {
    const { content, pick } = useContent();
    const brand = content.brands.find(b => b.slug === slug && b.enabled);
    if (!brand)
        return null;
    return <><section className={'brand-hero ' + (brand.theme === 'pizza' ? 'pizza-detail' : 'fry-detail')}><div data-reveal><span className="eyebrow">URBAN CULINARY VENTURE / {brand.tag}</span>{brand.logo && <img className="detail-logo" src={brand.logo} alt={brand.name + ' logo'}/>}<h1>{brand.name}</h1><h2>{l === 'de' ? brand.de : brand.en}</h2><p>{pick(l, 'Eine Food-Marke für bestehende Restaurantküchen. Dein Team kocht, UCV unterstützt den Markenauftritt und die Abläufe.', 'A food brand for existing restaurant kitchens. Your team cooks, UCV supports the brand and operations.')}</p><Button l={l}/></div><img src={brand.image} alt={brand.name + ' food presentation'} data-reveal/><FoodAccent pizza={false}/></section><section className="section" data-reveal><span className="eyebrow">{pick(l, 'DAS KONZEPT', 'THE CONCEPT')}</span><h2>{pick(l, 'Geschmack mit Vielfalt.', 'Flavour with variety.')}</h2><div className="categories">{brand.categories.map((x, i) => <article key={i} data-reveal style={{ '--delay': `${i * 50}ms` } as React.CSSProperties}><span>0{i + 1}</span><h3>{x}</h3></article>)}</div><p className="muted">{pick(l, 'Das konkrete Menü und die Produktzusammenstellung werden gemeinsam abgestimmt.', 'The specific menu and product selection are agreed together.')}</p><FoodAccent pizza={false}/></section>{(slug === "fry-rebels" || slug === "fresh-crust-pizza") && <PageDetails l={l} page={slug}/>}<Cta l={l}/></>;
}

