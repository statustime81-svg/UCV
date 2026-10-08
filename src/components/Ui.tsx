"use client";
import { usePartner } from './PartnerProvider';
import EnquirySection from './EnquirySection';
import { useContent } from '../content/ContentProvider';
import { Lang, url } from '../content/site';
import { assets } from '../content/assets';
import { MessageCircle } from 'lucide-react';
export function Button({ l, children, secondary = false }: {
    l: Lang;
    children?: React.ReactNode;
    secondary?: boolean;
}) { const { pick } = useContent(); const openPartner = usePartner(); return <button type="button" onClick={openPartner} className={`button ${secondary ? 'secondary' : ''}`}><span>{children || pick(l, 'Partner werden', 'Become a Partner')}</span><span className="button-symbol" aria-hidden="true">+</span></button>; }
export function Heading({ label, title, text }: {
    label: string;
    title: string;
    text?: string;
}) { return <div className="section-heading"><span className="eyebrow">{label}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>; }
export function Cta({ l }: {
    l: Lang;
}) { const { pick, contact } = useContent(); return <><section className="cta editorial-cta"><div className="cta-meta"><span>URBAN CULINARY VENTURE</span><span>BERLIN · GERMANY</span></div><div className="cta-content" data-reveal><span className="eyebrow">{pick(l, 'LASS UNS GEMEINSAM STARTEN.', 'LET’S GET STARTED TOGETHER.')}</span><h2>{pick(l, 'DEINE KÜCHE.\nNEUES KAPITEL.', 'YOUR KITCHEN.\nA NEW CHAPTER.')}</h2><p>{pick(l, 'Lass uns herausfinden, welche Marke zu deinem Restaurant passt.', 'Let’s find out which brand fits your restaurant.')}</p><div className="cta-actions"><Button l={l}/><a className="whatsapp-link" href={contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/>{pick(l, 'Direkt sprechen', 'Let’s talk')}</a></div></div><img className="cta-pizza" data-scroll-spin src={assets.pizzaCutout} alt="" aria-hidden="true"/><div className="cta-bottom">{pick(l, 'GUTE MARKEN. GUTE KÜCHEN.', 'GOOD BRANDS. GOOD KITCHENS.')}</div></section><EnquirySection l={l}/></>; }

