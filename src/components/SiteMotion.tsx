"use client";
import { useEffect, useRef } from 'react';
export default function SiteMotion() {
    const cursor = useRef<HTMLDivElement>(null);
    const progress = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const coarse = matchMedia('(pointer: coarse)').matches;
        document.documentElement.classList.add('motion-ready');
        const targets = document.querySelectorAll<HTMLElement>('[data-reveal], main section, main article, main figure');
        const observer = new IntersectionObserver(items => items.forEach(item => {
            if (item.isIntersecting) {
                item.target.classList.add('is-visible');
                observer.unobserve(item.target);
            }
        }), { threshold: .1, rootMargin: '0px 0px -25px 0px' });
        targets.forEach(el => { el.setAttribute('data-reveal', ''); reduce ? el.classList.add('is-visible') : observer.observe(el); });
        const mutations = new MutationObserver(() => document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach(el => observer.observe(el)));
        mutations.observe(document.getElementById('main')!, { childList: true, subtree: true });
        let frame = 0;
        let lastX = 0, lastY = 0;
        const move = (e: PointerEvent) => {
            if (coarse || reduce)
                return;
            lastX = e.clientX;
            lastY = e.clientY;
            if (frame)
                return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                document.documentElement.style.setProperty('--pointer-x', String((lastX / innerWidth - .5) * 2));
                document.documentElement.style.setProperty('--pointer-y', String((lastY / innerHeight - .5) * 2));
                if (cursor.current) {
                    cursor.current.style.transform = `translate3d(${lastX}px,${lastY}px,0)`;
                    const target = document.elementFromPoint(lastX, lastY)?.closest('[data-cursor]');
                    cursor.current.classList.toggle('cursor-active', !!target);
                    cursor.current.textContent = target?.getAttribute('data-cursor') || '';
                }
            });
        };
        const scroll = () => {
            const range = document.documentElement.scrollHeight - innerHeight;
            progress.current?.style.setProperty('transform', `scaleX(${range > 0 ? scrollY / range : 0})`);
            if (!reduce) {
                document.documentElement.style.setProperty('--scroll-y', String(scrollY));
                document.querySelectorAll<HTMLElement>('[data-scroll-spin]').forEach(el => el.style.setProperty('--spin', `${(innerHeight - el.getBoundingClientRect().top) * .16}deg`));
            }
        };
        window.addEventListener('pointermove', move, { passive: true });
        window.addEventListener('scroll', scroll, { passive: true });
        scroll();
        return () => { observer.disconnect(); mutations.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); window.removeEventListener('scroll', scroll); document.documentElement.classList.remove('motion-ready'); };
    }, []);
    return <><div className="reading-progress" ref={progress} aria-hidden="true"/><div className="custom-cursor" ref={cursor} aria-hidden="true"/></>;
}

