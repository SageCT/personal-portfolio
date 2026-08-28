import { BRAND } from "@/components/site/brand";
import type { MockKind } from "@/components/site/project-mock";

export type Project = {
  /** Route segment: /work/[slug] */
  slug: string;
  name: string;
  year: string;
  role: string;
  /** Card surface — also the color the page transition floods with. */
  bg: string;
  /** Ink that reads on `bg`. */
  fg: string;
  desc: string;
  tags: readonly string[];
  mock: MockKind;
  /** Case-study body. */
  overview: string;
  stats: readonly { label: string; value: string }[];
  chapters: readonly { title: string; body: string }[];
  stack: readonly string[];
  links: readonly { label: string; href: string }[];
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "computer-science-girls",
    name: "Computer Science Girls",
    year: "2025",
    role: "Lead developer",
    bg: BRAND.yellow,
    fg: BRAND.ink,
    desc: "A rebrand and ground-up site for the UH CSG org — events, member directory, and a resource library the board can actually maintain.",
    tags: ["React", "TanStack", "Tailwind"],
    mock: "csg",
    overview:
      "CSG had a Wix site nobody could edit and a board that turned over every May. The brief was a site that survives handoff: new officers should be able to post an event without opening an editor, and the brand should still look like itself three years from now.",
    stats: [
      { label: "Active members", value: "180+" },
      { label: "Events shipped", value: "24/yr" },
      { label: "Lighthouse", value: "98" },
    ],
    chapters: [
      {
        title: "A brand before a build",
        body: "I started with type and color, not components. One serif, one mono, five brand colors — enough of a system that every later screen had an obvious answer, and little enough that the board can't paint themselves into a corner.",
      },
      {
        title: "Content the board owns",
        body: "Events, officers, and resources live in typed content files with a schema. A pull request template walks a non-engineer through adding an event; CI catches the shape mistakes before anything ships.",
      },
      {
        title: "Fast by default",
        body: "Routes prefetch on intent, images are sized at build, and the whole thing is static except the member directory. First load is under 40kb of JS.",
      },
    ],
    stack: ["React", "TanStack Router", "Tailwind", "Vite", "Cloudflare Pages"],
    links: [{ label: "Live site", href: "#" }],
  },
  {
    slug: "shastamart",
    name: "Shastamart",
    year: "2024",
    role: "Fullstack",
    bg: BRAND.green,
    fg: BRAND.ink,
    desc: "Online grocery with live inventory, delivery windows, and a checkout flow that gets out of the way.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    mock: "mart",
    overview:
      "Grocery is the hardest e-commerce category: carts are enormous, inventory moves by the minute, and a substitution can lose the customer. Shastamart is my answer to what that flow should feel like when the software stops arguing with you.",
    stats: [
      { label: "Cart median", value: "31 items" },
      { label: "Checkout steps", value: "2" },
      { label: "p95 search", value: "80ms" },
    ],
    chapters: [
      {
        title: "Inventory that tells the truth",
        body: "Stock counts stream over a Postgres LISTEN/NOTIFY channel into the cart. When something goes out of stock while you shop, the line item says so in place instead of failing at checkout.",
      },
      {
        title: "Delivery windows as a first-class object",
        body: "Slots are capacity, not calendar decoration. Reserving a window holds it for ten minutes with a Postgres advisory lock, so two people can't claim the last 4pm van.",
      },
      {
        title: "Two-step checkout",
        body: "Address and payment collapse into one screen backed by Stripe Payment Element. Everything else — substitutions, tips, notes — is editable after the order is placed, up until the picker starts.",
      },
    ],
    stack: ["Next.js", "PostgreSQL", "Drizzle", "Stripe", "Redis", "Fly.io"],
    links: [{ label: "Source", href: "#" }],
  },
  {
    slug: "ride",
    name: "Ride",
    year: "2024",
    role: "Mobile + backend",
    bg: BRAND.red,
    fg: "#FFFFFF",
    desc: "A ride-hailing clone built to understand the hard parts: real-time driver matching, geofencing, surge pricing.",
    tags: ["React Native", "Go", "Redis"],
    mock: "ride",
    overview:
      "I built Ride to learn the parts of dispatch nobody blogs about — how you match a rider to a driver in under a second, what happens when the driver's phone drops off LTE mid-trip, and how surge stays fair instead of just expensive.",
    stats: [
      { label: "Match latency", value: "<900ms" },
      { label: "Sim drivers", value: "2,000" },
      { label: "Geohash depth", value: "7" },
    ],
    chapters: [
      {
        title: "Matching on a geospatial index",
        body: "Driver pings land in a Redis geospatial set keyed by city. A request pulls the k nearest, scores them on ETA and acceptance history, and offers in waves rather than all at once.",
      },
      {
        title: "Trips that survive bad networks",
        body: "The driver app writes to a local queue and reconciles on reconnect. The server treats trip state as an append-only log, so a duplicated or late event can never move a trip backwards.",
      },
      {
        title: "Surge you can explain",
        body: "Multipliers come from a supply/demand ratio per geohash cell, smoothed over five minutes and capped. The rider sees the reason, not just the number.",
      },
    ],
    stack: ["React Native", "Go", "Redis", "PostGIS", "gRPC", "Docker"],
    links: [{ label: "Source", href: "#" }],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
