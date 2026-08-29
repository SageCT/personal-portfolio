import type { Metadata } from "next";
import { BookCard } from "@/components/site/book-card";
import { SectionHead } from "@/components/site/section-head";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { SHELF } from "@/lib/books";

export const metadata: Metadata = {
  title: "Reading · Sage Turner",
  description:
    "Books Sage Turner has been reading, with short reviews — fiction, engineering, and everything in between.",
};

export default function ReadingPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 pt-28 pb-16 md:px-14 md:pt-[132px] md:pb-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            index="/07"
            label={`${SHELF.length} books`}
            title="On the"
            titleAccent="shelf."
            note="What I've been reading lately, and what I thought of it."
          />
          <div className="flex flex-col gap-5">
            {SHELF.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
