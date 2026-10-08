import { supabaseSettings, supabaseRequest } from '../../../lib/supabase';
import { publicContent } from '../../../lib/cms-db';
export async function POST(req: Request) {
    const json = (message: string, status: number) => Response.json({ message }, { status });
    if (!req.headers.get('content-type')?.includes('application/json'))
        return json('Invalid request', 415);
    const origin = req.headers.get('origin');
    if (origin && origin !== new URL(req.url).origin)
        return json('Invalid origin', 403);
    const now = Date.now();
    let b: Record<string, unknown>;
    try {
        const raw = await req.text();
        if (raw.length > 12000)
            return json('Too large', 413);
        b = JSON.parse(raw);
    }
    catch {
        return json('Invalid request', 400);
    }
    if (b.website || b.consent !== 'on' || typeof b.started !== 'number' || now - b.started < 3000 || now - b.started > 86400000)
        return json('Invalid request', 400);
    for (const field of ['name', 'restaurant', 'email', 'city', 'message'])
        if (typeof b[field] !== 'string' || !(b[field] as string).trim() || (b[field] as string).length > (field === 'message' ? 3000 : 160))
            return json('Invalid fields', 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email as string))
        return json('Invalid email', 400);
    for (const k of ['phone', 'brand', 'lang'])
        if (b[k] !== undefined && (typeof b[k] !== 'string' || (b[k] as string).length > 160))
            return json('Invalid fields', 400);
    try {
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
        const hour = Math.floor(now / 3600000);
        const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + ':' + hour));
        const bucket = Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
        const supa = supabaseSettings();
        if (!supa.url || !supa.anon || !supa.secret)
            return json('Enquiry service is not configured.', 503);
        const rateResponse = await supabaseRequest('rpc/consume_enquiry_rate', { p_bucket: bucket, p_expires: new Date(now + 3600000).toISOString() });
        if (!await rateResponse.json())
            return json('Too many requests', 429);
        const content = await publicContent();
        const clean = Object.fromEntries(['name', 'restaurant', 'email', 'phone', 'city', 'brand', 'message', 'lang'].map(k => [k, String(b[k] || '').trim()]));
        const id = crypto.randomUUID();
        await supabaseRequest('partner_enquiries', { id, ...clean, consent: true, created_at: new Date(now).toISOString() });
        const settings = process.env;
        let emailSent = false;
        let status = 'not_configured';
        if (settings.EMAIL_API_KEY && settings.EMAIL_FROM) {
            try {
                const result = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${settings.EMAIL_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: settings.EMAIL_FROM, to: [content.settings.email], reply_to: clean.email, subject: 'UCV partnership enquiry', text: ['UCV Partnership Enquiry', ...Object.entries(clean).map(([k, v]) => `${k}: ${v}`)].join('\n') }) });
                emailSent = result.ok;
                status = result.ok ? 'accepted' : 'failed';
            }
            catch {
                status = 'failed';
            }
        }
        return Response.json({ received: true, emailSent });
    }
    catch (e) {
        console.error('Enquiry processing failed', e instanceof Error ? e.message : 'unknown');
        return json('Submission unavailable. Please contact us directly.', 503);
    }
}

