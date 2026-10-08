import { Lang } from '../../content/site';
import BrandDetail from '../brands/BrandDetail';
export default function BrandPage({ l }: {
    l: Lang;
}) { return <BrandDetail l={l} slug="fresh-crust-pizza"/>; }

