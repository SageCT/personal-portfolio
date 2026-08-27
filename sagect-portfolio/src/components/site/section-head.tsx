import { Reveal } from "@/components/site/reveal";

type SectionHeadProps = {
  /** e.g. "/01" */
  index: string;
  label: string;
  /** Rendered upright. */
  title: string;
  /** Rendered italic, directly after the title. */
  titleAccent: string;
  note?: string;
};

export function SectionHead({
  index,
  label,
  title,
  titleAccent,
  note,
}: SectionHeadProps) {
  return (
    <Reveal className="mb-14">
      <div
        className="mb-[18px] flex items-center gap-3 font-mono text-[11px] tracking-[2px] uppercase"
        style={{ color: "var(--site-muted)" }}
      >
        <span>{index}</span>
        <span
          className="h-px flex-1"
          style={{ background: "var(--site-line)" }}
        />
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <h2 className="font-serif text-[clamp(40px,5vw,72px)] leading-none tracking-[-1.5px]">
          {title} <em>{titleAccent}</em>
        </h2>
        {note && (
          <p
            className="max-w-[320px] text-[15px] text-pretty"
            style={{ color: "var(--site-muted)" }}
          >
            {note}
          </p>
        )}
      </div>
    </Reveal>
  );
}
