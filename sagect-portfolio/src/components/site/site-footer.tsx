import { BRAND, SageMark } from "@/components/site/brand";
import { EMAIL, GITHUB, LINKEDIN } from "@/lib/contact";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="overflow-hidden border-t px-6 pt-16 pb-9 md:px-14 md:pt-24"
      style={{
        background: "var(--site-footer-bg)",
        color: "var(--site-inv-ink)",
        borderTopColor: "var(--site-inv-line)",
      }}
    >
      <div className="mx-auto max-w-[1180px]">
        <p
          className="mb-6 font-mono text-[11px] tracking-[2px] uppercase"
          style={{ color: "var(--site-inv-muted)" }}
        >
          /04 · Contact
        </p>

        <h2 className="font-serif text-[clamp(44px,9vw,132px)] leading-[0.92] tracking-[-0.04em]">
          Let&rsquo;s build
          <br />
          <em style={{ color: BRAND.yellow }}>something good.</em>
        </h2>

        <div className="mt-11 flex flex-wrap gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full px-6 py-3.5 text-[15px] font-semibold transition-transform duration-[250ms] hover:-translate-y-0.5"
            style={{ background: BRAND.yellow, color: BRAND.ink }}
          >
            {EMAIL}
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border px-6 py-3.5 text-[15px] font-semibold transition-[transform,background] duration-[250ms] hover:-translate-y-0.5 hover:bg-white/[0.06]"
            style={{ borderColor: "var(--site-inv-line)" }}
          >
            github.com/SageCT ↗
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border px-6 py-3.5 text-[15px] font-semibold transition-[transform,background] duration-[250ms] hover:-translate-y-0.5 hover:bg-white/[0.06]"
            style={{ borderColor: "var(--site-inv-line)" }}
          >
            in/sageturn01 ↗
          </a>
        </div>

        <p className="mt-7">
          <a
            href="/contact"
            className="font-serif text-[19px] italic underline-offset-[6px] hover:underline"
          >
            All the ways to reach me →
          </a>
        </p>

        <div
          className="mt-22 flex flex-wrap items-end justify-between gap-6 border-t pt-7"
          style={{ borderTopColor: "var(--site-inv-line)" }}
        >
          <SageMark size={26} inkColor="var(--site-footer-bg)" />
          <div
            className="text-right font-mono text-[11px] tracking-[1.4px] uppercase"
            style={{ color: "var(--site-inv-muted)" }}
          >
            <p>Sage Turner · {year}</p>
            <p>Next.js · Tailwind · shadcn</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
