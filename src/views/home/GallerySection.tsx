import FoodAccent from '../../components/FoodAccent';
import { Lang, url } from '../../content/site';
import GalleryGrid from '../gallery/GalleryGrid';
export default function GallerySection({ l }: {
    l: Lang;
}) { return <section className="section gallery-section"><div className="gallery-heading" data-reveal><div><span className="eyebrow">UCV / {l === 'de' ? 'GALERIE' : 'GALLERY'}</span><h2>{l === 'de' ? 'EIN BLICK.\nVIEL GESCHMACK.' : 'ONE LOOK.\nPLENTY OF FLAVOUR.'}</h2></div><a className="brand-pill" href={url(l, 'gallery')}>{l === 'de' ? 'Galerie ansehen' : 'View gallery'} +</a></div><GalleryGrid l={l} preview/><FoodAccent pizza={true}/></section>; }

