"use client";
import FoodAccent from '../../components/FoodAccent';
import { useContent } from "../../content/ContentProvider";
import { Lang } from '../../content/site';
import EnquiryForm from './EnquiryForm';
import ContactDetails from './ContactDetails';
export default function Partner({ l }: {
    l: Lang;
}) { const { pick, contact } = useContent(); return <><section className="page-intro" data-reveal><span className="eyebrow">{pick(l, 'PARTNER WERDEN', 'BECOME A PARTNER')}</span><h1>{pick(l, 'Neue Marke.\nDeine Küche.', 'New brand.\nYour kitchen.')}</h1><p>{pick(l, 'Der erste Schritt ist ein unverbindlicher Austausch.', 'The first step is a no-obligation conversation.')}</p><FoodAccent pizza={false}/></section><section className="contact-layout"><ContactDetails l={l}/><EnquiryForm l={l}/><FoodAccent pizza={false}/></section></>; }

