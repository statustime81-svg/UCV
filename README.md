# Urban Culinary Venture website

German-default, fully bilingual React/TypeScript website with separate page and section folders, food motion, brand pages, partnership form and a gallery.

## Local run

Node 22 or newer. Run `npm install`, copy `.env.example` to `.env`, then `npm run dev`. Public pages use source content without a database. Configure Supabase for working form storage and admin email/password login. The deployed Sites preview uses its existing D1 inbox until Supabase is connected.

## Editing and setup

- `IMAGE-REPLACEMENT-GUIDE.md`: exact asset replacement paths and section mapping.
- `SUPABASE-SETUP.md`: database SQL, environment settings, administrator user and verification.
- `src/content/assets.ts`: image/logo defaults and transparent food cutouts.
- `src/content/gallery.ts`: gallery images, categories and German/English captions.
- `src/content/cms.ts`: brand and contact defaults.
- `src/content/text-defaults.json`: bilingual text dictionary.
- `src/views/`: public pages and individual sections.
- `app/globals.css`: shared theme and motion, including reduced-motion support.

Admin is enquiry-only. No default password is embedded. Supabase must be connected to your own account. Placeholder visuals and legal drafts must be finalised before public launch.

## Final content and gallery update

Detailed bilingual narrative copy is in `src/content/page-details.ts`. Main partner buttons open a form popup, and marketing detail pages include a bottom inline form. Gallery photographs can now be uploaded and removed through `/admin`; source content editing remains in VS Code. Run the complete updated Supabase SQL, including gallery Storage setup. See the two guides above for exact instructions and pending launch information.
