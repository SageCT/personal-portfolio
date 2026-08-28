import Link from "next/link";
import type { CSSProperties } from "react";
import { ProjectMock } from "@/components/site/project-mock";
import { ProjectArrival } from "@/components/site/project-transition";
import { Reveal } from "@/components/site/reveal";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { PROJECTS, type Project } from "@/lib/projects";

/**
 * Case-study template. The hero deliberately mirrors the transition flood —
 * same color, same centered serif title — so the overlay can dissolve onto it
 * without anything appearing to move.
 */
export function ProjectPage({ project }: { project: Project }) {
  const here = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(here + 1) % PROJECTS.length];

  return (
    <>
      <ProjectArrival />
      <SiteNav />
      <main
        className="flex-1"
        style={{ "--accent": project.bg } as CSSProperties}
      >
        <Hero project={project} />
        <Body project={project} />
        {next.slug !== project.slug && <NextUp project={next} />}
      </main>
      <SiteFooter />
    </>
  );
}

function Hero({ project }: { project: Project }) {
  return (
    <header
      className="relative grid min-h-[100dvh] grid-rows-[1fr_auto_1fr] overflow-hidden px-6 py-24 text-center md:px-14"
      style={{ background: project.bg, color: project.fg }}
    >
      {/* The bloom the card carried in, now at rest. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[140vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(255 255 255 / 0.42) 0%, rgb(255 255 255 / 0.10) 38%, transparent 66%)",
        }}
      />

      <div className="relative flex items-end justify-center">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[2px] uppercase opacity-75">
          <span>{project.year}</span>
          <span
            className="h-px w-[18px]"
            style={{ background: project.fg, opacity: 0.45 }}
          />
          <span>{project.role}</span>
        </div>
      </div>

      <h1 className="relative mt-6 font-serif text-[clamp(34px,7vw,86px)] leading-none tracking-[-1.5px] text-balance italic">
        {project.name}
      </h1>

      <div className="relative flex flex-col items-center gap-8 pt-9">
        <p className="max-w-[560px] text-[17px] leading-[1.55] text-pretty opacity-90">
          {project.desc}
        </p>
        <ul className="flex flex-wrap justify-center gap-[7px]">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white/20 px-[11px] py-1.5 font-mono text-[10.5px] tracking-[0.6px]"
              style={{ border: `1px solid ${project.fg}2b` }}
            >
              {tag}
            </li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className="mt-auto font-mono text-[10px] tracking-[2px] uppercase opacity-55"
        >
          Scroll
        </span>
      </div>
    </header>
  );
}

function Body({ project }: { project: Project }) {
  return (
    <div className="relative overflow-hidden">
      {/* Accent glow bleeding up out of the hero, tinting the page. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[38vmax] left-1/2 aspect-square w-[110vmax] -translate-x-1/2 rounded-full opacity-45 blur-[90px]"
        style={{
          background: `radial-gradient(circle, ${project.bg} 0%, transparent 62%)`,
        }}
      />

      <section className="relative mx-auto max-w-[1180px] px-6 py-16 md:px-14 md:py-[104px]">
        <Reveal>
          <ul
            className="grid gap-6 border-b pb-12 sm:grid-cols-3"
            style={{ borderBottomColor: "var(--site-line)" }}
          >
            {project.stats.map((stat) => (
              <li key={stat.label}>
                <p className="font-serif text-[clamp(30px,4vw,48px)] leading-none tracking-[-1px]">
                  {stat.value}
                </p>
                <p
                  className="mt-2 font-mono text-[10.5px] tracking-[1.8px] uppercase"
                  style={{ color: "var(--site-muted)" }}
                >
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-14 pt-14 lg:grid-cols-[1.35fr_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.35] text-pretty">
                {project.overview}
              </p>
            </Reveal>

            <div className="mt-14 flex flex-col gap-12">
              {project.chapters.map((chapter, i) => (
                <Reveal key={chapter.title} y={28}>
                  <div className="flex gap-6">
                    <span
                      className="mt-[6px] font-mono text-[11px] tracking-[1.8px]"
                      style={{ color: "var(--site-muted)" }}
                    >
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-serif text-[clamp(24px,2.6vw,34px)] leading-tight tracking-[-0.5px]">
                        {chapter.title}
                      </h2>
                      <p
                        className="mt-3 max-w-[62ch] text-[16.5px] leading-[1.6] text-pretty"
                        style={{ color: "var(--site-muted)" }}
                      >
                        {chapter.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
            <Reveal y={20}>
              <div
                className="rounded-[22px] p-6"
                style={{
                  background: "var(--site-elev)",
                  border: "1px solid var(--site-line)",
                  boxShadow: `0 24px 60px -34px ${project.bg}`,
                }}
              >
                <p
                  className="font-mono text-[10.5px] tracking-[1.8px] uppercase"
                  style={{ color: "var(--site-muted)" }}
                >
                  Stack
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[15px]"
                    >
                      <span
                        className="size-[7px] shrink-0 rounded-full"
                        style={{ background: project.bg }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {project.links.length > 0 && (
                  <div
                    className="mt-6 flex flex-col gap-2 border-t pt-5"
                    style={{ borderTopColor: "var(--site-line)" }}
                  >
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="font-serif text-[18px] italic underline-offset-4 hover:underline"
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal y={20}>
              <div className="rotate-[-1.4deg]">
                <ProjectMock kind={project.mock} />
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </div>
  );
}

function NextUp({ project }: { project: Project }) {
  return (
    <section
      className="border-t px-6 py-16 md:px-14"
      style={{ borderTopColor: "var(--site-line)" }}
    >
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-end justify-between gap-6">
        <div>
          <p
            className="font-mono text-[10.5px] tracking-[2px] uppercase"
            style={{ color: "var(--site-muted)" }}
          >
            Next project
          </p>
          <Link
            href={`/work/${project.slug}`}
            className="group mt-3 inline-flex items-baseline gap-4 font-serif text-[clamp(30px,4.4vw,58px)] leading-none tracking-[-1.2px]"
          >
            <span
              className="size-[14px] shrink-0 self-center rounded-full transition-transform duration-[450ms] ease-[var(--ease-house)] group-hover:scale-125"
              style={{ background: project.bg }}
            />
            {project.name}
            <span className="inline-block text-[0.6em] transition-transform duration-[350ms] ease-[var(--ease-house)] group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
        <Link
          href="/#work"
          className="font-mono text-[11px] tracking-[1.8px] uppercase underline-offset-4 hover:underline"
          style={{ color: "var(--site-muted)" }}
        >
          ← All work
        </Link>
      </div>
    </section>
  );
}
