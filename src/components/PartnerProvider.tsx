"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../components/ui/dialog";

import { X } from "lucide-react";
import EnquiryForm from "../views/partner/EnquiryForm";
import type { Lang } from "../content/site";

export type PartnerBrand =
  | "fry-rebels"
  | "fresh-crust-pizza"
  | "";

// Existing buttons can continue calling usePartner() as before.
const PartnerContext = createContext<() => void>(() => {});

// The enquiry form will use this to read the selected brand.
const PartnerBrandContext = createContext<PartnerBrand>("");

export const usePartner = () => useContext(PartnerContext);

export const usePartnerBrand = () =>
  useContext(PartnerBrandContext);

// Called only when the user opens the popup.
function getBrandFromCurrentPage(): PartnerBrand {
  const segments = window.location.pathname
    .split("/")
    .filter(Boolean);

  const currentPage = segments[segments.length - 1];

  if (currentPage === "fry-rebels") {
    return "fry-rebels";
  }

  if (currentPage === "fresh-crust-pizza") {
    return "fresh-crust-pizza";
  }

  return "";
}

type PartnerProviderProps = {
  children: ReactNode;
  l: Lang;
};

export default function PartnerProvider({
  children,
  l,
}: PartnerProviderProps) {
  const [open, setOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] =
    useState<PartnerBrand>("");

  const opener = useRef<HTMLElement | null>(null);

  const openPartner = useCallback(() => {
    opener.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setSelectedBrand(getBrandFromCurrentPage());
    setOpen(true);
  }, []);

  return (
    <PartnerContext.Provider value={openPartner}>
      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="partner-dialog"
          showCloseButton={false}
          onCloseAutoFocus={(event) => {
            if (opener.current?.isConnected) {
              event.preventDefault();
              opener.current.focus();
            }
          }}
        >
          <DialogTitle className="sr-only">
            {l === "de"
              ? "Unverbindliche Partneranfrage"
              : "Non-binding partnership enquiry"}
          </DialogTitle>

          <DialogDescription className="sr-only">
            {l === "de"
              ? "Erzähl uns kurz von deinem Restaurant. Wir prüfen, ob eines unserer Konzepte zu deiner Küche passt, und besprechen die nächsten Schritte mit dir."
              : "Tell us briefly about your restaurant. We will assess whether one of our concepts fits your kitchen and discuss the next steps with you."}
          </DialogDescription>

          <DialogClose
            className="partner-dialog-close"
            aria-label={
              l === "de" ? "Formular schließen" : "Close form"
            }
          >
            <X size={23} aria-hidden="true" />
          </DialogClose>

          <PartnerBrandContext.Provider value={selectedBrand}>
            {open && <EnquiryForm l={l} />}
          </PartnerBrandContext.Provider>
        </DialogContent>
      </Dialog>
    </PartnerContext.Provider>
  );
}
