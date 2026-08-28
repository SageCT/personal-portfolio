import { BRAND } from "@/components/site/brand";
import type { UpcomingProject } from "@/lib/projects";

/**
 * The unshipped slot at the top of the work section. Same geometry as a real
 * project card, but inert — no link, no hover lift, and the parts that would
 * hold real content sit in a loading state instead of faking one.
 */
export function UpcomingCard({ project }: { project: UpcomingProject }) {
  return (
    <article
      className="relative grid items-center gap-8 overflow-hidden rounded-[26px] p-7 md:gap-13 md:p-11 lg:grid-cols-[minmax(0,1fr)_1.15fr]"
      style={{
        background: "var(--site-elev)",
        border: "1.5px dashed var(--site-line)",
      }}
    >
      <div className="relative">
        <div
          className="mb-[18px] flex items-center gap-3 font-mono text-[11px] tracking-[1.8px] uppercase"
          style={{ color: "var(--site-muted)" }}
        >
          <span className="relative grid size-[7px] place-items-center">
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: BRAND.yellow }}
            />
            <span
              className="animate-ping-slow absolute inset-0 rounded-full"
              style={{ background: BRAND.yellow }}
            />
          </span>
          <span>Upcoming</span>
          <span
            aria-hidden="true"
            className="h-px w-[18px]"
            style={{ background: "var(--site-line)" }}
          />
          <span>In progress</span>
        </div>

        <h3 className="font-serif text-[clamp(34px,5.2vw,68px)] leading-[0.98] tracking-[-1.2px] text-balance">
          {project.name}
        </h3>

        <p
          className="mt-[18px] max-w-[46ch] text-[16.5px] leading-[1.6] text-pretty"
          style={{ color: "var(--site-muted)" }}
        >
          {project.teaser}
        </p>

        {/* Tag slots, still loading. */}
        <ul className="mt-[22px] flex flex-wrap gap-2" aria-hidden="true">
          {Array.from({ length: project.tagSlots }, (_, i) => (
            <li
              key={`tag-slot-${
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder list
                i
              }`}
              className="h-[27px] animate-pulse rounded-full"
              style={{
                width: `${68 + i * 14}px`,
                background: "var(--site-hair)",
              }}
            />
          ))}
        </ul>
      </div>

      {/* Where the product shot will go. */}
      <div
        aria-hidden="true"
        className="relative aspect-[16/10] w-full animate-pulse overflow-hidden rounded-xl"
        style={{
          background: "var(--site-hair)",
          border: "1px solid var(--site-line)",
        }}
      >
        <div className="flex gap-1.5 px-[18px] py-3.5">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="size-[9px] rounded-full"
              style={{ background: "var(--site-line)" }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
