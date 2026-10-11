import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import { education, profile, stats } from "@/lib/data/resume";

export function About() {
  return (
    <AnimatedSection id="about" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <SectionHeading
        label="The Story"
        heading="About Ahmed"
        intro="Nine-plus years across backend engineering, cloud, telecom, fintech, e-commerce, and distributed systems."
      />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 font-sans text-base leading-relaxed text-cream-muted">
          {profile.bioParagraphs.map((p, i) => (
            <p key={p} className={i === 0 ? "drop-cap text-cream" : ""}>
              {p}
            </p>
          ))}

          <div className="mt-8 border border-line px-6 py-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
              Education
            </span>
            <p className="mt-2 font-display text-2xl font-extrabold text-cream">{education.degree}</p>
            <p className="mt-1 font-sans text-sm text-cream-muted">
              {education.institution}, {education.location} · {education.startDate} –{" "}
              {education.endDate}
            </p>
          </div>
        </div>

        <div className="self-start">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex items-baseline justify-between gap-4 py-5 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <span className="font-display text-5xl font-black text-gold">{stat.value}</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
