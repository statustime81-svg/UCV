import { galleryImages } from "../../../src/content/gallery";

export async function GET() {
  return Response.json(
    { images: galleryImages },
    {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
      },
    },
  );
}
