# UCV image replacement guide

## Easiest method: replace the existing image file

Open `public/assets/` in VS Code and replace the image while keeping the same filename and extension. This updates every section that uses that shared asset. Back up originals first.

| Replace this file | Website placements using it | Good replacement |
|---|---|---|
| `public/assets/ucv.png` | Main navbar logo, footer logo, About page logo badge | Original UCV logo, transparent PNG, keep proportions |
| `public/assets/fry-logo.png` | Fry Rebels brand card and Fry Rebels page logo | Approved Fry Rebels logo, transparent PNG |
| `public/assets/placeholders/fresh-crust-wordmark.svg` | Fresh Crust card and brand page logo | Original Fresh Crust logo. If using PNG, update `pizzaLogo` in `src/content/assets.ts` to its new `/assets/...png` path |
| `public/assets/placeholders/burger-cutout.webp` | **Homepage hero only** | Keep this file unchanged if you want to leave the hero image as it is. Transparent cutout PNG, no background |
| `public/assets/placeholders/burger-accent.webp` | Non-hero burger decoration: Good to Know / FAQ, and burger cutouts used on other page sections | Approved burger cutout PNG/WebP with transparent background. This is separated from the hero image so you can replace it without changing the hero |
| `public/assets/placeholders/pizza-cutout.webp` | Fixed bottom rotating pizza on every public page; pizza accents in FAQ and final CTA; repeated pizza accents throughout public pages | Transparent cutout PNG/WebP, no background |
| `public/assets/placeholders/kitchen-concept.webp` | About main image; first and fourth How It Works cards; How It Works story images; support cards 2, 3 and 6 | Approved real kitchen or restaurant image, landscape |
| `public/assets/placeholders/fry-food.webp` | Fry Rebels card/page hero and story images; partnership card 2; support cards 1 and 5; gallery design placeholder | Approved Fry Rebels food image, landscape |
| `public/assets/placeholders/pizza-food.webp` | Fresh Crust card/page hero and story images; partnership card 3; support card 4; gallery design placeholder | Approved pizza/pasta photo, landscape |
| `public/assets/placeholders/truck-concept.webp` | Gallery example for the spaces category | Replace with an approved image and update its concept caption in `src/content/gallery.ts`; this is not a confirmed UCV food-truck model |

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
- `pizzaFood` / `pizzaLogo`: Fresh Crust brand-card and hero photo, plus its supplied logo.
- `freshCrustDetail01` / `freshCrustDetail02`: the two separate Fresh Crust story photos below the hero.
- `bharatFood` / `bharatLogo`: Bharat Origins brand image and logo. The current food art is a concept visual pending approved dish photos.

Example: `fryFood: '/assets/approved/fry-burger.jpg'`. A path `/assets/approved/fry-burger.jpg` maps to `public/assets/approved/fry-burger.jpg`.

Two sets of card images are selected directly in their components. To give each card a different photo, replace the array entries in `src/views/how-it-works/Steps.tsx` (four cards) or `src/views/home/SupportSection.tsx` (six cards). Both files use the shared `assets` keys listed above.

The long image/text stories use `src/components/PageDetails.tsx`. Fresh Crust has its own two photo paths (`freshCrustDetail01` and `freshCrustDetail02`) and its logo stamp; Bharat Origins uses a food concept image followed by a kitchen concept visual. Change the page image map when replacing or adding page photos. The captions identify concept visuals; update them only when using approved real photos.

## Gallery photos and captions

Edit `src/content/gallery.ts`. Each entry has an image path, category, German caption and English caption. Example:

```ts
{ src: '/assets/approved/restaurant.jpg', category: 'spaces', de: 'Restaurantküche in Berlin', en: 'Restaurant kitchen in Berlin' }
```

Categories are `food`, `spaces` and `people`. This file feeds both the homepage gallery preview and the full `/gallery` page. If a gallery photo was previously uploaded and saved in Supabase `gallery_images`, the saved database gallery can take precedence over these source placeholders. This admin panel does not manage those saved gallery images.

## Image files that are not the current source of these sections

The Fresh Crust brand card and hero use `public/assets/fresh-crust-pizza-food.webp`. Its two story images use `public/assets/pizza.webp` and `public/assets/placeholders/gallery-pizza-pasta.webp`. The Bharat Origins card currently uses `public/assets/bharat-origins-food-concept.webp`, labelled as a concept until the client provides approved dish photos. The home hero uses `burger-cutout.png`; decorative burger cutouts use `burger-accent.png`.

## Fry Rebels product inspiration

The Fry Rebels detail page shows the item images supplied for this update in `src/views/fry-rebels/FryProducts.tsx`. Its 19 compressed WebP images are in `public/assets/fry-rebels/products/`. Replace a WebP while keeping its filename to update an existing card; add an entry in the `products` array in `FryProducts.tsx` to add a new bilingual item. This is a product-inspiration gallery, not a priced or final launch menu.

## Related files

- `src/content/assets.ts`: central image paths.
- `src/content/cms.ts`: default brand records for Fry Rebels, Fresh Crust Pizza, and Bharat Origins, with their image and logo paths.
- `src/content/gallery.ts`: gallery entries and bilingual captions.
- `src/views/home/Hero.tsx`, `FaqSection.tsx`, `SupportSection.tsx`: homepage visual placements.
- `src/views/how-it-works/Steps.tsx`: four partnership card images.
- `src/views/about/CompanySection.tsx`: About main kitchen image.
- `src/components/PageDetails.tsx`: alternating photos in long-form page sections.
- `src/components/FloatingControls.tsx`: fixed pizza image placement. Change the image through `pizzaCutout`; the motion and position are styled in `app/globals.css`.
- `src/views/gallery/GalleryGrid.tsx`: renders the gallery and enlarged-photo view; image data is in `src/content/gallery.ts`.

`/admin` is for form enquiries only. It does not edit website images. Replace assets and edit captions in VS Code, then rebuild/redeploy your hosting. Keep both German and English captions when changing gallery entries.
