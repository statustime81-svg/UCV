import { assets } from '../content/assets';
export default function FoodAccent({ pizza = true }: {
    pizza?: boolean;
}) { return <img className="food-accent" data-scroll-spin={pizza ? true : undefined} src={pizza ? assets.pizzaCutout : assets.burgerAccent} alt="" aria-hidden="true" loading="lazy"/>; }
