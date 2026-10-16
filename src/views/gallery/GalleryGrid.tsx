"use client";

import { useRef, useState, type CSSProperties } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../../components/ui/dialog";
import { X } from "lucide-react";
import type { Lang } from "../../content/site";
import { galleryImages } from "../../content/gallery";

type Photo = (typeof galleryImages)[number];

const categories = [
  ["all", "Alle", "All"],
  ["food", "Food", "Food"],
  ["spaces", "Räume", "Spaces"],
  ["people", "Menschen", "People"],
] as const;

type GalleryFilter = (typeof categories)[number][0];

export default function GalleryGrid({
  l,
  preview = false,
}: {
  l: Lang;
  preview?: boolean;
}) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [selected, setSelected] = useState<Photo | null>(null);

  const opener = useRef<HTMLButtonElement | null>(null);

  // Show a category only when it contains an image.
  const availableCategories = categories.filter(
    ([key]) =>
      key === "all" ||
      galleryImages.some((photo) => photo.category === key)
  );

  const activeFilter = availableCategories.some(
    ([key]) => key === filter
  )
    ? filter
    : "all";

  // Homepage preview always uses the first three gallery images.
  const items = preview
    ? galleryImages
    : galleryImages.filter(
        (photo) =>
          activeFilter === "all" ||
          photo.category === activeFilter
      );

  const visibleItems = preview ? items.slice(0, 3) : items;

  return (
    <>
      {!preview && galleryImages.length > 0 && (
        <div
          className="gallery-filters"
          role="group"
          aria-label={
            l === "de" ? "Galeriefilter" : "Gallery filters"
          }
        >
          {availableCategories.map(([key, de, en]) => (
            <button
              key={key}
              type="button"
              aria-pressed={activeFilter === key}
              onClick={() => setFilter(key)}
            >
              {l === "de" ? de : en}
            </button>
          ))}
        </div>
      )}

      <div className="gallery-grid">
        {visibleItems.map((photo, index) => {
          const caption = l === "de" ? photo.de : photo.en;

          return (
            <figure
              key={photo.src}
              className="gallery-shot"
              data-reveal
              style={
                {
                  "--delay": `${Math.min(index, 5) * 70}ms`,
                } as CSSProperties
              }
            >
              <button
                type="button"
                className="gallery-open"
                aria-haspopup="dialog"
                aria-label={`${
                  l === "de"
                    ? "Bild vergrößern"
                    : "Enlarge image"
                }: ${caption}`}
                onClick={(event) => {
                  opener.current = event.currentTarget;
                  setSelected(photo);
                }}
              >
                <img
                  src={photo.src}
                  alt={caption}
                  loading="lazy"
                  decoding="async"
                />

                <span
                  className="gallery-zoom"
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <figcaption>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {caption}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {visibleItems.length === 0 && (
        <p role="status">
          {l === "de"
            ? "Für diese Kategorie sind noch keine Bilder vorhanden."
            : "There are no images in this category yet."}
        </p>
      )}

      {!preview && visibleItems.length > 0 && (
        <p className="gallery-note">
          {l === "de"
            ? "Als Konzeptbilder gekennzeichnete Darstellungen zeigen gestalterische Ideen. Sie sind keine Fotos bestätigter Betriebsstandorte."
            : "Images labelled as concepts illustrate design ideas. They are not photographs of confirmed operating locations."}
        </p>
      )}

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          className="gallery-lightbox"
          showCloseButton={false}
          onCloseAutoFocus={(event) => {
            if (opener.current?.isConnected) {
              event.preventDefault();
              opener.current.focus();
            }
          }}
        >
          <DialogTitle>
            {selected
              ? l === "de"
                ? selected.de
                : selected.en
              : l === "de"
                ? "Galeriebild"
                : "Gallery image"}
          </DialogTitle>

          <DialogDescription className="sr-only">
            {l === "de"
              ? "Vergrößerte Galerieansicht. Mit der Escape-Taste oder der Schließen-Schaltfläche schließen."
              : "Enlarged gallery view. Close using the Escape key or the close button."}
          </DialogDescription>

          <DialogClose
            className="partner-dialog-close"
            aria-label={
              l === "de" ? "Bild schließen" : "Close image"
            }
          >
            <X size={23} aria-hidden="true" />
          </DialogClose>

          {selected && (
            <img
              src={selected.src}
              alt={l === "de" ? selected.de : selected.en}
              decoding="async"
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "75vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                marginInline: "auto",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
