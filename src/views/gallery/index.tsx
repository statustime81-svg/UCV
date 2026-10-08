import PageDetails from '../../components/PageDetails';
import FoodAccent from '../../components/FoodAccent';
import { Lang } from '../../content/site';
import GalleryGrid from './GalleryGrid';
import { Cta } from '../../components/Ui';
export default function Gallery({ l }: {
    l: Lang;
}) { return <><section className="section gallery-page"><span className="eyebrow" data-reveal>UCV / {l === 'de' ? 'GALERIE' : 'GALLERY'}</span><h1 data-reveal>{l === 'de' ? 'GUTER GESCHMACK.\nIN BILDERN.' : 'GOOD TASTE.\nIN PICTURES.'}</h1><p data-reveal>{l === 'de' ? 'Ein erster Blick in unsere Markenwelt. Bildunterschriften unterscheiden freigegebene Aufnahmen von vorläufigen Food- und Designkonzepten.' : 'A first look into our brand world. Captions distinguish approved photographs from temporary food and design concepts.'}</p><GalleryGrid l={l}/><FoodAccent pizza={true}/></section><PageDetails l={l} page="gallery"/><Cta l={l}/></>; }

