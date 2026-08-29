/**
 * The reading shelf.
 *
 * Covers are generated from `tone` rather than fetched — no publisher image
 * rights to worry about, and the shelf stays consistent. Set `cover` to a file
 * under `public/books/` on any entry to use a real jacket instead.
 */
export type BookStatus = "reading" | "finished" | "next";

export type Book = {
  /** Stable key. */
  id: string;
  title: string;
  author: string;
  /** Out of five. Half stars allowed; omit for books not yet finished. */
  rating?: number;
  status: BookStatus;
  /** When it was finished, or started for a book in progress. */
  date: string;
  /** Two stops, dark to light — seeds the generated jacket. */
  tone: readonly [string, string];
  cover?: string;
  tags: readonly string[];
  /** The review. A paragraph or two — this is the point of the page. */
  review: string;
  /** Optional line worth keeping. */
  quote?: string;
};

export const BOOKS: readonly Book[] = [
  {
    id: "a-place-holder",
    title: "A Placeholder Title",
    author: "Author Name",
    status: "reading",
    date: "Started August 2026",
    tone: ["#1d2b3a", "#54b0d5"],
    tags: ["Non-fiction", "Systems"],
    review:
      "Swap this entry for whatever is actually on the nightstand. A good review here runs two or three sentences: what the book is doing, whether it pulls it off, and who it's for. Long enough to be worth reading, short enough that a dozen of them still scan.",
  },
  {
    id: "the-pragmatic-programmer",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    rating: 4.5,
    status: "finished",
    date: "July 2026",
    tone: ["#2a2118", "#f0b501"],
    tags: ["Craft", "Reread"],
    review:
      "Holds up better than most books of its era because it argues about habits rather than tools. The chapters on tracer bullets and orthogonality changed how I scope a first pass — build the thin end-to-end path, then thicken it. Half a star off for the sections that have aged into folklore.",
    quote: "Don't live with broken windows.",
  },
  {
    id: "designing-data-intensive-applications",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    rating: 5,
    status: "finished",
    date: "May 2026",
    tone: ["#160f1c", "#3b7ded"],
    tags: ["Distributed systems", "Reference"],
    review:
      "The rare technical book that earns being read cover to cover and then kept within reach. Kleppmann builds up from storage engines to consensus without ever hand-waving the tradeoff, and the replication chapters made a class of production bug legible to me for the first time.",
    quote:
      "Reliability means making systems work correctly, even when faults occur.",
  },
  {
    id: "piranesi",
    title: "Piranesi",
    author: "Susanna Clarke",
    rating: 4.5,
    status: "finished",
    date: "March 2026",
    tone: ["#12211a", "#60c166"],
    tags: ["Fiction", "Fantasy"],
    review:
      "A short novel that trusts you to sit in confusion for a hundred pages, and pays it back completely. The narrator's voice is the whole trick — gentle, meticulous, and slowly revealing more than he understands. Finished it in two sittings and immediately wanted to reread the opening.",
  },
  {
    id: "the-staff-engineers-path",
    title: "The Staff Engineer's Path",
    author: "Tanya Reilly",
    rating: 4,
    status: "finished",
    date: "January 2026",
    tone: ["#241016", "#bf9fdb"],
    tags: ["Career", "Non-fiction"],
    review:
      "Concrete where most career books are vague: what the job actually consists of once writing code stops being the bulk of it. The sections on choosing what not to work on were the useful ones for me. Occasionally repeats itself, but never wastes a chapter.",
  },
  {
    id: "next-up",
    title: "Another Placeholder",
    author: "Author Name",
    status: "next",
    date: "Up next",
    tone: ["#1a1a1e", "#8f93a8"],
    tags: ["To read"],
    review:
      'Queued but unopened. Entries with status "next" render without a rating and sit at the end of the shelf — a way to show what\'s coming without pretending to have an opinion yet.',
  },
] as const;

/** Shelf order: in progress first, then finished, then the queue. */
const ORDER: Record<BookStatus, number> = { reading: 0, finished: 1, next: 2 };

export const SHELF: readonly Book[] = [...BOOKS].sort(
  (a, b) => ORDER[a.status] - ORDER[b.status],
);

export const STATUS_LABEL: Record<BookStatus, string> = {
  reading: "Currently reading",
  finished: "Finished",
  next: "Up next",
};
