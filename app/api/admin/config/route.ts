import { supabaseSettings } from '../../../../lib/supabase';
export async function GET() { const { url, anon, secret } = supabaseSettings(); return Response.json({ url, anon, configured: Boolean(url && anon && secret) }, { headers: { 'Cache-Control': 'no-store' } }); }

