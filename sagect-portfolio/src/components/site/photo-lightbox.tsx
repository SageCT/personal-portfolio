"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { PhotoFrame } from "@/components/site/photo-frame";
import type { Photo } from "@/lib/photos";

type LightboxProps = {
  photos: readonly Photo[];
  /** Index of the open photo, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

/** Full-screen viewer: arrow keys, Escape, swipe, and a wrapping counter. */
export function PhotoLightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const open = index !== null;
  const photo = open ? photos[index] : null;
  const touchStart = useRef<number | null>(null);

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + photos.length) % photos.length);
    },
    [index, onNavigate, photos.length],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    // Freeze the page behind the overlay, and restore whatever was there.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, step]);

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col backdrop-blur-[18px]"
          style={{ background: "color-mix(in srgb, #0b0a0e 88%, transparent)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={`${photo.title} — photo ${index + 1} of ${photos.length}`}
          onTouchStart={(e) => {
            touchStart.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const from = touchStart.current;
            touchStart.current = null;
            if (from === null) return;
            const dx = e.changedTouches[0].clientX - from;
            if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 font-mono text-[11px] tracking-[2px] text-white/60 uppercase md:px-9">
            <span>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close photo"
              className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Clicking the empty space around the frame closes; the figure
              itself is not a target, so no nested interactive element. */}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape and the close button carry the keyboard path */}
          {/* biome-ignore lint/a11y/noStaticElementInteractions: dismiss surface, not a control */}
          <div
            className="flex min-h-0 flex-1 cursor-zoom-out items-center justify-center px-5 md:px-16"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.34, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex max-h-full w-full max-w-[1000px] cursor-default flex-col items-center"
            >
              <div
                className="max-h-[68vh] w-auto overflow-hidden rounded-[14px] shadow-[0_40px_90px_-40px_rgb(0_0_0/0.9)]"
                style={{
                  aspectRatio: `${photo.aspect[0]} / ${photo.aspect[1]}`,
                }}
              >
                <PhotoFrame photo={photo} variant="full" />
              </div>
              <figcaption className="mt-6 max-w-[540px] text-center text-white">
                <p className="font-serif text-[26px] leading-tight">
                  {photo.title}
                </p>
                <p className="mt-1.5 text-[14px] text-white/60">
                  {photo.location} · {photo.year}
                </p>
                {(photo.camera || photo.settings) && (
                  <p className="mt-3 font-mono text-[10.5px] tracking-[1.6px] text-white/40 uppercase">
                    {[photo.camera, photo.settings].filter(Boolean).join(" · ")}
                  </p>
                )}
              </figcaption>
            </motion.figure>
          </div>

          <div className="flex items-center justify-center gap-4 px-5 py-6">
            <NavButton label="Previous photo" onClick={() => step(-1)}>
              <ArrowLeft className="size-4" />
            </NavButton>
            <NavButton label="Next photo" onClick={() => step(1)}>
              <ArrowRight className="size-4" />
            </NavButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition-[background,transform] duration-[250ms] hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {children}
    </button>
  );
}
