"use client";

import { useRouter } from "next/navigation";
import { type MouseEvent, useRef } from "react";
import { ProjectMock } from "@/components/site/project-mock";
import { useProjectTransition } from "@/components/site/project-transition";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const flipped = index % 2 === 1;
  const card = useRef<HTMLElement>(null);
  const router = useRouter();
  const { launch } = useProjectTransition();
  const href = `/work/${project.slug}`;

  const open = (e: MouseEvent) => {
    // Let modified clicks open a tab the way the browser expects.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (!card.current) return;
    launch(card.current, {
      href,
      color: project.bg,
      ink: project.fg,
      label: project.name,
    });
  };

  return (
    <article
      ref={card}
      onMouseEnter={() => router.prefetch(href)}
      className="group relative grid cursor-pointer items-center gap-8 overflow-hidden rounded-[26px] p-7 shadow-[0_1px_2px_rgb(0_0_0/0.05)] transition-[transform,box-shadow] duration-[550ms] ease-[var(--ease-house)] hover:-translate-y-[5px] hover:shadow-[0_30px_60px_-28px_rgb(0_0_0/0.45)] md:gap-13 md:p-11 lg:grid-cols-[minmax(0,1fr)_1.15fr]"
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

        {/* Stretched link: the whole card is the hit area, but the anchor keeps
            keyboard focus, middle-click, and copy-link working. */}
        <a
          href={href}
          onClick={open}
          className="mt-7 inline-block pb-[3px] font-serif text-[19px] italic opacity-85 transition-opacity before:absolute before:inset-0 before:content-[''] hover:opacity-100"
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
