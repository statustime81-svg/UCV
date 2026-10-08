"use client";
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../../components/ui/dialog';
import { X } from 'lucide-react';
import { Lang } from '../../content/site';
import { galleryImages } from '../../content/gallery';
type Photo = {
    src: string;
    de: string;
    en: string;
    category: string;
    id?: string;
};
export default function GalleryGrid({ l, preview = false }: {
    l: Lang;
    preview?: boolean;
}) {
    const [filter, setFilter] = useState('all'), [photos, setPhotos] = useState<Photo[]>(galleryImages), [selected, setSelected] = useState<Photo | null>(null), [uploaded, setUploaded] = useState(false);
    useEffect(() => {
        let active = true;
        fetch('/api/gallery').then(async (r) => {
            if (!r.ok)
                throw new Error();
            return await r.json() as {
                images: Photo[];
            };
        }).then(data => {
            if (active && data.images.length) {
                setPhotos(data.images);
                setUploaded(true);
            }
        }).catch(() => { });
        return () => { active = false; };
    }, []);
    const items = photos.filter(x => filter === 'all' || x.category === filter);
    return <><div className="gallery-filters" aria-label={l === 'de' ? 'Galeriefilter' : 'Gallery filters'}>{!preview && [['all', 'Alle', 'All'], ['food', 'Food', 'Food'], ['spaces', 'Räume', 'Spaces'], ['people', 'Menschen', 'People']].map(([key, de, en]) => <button key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{l === 'de' ? de : en}</button>)}</div><div className="gallery-grid">{items.slice(0, preview ? 3 : items.length).map((x, i) => <figure key={x.id || x.src} className="gallery-shot" data-reveal style={{ '--delay': `${i * 70}ms` } as React.CSSProperties}><button type="button" className="gallery-open" onClick={() => setSelected(x)} aria-label={(l === 'de' ? 'Bild vergrößern: ' : 'Enlarge image: ') + (l === 'de' ? x.de : x.en)}><img src={x.src} alt={l === 'de' ? x.de : x.en} loading="lazy"/><span className="gallery-zoom" aria-hidden="true">+</span></button><figcaption><span>0{i + 1}</span>{l === 'de' ? x.de : x.en}</figcaption></figure>)}</div>{!items.length && <p>{l === 'de' ? 'Für diese Kategorie sind noch keine freigegebenen Bilder vorhanden.' : 'No approved photographs have been added in this category yet.'}</p>}{!uploaded && <p className="gallery-note">{l === 'de' ? 'Vorläufige Food- und Designkonzepte. Keine bestätigten Betriebsstandorte.' : 'Temporary food and design concepts. No confirmed operating locations.'}</p>}<Dialog open={Boolean(selected)} onOpenChange={v => !v && setSelected(null)}><DialogContent className="gallery-lightbox" showCloseButton={false}><DialogTitle>{selected && (l === 'de' ? selected.de : selected.en)}</DialogTitle><DialogDescription className="sr-only">{l === 'de' ? 'Vergrößerte Galerieansicht' : 'Enlarged gallery view'}</DialogDescription><DialogClose className="partner-dialog-close" aria-label={l === 'de' ? 'Bild schließen' : 'Close image'}><X size={23}/></DialogClose>{selected && <img src={selected.src} alt={l === 'de' ? selected.de : selected.en}/>}</DialogContent></Dialog></>;
}

