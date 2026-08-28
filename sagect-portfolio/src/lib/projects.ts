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

/**
 * Announced but not shipped. Deliberately not a `Project` — it has no case
 * study, so it can't be routed to or linked from one.
 */
export type UpcomingProject = {
  name: string;
  teaser: string;
  /** Number of placeholder tag slots to shimmer. */
  tagSlots: number;
};

export const UPCOMING: UpcomingProject = {
  name: "Project Sky High",
  teaser: "In the works. More once there's something worth showing.",
  tagSlots: 3,
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "computer-science-girls",
    name: "Computer Science Girls",
    year: "2023–24",
    role: "Design + frontend",
    bg: "#BF9FDB",
    fg: BRAND.ink,
    desc: "A solo rebrand and ground-up rebuild for the UH Computer Science Girls org, replacing a dated WordPress site. Designed in Figma alongside the officer team, with live events pulled from Google Calendar — still running today at csgirls.org, around 100 visits a week.",
    tags: ["React", "TypeScript", "Tailwind"],
    mock: "csg",
    overview:
      "Computer Science Girls at the University of Houston had a WordPress site that had aged out of its own brand — hard to update, harder to look at. I rebuilt it from nothing over two semesters, working with the officer team on the rebrand as I went.",
    stats: [
      { label: "Weekly visits", value: "~100" },
      { label: "Team size", value: "Solo" },
      { label: "Built over", value: "2 semesters" },
    ],
    chapters: [
      {
        title: "The rebrand came first",
        body: "Before any code, the layout and identity went through Figma with the officers. They knew what the org was; my job was to give it a look that matched, and to settle the type, color, and page structure while changes were still cheap.",
      },
      {
        title: "Events without a CMS",
        body: "The site pulls upcoming events straight from the org's Google Calendar. Officers keep using the calendar they already share, and the homepage stays current on its own — no admin panel to maintain, no one to train on it.",
      },
      {
        title: "Four pages, one system",
        body: "Home, About, Officers, and Sponsors, built in React and TypeScript on a shared set of Tailwind components. Small enough to hold in your head, consistent enough that adding a section later doesn't mean redesigning one.",
      },
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind",
      "Google Calendar API",
      "Figma",
    ],
    links: [
      { label: "Live site", href: "https://www.csgirls.org" },
      { label: "Source", href: "https://github.com/SageCT/csgirls-website" },
    ],
  },
  {
    slug: "shastamart",
    name: "Shastamart",
    year: "2024",
    role: "Frontend lead",
    bg: BRAND.green,
    fg: BRAND.ink,
    desc: "A database systems project built with a team of five — storefront, membership tiers, order and shipping flows, and admin reporting over a MySQL backend. I led the front-end design and implementation.",
    tags: ["React", "TypeScript", "MySQL"],
    mock: "mart",
    overview:
      "A semester-long database systems project: five of us built an online grocery store on a normalized MySQL schema. The database was the assignment — the interface was the part that decided whether any of it felt like a real store, and that half was mine to lead.",
    stats: [
      { label: "Team size", value: "5" },
      { label: "Screens", value: "17" },
      { label: "Data models", value: "8" },
    ],
    chapters: [
      {
        title: "A storefront over a course schema",
        body: "Products, cart, payment, shipping, order summary, order history. Every screen maps onto tables we designed for the assignment, so the front end's job was to hide the joins and let someone shop without thinking about them.",
      },
      {
        title: "Members, orders, and an admin side",
        body: "Accounts and membership tiers on one side; a dashboard with supplier management and generated reports on the other. Same component vocabulary across both, so the admin views didn't turn into a separate application.",
      },
      {
        title: "A system five people could build against",
        body: "Tailwind and Radix primitives, forms validated with react-hook-form and zod, client state in zustand. Deciding those once meant teammates could add a screen that matched without asking me how.",
      },
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind", "MySQL", "Vercel"],
    links: [
      { label: "Live site", href: "https://shastamart.vercel.app" },
      {
        label: "Source",
        href: "https://github.com/AlfredoRuiz-CS/TeamProject3380",
      },
    ],
  },
  {
    slug: "ride",
    name: "Ride",
    year: "2024",
    role: "Design + iOS",
    bg: "#89AFDC",
    fg: BRAND.ink,
    desc: "A SwiftUI iOS app built with a partner for a ubiquitous computing course — hail a ride in a luxury vehicle, or rent one outright. I prototyped the interface in Figma and built the Rides tab, the geocoding, and the data layer behind it.",
    tags: ["Swift", "SwiftUI", "MapKit"],
    mock: "ride",
    overview:
      "Uber, but every car that pulls up is one you'd want to be seen in. Two of us built Ride for a ubiquitous computing course — a native iOS app where you either hail a luxury vehicle for the trip or rent one for the week.",
    stats: [
      { label: "Team size", value: "2" },
      { label: "App sections", value: "5" },
      { label: "Built in", value: "10 weeks" },
    ],
    chapters: [
      {
        title: "Figma before Xcode",
        body: "The whole interface was prototyped and clicked through as a mockup first. On a ten-week timeline with two people, arguing about a screen in Figma costs an afternoon; arguing about it in SwiftUI costs a week.",
      },
      {
        title: "The Rides tab, and the map under it",
        body: "My half of the build. MapKit draws the route, Core Location tracks the rider, and reverse geocoding turns raw coordinates into an address you can actually read on a confirmation screen.",
      },
      {
        title: "Rentals alongside rides",
        body: "The same fleet answers two different questions — get me across town, or give me this car for a few days. Sharing the vehicle model between both flows meant one place to add a car, not two.",
      },
    ],
    stack: ["Swift", "SwiftUI", "MapKit", "Core Location", "Firebase", "Figma"],
    links: [
      { label: "Source", href: "https://github.com/JacobUH/RideApp" },
      {
        label: "Figma",
        href: "https://www.figma.com/design/1iJjSb19QvrmgzJcBEDduN/4355-Project",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
