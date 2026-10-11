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
        <h3 className="font-display text-2xl font-bold text-fg">
          {entry.company}
        </h3>
        <span className="font-mono text-[13px] tracking-wide text-accent">
          {entry.startDate} — {entry.endDate}
        </span>
      </div>
      <p className="mt-1 font-sans text-sm text-fg-muted">
        {entry.title} · {entry.location}
      </p>

      <div className="mt-5 space-y-5">
        {entry.projects.map((project) => (
          <div key={project.name} className="border-l border-accent/40 pl-4">
            <h4 className="font-sans text-sm font-semibold text-fg">{project.name}</h4>
            <p className="mt-1 font-sans text-[15px] leading-[1.7] text-fg-muted">
              {project.description}
            </p>
            {project.responsibilities && (
              <p className="mt-2 font-sans text-[15px] leading-[1.7] text-fg-muted">
                <span className="font-mono text-[13px] tracking-wide text-accent">
                  Responsibilities
                </span>{" "}
                {project.responsibilities}
              </p>
            )}
            <p className="mt-2 font-mono text-[13px] leading-[1.7] text-fg-muted">
              {project.tech.map((tech, j) => (
                <span key={tech}>
                  {tech}
                  {j < project.tech.length - 1 && <span className="mx-1.5 text-accent">·</span>}
                  {" "}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}
