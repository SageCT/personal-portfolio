import Image from "next/image";
import { BRAND } from "@/components/site/brand";
import { Reveal } from "@/components/site/reveal";
import { SectionHead } from "@/components/site/section-head";

const TECH = [
  {
    name: "React",
    color: BRAND.blue,
    note: "daily driver",
    logo: "/tech/react-original.svg",
  },
  {
    name: "TypeScript",
    color: BRAND.royal,
    note: "types or bust",
    logo: "/tech/typescript-original.svg",
  },
  {
    name: "Angular",
    color: BRAND.red,
    note: "enterprise work",
    logo: "/tech/angular-original.svg",
  },
  {
    name: "Svelte",
    color: BRAND.svelte,
    note: "for the fun ones",
    logo: "/tech/svelte-original.svg",
  },
  {
    name: "Python",
    color: BRAND.yellow,
    note: "services & scripts",
    logo: "/tech/python-original.svg",
  },
  {
    name: "Node",
    color: BRAND.green,
    note: "APIs & tooling",
    logo: "/tech/nodejs-original.svg",
  },
  {
    name: "C/C++",
    color: BRAND.royal,
    note: "systems coursework",
    logo: "/tech/cplusplus-original.svg",
  },
] as const;

export function Toolkit() {
  return (
    <section
      className="border-t px-6 py-16 md:px-14 md:py-[104px]"
      style={{ borderTopColor: "var(--site-line)" }}
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionHead
          index="/01"
          label="Stack"
          title="The"
          titleAccent="toolkit."
          note="A short, honest list. No skill bars, no percentages."
        />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TECH.map((tech, i) => (
            <li key={tech.name} className="h-full">
              <Reveal delay={i * 0.05} className="h-full">
                <TechCard tech={tech} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type Tech = (typeof TECH)[number];

function TechCard({ tech, index }: { tech: Tech; index: number }) {
  return (
    <div
      className="group relative flex h-full flex-col items-center gap-3.5 overflow-hidden rounded-[18px] border px-5 py-[30px] transition-[transform,background,border-color] duration-[400ms] ease-[var(--ease-house)] hover:-translate-y-1"
      style={
        {
          borderColor: "var(--site-line)",
          "--accent": tech.color,
        } as React.CSSProperties
      }
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 bg-[color-mix(in_srgb,var(--accent)_6%,transparent)]" />
      <span className="pointer-events-none absolute inset-0 rounded-[18px] border border-transparent transition-colors duration-[400ms] group-hover:border-[color-mix(in_srgb,var(--accent)_35%,transparent)]" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[30px] -right-[30px] size-[130px] rounded-full opacity-10 blur-[38px] transition-opacity duration-[400ms] group-hover:opacity-25"
        style={{ background: tech.color }}
      />

      <div
        className="relative h-[112px] w-[104px]"
        style={{
          animation: `cube-hover-${index % 3} ${3.4 + index * 0.25}s ease-in-out ${index * 0.18}s infinite alternate`,
        }}
      >
        <Image
          src="/glossy-cube.png"
          alt=""
          fill
          sizes="104px"
          className="object-contain opacity-70 transition-opacity duration-[400ms] group-hover:opacity-90"
          style={{ filter: `drop-shadow(0 10px 18px ${tech.color}55)` }}
        />
        <Image
          src={tech.logo}
          alt={`${tech.name} logo`}
          width={48}
          height={48}
          className="absolute top-[52%] left-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-[400ms] group-hover:scale-[1.08]"
          style={{ filter: "drop-shadow(0 2px 5px rgb(0 0 0 / 0.22))" }}
        />
      </div>

      <p className="relative font-serif text-[26px] leading-[1.1] italic">
        {tech.name}
      </p>
      <p
        className="relative font-mono text-[10px] tracking-[1px] uppercase opacity-60 transition-opacity duration-[400ms] group-hover:opacity-100"
        style={{ color: "var(--site-muted)" }}
      >
        {tech.note}
      </p>
    </div>
  );
}
