import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import { skillCategories } from "@/lib/data/resume";

export function Skills() {
  return (
    <AnimatedSection id="skills" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <SectionHeading
        label="Toolbox"
        heading="Skills"
        intro="The languages, frameworks, and infrastructure Ahmed works with daily."
      />

      <div className="border border-line">
        {skillCategories.map((category, i) => (
          <div
            key={category.label}
            className={`grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-[220px_1fr] sm:items-baseline ${
              i > 0 ? "border-t border-line" : ""
            }`}
          >
            <span className="font-mono text-[13px] tracking-wide text-accent">
              {category.label}
            </span>
            <p className="font-sans text-[15px] leading-[1.7] text-fg">
              {category.skills.map((skill, j) => (
                <span key={skill}>
                  {skill}
                  {j < category.skills.length - 1 && (
                    <span className="mx-2 text-accent">·</span>
                  )}
                  {" "}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
