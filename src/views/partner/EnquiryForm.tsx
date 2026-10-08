"use client";
import { useContent } from "../../content/ContentProvider";
import Link from 'next/link';
import { useState, useRef } from 'react';
import { Lang, url } from '../../content/site';
export default function EnquiryForm({ l }: {
    l: Lang;
}) {
    const { pick, contact, content } = useContent();
    const [status, setStatus] = useState('');
    const [busy, setBusy] = useState(false);
    const started = useRef(Date.now());
    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setBusy(true);
        setStatus('');
        const form = e.currentTarget;
        const fields = Object.fromEntries(new FormData(form));
        try {
            const res = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...fields, lang: l, started: started.current }) });
            if (!res.ok) {
                const data = await res.json() as {
                    message?: string;
                };
                throw new Error(res.status === 429 ? "rate" : res.status === 400 ? "validation" : data.message || "error");
            }
            const result = await res.json() as {
                emailSent: boolean;
            };
            setStatus(result.emailSent ? 'success' : 'received');
            form.reset();
            started.current = Date.now();
        }
        catch (error) {
            setStatus(error instanceof Error && error.message === "rate" ? "rate" : error instanceof Error && error.message === "validation" ? "validation" : "error");
        }
        finally {
            setBusy(false);
        }
    }
    return <form onSubmit={submit} className="enquiry-form"><h2>{pick(l, 'Dein Restaurant kennenlernen.', 'Let’s meet your restaurant.')}</h2><p>{pick(l, 'Erzähl uns ein wenig über deine Küche.', 'Tell us a little about your kitchen.')}</p><div className="form-grid">{[['name', 'Name', 'Name', 'text'], ['restaurant', 'Restaurantname', 'Restaurant name', 'text'], ['email', 'E-Mail', 'Email', 'email'], ['phone', 'Telefon (optional)', 'Phone (optional)', 'tel'], ['city', 'Stadt / Standort', 'City / location', 'text']].map(([name, de, en, type]) => <label key={name}>{pick(l, de, en)}<input name={name} type={type} required={name !== 'phone'} maxLength={160} autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : name === 'phone' ? 'tel' : 'off'}/></label>)}<label>{pick(l, 'Interesse an', 'Interested in')}<select name="brand"><option value="both">{pick(l, 'Beide Marken / Beratung', 'Both brands / advice')}</option>{content.brands.filter(b => b.enabled).map(b => <option key={b.slug}>{b.name}</option>)}</select></label></div><label>{pick(l, 'Deine Nachricht', 'Your message')}<textarea name="message" rows={4} required maxLength={3000}/></label><div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div><label className="consent"><input type="checkbox" name="consent" required/><span>{pick(l, 'Ich habe die Datenschutzhinweise gelesen. Meine Angaben dürfen zur Bearbeitung meiner Anfrage verwendet werden.', 'I have read the privacy information. My details may be used to respond to my enquiry.')} <Link href={url(l, 'privacy')}>{pick(l, 'Datenschutz', 'Privacy information')}</Link></span></label><button className="button" disabled={busy}>{busy ? pick(l, 'Wird gesendet…', 'Sending…') : pick(l, 'Partneranfrage senden', 'Send partnership enquiry')}</button>{status && <div role="status" className={'form-status ' + status}>{status === 'rate' ? pick(l, 'Zu viele Anfragen. Bitte versuche es später oder kontaktiere uns direkt.', 'Too many enquiries. Please try later or contact us directly.') : status === 'validation' ? pick(l, 'Bitte prüfe deine Angaben und warte kurz, bevor du erneut sendest.', 'Please check your details and wait briefly before submitting again.') : status === 'received' ? pick(l, 'Vielen Dank! Deine Anfrage wurde gespeichert. Unser Team wird sie prüfen.', 'Thank you! Your enquiry has been received and saved. Our team will review it.') : status === 'success' ? pick(l, 'Vielen Dank! Deine Anfrage wurde erfolgreich gesendet.', 'Thank you! Your enquiry was successfully submitted.') : pick(l, 'Deine Anfrage konnte nicht gesendet werden. Bitte kontaktiere uns per E-Mail oder WhatsApp.', 'Your enquiry could not be sent. Please contact us by email or WhatsApp.')}</div>}</form>;
}

