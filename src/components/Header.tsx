"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useContent } from '../content/ContentProvider';
import { Lang, url } from '../content/site';
import { Button } from './Ui';
export default function Header({ l, path }: {
    l: Lang;
    path: string;
}) {
    const { pick, content } = useContent();
    const [open, setOpen] = useState(false);
    const toggle = useRef<HTMLButtonElement>(null);
    useEffect(() => { document.documentElement.lang = l; }, [l]);
    useEffect(() => {
        const close = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                toggle.current?.focus();
            }
        };
        const resize = () => {
            if (innerWidth > 1100)
                setOpen(false);
        };
        window.addEventListener('keydown', close);
        window.addEventListener('resize', resize);
        return () => { window.removeEventListener('keydown', close); window.removeEventListener('resize', resize); };
    }, []);
    return <header className={'ucv-header' + (open ? ' menu-is-open' : '')}>
  <Link className="logo" href={url(l)} aria-label="Urban Culinary Venture"><img src={content.images.ucvLogo} alt="Urban Culinary Venture"/></Link>
  <button ref={toggle} className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="ucv-navigation" aria-label={pick(l, open ? 'Menü schließen' : 'Menü öffnen', open ? 'Close menu' : 'Open menu')}>{open ? <X size={23}/> : <Menu size={23}/>}</button>
  <nav id="ucv-navigation" className={open ? 'open' : ''} aria-label={pick(l, 'Hauptnavigation', 'Main navigation')}>
   <div className="nav-links">{[['brands', 'Unsere Marken', 'Our Brands'], ['how-it-works', 'So funktioniert’s', 'How It Works'], ['about', 'Über UCV', 'About UCV'], ['gallery', 'Galerie', 'Gallery']].map(([p, de, en]) => <Link key={p} aria-current={path === p ? 'page' : undefined} href={url(l, p)} onClick={() => setOpen(false)}>{pick(l, de, en)}</Link>)}</div>
   <div className="nav-actions"><div className="language" aria-label={pick(l, 'Sprache', 'Language')}><Link lang="de" aria-label="Deutsch" className={l === 'de' ? 'selected' : ''} href={url('de', path)}>DE</Link><Link lang="en" aria-label="English" className={l === 'en' ? 'selected' : ''} href={url('en', path)}>EN</Link></div><Button l={l}/></div>
  </nav>
 </header>;
}

