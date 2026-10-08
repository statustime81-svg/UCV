"use client";
import PageDetails from '../../components/PageDetails';
import FoodAccent from '../../components/FoodAccent';
import { useContent } from "../../content/ContentProvider";
import { Lang } from '../../content/site';
import { Cta } from '../../components/Ui';
import Steps from './Steps';
import Responsibilities from './Responsibilities';
import FaqSection from '../home/FaqSection';
export default function How({ l }: {
    l: Lang;
}) { const { pick, contact } = useContent(); return <><section className="page-intro" data-reveal><span className="eyebrow">{pick(l, 'DAS PARTNERSCHAFTSMODELL', 'THE PARTNERSHIP MODEL')}</span><h1>{pick(l, 'Bestehende Küche.\nNeue Möglichkeiten.', 'Existing kitchen.\nNew possibilities.')}</h1><p>{pick(l, 'Ein klarer Ablauf vom ersten Gespräch bis zum laufenden Liefergeschäft. Individuell auf deinen Betrieb abgestimmt.', 'A clear process from the first conversation to ongoing delivery operations. Tailored to your restaurant.')}</p><FoodAccent pizza={false}/></section><section className="section compact"><Steps l={l}/><FoodAccent pizza={false}/></section><Responsibilities l={l}/><FaqSection l={l}/><PageDetails l={l} page="how-it-works"/><Cta l={l}/></>; }

