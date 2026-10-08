"use client";
import { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from '../../components/ui/alert-dialog';
type ImageItem = {
    id: string;
    src: string;
    de: string;
    en: string;
    category: string;
};
export default function GalleryManager({ token }: {
    token?: string;
}) {
    const [items, setItems] = useState<ImageItem[]>([]), [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState(''), [remove, setRemove] = useState<ImageItem | null>(null);
    const headers = (): Record<string, string> => token ? { Authorization: 'Bearer ' + token } : {};
    async function load() {
        const r = await fetch('/api/admin/gallery', { headers: headers() });
        const data = await r.json() as {
            images?: ImageItem[];
            error?: string;
        };
        if (!r.ok)
            throw new Error(data.error || 'Gallery unavailable');
        setItems(data.images || []);
    }
    useEffect(() => { load().catch(e => setError(e.message)); }, [token]);
    async function upload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setBusy(true);
        setError('');
        setNotice('');
        try {
            const r = await fetch('/api/admin/gallery', { method: 'POST', headers: headers(), body: new FormData(form) });
            const data = await r.json() as {
                error?: string;
            };
            if (!r.ok)
                throw new Error(data.error || 'Upload failed');
            form.reset();
            await load();
            setNotice('Image published to the homepage gallery and Gallery page.');
        }
        catch (e) {
            setError((e as Error).message);
        }
        finally {
            setBusy(false);
        }
    }
    async function deleteImage() {
        if (!remove)
            return;
        setBusy(true);
        setError('');
        try {
            const r = await fetch('/api/admin/gallery', { method: 'DELETE', headers: { ...headers(), 'Content-Type': 'application/json' }, body: JSON.stringify({ id: remove.id }) });
            const data = await r.json() as {
                error?: string;
                cleanup?: boolean;
            };
            if (!r.ok)
                throw new Error(data.error || 'Removal failed');
            setRemove(null);
            await load();
            setNotice(data.cleanup === false ? 'Image removed from the gallery. Storage cleanup needs attention.' : 'Image removed.');
        }
        catch (e) {
            setError((e as Error).message);
        }
        finally {
            setBusy(false);
        }
    }
    return <section className="admin-gallery"><span className="eyebrow">GALLERY MANAGEMENT</span><h2>Publish your photographs.</h2><p>Upload only approved images. Both captions appear on the public website. Describe actual locations accurately and label concepts clearly.</p>{error && <p role="alert">{error}</p>}{notice && <p role="status">{notice}</p>}<form onSubmit={upload}><label>Image, JPG / PNG / WebP, up to 6 MB<input name="file" type="file" accept="image/jpeg,image/png,image/webp" required/></label><label>German caption<input name="de" required maxLength={300}/></label><label>English caption<input name="en" required maxLength={300}/></label><label>Category<select name="category"><option value="food">Food</option><option value="spaces">Spaces / restaurants</option><option value="people">People / partners</option></select></label><button disabled={busy}>{busy ? 'Saving…' : 'Upload & publish'}</button></form><button disabled={busy} onClick={() => load().catch(e => setError(e.message))}>Refresh gallery</button><div className="admin-gallery-grid">{items.map(item => <article key={item.id}><img src={item.src} alt={item.en}/><p>{item.de}</p><p>{item.en}</p><span>{item.category}</span><button disabled={busy} onClick={() => setRemove(item)}>Remove</button></article>)}</div>{!items.length && <p>No uploaded photographs yet. The website displays its labelled design placeholders.</p>}<AlertDialog open={Boolean(remove)} onOpenChange={v => !v && setRemove(null)}><AlertDialogContent className="gallery-remove-dialog"><AlertDialogTitle>Remove photograph?</AlertDialogTitle><AlertDialogDescription>This removes the photo from the public gallery and deletes its uploaded file.</AlertDialogDescription><div className="gallery-remove-actions"><AlertDialogCancel>Cancel</AlertDialogCancel><button disabled={busy} onClick={deleteImage}>{busy ? 'Removing…' : 'Remove photograph'}</button></div></AlertDialogContent></AlertDialog></section>;
}

