import { env } from 'cloudflare:workers';
import { Content, defaults, validateContent } from '../src/content/cms';
export function db() {
    if (!env.DB)
        throw new Error('Database is unavailable');
    return env.DB;
}
export async function readContent() {
    const row = await db().prepare('SELECT value, revision FROM cms_content WHERE key = ?').bind('site').first<{
        value: string;
        revision: number;
    }>();
    if (!row)
        return { content: defaults, revision: 0 };
    const content = JSON.parse(row.value);
    if (!validateContent(content))
        throw new Error('Content is invalid');
    const images = { ...defaults.images, ...content.images };
    if (images.hero === '/assets/fry.webp')
        images.hero = defaults.images.hero;
    return { content: { ...content, texts: { ...defaults.texts, ...content.texts }, images } as Content, revision: row.revision };
}
export async function publicContent() { return defaults; }
export async function saveContent(content: Content, revision: number) {
    const q = await db().prepare('INSERT INTO cms_content (key,value,revision,updated_at) VALUES (?,?,1,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value,revision=cms_content.revision+1,updated_at=excluded.updated_at WHERE cms_content.revision=? RETURNING revision').bind('site', JSON.stringify(content), Date.now(), revision).first<{
        revision: number;
    }>();
    if (!q)
        throw new Error('conflict');
    return q.revision;
}

