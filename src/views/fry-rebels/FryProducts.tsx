"use client";

import type { Lang } from "../../content/site";
import { useContent } from "../../content/ContentProvider";

type Product = {
  image: string;
  de: string;
  en: string;
  categoryDe: string;
  categoryEn: string;
};

const products: Product[] = [
  { image: "rebel-feast.webp", de: "Rebel Feast", en: "Rebel feast", categoryDe: "Auswahl", categoryEn: "Selection" },
  { image: "nuggets.webp", de: "Chicken Nuggets", en: "Chicken nuggets", categoryDe: "Chicken", categoryEn: "Chicken" },
  { image: "fries.webp", de: "Pommes", en: "Fries", categoryDe: "Beilagen", categoryEn: "Sides" },
  { image: "chicken-tenders.webp", de: "Chicken Tenders", en: "Chicken tenders", categoryDe: "Chicken", categoryEn: "Chicken" },
  { image: "coleslaw.webp", de: "Coleslaw", en: "Coleslaw", categoryDe: "Beilagen", categoryEn: "Sides" },
  { image: "hot-wings.webp", de: "Hot Wings", en: "Hot wings", categoryDe: "Chicken", categoryEn: "Chicken" },
  { image: "onion-rings.webp", de: "Zwiebelringe", en: "Onion rings", categoryDe: "Beilagen", categoryEn: "Sides" },
  { image: "loaded-fries.webp", de: "Loaded Fries", en: "Loaded fries", categoryDe: "Beilagen", categoryEn: "Sides" },
  { image: "sharing-selection.webp", de: "Sharing Auswahl", en: "Sharing selection", categoryDe: "Zum Teilen", categoryEn: "For sharing" },
  { image: "meal-for-two.webp", de: "Meal Deal für Zwei", en: "Meal deal for two", categoryDe: "Menüidee", categoryEn: "Meal idea" },
  { image: "family-mix.webp", de: "Family Mix", en: "Family mix", categoryDe: "Zum Teilen", categoryEn: "For sharing" },
  { image: "family-nuggets.webp", de: "Family Nuggets", en: "Family nuggets", categoryDe: "Zum Teilen", categoryEn: "For sharing" },
  { image: "bucket-mix.webp", de: "Rebels Bucket Mix", en: "Rebels bucket mix", categoryDe: "Zum Teilen", categoryEn: "For sharing" },
  { image: "planted-hot-rebel-burger.webp", de: "Planted Hot Rebel Burger", en: "Planted Hot Rebel burger", categoryDe: "Burger", categoryEn: "Burgers" },
  { image: "farmhouse-veggie-burger.webp", de: "Farmhouse Veggie Burger", en: "Farmhouse veggie burger", categoryDe: "Veggie Burger", categoryEn: "Veggie burger" },
  { image: "white-bbq-veggie-burger.webp", de: "White BBQ Veggie Burger", en: "White BBQ veggie burger", categoryDe: "Veggie Burger", categoryEn: "Veggie burger" },
  { image: "planted-burger.webp", de: "Planted Burger", en: "Planted burger", categoryDe: "Veggie Burger", categoryEn: "Veggie burger" },
  { image: "chocolate-cookie.webp", de: "Schoko Cookie", en: "Chocolate cookie", categoryDe: "Süßes", categoryEn: "Sweet treat" },
  { image: "choc-chip-cookie.webp", de: "Chocolate Chip Cookie", en: "Chocolate chip cookie", categoryDe: "Süßes", categoryEn: "Sweet treat" },
];

export default function FryProducts({ l }: { l: Lang }) {
  const { pick } = useContent();

  return (
    <section className="section fry-products" aria-labelledby="fry-products-title">
      <div className="fry-products-heading" data-reveal>
        <span className="eyebrow">FRY REBELS / {pick(l, "PRODUKTIDEEN", "PRODUCT INSPIRATION")}</span>
        <h2 id="fry-products-title">
          {pick(l, "Knusprige Favoriten.\nViele Möglichkeiten.", "Crispy favourites.\nPlenty of choice.")}
        </h2>
        <p>
          {pick(
            l,
            "Eine Auswahl der bereitgestellten Produktbilder. Das konkrete Launch-Menü, die Rezepturen und Preise werden vor dem Start gemeinsam bestätigt.",
            "A selection of the supplied product images. The final launch menu, recipes, and prices will be confirmed together before launch."
          )}
        </p>
      </div>

      <div className="fry-products-grid">
        {products.map((product, index) => (
          <article
            className="fry-product-card"
            key={product.image}
            data-reveal
            style={{ "--delay": `${(index % 4) * 55}ms` } as React.CSSProperties}
          >
            <div className="fry-product-image">
              <img
                src={`/assets/fry-rebels/products/${product.image}`}
                alt={pick(l, product.de, product.en)}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="fry-product-index">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="fry-product-copy">
              <span>{pick(l, product.categoryDe, product.categoryEn)}</span>
              <h3>{pick(l, product.de, product.en)}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
