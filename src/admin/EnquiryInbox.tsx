'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from '../../components/ui/alert-dialog';
import { X, Mail, Trash2, Check, RefreshCw } from 'lucide-react';
import styles from './EnquiryInbox.module.css';
type Config = { url: string; anon: string; configured: boolean };
type Session = { access_token: string; refresh_token: string };
type Enquiry = { id: string; name: string; restaurant: string; email: string; phone?: string; city: string; brand?: string; message: string; lang?: string; consent?: boolean; created_at: string; contacted: boolean };
type Page = { enquiries: Enquiry[]; hasMore: boolean };
const ADMIN_SESSION_KEY = 'ucv-admin-session';
function storeAdminSession(value: Session | null) {
    if (typeof window === 'undefined') return;
    if (value) window.sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(value));
    else window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
export default function EnquiryInbox() {
    const [config, setConfig] = useState<Config | null>(null), [signedIn, setSignedIn] = useState(false);
    const [restoring, setRestoring] = useState(false);
    const session = useRef<Session | null>(null);
    const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [error, setError] = useState(''), [busy, setBusy] = useState(false);
    useEffect(() => {
        fetch('/api/admin/config').then(async r => { if (!r.ok) throw new Error(); return r.json() as Promise<Config>; }).then(setConfig).catch(() => setError('Unable to load sign-in settings. Reload this page.'));
    }, []);
    const request = useCallback(async (path: string, init: RequestInit = {}) => {
        const send = () => fetch(path, { ...init, headers: { ...init.headers, ...(session.current ? { Authorization: 'Bearer ' + session.current.access_token } : {}) } });
        let r = await send();
        if (r.status === 401 && config?.configured && session.current) {
            const renewal = await fetch(config.url + '/auth/v1/token?grant_type=refresh_token', {
                method: 'POST', headers: { apikey: config.anon, 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: session.current.refresh_token }),
            });
            if (!renewal.ok) { session.current = null; storeAdminSession(null); setSignedIn(false); throw new Error('Session expired. Please sign in again.'); }
            session.current = await renewal.json();
            storeAdminSession(session.current);
            r = await send();
        }
        const data: any = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.error || 'Request failed. Please retry.');
        return data;
    }, [config]);
    useEffect(() => {
        if (!config?.configured) return;
        const saved = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
        if (!saved) return;
        let restored: Session;
        try {
            const parsed = JSON.parse(saved) as Partial<Session>;
            if (typeof parsed.access_token !== 'string' || typeof parsed.refresh_token !== 'string') throw new Error('Invalid saved session');
            restored = { access_token: parsed.access_token, refresh_token: parsed.refresh_token };
        } catch {
            storeAdminSession(null);
            return;
        }
        let active = true;
        session.current = restored;
        setRestoring(true);
        request('/api/admin/enquiries?page=0')
            .then(() => { if (active) setSignedIn(true); })
            .catch(() => {
                if (!active) return;
                session.current = null;
                storeAdminSession(null);
                setError('Your admin session expired. Please sign in again.');
            })
            .finally(() => { if (active) setRestoring(false); });
        return () => { active = false; };
    }, [config, request]);
    async function login(e: React.FormEvent) {
        e.preventDefault(); if (!config || busy) return; setBusy(true); setError('');
        try {
            const r = await fetch(config.url + '/auth/v1/token?grant_type=password', { method: 'POST', headers: { apikey: config.anon, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
            if (!r.ok) throw new Error('Unable to sign in. Check your email and password.');
            session.current = await r.json();
            storeAdminSession(session.current);
            await request('/api/admin/enquiries?page=0');
            setPassword(''); setSignedIn(true);
        } catch (e) { session.current = null; storeAdminSession(null); setError((e as Error).message); } finally { setBusy(false); }
    }
    function logout() {
        const current = session.current; session.current = null; storeAdminSession(null); setSignedIn(false); setError('');
        if (config && current) fetch(config.url + '/auth/v1/logout', { method: 'POST', headers: { apikey: config.anon, Authorization: 'Bearer ' + current.access_token } }).catch(() => {});
    }
    return <main className={styles.root}>
        <div className={styles.top}><a href="/">UCV <span>/ WEBSITE</span></a>{signedIn && <button onClick={logout} className={styles.secondary}>Sign out</button>}</div>
        <div className={styles.heading}><span>PARTNERSHIP ENQUIRIES</span><h1>Your inbox.</h1><p>Keep track of restaurant partners and your conversations.</p></div>
        {error && <p role="alert" className={styles.error}>{error}</p>}
        {!config ? <p role="status">Loading…</p> : restoring ? <p role="status">Restoring admin session…</p> : config.configured && !signedIn ? <form onSubmit={login} className={styles.login}>
            <h2>Admin sign in</h2><label>Email<input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} /></label>
            <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
            <button className={styles.primary} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        </form> : <>{!config.configured && <p className={styles.preview}>Preview inbox · Access is restricted to the authorised owner. Connect Supabase to use your admin email and password.</p>}<Inbox request={request} /></>}
    </main>;
}
function Inbox({ request }: { request: (path: string, init?: RequestInit) => Promise<any> }) {
    const [rows, setRows] = useState<Enquiry[]>([]), [page, setPage] = useState(0), [hasMore, setHasMore] = useState(false);
    const [selected, setSelected] = useState<Enquiry | null>(null), [remove, setRemove] = useState<Enquiry | null>(null);
    const [loading, setLoading] = useState(true), [saving, setSaving] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState('');
    const lastTrigger = useRef<HTMLButtonElement | null>(null);
    const actionLock = useRef(false);
    const load = useCallback(async (nextPage: number) => {
        setLoading(true); setError('');
        try {
            const data: Page = await request('/api/admin/enquiries?page=' + nextPage);
            setRows(data.enquiries); setHasMore(data.hasMore); setPage(nextPage);
        } catch (e) { setError((e as Error).message); } finally { setLoading(false); }
    }, [request]);
    useEffect(() => { void load(0); }, [load]);
    async function updateContact(row: Enquiry, contacted: boolean) {
        if (actionLock.current || row.contacted === contacted) return;
        actionLock.current = true; setSaving(true); setError(''); setNotice('');
        try {
            await request('/api/admin/enquiries', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: row.id, contacted }) });
            const updated = { ...row, contacted }; setRows(values => values.map(x => x.id === row.id ? updated : x)); setSelected(updated);
            setNotice('Contact status saved.');
        } catch (e) { setError((e as Error).message); } finally { actionLock.current = false; setSaving(false); }
    }
    async function deleteEnquiry() {
        if (!remove || actionLock.current) return;
        actionLock.current = true; setSaving(true); setError(''); setNotice('');
        try {
            await request('/api/admin/enquiries', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: remove.id }) });
            setRemove(null); setSelected(null); setNotice('Enquiry deleted.');
            await load(rows.length === 1 && page > 0 ? page - 1 : page);
        } catch (e) { setError((e as Error).message); } finally { actionLock.current = false; setSaving(false); }
    }
    const date = (value: string, full = false) => new Intl.DateTimeFormat('en-GB', { dateStyle: full ? 'long' : 'medium', ...(full ? { timeStyle: 'short' as const } : {}) }).format(new Date(value));
    return <section aria-label="Enquiry inbox">
        <div className={styles.toolbar}><div><h2>Enquiries</h2><p>{loading ? 'Loading enquiries…' : `${rows.length} enquiries on this page`}</p></div><button className={styles.secondary} disabled={loading || saving} onClick={() => load(page)}><RefreshCw size={16} /> Refresh</button></div>
        {error && !selected && <p role="alert" className={styles.error}>{error}</p>}{notice && !selected && <p role="status" className={styles.notice}>{notice}</p>}
        <div className={styles.list} aria-busy={loading}>
            <div className={styles.labels}><span>Restaurant / contact</span><span>City</span><span>Received</span><span>Contact status</span></div>
            {!rows.length && <p className={styles.empty}>{loading ? 'Loading…' : error ? 'Unable to load enquiries. Try Refresh.' : 'No enquiries on this page.'}</p>}
            {rows.map(row => <button type="button" className={styles.row} key={row.id} disabled={loading} onClick={e => { lastTrigger.current = e.currentTarget; setError(''); setNotice(''); setSelected(row); }} aria-label={`View enquiry from ${row.name}, ${row.restaurant}`}>
                <span className={styles.identity}><strong>{row.restaurant}</strong><small>{row.name}</small></span><span className={styles.city}>{row.city}</span><time dateTime={row.created_at}>{date(row.created_at)}</time><span className={`${styles.badge} ${row.contacted ? styles.contacted : ''}`}>{row.contacted ? 'Contacted' : 'Not contacted'}</span>
            </button>)}
        </div>
        <div className={styles.pagination}><button className={styles.secondary} disabled={loading || saving || page === 0} onClick={() => load(page - 1)}>Previous</button><span>Page {page + 1}</span><button className={styles.secondary} disabled={loading || saving || !hasMore} onClick={() => load(page + 1)}>Next</button></div>
        <Dialog open={Boolean(selected)} onOpenChange={open => { if (!open && !saving && !remove) setSelected(null); }}><DialogContent className={styles.details} showCloseButton={false} onCloseAutoFocus={e => { e.preventDefault(); lastTrigger.current?.focus(); }}>
            <DialogClose className={styles.close} disabled={saving} aria-label="Close enquiry"><X size={20} /></DialogClose>
            <DialogTitle className={styles.detailTitle}>{selected?.restaurant}</DialogTitle><DialogDescription>Partnership enquiry · {selected && date(selected.created_at, true)}</DialogDescription>
            {selected && <>
                <dl className={styles.fields}>{[['Name', selected.name], ['Email', selected.email], ['Phone', selected.phone], ['City', selected.city], ['Brand', selected.brand], ['Language', selected.lang], ['Privacy consent', selected.consent === false ? 'Not recorded' : selected.consent === true ? 'Provided' : 'Submitted with form']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || '—'}</dd></div>)}</dl>
                <div className={styles.message}><h3>Message</h3><p>{selected.message || '—'}</p></div>
                <div className={styles.status}><h3>Have you spoken with this partner?</h3><div className={styles.actions}><button disabled={saving} className={!selected.contacted ? styles.active : styles.secondary} aria-pressed={!selected.contacted} onClick={() => updateContact(selected, false)}>Not contacted</button><button disabled={saving} className={selected.contacted ? styles.active : styles.secondary} aria-pressed={selected.contacted} onClick={() => updateContact(selected, true)}><Check size={16} /> Contacted</button></div></div>
                {error && !remove && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}{saving && !remove && <p role="status">Saving…</p>}
                <div className={styles.footer}><a className={styles.primary} href={'mailto:' + selected.email}><Mail size={16} /> Reply by email</a><button className={styles.danger} disabled={saving} onClick={() => { setError(''); setRemove(selected); }}><Trash2 size={16} /> Delete enquiry</button></div>
            </>}
        </DialogContent></Dialog>
        <AlertDialog open={Boolean(remove)} onOpenChange={open => { if (!open && !saving) setRemove(null); }}><AlertDialogContent className={styles.confirm}>
            <AlertDialogTitle>Delete this enquiry?</AlertDialogTitle><AlertDialogDescription>The enquiry from {remove?.name} at {remove?.restaurant} will be permanently deleted. This cannot be undone.</AlertDialogDescription>
            {error && <p role="alert" className={styles.error}>{error}</p>}<div className={styles.actions}><AlertDialogCancel disabled={saving} className={styles.secondary}>Cancel</AlertDialogCancel><button disabled={saving} className={styles.danger} onClick={deleteEnquiry}>{saving ? 'Deleting…' : 'Delete permanently'}</button></div>
        </AlertDialogContent></AlertDialog>
    </section>;
}
