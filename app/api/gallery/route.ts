import { readGallery } from '../../../lib/gallery';
export async function GET() {
    try {
        return Response.json({ images: await readGallery() }, { headers: { 'Cache-Control': 'no-store' } });
    }
    catch {
        return Response.json({ error: 'Gallery unavailable' }, { status: 503 });
    }
}

