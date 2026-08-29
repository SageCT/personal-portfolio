import { BRAND, ConfettiField } from "@/components/site/brand";
import { Reveal } from "@/components/site/reveal";
import { SHELF } from "@/lib/books";
import { PHOTOS } from "@/lib/photos";
import { PROJECTS } from "@/lib/projects";

const FACTS = [
  { key: "Location", value: "Philadelphia, PA", accent: BRAND.green },
  { key: "Currently", value: "Vanguard", accent: BRAND.royal },
  { key: "Alma mater", value: "U. of Houston '25", accent: BRAND.blue },
  { key: "Pronouns", value: "he/him", accent: BRAND.yellow },
] as const;

type Thread = {
  href: string;
  meta: string;
  title: string;
  note: string;
  accent: string;
};

/**
 * Everything on the site that isn't this page, in one index: the case studies
 * from `PROJECTS`, then the two standalone pages. Derived rather than typed
 * out, so adding a project or a photo shows up here without a second edit.
 */
const THREADS: readonly Thread[] = [
  ...PROJECTS.map((project) => ({
    href: `/work/${project.slug}`,
    meta: project.year,
    title: project.name,
    note: project.role,
    accent: project.bg,
  })),
  {
    href: "/photography",
    meta: `${PHOTOS.length} frames`,
    title: "Photography",
    note: "Digital and film, mostly after dark",
    accent: BRAND.blue,
  },
  {
    href: "/reading",
    meta: `${SHELF.length} books`,
    title: "Reading",
    note: "Short reviews of what's on the shelf",
    accent: BRAND.red,
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-28 overflow-hidden px-6 py-20 md:px-14 md:py-32"
      style={{ background: "var(--site-inv-bg)", color: "var(--site-inv-ink)" }}
    >
      <ConfettiField count={16} seed={7} opacity={0.32} sizeRange={[5, 15]} />

      <div className="relative mx-auto max-w-[1180px]">
        <div
          className="mb-11 flex items-center gap-3 font-mono text-[11px] tracking-[2px] uppercase"
          style={{ color: "var(--site-inv-muted)" }}
        >
          <span>/03</span>
          <span
            className="h-px flex-1"
            style={{ background: "var(--site-inv-line)" }}
          />
          <span>About</span>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-[72px]">
          <Reveal>
            <h2 className="font-serif text-[clamp(48px,7vw,92px)] leading-[0.98] tracking-[-0.03em]">
              A <em style={{ color: BRAND.yellow }}>maker</em>,
              <br />a <em style={{ color: BRAND.red }}>designer</em>,
              <br />
              an <em style={{ color: BRAND.green }}>engineer</em>.
            </h2>

            <dl className="mt-11 grid max-w-[480px] grid-cols-1 gap-[22px] sm:grid-cols-2">
              {FACTS.map((fact) => (
                <div
                  key={fact.key}
                  style={{ borderTop: `2px solid ${fact.accent}` }}
                  className="pt-[13px]"
                >
                  <dt
                    className="font-mono text-[10px] tracking-[1.6px] uppercase"
                    style={{ color: "var(--site-inv-muted)" }}
                  >
                    {fact.key}
                  </dt>
                  <dd className="mt-[5px] font-serif text-[21px]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex flex-col gap-5 text-[17.5px] leading-[1.65] text-pretty opacity-90">
              <p>
                I&rsquo;m a fullstack engineer at Vanguard, building tools that
                help millions of people manage their money with a little less
                friction.
              </p>
              <p>
                Before that: four years at the University of Houston. I led
                Computer Science Girls and rebuilt the org&rsquo;s site from a
                dated WordPress install into a rebrand designed in Figma with
                the officer team &mdash; it still runs at{" "}
                <a
                  href="https://www.csgirls.org"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[1.5px] underline-offset-4 transition-opacity hover:opacity-70"
                  style={{ textDecorationColor: BRAND.royal }}
                >
                  csgirls.org
                </a>
                . I led the front end for Shastamart, a storefront five of us
                built over a MySQL schema, and shipped the Rides tab of a
                SwiftUI app that was clicked through as a mockup long before it
                was code.
              </p>
              <p>
                What I care about: type that breathes, interactions that feel
                good in the hand, and interfaces that aren&rsquo;t embarrassed
                to be a little fun.
              </p>
              <p>
                Away from the editor I&rsquo;m usually carrying a camera around
                Philadelphia after dark, or working through a stack of books I
                keep{" "}
                <em style={{ color: BRAND.yellow }}>
                  slightly too many notes on
                </em>
                . Both live on this site.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div
            className="mt-16 flex items-center gap-3 font-mono text-[11px] tracking-[2px] uppercase md:mt-20"
            style={{ color: "var(--site-inv-muted)" }}
          >
            <span>Elsewhere</span>
            <span
              className="h-px flex-1"
              style={{ background: "var(--site-inv-line)" }}
            />
          </div>

          <ul className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {THREADS.map((thread) => (
              <li key={thread.href}>
                <a
                  href={thread.href}
                  className="group block pt-[13px] transition-transform duration-[350ms] ease-[var(--ease-house)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                  style={{ borderTop: `2px solid ${thread.accent}` }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[1.6px] uppercase"
                    style={{ color: "var(--site-inv-muted)" }}
                  >
                    {thread.meta}
                  </span>
                  <span className="mt-[5px] flex items-baseline gap-2 font-serif text-[21px]">
                    {thread.title}
                    <span
                      aria-hidden="true"
                      className="translate-x-0 text-[15px] opacity-0 transition-all duration-[350ms] ease-[var(--ease-house)] group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100"
                    >
                      &rarr;
                    </span>
                  </span>
                  <span
                    className="mt-[3px] block text-[14.5px] leading-[1.5]"
                    style={{ color: "var(--site-inv-muted)" }}
                  >
                    {thread.note}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
