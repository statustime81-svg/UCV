"use client";
import FoodAccent from '../../components/FoodAccent';
import { Lang } from '../../content/site';
import { useContent } from '../../content/ContentProvider';
import { assets } from '../../content/assets';
export default function CompanySection({ l }: {
    l: Lang;
}) { const { pick, content } = useContent(); return <section className="company"><div className="company-visual" data-reveal><img src={content.images.kitchen || assets.kitchen} alt={pick(l, 'Dummy Konzeptvisualisierung einer Restaurantküche', 'Dummy restaurant kitchen concept visual')}/><span className="concept-caption">{pick(l, 'KONZEPTVISUALISIERUNG · KEIN BESTÄTIGTER STANDORT', 'CONCEPT VISUAL · NOT A CONFIRMED LOCATION')}</span><div className="company-brand"><img src={content.images.aboutLogo} alt="Urban Culinary Venture"/></div></div><div data-reveal><span className="eyebrow">{pick(l, 'UNSER ANSATZ', 'OUR APPROACH')}</span><h2>{pick(l, 'GUTE MARKEN.\nGUTE KÜCHEN.', 'GOOD BRANDS.\nGOOD KITCHENS.')}</h2><p>{pick(l, 'Urban Culinary Venture ist ein Berliner Food-Marken-Unternehmen. Wir verbinden delivery-orientierte Markenkonzepte mit bestehenden Restaurants und geeigneten Küchen.', 'Urban Culinary Venture is a Berlin-based food brand business. We connect delivery-focused brand concepts with existing restaurants and suitable kitchens.')}</p><p>{pick(l, 'Unser Fokus liegt auf einer praktischen Zusammenarbeit: UCV entwickelt und begleitet die Marke, unsere Restaurantpartner bereiten das Essen zu.', 'Our focus is practical collaboration: UCV develops and supports the brand, while our restaurant partners prepare the food.')}</p></div><FoodAccent pizza={true}/></section>; }

