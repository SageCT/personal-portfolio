"use client";

import { useState } from "react";
import { PhotoFrame } from "@/components/site/photo-frame";
import { PhotoLightbox } from "@/components/site/photo-lightbox";
import { Reveal } from "@/components/site/reveal";
import type { Photo } from "@/lib/photos";

/**
 * Column masonry. CSS columns rather than a JS layout pass: the frames carry
 * their own aspect ratios, so the browser packs them without measuring, and
 * there's nothing to recompute on resize.
 */
export function PhotoGallery({ photos }: { photos: readonly Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <Reveal
            key={photo.id}
            className="mb-5 break-inside-avoid"
            delay={(i % 3) * 0.06}
            y={28}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open ${photo.title}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[18px] text-left transition-transform duration-[550ms] ease-[var(--ease-house)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
              style={{ border: "1px solid var(--site-line)" }}
            >
              <PhotoFrame photo={photo} />

              {/* Caption rides in from the bottom edge on hover and focus. */}
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-[opacity,transform] duration-[400ms] ease-[var(--ease-house)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top, rgb(0 0 0 / 0.72), transparent)",
                }}
              >
                <span className="block font-serif text-[20px] leading-tight text-white">
                  {photo.title}
                </span>
                <span className="mt-1 block font-mono text-[10.5px] tracking-[1.6px] text-white/65 uppercase">
                  {photo.location} · {photo.year}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <PhotoLightbox
        photos={photos}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
      />
    </>
  );
}
