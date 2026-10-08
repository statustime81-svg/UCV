"use client";
import { createContext, useContext } from 'react';
import { Content, defaults } from './cms';
import { Lang } from './site';
const Context = createContext<Content>(defaults);
export function ContentProvider({ content, children }: {
    content: Content;
    children: React.ReactNode;
}) { return <Context.Provider value={content}>{children}</Context.Provider>; }
export function useContent() { const content = useContext(Context); return { content, pick: (l: Lang, de: string, en: string) => content.texts[de]?.[l] ?? (l === 'de' ? de : en), contact: { email: content.settings.email, phone: content.settings.phone, whatsapp: content.settings.whatsapp } }; }

