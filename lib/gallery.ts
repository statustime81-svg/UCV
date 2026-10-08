import {env} from 'cloudflare:workers';
import {db} from './cms-db';
import {supabaseSettings} from './supabase';
import {adminUser} from './cms-auth';
export type GalleryItem={id:string;src:string;de:string;en:string;category:string;storage_key:string;created_at:string};
export async function galleryAdmin(req:Request){
 const s=supabaseSettings();
 if(!s.url||!s.secret)return Boolean(await adminUser());
 const token=req.headers.get('authorization');if(!token?.startsWith('Bearer '))return false;
 const user=await fetch(s.url+'/auth/v1/user',{headers:{apikey:s.anon,Authorization:token},signal:AbortSignal.timeout(10000)});if(!user.ok)return false;
 const data=await user.json() as {id?:string};if(!data.id)return false;
 const membership=await fetch(s.url+'/rest/v1/ucv_admins?select=user_id&user_id=eq.'+encodeURIComponent(data.id),{headers:{apikey:s.anon,Authorization:token},signal:AbortSignal.timeout(10000)});
 if(!membership.ok)return false;const rows=await membership.json() as unknown[];return rows.length===1;
}
export async function galleryRest(path:string,method='GET',body?:unknown){
 const {url,secret}=supabaseSettings();
 const r=await fetch(url+'/rest/v1/'+path,{method,headers:{apikey:secret,Authorization:'Bearer '+secret,'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error('Gallery storage unavailable');return r;
}
export async function readGallery():Promise<GalleryItem[]>{
 const s=supabaseSettings();if(s.url&&s.secret)return await (await galleryRest('gallery_images?select=*&order=created_at.desc&limit=200')).json() as GalleryItem[];
 const rows=await db().prepare("SELECT key,value,updated_at FROM cms_content WHERE key LIKE 'gallery:%' ORDER BY updated_at DESC LIMIT 200").all<{key:string;value:string;updated_at:number}>();return rows.results.map(r=>JSON.parse(r.value) as GalleryItem);
}
export async function saveGallery(item:GalleryItem){const s=supabaseSettings();if(s.url&&s.secret){await galleryRest('gallery_images','POST',item);return;}await db().prepare('INSERT INTO cms_content(key,value,revision,updated_at) VALUES (?,?,1,?)').bind('gallery:'+item.id,JSON.stringify(item),Date.now()).run();}
export async function removeGallery(id:string){const s=supabaseSettings();if(s.url&&s.secret){await galleryRest('gallery_images?id=eq.'+id,'DELETE');return;}await db().prepare('DELETE FROM cms_content WHERE key=?').bind('gallery:'+id).run();}
export async function storeGalleryFile(key:string,bytes:ArrayBuffer,mime:string){const s=supabaseSettings();if(s.url&&s.secret){const r=await fetch(s.url+'/storage/v1/object/ucv-gallery/'+key,{method:'POST',headers:{apikey:s.secret,Authorization:'Bearer '+s.secret,'Content-Type':mime,'x-upsert':'false'},body:bytes,signal:AbortSignal.timeout(20000)});if(!r.ok)throw new Error('Image upload unavailable');return s.url+'/storage/v1/object/public/ucv-gallery/'+key;}if(!env.BUCKET)throw new Error('Image storage unavailable');await env.BUCKET.put(key,bytes,{httpMetadata:{contentType:mime}});return '/media/'+key;}
export async function deleteGalleryFile(key:string){if(!/^[a-f0-9-]+\.(png|jpg|webp)$/.test(key))return;const s=supabaseSettings();if(s.url&&s.secret){const r=await fetch(s.url+'/storage/v1/object/ucv-gallery',{method:'DELETE',headers:{apikey:s.secret,Authorization:'Bearer '+s.secret,'Content-Type':'application/json'},body:JSON.stringify({prefixes:[key]}),signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error('File cleanup failed');}else if(env.BUCKET)await env.BUCKET.delete(key);}
