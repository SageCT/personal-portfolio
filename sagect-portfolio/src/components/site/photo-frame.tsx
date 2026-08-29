import Image from "next/image";
import type { Photo } from "@/lib/photos";

/**
 * One photograph, at its own aspect ratio.
 *
 * Until a `src` lands on the entry this paints a placeholder built from the
 * photo's `tone` — the layout is real even though the image isn't, so the grid
 * can be judged now and the files dropped in later.
 */
export function PhotoFrame({
  photo,
  /** Lightbox frames get priority loading and unconstrained height. */
  variant = "tile",
}: {
  photo: Photo;
  variant?: "tile" | "full";
}) {
  const [w, h] = photo.aspect;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${w} / ${h}`, background: photo.tone[0] }}
    >
      {photo.src ? (
        <Image
          src={photo.src}
          alt={`${photo.title} — ${photo.location}`}
          fill
          className="object-cover"
          sizes={
            variant === "full"
              ? "90vw"
              : "(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          }
          preload={variant === "full"}
        />
      ) : (
        <Placeholder photo={photo} />
      )}
    </div>
  );
}

/** Stand-in art: a two-stop wash, a soft light source, and the frame's title. */
function Placeholder({ photo }: { photo: Photo }) {
  const [dark, light] = photo.tone;

  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{
        background: `linear-gradient(155deg, ${dark} 0%, ${dark} 34%, ${light} 140%)`,
      }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-[18%] -right-[12%] size-[62%] rounded-full blur-[42px]"
        style={{ background: light, opacity: 0.34 }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(112deg, rgb(255 255 255 / 0.045) 0 1px, transparent 1px 7px)",
        }}
      />
      <div
        className="relative px-5 text-center font-mono text-[10px] tracking-[2px] uppercase"
        style={{ color: "rgb(255 255 255 / 0.62)" }}
      >
        <p>{photo.id}</p>
        <p className="mt-1.5" style={{ color: "rgb(255 255 255 / 0.34)" }}>
          Frame pending
        </p>
      </div>
    </div>
  );
}
