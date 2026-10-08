import { supabaseSettings } from "../../../lib/supabase";

export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!/^[a-f0-9-]+\.(png|jpg|webp)$/.test(key)) {
    return new Response("Not found", { status: 404 });
  }
  const { url } = supabaseSettings();
  if (!url) return new Response("Not found", { status: 404 });
  return Response.redirect(`${url}/storage/v1/object/public/ucv-gallery/${key}`, 302);
}
