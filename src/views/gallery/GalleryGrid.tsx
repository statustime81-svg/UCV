"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../../components/ui/dialog";
import { X } from "lucide-react";
import { Lang } from "../../content/site";
import { galleryImages } from "../../content/gallery";

type Photo = (typeof galleryImages)[number];

export default function GalleryGrid({
  l,
  preview = false,
}: {
  l: Lang;
  preview?: boolean;
}) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Photo | null>(null);

  const items = galleryImages.filter(
    (image) => filter === "all" || image.category === filter,
  );
  const visibleItems = preview ? items.slice(0, 3) : items;

  return (
    <>
      {!preview && (
        <div
          className="gallery-filters"
          aria-label={l === "de" ? "Galeriefilter" : "Gallery filters"}
        >
          {[
            ["all", "Alle", "All"],
            ["food", "Food", "Food"],
            ["spaces", "Räume", "Spaces"],
            ["people", "Menschen", "People"],
          ].map(([key, de, en]) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {l === "de" ? de : en}
            </button>
          ))}
        </div>
      )}

      <div className="gallery-grid">
        {visibleItems.map((photo, index) => (
          <figure
            key={photo.src}
            className="gallery-shot"
            data-reveal
            style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
          >
            <button
              type="button"
              className="gallery-open"
              onClick={() => setSelected(photo)}
              aria-label={`${l === "de" ? "Bild vergrößern" : "Enlarge image"}: ${l === "de" ? photo.de : photo.en}`}
            >
              <img
                src={photo.src}
                alt={l === "de" ? photo.de : photo.en}
                loading="lazy"
              />
              <span className="gallery-zoom" aria-hidden="true">
                +
              </span>
            </button>
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {l === "de" ? photo.de : photo.en}
            </figcaption>
          </figure>
        ))}
      </div>

      {!visibleItems.length && (
        <p>
          {l === "de"
            ? "Für diese Kategorie sind noch keine Bilder vorhanden."
            : "There are no images in this category yet."}
        </p>
      )}

      {!preview && (
        <p className="gallery-note">
          {l === "de"
            ? "Vorläufige Food- und Designkonzepte. Keine bestätigten Betriebsstandorte."
            : "Temporary food and design concepts. No confirmed operating locations."}
        </p>
      )}

      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent
          className="gallery-lightbox"
          showCloseButton={false}
        >
          <DialogTitle>
            {selected && (l === "de" ? selected.de : selected.en)}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {l === "de" ? "Vergrößerte Galerieansicht" : "Enlarged gallery view"}
          </DialogDescription>
          <DialogClose
            className="partner-dialog-close"
            aria-label={l === "de" ? "Bild schließen" : "Close image"}
          >
            <X size={23} />
          </DialogClose>
          {selected && (
            <img
              src={selected.src}
              alt={l === "de" ? selected.de : selected.en}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
