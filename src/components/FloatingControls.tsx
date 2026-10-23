"use client";
import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { useContent } from '../content/ContentProvider';
import { assets } from '../content/assets';
import { Lang } from '../content/site';
export default function FloatingControls({ l, path = "" }: {
    l: Lang;
    path?: string;
}) {
    const pizza = useRef<HTMLImageElement>(null);
    const { contact } = useContent();
    const floatingFood = path === "fry-rebels"
        ? assets.burgerSpin
        : path === "fresh-crust-pizza"
            ? assets.pizzaCutout
            : path === "bharat-origins"
                ? assets.bharatBiryaniPlate
                : assets.pizzaCutout;
    useEffect(() => {
        const motion = matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0;
        const draw = () => {
            frame = 0;
            if (pizza.current)
                pizza.current.style.transform = `rotate(${motion.matches ? 0 : window.scrollY * .2}deg)`;
        };
        const onScroll = () => {
            if (!frame)
                frame = requestAnimationFrame(draw);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        motion.addEventListener('change', onScroll);
        draw();
        return () => { window.removeEventListener('scroll', onScroll); motion.removeEventListener('change', onScroll); cancelAnimationFrame(frame); };
    }, []);
    return <>{floatingFood && <div className="fixed-pizza" aria-hidden="true"><img ref={pizza} src={floatingFood} alt=""/></div>}<a className="floating-whatsapp" href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={l === 'de' ? 'Partnerschaft auf WhatsApp besprechen' : 'Discuss a partnership on WhatsApp'}><MessageCircle size={27} strokeWidth={1.8}/><span>WhatsApp</span></a></>;
}

