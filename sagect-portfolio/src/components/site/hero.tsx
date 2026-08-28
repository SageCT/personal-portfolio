"use client";

import { useEffect, useState } from "react";
import { BRAND, ConfettiField } from "@/components/site/brand";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const ROLES = [
  { label: "fullstack engineer", color: BRAND.red },
  { label: "front-end developer", color: BRAND.royal },
  { label: "back-end developer", color: BRAND.green },
  { label: "UI/UX designer", color: BRAND.yellow },
] as const;

const ROLE_INTERVAL = 2600;

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-20 md:pt-[132px] md:pb-[116px]"
    >
      <ConfettiField count={18} seed={3} opacity={0.4} sizeRange={[4, 14]} />

      <div className="relative mx-auto max-w-[1180px] px-6 md:px-14">
        <Reveal>
          <p
            className="mb-9 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-[7px] font-mono text-xs tracking-[2px] uppercase"
            style={{
              borderColor: "var(--site-line)",
              color: "var(--site-muted)",
            }}
          >
            <span className="relative grid size-[7px] place-items-center">
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: BRAND.green }}
              />
              <span
                className="absolute inset-0 rounded-full animate-ping-slow"
                style={{ background: BRAND.green }}
              />
            </span>
            Philadelphia · open to work
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="max-w-[17ch] font-serif text-[clamp(44px,11vw,156px)] leading-[0.94] tracking-[-0.035em] text-balance">
            Hi, I&rsquo;m <em style={{ color: BRAND.red }}>Sage</em>. I build{" "}
            <span className="relative inline-block whitespace-nowrap">
              <em>delightful</em>
              <Squiggle />
            </span>{" "}
            software.
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <div
            className="mt-14 grid items-end gap-8 border-t pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12"
            style={{ borderTopColor: "var(--site-line)" }}
          >
            <p className="max-w-[540px] text-[19px] leading-[1.55] text-pretty">
              {/* The role gets its own line, so nothing trails off the end of
                  it as the labels cycle. */}
              <span className="block">
                A <RoleCycler />
              </span>
              currently engineering systems at{" "}
              <span className="font-semibold">Vanguard</span>. University of
              Houston, class of &rsquo;25.
            </p>

            <div className="flex gap-2.5">
              <a
                href="#work"
                className="rounded-full px-5 py-[11px] text-sm font-medium whitespace-nowrap transition-transform duration-[250ms] hover:-translate-y-0.5"
                style={{
                  background: "var(--site-ink)",
                  color: "var(--site-bg)",
                }}
              >
                See the work
              </a>
              <a
                href="https://github.com/SageCT/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border px-5 py-[11px] text-sm font-medium whitespace-nowrap transition-[transform,background] duration-[250ms] hover:-translate-y-0.5 hover:bg-[var(--site-hair)]"
                style={{ borderColor: "var(--site-line)" }}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Hand-drawn underline that draws itself in once on load. */
function Squiggle() {
  return (
    <svg
      className="absolute bottom-[-0.06em] left-0 h-[0.11em] w-full overflow-visible"
      viewBox="0 0 400 16"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M4 11 Q 100 2, 200 9 T 396 6"
        fill="none"
        stroke={BRAND.yellow}
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={420}
        strokeDashoffset={420}
        className="animate-draw"
      />
    </svg>
  );
}

/**
 * Cycles job titles in a clipped slot so each one flips up into place.
 *
 * Every label is rendered into the same grid cell — the inactive ones stay in
 * layout but hidden, so the slot is always as wide as the longest title and the
 * sentence after it never reflows mid-flip.
 */
function RoleCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROLES.length),
      ROLE_INTERVAL,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-grid h-[1.55em] overflow-hidden align-bottom">
      {ROLES.map((role, i) => (
        <span
          key={role.label}
          className={cn(
            "col-start-1 row-start-1 font-semibold whitespace-nowrap",
            i === index ? "animate-roleflip" : "invisible",
          )}
          style={{ color: role.color }}
          // The label changes on a timer; announcing every flip would be noise.
          aria-hidden="true"
        >
          {role.label}
        </span>
      ))}
      <span className="sr-only">fullstack engineer</span>
    </span>
  );
}
