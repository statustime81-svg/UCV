import { assets } from './assets';
import texts from './text-defaults.json';
import { faqs } from './site';
export type Translation = {
    de: string;
    en: string;
    group?: string;
};
export type Brand = {
    slug: string;
    name: string;
    categories: string[];
    image: string;
    logo: string;
    tag: string;
    de: string;
    en: string;
    theme: 'fry' | 'pizza';
    enabled: boolean;
};
export type Content = {
    texts: Record<string, Translation>;
    images: Record<string, string>;
    faqs: string[][];
    brands: Brand[];
    settings: {
        email: string;
        phone: string;
        whatsapp: string;
        locationDe: string;
        locationEn: string;
        legalName: string;
        legalAddress: string;
        legalRepresentative: string;
        legalRegister: string;
        legalVat: string;
        legalApproved: boolean;
    };
};
export const defaults: Content = { texts, images: { ucvLogo: assets.ucvLogo, hero: assets.hero, aboutLogo: assets.aboutLogo, kitchen: assets.kitchen }, faqs, brands: [{ slug: 'fry-rebels', name: 'Fry Rebels', categories: ['Chicken Burger', 'Fried Chicken', 'Wings', 'Tenders', 'Fries', 'Loaded Fries'], image: assets.fryFood, logo: assets.fryLogo, tag: 'CHICKEN & FRIES', de: 'Knusprig. Saftig. Voller Charakter.', en: 'Crispy. Juicy. Full of character.', theme: 'fry', enabled: true }, { slug: 'fresh-crust-pizza', name: 'Fresh Crust Pizza', categories: ['Pizza', 'Pasta'], image: assets.pizzaFood, logo: assets.pizzaLogo, tag: 'PIZZA & PASTA', de: 'Vertraute Favoriten. Frisch gedacht.', en: 'Familiar favourites. A fresh perspective.', theme: 'pizza', enabled: true }], settings: { email: 'partners@urbanculinaryventure.de', phone: '+49 152 19583294', whatsapp: 'https://wa.me/4915219583294', locationDe: 'Berlin, Deutschland', locationEn: 'Berlin, Germany', legalName: '', legalAddress: '', legalRepresentative: '', legalRegister: '', legalVat: '', legalApproved: false } };
export function safeAsset(s: unknown) { return typeof s === 'string' && s.length < 1000 && (/^\/assets\/[\w./-]+$/.test(s) || /^\/media\/[a-f0-9-]+\.(png|jpg|webp)$/.test(s)); }
export function validateContent(x: unknown): x is Content {
    if (!x || typeof x !== 'object')
        return false;
    const c = x as Content;
    if (!c.texts || typeof c.texts !== 'object' || Object.keys(c.texts).length > 500 || Object.values(c.texts).some(t => !t || typeof t.de !== 'string' || typeof t.en !== 'string' || t.de.length > 10000 || t.en.length > 10000))
        return false;
    if (!c.images || Object.values(c.images).some(v => !safeAsset(v)))
        return false;
    if (!Array.isArray(c.faqs) || c.faqs.length > 50 || c.faqs.some(f => !Array.isArray(f) || f.length !== 4 || f.some(t => typeof t !== 'string' || t.length > 5000)))
        return false;
    if (!Array.isArray(c.brands) || c.brands.length > 30 || c.brands.some(b => !b || !/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(b.slug) || ['en', 'admin', 'api', 'media', 'brands', 'about', 'partner', 'privacy', 'impressum', 'how-it-works', 'gallery'].includes(b.slug) || typeof b.name !== 'string' || b.name.length > 100 || !Array.isArray(b.categories) || b.categories.length > 30 || b.categories.some(v => typeof v !== 'string' || v.length > 100) || !safeAsset(b.image) || b.logo !== '' && !safeAsset(b.logo) || typeof b.tag !== 'string' || b.tag.length > 100 || typeof b.de !== 'string' || typeof b.en !== 'string' || b.de.length > 5000 || b.en.length > 5000 || !['fry', 'pizza'].includes(b.theme) || typeof b.enabled !== 'boolean'))
        return false;
    if (new Set(c.brands.map(b => b.slug)).size !== c.brands.length)
        return false;
    const s = c.settings;
    if (!s || !Object.entries(s).every(([k, v]) => k === 'legalApproved' ? typeof v === 'boolean' : typeof v === 'string' && v.length <= 5000))
        return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email) && /^https:\/\/wa.me\/[0-9]+$/.test(s.whatsapp) && typeof s.legalApproved === 'boolean' && (!s.legalApproved || Boolean(s.legalName?.trim() && s.legalAddress?.trim() && s.legalRepresentative?.trim()));
}

