"use client";
import { useContent } from "../content/ContentProvider";
import { Lang, url } from '../content/site';
export default function Footer({ l }: {
    l: Lang;
}) {
    const { pick, contact, content } = useContent();
    const legalHref = l === 'en' ? '/en/impressum' : '/impressum';
    const privacyHref = l === 'en' ? '/en/privacy' : '/privacy';
    return <footer>
        <div className="footer-top" data-reveal>
            <div><a className="footer-logo" href={url(l)}><img src={content.images.ucvLogo} alt="Urban Culinary Venture"/></a><p>{pick(l, 'Food-Marken entwickeln.\nRestaurantküchen verbinden.', 'Develop food brands.\nConnect restaurant kitchens.')}</p></div>
            <div><span className="eyebrow">{pick(l, 'ENTDECKEN', 'EXPLORE')}</span>{[['brands', 'Unsere Marken', 'Our Brands'], ['how-it-works', 'So funktioniert’s', 'How It Works'], ['about', 'Über UCV', 'About UCV'], ['gallery', 'Galerie', 'Gallery'], ['partner', 'Kontakt', 'Contact']].map(([p, de, en]) => <a key={p} href={url(l, p)}>{pick(l, de, en)}</a>)}</div>
            <div><span className="eyebrow">{pick(l, 'KONTAKT', 'CONTACT')}</span><a href={'mailto:' + contact.email}>{contact.email}</a><a href={contact.whatsapp} target="_blank" rel="noreferrer">{contact.phone}</a><p>{l === 'de' ? content.settings.locationDe : content.settings.locationEn}</p></div>
        </div>
        <div className="footer-bottom"><span>© Urban Culinary Venture</span><div><a href={legalHref}>{pick(l, 'Impressum', 'Imprint')}</a><a href={privacyHref}>{pick(l, 'Datenschutz', 'Privacy Policy')}</a></div></div>
    </footer>;
}
