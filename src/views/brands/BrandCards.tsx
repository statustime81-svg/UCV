"use client";
import { Lang, url } from '../../content/site';
import { useContent } from '../../content/ContentProvider';
import Link from 'next/link';
export default function BrandCards({ l }: {
    l: Lang;
}) { const { content, pick } = useContent(); return <div className="brand-grid editorial-brands">{content.brands.filter(b => b.enabled).map((b, i) => <article className={'brand-panel ' + b.theme} key={b.slug} data-reveal><Link href={url(l, b.slug)} className="brand-panel-link" data-cursor={pick(l, 'ENTDECKEN', 'EXPLORE')}><div className="brand-panel-header"><span>0{i + 1} / {b.tag}</span><span>UCV FOOD BRANDS</span></div><h3 className="brand-display">{b.name}</h3><div className="brand-photo"><img src={b.image} alt={b.name + ' food presentation'}/><span className="photo-tag">{b.tag}</span>{b.logo && <div className="brand-logo-badge"><img src={b.logo} alt={b.name + ' logo'}/></div>}</div><div className="brand-copy"><p>{l === 'de' ? b.de : b.en}</p><span className="brand-pill">{pick(l, 'Marke entdecken', 'Explore brand')}<span>+</span></span></div></Link></article>)}</div>; }

