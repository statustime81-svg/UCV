import { env } from 'cloudflare:workers';
export function supabaseSettings() {
 const e=env as unknown as Record<string,string>;
 const url=e.SUPABASE_URL || process.env.SUPABASE_URL || '';
 const anon=e.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
 const secret=e.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
 return {url:url.replace(/\/$/,''),anon,secret};
}
export async function supabaseRequest(path:string, body:unknown) {
 const {url,secret}=supabaseSettings();
 if(!url||!secret) throw new Error('Supabase is not configured');
 const response=await fetch(url+'/rest/v1/'+path,{method:'POST',headers:{apikey:secret,Authorization:'Bearer '+secret,'Content-Type':'application/json',Prefer:path.startsWith('rpc/')?'return=representation':'return=minimal'},body:JSON.stringify(body),signal:AbortSignal.timeout(12000)});
 if(!response.ok) throw new Error('Supabase request failed');
 return response;
}
