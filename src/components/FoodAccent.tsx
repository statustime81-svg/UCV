import { assets } from "../content/assets";

type FoodAccentProps = {
  pizza?: boolean;
  src?: string;
  spin?: boolean;
};

export default function FoodAccent({
  pizza = true,
  src,
  spin = pizza,
}: FoodAccentProps) {
  const image = src ?? (pizza ? assets.pizzaCutout : assets.burgerAccent);

  return (
    <img
      className="food-accent"
      data-scroll-spin={spin ? true : undefined}
      src={image}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
    />
  );
}
