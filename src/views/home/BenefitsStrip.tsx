"use client";
import { Lang } from '../../content/site';
import { useContent } from '../../content/ContentProvider';
export default function BenefitsStrip({ l }: {
    l: Lang;
}) { const { pick } = useContent(); const words = [pick(l, 'DEINE KÜCHE', 'YOUR KITCHEN'), pick(l, 'UNSERE MARKEN', 'OUR BRANDS'), pick(l, 'GEMEINSAM LOSLEGEN', 'LAUNCH TOGETHER')]; return <div className="food-marquee" aria-label={words.join(' · ')}><div className="marquee-track">{[0, 1, 2, 3].map((copy) => <div className="marquee-copy" aria-hidden="true" key={copy}>{words.map((word, i) => <span key={i}>{word}<b>✳</b></span>)}</div>)}</div></div>; }

