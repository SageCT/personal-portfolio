import { BRAND, ConfettiField } from "@/components/site/brand";
import { Reveal } from "@/components/site/reveal";

const FACTS = [
  { key: "Location", value: "Philadelphia, PA", accent: BRAND.green },
  { key: "Currently", value: "Vanguard", accent: BRAND.royal },
  { key: "Alma mater", value: "U. of Houston '25", accent: BRAND.blue },
  { key: "Pronouns", value: "he/him", accent: BRAND.yellow },
] as const;

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
                Computer Science Girls, collected a dozen half-finished side
                projects, and learned that the best software feels a bit like{" "}
                <em style={{ color: BRAND.yellow }}>magic</em>.
              </p>
              <p>
                What I care about: type that breathes, interactions that feel
                good in the hand, and interfaces that aren&rsquo;t embarrassed
                to be a little fun.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
