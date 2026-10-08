"use client";
import { useState } from 'react';
import { Content, defaults, Brand } from '../content/cms';
type Enquiry = {
    id: string;
    created_at: number;
    email_status: string;
    data: Record<string, string>;
};
export default function Editor({ initial, initialRevision }: {
    initial: Content;
    initialRevision: number;
}) {
    const [content, setContent] = useState<Content>(initial), [revision, setRevision] = useState(initialRevision), [tab, setTab] = useState('Text'), [group, setGroup] = useState('All'), [search, setSearch] = useState(''), [message, setMessage] = useState(''), [busy, setBusy] = useState(false), [dirty, setDirty] = useState(false), [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    function update(next: Content) { setContent(next); setDirty(true); setMessage(''); }
    function setting(key: string, value: string | boolean) { update({ ...content, settings: { ...content.settings, [key]: value } }); }
    async function save() {
        setBusy(true);
        setMessage('');
        try {
            const res = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content, revision }) });
            const data = await res.json() as {
                error?: string;
                revision: number;
                url: string;
                enquiries: Enquiry[];
            };
            if (!res.ok)
                throw new Error(data.error);
            setRevision(data.revision);
            setDirty(false);
            setMessage('Saved. Your website now uses these changes.');
        }
        catch (e) {
            setMessage(e instanceof Error ? e.message : 'Could not save.');
        }
        finally {
            setBusy(false);
        }
    }
    function download() { const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); const url = URL.createObjectURL(blob); a.href = url; a.download = 'ucv-content-backup.json'; a.click(); URL.revokeObjectURL(url); }
    async function upload(file: File | undefined, assign: (url: string) => void) {
        if (!file)
            return;
        setBusy(true);
        setMessage('Uploading image…');
        try {
            const form = new FormData();
            form.set('file', file);
            const res = await fetch('/api/admin/media', { method: 'POST', body: form });
            const data = await res.json() as {
                error?: string;
                revision: number;
                url: string;
                enquiries: Enquiry[];
            };
            if (!res.ok)
                throw new Error(data.error);
            assign(data.url);
            setMessage('Image uploaded. Save changes to display it on the website.');
        }
        catch (e) {
            setMessage(e instanceof Error ? e.message : 'Upload failed.');
        }
        finally {
            setBusy(false);
        }
    }
    async function loadEnquiries() {
        setTab('Enquiries');
        setBusy(true);
        try {
            const res = await fetch('/api/admin/enquiries');
            const data = await res.json() as {
                error?: string;
                revision: number;
                url: string;
                enquiries: Enquiry[];
            };
            if (!res.ok)
                throw new Error(data.error);
            setEnquiries(data.enquiries);
        }
        catch (e) {
            setMessage(e instanceof Error ? e.message : 'Could not load enquiries.');
        }
        finally {
            setBusy(false);
        }
    }
    function brand(i: number, key: string, value: unknown) { update({ ...content, brands: content.brands.map((b, j) => j === i ? { ...b, [key]: value } : b) }); }
    const groups = Array.from(new Set(Object.values(content.texts).map(t => t.group || 'Shared'))).sort();
    return <div className="cms"><header className="cms-header"><div><a href="/">UCV</a><span>Content manager</span></div><div><a href="/" target="_blank" rel="noreferrer">View website</a><a href="/signout-with-chatgpt?return_to=/">Sign out</a><button onClick={download}>Export backup</button><button className="cms-save" disabled={busy || !dirty} onClick={save}>{busy ? 'Working…' : 'Save changes'}</button></div></header><div className="cms-body"><aside>{['Text', 'Images', 'FAQs', 'Brands', 'Contact & legal', 'Enquiries'].map(t => <button key={t} className={tab === t ? 'active' : ''} onClick={() => t === 'Enquiries' ? loadEnquiries() : setTab(t)}>{t}</button>)}<p>{dirty ? 'You have unsaved changes.' : 'All changes saved.'}</p><p>Update German and English together. Uploaded images keep their original artwork.</p></aside><main><div className="cms-title"><h1>{tab}</h1><p>Edit, then select Save changes. Open the website in a new tab to review.</p></div>{message && <p className="cms-message" role="status">{message}</p>}
    {tab === 'Text' && <><div className="cms-filters"><label>Page<select value={group} onChange={e => setGroup(e.target.value)}><option>All</option>{groups.map(g => <option key={g}>{g}</option>)}</select></label><label>Find text<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search content"/></label></div>{Object.entries(content.texts).filter(([key, t]) => (group === 'All' || (t.group || 'Shared') === group) && (!search || (key + t.de + t.en).toLowerCase().includes(search.toLowerCase()))).map(([key, t]) => <section className="cms-card" key={key}><small>{t.group || 'Shared'}</small><h2>{key.slice(0, 110)}</h2><div className="cms-columns">{(['de', 'en'] as const).map(lang => <label key={lang}>{lang === 'de' ? 'German' : 'English'}<textarea rows={t[lang].length > 120 ? 4 : 2} value={t[lang]} onChange={e => update({ ...content, texts: { ...content.texts, [key]: { ...t, [lang]: e.target.value } } })}/></label>)}</div></section>)}</>}
    {tab === 'Images' && Object.entries(content.images).map(([key, value]) => <section className="cms-card" key={key}><h2>{{ ucvLogo: 'Header and footer logo', hero: 'Homepage hero image', aboutLogo: 'About page logo', kitchen: 'About kitchen concept image' }[key] || key}</h2><img className="cms-image" src={value} alt={key}/><label>Replace image (PNG, JPEG or WebP, up to 8 MB)<input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={e => upload(e.target.files?.[0], url => update({ ...content, images: { ...content.images, [key]: url } }))}/></label><p>Use approved brand assets. Brand food images are managed under Brands.</p></section>)}
    {tab === 'FAQs' && <><button onClick={() => update({ ...content, faqs: [...content.faqs, ['Neue Frage', 'New question', 'Neue Antwort', 'New answer']] })}>Add FAQ</button>{content.faqs.map((f, i) => <section className="cms-card" key={i}><h2>FAQ {i + 1}</h2><div className="cms-columns">{['German question', 'English question', 'German answer', 'English answer'].map((label, j) => <label key={label}>{label}<textarea rows={j > 1 ? 3 : 2} value={f[j]} onChange={e => update({ ...content, faqs: content.faqs.map((x, n) => n === i ? x.map((v, k) => k === j ? e.target.value : v) : x) })}/></label>)}</div><button onClick={() => update({ ...content, faqs: content.faqs.filter((_, j) => j !== i) })}>Remove FAQ</button></section>)}</>}
    {tab === 'Brands' && <><button onClick={() => update({ ...content, brands: [...content.brands, { slug: 'new-brand-' + (content.brands.length + 1), name: 'New brand', categories: ['Category'], image: defaults.brands[0].image, logo: '', tag: 'FOOD BRAND', de: 'Deine neue Marke.', en: 'Your new brand.', theme: 'fry', enabled: false }] })}>Add brand</button>{content.brands.map((b, i) => <section className="cms-card" key={i}><h2>{b.name}</h2><label className="cms-check"><input type="checkbox" checked={b.enabled} onChange={e => brand(i, 'enabled', e.target.checked)}/>Show on website</label><div className="cms-columns">{[['name', 'Brand name'], ['slug', 'Page URL slug'], ['tag', 'Category label'], ['de', 'German introduction'], ['en', 'English introduction']].map(([key, label]) => <label key={key}>{label}<input value={String(b[key as keyof Brand])} onChange={e => brand(i, key, e.target.value)}/></label>)}<label>Food categories (one per line)<textarea value={b.categories.join('\n')} rows={4} onChange={e => brand(i, 'categories', e.target.value.split('\n').filter(Boolean))}/></label><label>Brand colour treatment<select value={b.theme} onChange={e => brand(i, 'theme', e.target.value)}><option value="fry">Charcoal / red / yellow</option><option value="pizza">Forest green / cream</option></select></label></div><div className="cms-columns">{(['image', 'logo'] as const).map(key => <div key={key}><h3>{key === 'image' ? 'Food image' : 'Brand logo'}</h3>{b[key] && <img className="cms-image" src={b[key]} alt={b.name}/>}<input aria-label={b.name + ' ' + key} type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={e => upload(e.target.files?.[0], url => brand(i, key, url))}/>{key === 'logo' && b.logo && <button onClick={() => brand(i, 'logo', '')}>Hide logo</button>}</div>)}</div></section>)}</>}
    {tab === 'Contact & legal' && <section className="cms-card"><h2>Business details</h2><div className="cms-columns">{[['email', 'Business email'], ['phone', 'Phone display'], ['whatsapp', 'WhatsApp link (https://wa.me/...)'], ['locationDe', 'Location in German'], ['locationEn', 'Location in English'], ['legalName', 'Full legal company name'], ['legalAddress', 'Full legal address'], ['legalRepresentative', 'Authorised representative'], ['legalRegister', 'Register details (if applicable)'], ['legalVat', 'VAT ID (if applicable)']].map(([key, label]) => <label key={key}>{label}<textarea rows={2} value={String(content.settings[key as keyof Content['settings']])} onChange={e => setting(key, e.target.value)}/></label>)}</div><label className="cms-check"><input type="checkbox" checked={content.settings.legalApproved} onChange={e => setting('legalApproved', e.target.checked)}/>Legal company details have been approved</label><p>Approve provider details only after checking accuracy. Privacy wording is edited in Text → privacy. Email delivery credentials are configured separately and never stored in this editor.</p></section>}
    {tab === 'Enquiries' && <><button onClick={loadEnquiries}>Refresh enquiries</button><p>Latest 200 enquiries. Email status shows whether delivery was accepted by the email provider.</p>{enquiries.length === 0 && <section className="cms-card"><p>No enquiries yet.</p></section>}{enquiries.map(q => <section className="cms-card" key={q.id}><small>{new Date(q.created_at).toLocaleString()} · Email: {q.email_status}</small><h2>{q.data.restaurant}</h2><p><b>{q.data.name}</b> · {q.data.city}</p><a href={'mailto:' + q.data.email}>{q.data.email}</a><p>{q.data.phone} · {q.data.brand}</p><p className="cms-enquiry-message">{q.data.message}</p></section>)}</>}
    </main></div></div>;
}

