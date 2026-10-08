"use client";
import FoodAccent from '../../components/FoodAccent';
import { Lang, url } from '../../content/site';
import Link from 'next/link';
import { useContent } from '../../content/ContentProvider';
import { Heading } from '../../components/Ui';
import Steps from '../how-it-works/Steps';
export default function ProcessSection({ l }: {
    l: Lang;
}) { const { pick } = useContent(); return <section className="section process"><div className="section-number">02 / {pick(l, 'DIE PARTNERSCHAFT', 'THE PARTNERSHIP')}</div><div className="process-heading" data-reveal><Heading label={pick(l, 'EIN KLARER ABLAUF', 'A CLEAR PROCESS')} title={pick(l, 'DEINE KÜCHE.\nUNSER GEMEINSAMER START.', 'YOUR KITCHEN.\nOUR SHARED START.')} text={pick(l, 'Wir ergänzen dein bestehendes Restaurant. Mit klaren Aufgaben, passenden Menüs und Unterstützung im Liefergeschäft.', 'We complement your existing restaurant. With clear responsibilities, suitable menus and delivery support.')}/><div className="process-token" aria-hidden="true">UCV<br /><span>×</span><br />{pick(l, 'DEINE KÜCHE', 'YOUR KITCHEN')}</div></div><Steps l={l}/><Link className="text-link" href={url(l, 'how-it-works')}>{pick(l, 'So funktioniert die Partnerschaft', 'How the partnership works')}</Link><FoodAccent pizza={true}/></section>; }

