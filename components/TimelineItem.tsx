"use client";

import { motion } from "framer-motion";
import type { ExperienceEntry } from "@/lib/data/resume";

interface TimelineItemProps {
  entry: ExperienceEntry;
  index: number;
}

export function TimelineItem({ entry, index }: TimelineItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
      className={`py-8 ${index > 0 ? "border-t border-line" : ""}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-2xl font-extrabold text-cream">
          {entry.company}
        </h3>
        <span className="font-mono text-xs tracking-widest text-gold">
          {entry.startDate} — {entry.endDate}
        </span>
      </div>
      <p className="mt-1 font-sans text-sm text-cream-muted">
        {entry.title} · {entry.location}
      </p>

      <div className="mt-5 space-y-5">
        {entry.projects.map((project) => (
          <div key={project.name} className="border-l border-gold-deep/50 pl-4">
            <h4 className="font-sans text-sm font-semibold text-cream">{project.name}</h4>
            <p className="mt-1 font-sans text-sm leading-relaxed text-cream-muted">
              {project.description}
            </p>
            {project.responsibilities && (
              <p className="mt-2 font-sans text-sm leading-relaxed text-cream-muted">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                  Responsibilities
                </span>{" "}
                {project.responsibilities}
              </p>
            )}
            <p className="mt-2 font-mono text-xs leading-relaxed text-cream-muted">
              {project.tech.map((tech, j) => (
                <span key={tech}>
                  {tech}
                  {j < project.tech.length - 1 && <span className="mx-1.5 text-gold-deep">·</span>}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}
