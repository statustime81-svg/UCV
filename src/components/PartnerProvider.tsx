"use client";
import { createContext, useContext, useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../components/ui/dialog';
import { X } from 'lucide-react';
import EnquiryForm from '../views/partner/EnquiryForm';
import { Lang } from '../content/site';
const PartnerContext = createContext<() => void>(() => { });
export const usePartner = () => useContext(PartnerContext);
export default function PartnerProvider({ children, l }: {
    children: React.ReactNode;
    l: Lang;
}) {
    const [open, setOpen] = useState(false);
    const opener = useRef<HTMLElement | null>(null);
    return <PartnerContext.Provider value={() => { opener.current = document.activeElement as HTMLElement; setOpen(true); }}>{children}<Dialog open={open} onOpenChange={setOpen}><DialogContent className="partner-dialog" showCloseButton={false} onCloseAutoFocus={e => { e.preventDefault(); opener.current?.focus(); }}><DialogTitle className="sr-only">{l === 'de' ? 'Partneranfrage' : 'Partnership enquiry'}</DialogTitle><DialogDescription className="sr-only">{l === 'de' ? 'Stelle uns dein Restaurant vor.' : 'Tell us about your restaurant.'}</DialogDescription><DialogClose className="partner-dialog-close" aria-label={l === 'de' ? 'Formular schließen' : 'Close form'}><X size={23}/></DialogClose>{open && <EnquiryForm l={l}/>}</DialogContent></Dialog></PartnerContext.Provider>;
}

