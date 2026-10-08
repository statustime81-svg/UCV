import { supabaseSettings } from './supabase';
export class EnquiryError extends Error {
    constructor(message: string, public status: number) { super(message); }
}
export async function requireEnquiryAdmin(req: Request) {
    const s = supabaseSettings();
    if (!s.url || !s.anon || !s.secret) throw new EnquiryError('Supabase is not configured on the server.', 503);
    const authorization = req.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) throw new EnquiryError('Please sign in again.', 401);
    const headers = { apikey: s.anon, Authorization: authorization };
    const user = await fetch(s.url + '/auth/v1/user', { headers, signal: AbortSignal.timeout(10000) });
    if (!user.ok) throw new EnquiryError('Please sign in again.', 401);
    const identity = await user.json() as { id?: string };
    if (!identity.id) throw new EnquiryError('Please sign in again.', 401);
    const membership = await fetch(s.url + '/rest/v1/ucv_admins?select=user_id&user_id=eq.' + encodeURIComponent(identity.id), { headers, signal: AbortSignal.timeout(10000) });
    if (!membership.ok || (await membership.json() as unknown[]).length !== 1)
        throw new EnquiryError('This account is not a UCV administrator.', 403);
    return true;
}
export async function enquiryRest(path: string, method = 'GET', body?: unknown) {
    const s = supabaseSettings();
    const r = await fetch(s.url + '/rest/v1/' + path, {
        method, headers: { apikey: s.secret, Authorization: 'Bearer ' + s.secret, 'Content-Type': 'application/json', Prefer: 'return=representation' },
        body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(12000),
    });
    if (!r.ok) {
        const problem = await r.json().catch(() => ({})) as { code?: string };
        if (method === 'PATCH' && ['PGRST204', '42703'].includes(problem.code || ''))
            throw new EnquiryError('Status setup is pending. Run supabase/admin-enquiries-update.sql in Supabase SQL Editor, then retry.', 409);
        throw new EnquiryError('The enquiry could not be saved or loaded. Please retry.', 503);
    }
    return r.json();
}
