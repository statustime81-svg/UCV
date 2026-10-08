# UCV image replacement guide

## Easiest method: replace the existing image file

Open `public/assets/` in VS Code and replace the image while keeping the same filename and extension. This updates every section that uses that shared asset. Back up originals first.

| Replace this file | Website placements using it | Good replacement |
|---|---|---|
| `public/assets/ucv.png` | Main navbar logo, footer logo, About page logo badge | Original UCV logo, transparent PNG, keep proportions |
| `public/assets/fry-logo.png` | Fry Rebels brand card and Fry Rebels page logo | Approved Fry Rebels logo, transparent PNG |
| `public/assets/placeholders/fresh-crust-wordmark.svg` | Fresh Crust card and brand page logo | Original Fresh Crust logo. If using PNG, update `pizzaLogo` in `src/content/assets.ts` to its new `/assets/...png` path |
| `public/assets/placeholders/burger-cutout.png` | **Homepage hero only** | Keep this file unchanged if you want to leave the hero image as it is. Transparent cutout PNG, no background |
| `public/assets/placeholders/burger-accent.png` | Non-hero burger decoration: Good to Know / FAQ, and burger cutouts used on other page sections | Approved burger cutout PNG/WebP with transparent background. This is separated from the hero image so you can replace it without changing the hero |
| `public/assets/placeholders/pizza-cutout.png` | Fixed bottom rotating pizza on every public page; pizza accents in FAQ and final CTA; repeated pizza accents throughout public pages | Transparent cutout PNG/WebP, no background |
| `public/assets/placeholders/kitchen-concept.png` | About main image; first and fourth How It Works cards; How It Works story images; support cards 2, 3 and 6 | Approved real kitchen or restaurant image, landscape |
| `public/assets/placeholders/fry-food.webp` | Fry Rebels card/page hero and story images; partnership card 2; support cards 1 and 5; gallery design placeholder | Approved Fry Rebels food image, landscape |
| `public/assets/placeholders/pizza-food.webp` | Fresh Crust card/page hero and story images; partnership card 3; support card 4; gallery design placeholder | Approved pizza/pasta photo, landscape |
| `public/assets/placeholders/truck-concept.png` | Gallery example for the spaces category | Replace with an approved image and update its concept caption in `src/content/gallery.ts`; this is not a confirmed UCV food-truck model |

Use food and restaurant photos at least 1400 px wide. The section frame crops photos with `object-fit: cover`, so keep the dish or person near the centre. Cutout PNGs need transparent backgrounds. Do not use generated concepts as photos of real outlets.

## Change filenames or add separate photos

Put new files in `public/assets/approved/`, then update `src/content/assets.ts`:

- `ucvLogo`: navbar and footer UCV logo.
- `hero`: homepage hero burger and general burger decorations.
- `faqFood`: Good to Know / FAQ burger.
- `pizzaCutout`: fixed spinning pizza and pizza decorations throughout the site.
- `aboutLogo`: About section logo badge.
- `kitchen`: About, process cards and shared story sections.
- `fryFood` / `fryLogo`: Fry Rebels photos and logo.
- `pizzaFood` / `pizzaLogo`: Fresh Crust photos and logo.

Example: `fryFood: '/assets/approved/fry-burger.jpg'`. A path `/assets/approved/fry-burger.jpg` maps to `public/assets/approved/fry-burger.jpg`.

Two sets of card images are selected directly in their components. To give each card a different photo, replace the array entries in `src/views/how-it-works/Steps.tsx` (four cards) or `src/views/home/SupportSection.tsx` (six cards). Both files use the shared `assets` keys listed above.

The long image/text stories on About, How It Works, Fry Rebels and Fresh Crust pages use a shared pattern in `src/components/PageDetails.tsx`: alternating pizza/pasta and kitchen/Fry images. Change that file if you want a different image by page or by story. The displayed caption currently says “Concept image”; update the caption and alt text when you use an approved real image.

## Gallery photos and captions

Edit `src/content/gallery.ts`. Each entry has an image path, category, German caption and English caption. Example:

```ts
{ src: '/assets/approved/restaurant.jpg', category: 'spaces', de: 'Restaurantküche in Berlin', en: 'Restaurant kitchen in Berlin' }
```

Categories are `food`, `spaces` and `people`. This file feeds both the homepage gallery preview and the full `/gallery` page. If a gallery photo was previously uploaded and saved in Supabase `gallery_images`, the saved database gallery can take precedence over these source placeholders. This admin panel does not manage those saved gallery images.

## Image files that are not the current source of these sections

`public/assets/fry.webp` and `public/assets/pizza.webp` are legacy files and are not the active brand photos in the current components. Replace `fry-food.webp` and `pizza-food.webp` instead. The home hero uses `burger-cutout.png`; decorative burger cutouts use the separate `burger-accent.png` file.

## Related files

- `src/content/assets.ts`: central image paths.
- `src/content/cms.ts`: default brand records use the central Fry/Pizza photos and logos.
- `src/content/gallery.ts`: gallery entries and bilingual captions.
- `src/views/home/Hero.tsx`, `FaqSection.tsx`, `SupportSection.tsx`: homepage visual placements.
- `src/views/how-it-works/Steps.tsx`: four partnership card images.
- `src/views/about/CompanySection.tsx`: About main kitchen image.
- `src/components/PageDetails.tsx`: alternating photos in long-form page sections.
- `src/components/FloatingControls.tsx`: fixed pizza image placement. Change the image through `pizzaCutout`; the motion and position are styled in `app/globals.css`.
- `src/views/gallery/GalleryGrid.tsx`: renders the gallery and enlarged-photo view; image data is in `src/content/gallery.ts`.

`/admin` is for form enquiries only. It does not edit website images. Replace assets and edit captions in VS Code, then rebuild/redeploy your hosting. Keep both German and English captions when changing gallery entries.
