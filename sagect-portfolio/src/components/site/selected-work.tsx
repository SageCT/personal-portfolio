import { BRAND } from "@/components/site/brand";
import type { MockKind } from "@/components/site/project-mock";
import { ProjectMock } from "@/components/site/project-mock";
import { Reveal } from "@/components/site/reveal";
import { SectionHead } from "@/components/site/section-head";

type Project = {
  name: string;
  year: string;
  role: string;
  bg: string;
  fg: string;
  desc: string;
  tags: readonly string[];
  mock: MockKind;
};

const PROJECTS: readonly Project[] = [
  {
    name: "Computer Science Girls",
    year: "2025",
    role: "Lead developer",
    bg: BRAND.yellow,
    fg: BRAND.ink,
    desc: "A rebrand and ground-up site for the UH CSG org — events, member directory, and a resource library the board can actually maintain.",
    tags: ["React", "TanStack", "Tailwind"],
    mock: "csg",
  },
  {
    name: "Shastamart",
    year: "2024",
    role: "Fullstack",
    bg: BRAND.green,
    fg: BRAND.ink,
    desc: "Online grocery with live inventory, delivery windows, and a checkout flow that gets out of the way.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    mock: "mart",
  },
  {
    name: "Ride",
    year: "2024",
    role: "Mobile + backend",
    bg: BRAND.red,
    fg: "#FFFFFF",
    desc: "A ride-hailing clone built to understand the hard parts: real-time driver matching, geofencing, surge pricing.",
    tags: ["React Native", "Go", "Redis"],
    mock: "ride",
  },
];

export function SelectedWork() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t px-6 py-16 md:px-14 md:py-[104px]"
      style={{ borderTopColor: "var(--site-line)" }}
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionHead
          index="/02"
          label="3 projects"
          title="Selected"
          titleAccent="work."
          note="Things I shipped end to end — design through deploy."
        />
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={0.04} y={32}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <article
      className="group relative grid items-center gap-8 overflow-hidden rounded-[26px] p-7 shadow-[0_1px_2px_rgb(0_0_0/0.05)] transition-[transform,box-shadow] duration-[550ms] ease-[var(--ease-house)] hover:-translate-y-[5px] hover:shadow-[0_30px_60px_-28px_rgb(0_0_0/0.45)] md:gap-13 md:p-11 lg:grid-cols-[minmax(0,1fr)_1.15fr]"
      style={{ background: project.bg, color: project.fg }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 size-[200px] rounded-full bg-white/[0.13] transition-transform duration-[800ms] ease-[var(--ease-house)] group-hover:scale-[1.12]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[70px] left-[38%] size-[140px] rounded-full bg-black/[0.07]"
      />

      <div className={`relative ${flipped ? "lg:order-2" : ""}`}>
        <div className="mb-[18px] flex items-center gap-3 font-mono text-[11px] tracking-[1.8px] uppercase opacity-70">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span
            className="h-px w-[18px]"
            style={{ background: project.fg, opacity: 0.45 }}
          />
          <span>
            {project.year} · {project.role}
          </span>
        </div>

        <h3 className="font-serif text-[clamp(34px,5.2vw,68px)] leading-[0.98] tracking-[-1.2px] text-balance">
          {project.name}
        </h3>

        <p className="mt-[18px] max-w-[430px] text-[16.5px] leading-[1.55] text-pretty opacity-90">
          {project.desc}
        </p>

        <ul className="mt-[22px] flex flex-wrap gap-[7px]">
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

        {/* TODO: wire to real case-study routes. */}
        <a
          href="#work"
          className="mt-7 inline-block pb-[3px] font-serif text-[19px] italic opacity-85 transition-opacity hover:opacity-100"
          style={{ borderBottom: `1.5px solid ${project.fg}` }}
        >
          Case study{" "}
          <span className="inline-block transition-transform duration-[350ms] ease-[var(--ease-house)] group-hover:translate-x-[5px]">
            →
          </span>
        </a>
      </div>

      <div
        className={`relative rotate-[-1.8deg] transition-transform duration-[550ms] ease-[var(--ease-house)] group-hover:rotate-[-0.8deg] group-hover:scale-[1.025] ${flipped ? "lg:order-1" : ""}`}
      >
        <ProjectMock kind={project.mock} />
      </div>
    </article>
  );
}
