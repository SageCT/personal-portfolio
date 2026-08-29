"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { BRAND, ConfettiField } from "@/components/site/brand";
import { Reveal } from "@/components/site/reveal";

const ROLES = [
  { label: "fullstack engineer", color: BRAND.red },
  { label: "front-end developer", color: BRAND.royal },
  { label: "back-end developer", color: BRAND.green },
  { label: "UI/UX designer", color: BRAND.yellow },
] as const;

const ROLE_INTERVAL = 2600;

/** Seconds between one letter starting and the next. */
const CHAR_IN = 0.028;
const CHAR_OUT = 0.012;

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
 * Cycles job titles, one letter at a time.
 *
 * Each label enters as a row of characters springing up from below the slot,
 * staggered left to right, and leaves the same way. The slot is emptied before
 * it refills — `mode="wait"` holds the incoming label until the outgoing one
 * has cleared, so the two never share the space. Every label is also rendered
 * invisibly into the same grid cell, which keeps the slot as wide as the
 * longest title so the sentence after it never reflows mid-swap.
 */
function RoleCycler() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROLES.length),
      ROLE_INTERVAL,
    );
    return () => clearInterval(id);
  }, []);

  const role = ROLES[index];

  return (
    <span className="inline-grid h-[1.55em] overflow-hidden align-bottom">
      {/* Width reservation only — never painted, never announced. */}
      {ROLES.map((r) => (
        <span
          key={r.label}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 font-semibold whitespace-nowrap"
        >
          {r.label}
        </span>
      ))}

      {/* One label in the cell at a time — the old one leaves, then the new
          one arrives. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={role.label}
          // The label changes on a timer; announcing every flip would be noise.
          aria-hidden="true"
          className="col-start-1 row-start-1 flex font-semibold whitespace-nowrap"
          style={{ color: role.color }}
        >
          {[...role.label].map((char, i) => (
            <motion.span
              // Characters repeat within a label, so the index is the key.
              key={`${role.label}-${i}`}
              className="inline-block will-change-transform"
              initial={{ opacity: 0, y: "0.9em", filter: "blur(5px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  delay: reduced ? 0 : i * CHAR_IN,
                  y: { type: "spring", stiffness: 520, damping: 32, mass: 0.6 },
                  opacity: { duration: 0.26, ease: [0.2, 0.8, 0.2, 1] },
                  filter: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] },
                },
              }}
              exit={{
                opacity: 0,
                y: "-0.75em",
                filter: "blur(4px)",
                transition: {
                  delay: reduced ? 0 : i * CHAR_OUT,
                  duration: 0.22,
                  ease: [0.4, 0, 1, 1],
                },
              }}
            >
              {/* Spaces need a glyph of their own once each letter is a box. */}
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>

      <span className="sr-only">fullstack engineer</span>
    </span>
  );
}
