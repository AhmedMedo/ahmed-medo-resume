import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/data/resume";

export function Projects() {
  return (
    <AnimatedSection id="projects" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <SectionHeading
        label="Selected Work"
        heading="Projects"
        intro="Platforms and products Ahmed has built, led, and delivered."
      />

      <div className="grid grid-cols-1 gap-x-14 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </AnimatedSection>
  );
}
