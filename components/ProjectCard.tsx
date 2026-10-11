"use client";

import { motion } from "framer-motion";
import type { PersonalProject } from "@/lib/data/resume";

export function ProjectCard({ project, index }: { project: PersonalProject; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
      className="group border-t border-line py-7"
    >
      <div className="flex items-baseline gap-5">
        <span className="font-display text-3xl font-extrabold text-gold">{project.year}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl font-extrabold text-cream transition group-hover:text-gold">
            {project.title}
          </h3>
          <p className="mt-2 font-sans text-sm leading-relaxed text-cream-muted">
            {project.description}
          </p>
          <p className="mt-3 font-mono text-xs leading-relaxed text-cream-muted">
            {project.tech.map((tech, j) => (
              <span key={tech}>
                {tech}
                {j < project.tech.length - 1 && <span className="mx-1.5 text-gold-deep">·</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
