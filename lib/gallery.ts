import { supabaseSettings } from "./supabase";

export type GalleryItem = {
  id: string;
  src: string;
  de: string;
  en: string;
  category: string;
  storage_key: string;
  created_at: string;
};

function requireSupabase() {
  const settings = supabaseSettings();
  if (!settings.url || !settings.anon || !settings.secret) {
    throw new Error("Supabase is not configured");
  }
  return settings;
}

export async function galleryAdmin(req: Request) {
  const { url, anon } = requireSupabase();
  const token = req.headers.get("authorization");
  if (!token?.startsWith("Bearer ")) return false;
  const headers = { apikey: anon, Authorization: token };
  const user = await fetch(`${url}/auth/v1/user`, {
    headers,
    signal: AbortSignal.timeout(10000),
  });
  if (!user.ok) return false;
  const data = (await user.json()) as { id?: string };
  if (!data.id) return false;
  const membership = await fetch(
    `${url}/rest/v1/ucv_admins?select=user_id&user_id=eq.${encodeURIComponent(data.id)}`,
    { headers, signal: AbortSignal.timeout(10000) },
  );
  if (!membership.ok) return false;
  return ((await membership.json()) as unknown[]).length === 1;
}

export async function galleryRest(path: string, method = "GET", body?: unknown) {
  const { url, secret } = requireSupabase();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: secret,
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error("Gallery storage unavailable");
  return response;
}

export async function readGallery(): Promise<GalleryItem[]> {
  return (await (await galleryRest("gallery_images?select=*&order=created_at.desc&limit=200")).json()) as GalleryItem[];
}

export async function saveGallery(item: GalleryItem) {
  await galleryRest("gallery_images", "POST", item);
}

export async function removeGallery(id: string) {
  await galleryRest(`gallery_images?id=eq.${encodeURIComponent(id)}`, "DELETE");
}

export async function storeGalleryFile(key: string, bytes: ArrayBuffer, mime: string) {
  const { url, secret } = requireSupabase();
  const response = await fetch(`${url}/storage/v1/object/ucv-gallery/${key}`, {
    method: "POST",
    headers: {
      apikey: secret,
      Authorization: `Bearer ${secret}`,
      "Content-Type": mime,
      "x-upsert": "false",
    },
    body: bytes,
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error("Image upload unavailable");
  return `${url}/storage/v1/object/public/ucv-gallery/${key}`;
}

export async function deleteGalleryFile(key: string) {
  if (!/^[a-f0-9-]+\.(png|jpg|webp)$/.test(key)) return;
  const { url, secret } = requireSupabase();
  const response = await fetch(`${url}/storage/v1/object/ucv-gallery`, {
    method: "DELETE",
    headers: {
      apikey: secret,
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prefixes: [key] }),
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error("File cleanup failed");
}
