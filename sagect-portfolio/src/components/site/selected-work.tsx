import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHead } from "@/components/site/section-head";
import { PROJECTS } from "@/lib/projects";

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
          label={`${PROJECTS.length} projects`}
          title="Selected"
          titleAccent="work."
          note="Things I shipped end to end — design through deploy."
        />
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={0.04} y={32}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
