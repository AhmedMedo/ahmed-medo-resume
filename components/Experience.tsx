import { AnimatedSection } from "./AnimatedSection";
import { TimelineItem } from "./TimelineItem";
import { experience } from "@/lib/data/resume";

export function Experience() {
  return (
    <AnimatedSection id="experience" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr]">
        <div className="self-start md:sticky md:top-24">
          <span className="font-mono text-[13px] tracking-wide text-accent">
            — Career
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-fg sm:text-5xl">
            Experience
          </h2>
          <p className="mt-4 font-sans text-[15px] leading-[1.7] text-fg-muted">
            Five roles spanning market data, marketing platforms, microfinance, and mobile apps.
          </p>
          <p className="mt-2 font-mono text-[13px] tracking-wide text-fg-muted">
            2016 — Present
          </p>
        </div>

        <div>
          {experience.map((entry, index) => (
            <TimelineItem
              key={`${entry.company}-${entry.startDate}`}
              entry={entry}
              index={index}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
