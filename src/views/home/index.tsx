import { Lang } from '../../content/site';
import GallerySection from './GallerySection';
import Hero from './Hero';
import BenefitsStrip from './BenefitsStrip';
import BrandsSection from './BrandsSection';
import ProcessSection from './ProcessSection';
import SupportSection from './SupportSection';
import FaqSection from './FaqSection';
import { Cta } from '../../components/Ui';
export default function Home({ l }: {
    l: Lang;
}) { return <><Hero l={l}/><BenefitsStrip l={l}/><BrandsSection l={l}/><ProcessSection l={l}/><SupportSection l={l}/><FaqSection l={l}/><GallerySection l={l}/><Cta l={l}/></>; }

