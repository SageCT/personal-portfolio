# Personal Portfolio — Sage Turner

The source for my personal portfolio site: a single-page hub with a hero, toolkit,
selected work, and about section, plus a full case study for each project and a
dedicated contact page.

Started in May 2024 and actively maintained. Originally built in SvelteKit; it now
lives in [`sagect-portfolio/`](sagect-portfolio) as a Next.js 16 App Router app.

Found a bug or something that looks off? Please
[open an issue](https://github.com/SageCT/personal-portfolio/issues) — feedback is
very welcome.

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, React Compiler enabled) |
| UI | [React 19](https://react.dev) + TypeScript 5 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first, no `tailwind.config.js`) |
| Components | [shadcn/ui](https://ui.shadcn.com) on [Base UI](https://base-ui.com) primitives |
| Animation | [`motion`](https://motion.dev) (`motion/react`) |
| Icons | [Lucide](https://lucide.dev) |
| Lint / format | [Biome 2](https://biomejs.dev) (replaces ESLint + Prettier) |
| Runtime / package manager | [Bun 1.4](https://bun.sh) |
| Fonts | Geist, Geist Mono, Instrument Serif via `next/font` |

---

## Getting started

Requires [Bun](https://bun.sh) 1.4 or newer.

```bash
git clone https://github.com/SageCT/personal-portfolio.git
```

```bash
cd personal-portfolio/sagect-portfolio && bun install
```

```bash
bun run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

All scripts run from `sagect-portfolio/`.

| Script | What it does |
| --- | --- |
| `bun run dev` | Start the dev server on port 3000 |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Lint and format check with Biome |
| `bun run format` | Rewrite files with Biome's formatter |

There are no environment variables — the site is fully static and content lives in
source.

---

## Project structure

```
personal-portfolio/
└── sagect-portfolio/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx          # Root layout: fonts, metadata, theme, transitions
    │   │   ├── page.tsx            # Home — hero, toolkit, selected work, about
    │   │   ├── globals.css         # Tailwind v4 theme tokens (light + dark)
    │   │   ├── contact/page.tsx    # Contact page
    │   │   └── work/[slug]/page.tsx# Per-project case study (statically generated)
    │   ├── components/
    │   │   ├── site/               # Page sections and site-specific pieces
    │   │   └── ui/                 # shadcn/ui primitives (button, card, sheet, …)
    │   └── lib/
    │       ├── projects.ts         # Project + case-study content, single source of truth
    │       ├── contact.ts          # Contact channels (email, GitHub, LinkedIn)
    │       └── utils.ts            # `cn` class merge helper
    ├── public/                     # Static assets, incl. `tech/` stack logos
    ├── biome.json                  # Lint + format config
    ├── components.json             # shadcn/ui config (Base UI, `base-nova` style)
    └── next.config.ts              # React Compiler enabled
```

### Routes

| Route | Description |
| --- | --- |
| `/` | Home — hero, toolkit, selected work, about |
| `/work/[slug]` | Case study per project, pre-rendered from `PROJECTS` |
| `/contact` | Contact channels |

---

## How it's built

**Content is data.** Every project — copy, colors, stats, chapters, stack, links —
lives in [`src/lib/projects.ts`](sagect-portfolio/src/lib/projects.ts). The work
cards, the case-study pages, and `generateStaticParams` all read from that one
array, so adding a project means adding an object. `UpcomingProject` is a separate
type on purpose: an unshipped project has no case study, so it can't be routed to
or linked from one.

**Color leads the interaction.** Each project carries its own `bg`/`fg` pair, and
the page transition floods the screen with that project's color on the way into its
case study. The contact page reuses the same ink-on-color treatment so the two
sections read as one family.

**Theming without a flash.** A small inline script in
[`theme-script.tsx`](sagect-portfolio/src/components/site/theme-script.tsx) reads
the stored preference (falling back to `prefers-color-scheme`) and sets the `dark`
class before first paint.

**Deterministic decoration.** The floating confetti dots use a seeded LCG rather
than `Math.random`, so placement is identical on the server and the client and
survives re-renders and theme changes.

---

## Featured work

| Project | Year | Role |
| --- | --- | --- |
| [Computer Science Girls](https://www.csgirls.org) | 2023–24 | Design + frontend |
| [Shastamart](https://shastamart.vercel.app) | 2024 | Frontend lead |
| Ride | 2024 | Design + iOS |

---

## Design

- [Figma — original mobile design](https://www.figma.com/design/DqI9TzPyi4h7K56yJ412Na/Mobile-Design?t=J1QcuhBXmd30lEcw-1) (from the first SvelteKit build)

---

## Contact

- Email — [sageturn01@gmail.com](mailto:sageturn01@gmail.com)
- GitHub — [@SageCT](https://github.com/SageCT)
- LinkedIn — [in/sageturn01](https://www.linkedin.com/in/sageturn01/)
