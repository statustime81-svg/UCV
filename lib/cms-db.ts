import { Content, defaults } from "../src/content/cms";

// The launch site keeps page copy in source files. Supabase stores enquiries
// and gallery records; no D1 database is needed for public page rendering.
export async function readContent() {
  return { content: defaults, revision: 0 };
}

export async function publicContent(): Promise<Content> {
  return defaults;
}

export async function saveContent(_content: Content, _revision: number) {
  throw new Error("Page content is edited in source files.");
}
