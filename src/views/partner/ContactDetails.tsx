"use client";
import { useContent } from "../../content/ContentProvider";
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { Lang } from '../../content/site';
export default function ContactDetails({ l }: {
    l: Lang;
}) { const { pick, contact, content } = useContent(); return <aside className="contact-details" data-reveal><span className="eyebrow">{pick(l, 'DIREKT IM AUSTAUSCH', 'LET’S CONNECT')}</span><h2>{pick(l, 'Eine gute Partnerschaft\nbeginnt mit einem Gespräch.', 'A good partnership\nstarts with a conversation.')}</h2><p>{pick(l, 'Du hast eine geeignete Restaurantküche? Lass uns gemeinsam über die Möglichkeiten sprechen.', 'Have a suitable restaurant kitchen? Let’s explore the possibilities together.')}</p><a href={'mailto:' + contact.email}><Mail /><div><small>E-MAIL</small>{contact.email}</div></a><a href={contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /><div><small>WHATSAPP</small>{contact.phone}</div></a><div className="contact-row"><MapPin /><div><small>{pick(l, 'STANDORT', 'LOCATION')}</small>{l === 'de' ? content.settings.locationDe : content.settings.locationEn}</div></div></aside>; }

