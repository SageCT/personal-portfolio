import { Star } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { type Book, STATUS_LABEL } from "@/lib/books";

/** One book: jacket on the left, the review on the right. */
export function BookCard({ book, index }: { book: Book; index: number }) {
  return (
    <Reveal delay={0.04} y={30}>
      <article
        className="grid gap-6 rounded-[22px] p-6 transition-[transform,box-shadow] duration-[550ms] ease-[var(--ease-house)] hover:-translate-y-[3px] hover:shadow-[0_24px_50px_-30px_rgb(0_0_0/0.4)] sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-8 md:p-8"
        style={{
          background: "var(--site-elev)",
          border: "1px solid var(--site-line)",
        }}
      >
        <Jacket book={book} />

        <div className="min-w-0">
          <div
            className="mb-3.5 flex flex-wrap items-center gap-3 font-mono text-[10.5px] tracking-[1.8px] uppercase"
            style={{ color: "var(--site-muted)" }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span
              className="h-px w-[18px]"
              style={{ background: "var(--site-line)" }}
            />
            <span>{STATUS_LABEL[book.status]}</span>
            <span>·</span>
            <span>{book.date}</span>
          </div>

          <h3 className="font-serif text-[clamp(26px,3.2vw,38px)] leading-[1.05] tracking-[-0.5px] text-balance">
            {book.title}
          </h3>
          <p
            className="mt-1.5 text-[15px]"
            style={{ color: "var(--site-muted)" }}
          >
            {book.author}
          </p>

          {book.rating !== undefined && <Rating value={book.rating} />}

          <p className="mt-4 text-[16px] leading-[1.6] text-pretty">
            {book.review}
          </p>

          {book.quote && (
            <blockquote
              className="mt-5 border-l-2 pl-4 font-serif text-[19px] italic"
              style={{
                borderLeftColor: "var(--color-brand-yellow)",
                color: "var(--site-muted)",
              }}
            >
              &ldquo;{book.quote}&rdquo;
            </blockquote>
          )}

          <ul className="mt-5 flex flex-wrap gap-[7px]">
            {book.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full px-[11px] py-1.5 font-mono text-[10.5px] tracking-[0.6px]"
                style={{
                  border: "1px solid var(--site-line)",
                  color: "var(--site-muted)",
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

/** Real jacket if there is one, otherwise a generated spine-and-wash stand-in. */
function Jacket({ book }: { book: Book }) {
  const [dark, light] = book.tone;

  return (
    <div
      className="relative aspect-2/3 w-[104px] shrink-0 overflow-hidden rounded-[6px] shadow-[0_14px_28px_-16px_rgb(0_0_0/0.55)] sm:w-full"
      style={{ background: dark }}
    >
      {book.cover ? (
        <Image
          src={book.cover}
          alt={`${book.title} by ${book.author}`}
          fill
          className="object-cover"
          sizes="132px"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-end p-3"
          style={{
            background: `linear-gradient(150deg, ${dark} 0%, ${dark} 42%, ${light} 145%)`,
          }}
        >
          {/* The spine — a book read from across the room. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-[7px]"
            style={{ background: "rgb(0 0 0 / 0.28)" }}
          />
          <span
            className="font-serif text-[13px] leading-tight"
            style={{ color: "rgb(255 255 255 / 0.82)" }}
          >
            {book.title}
          </span>
        </div>
      )}
    </div>
  );
}

/** Five stars, halves included. */
function Rating({ value }: { value: number }) {
  return (
    <div
      className="mt-3 flex items-center gap-1"
      role="img"
      aria-label={`Rated ${value} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(Math.max(value - i, 0), 1);
        return (
          <span key={i} className="relative block size-[15px]">
            <Star
              className="absolute inset-0 size-[15px]"
              style={{ color: "var(--site-line)" }}
              fill="currentColor"
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star
                className="size-[15px]"
                style={{ color: "var(--color-brand-yellow)" }}
                fill="currentColor"
              />
            </span>
          </span>
        );
      })}
      <span
        className="ml-1.5 font-mono text-[10.5px] tracking-[1.4px]"
        style={{ color: "var(--site-muted)" }}
      >
        {value.toFixed(1)}
      </span>
    </div>
  );
}
