import PartnerProvider from '../../src/components/PartnerProvider';
import FloatingControls from '../../src/components/FloatingControls';
import SiteMotion from '../../src/components/SiteMotion';
import { ContentProvider } from '../../src/content/ContentProvider';
import { publicContent } from '../../lib/cms-db';
import BrandDetail from '../../src/views/brands/BrandDetail';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import Gallery from '../../src/views/gallery';
import Home from '../../src/views/home';
import Brands from '../../src/views/brands';
import Fry from '../../src/views/fry-rebels';
import Pizza from '../../src/views/fresh-crust-pizza';
import How from '../../src/views/how-it-works';
import About from '../../src/views/about';
import Partner from '../../src/views/partner';
import Impressum from '../../src/views/impressum';
import Privacy from '../../src/views/privacy';
import { notFound } from 'next/navigation';
import { Lang, pick } from '../../src/content/site';
const pages: Record<string, React.ComponentType<{
    l: Lang;
}>> = { gallery: Gallery, '': Home, brands: Brands, 'fry-rebels': Fry, 'fresh-crust-pizza': Pizza, 'how-it-works': How, about: About, partner: Partner, impressum: Impressum, privacy: Privacy };
export async function generateMetadata({ params }: {
    params: Promise<{
        slug?: string[];
    }>;
}) { const { slug = [] } = await params; const en = slug[0] === 'en'; const path = (en ? slug.slice(1) : slug).join('/'); const names: Record<string, string[]> = { gallery: ['Galerie', 'Gallery'], '': ['Neue Food-Marken für deine Küche', 'New food brands for your kitchen'], brands: ['Unsere Marken', 'Our Brands'], 'fry-rebels': ['Fry Rebels', 'Fry Rebels'], 'fresh-crust-pizza': ['Fresh Crust Pizza', 'Fresh Crust Pizza'], 'how-it-works': ['So funktioniert’s', 'How It Works'], about: ['Über UCV', 'About UCV'], partner: ['Partner werden', 'Become a Partner'], impressum: ['Impressum', 'Imprint'], privacy: ['Datenschutz', 'Privacy Policy'] }; const content = await publicContent(); const brand = content.brands.find(b => b.slug === path && b.enabled); return { title: (brand?.name || names[path]?.[en ? 1 : 0] || 'UCV') + ' | Urban Culinary Venture', description: en ? 'Delivery-focused food brands for existing restaurant kitchens. Based in Berlin.' : 'Delivery-orientierte Food-Marken für bestehende Restaurantküchen. Aus Berlin.' }; }
export const dynamic = 'force-dynamic';
export default async function Page({ params }: {
    params: Promise<{
        slug?: string[];
    }>;
}) {
    const { slug = [] } = await params;
    const l: Lang = slug[0] === 'en' ? 'en' : 'de';
    const path = (l === 'en' ? slug.slice(1) : slug).join('/');
    const content = await publicContent();
    const Component = pages[path];
    const isBrand = content.brands.some(b => b.slug === path && b.enabled);
    if (!Component && !isBrand)
        notFound();
    if (['fry-rebels', 'fresh-crust-pizza'].includes(path) && !isBrand)
        notFound();
    return <ContentProvider content={content}><PartnerProvider l={l}><SiteMotion /><FloatingControls l={l}/><a className="skip" href="#main">{pick(l, 'Zum Inhalt', 'Skip to content')}</a><div className="site"><Header l={l} path={path}/><main id="main">{isBrand ? <BrandDetail l={l} slug={path}/> : <Component l={l}/>}</main><Footer l={l}/></div></PartnerProvider></ContentProvider>;
}

