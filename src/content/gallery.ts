export type GalleryCategory = "food" | "spaces" | "people";

export type GalleryImage = {
  src: string;
  category: GalleryCategory;
  de: string;
  en: string;
};

// Order controls the gallery display.
// These are concept visuals, not photographs of operating UCV locations.
// Add approved actual photographs before these entries when supplied.

export const galleryImages: GalleryImage[] = [
  {
    src: "/assets/placeholders/gallery-chicken-fries.png",
    category: "food",
    de: "Chicken & Fries · Food-Konzept",
    en: "Chicken & fries · food concept",
  },
  {
    src: "/assets/placeholders/gallery-pizza-pasta.png",
    category: "food",
    de: "Pizza & Pasta · Food-Konzept",
    en: "Pizza & pasta · food concept",
  },
  {
    src: "/assets/placeholders/gallery-restaurant-concept.png",
    category: "spaces",
    de: "Restaurant · Zukunftskonzept, kein bestätigter Standort",
    en: "Restaurant · future concept, not a confirmed location",
  },
  {
    src: "/assets/placeholders/truck-concept.png",
    category: "spaces",
    de: "Food-Truck · Zukunftskonzept, kein bestätigter Standort",
    en: "Food truck · future concept, not a confirmed location",
  },
];

// Add approved team or partner photographs with category: "people".
// The People filter stays hidden until at least one entry exists.
