"use client";

import { motion } from "framer-motion";
import { DownloadIcon } from "./icons/DownloadIcon";
import { profile } from "@/lib/data/resume";

export function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden border-t border-line bg-surface text-fg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
        <span className="font-mono text-[13px] tracking-wide text-accent">
          — Contact
        </span>
        <h2 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Let&rsquo;s build <span className="text-accent">something.</span>
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block break-all font-display text-2xl font-bold underline decoration-accent decoration-2 underline-offset-8 transition hover:text-accent-bright sm:text-3xl"
        >
          {profile.email}
        </a>

        <a
          href={profile.cvUrl}
          download={profile.cvFileName}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-strong px-7 py-3 font-sans text-sm font-semibold text-white transition hover:bg-accent"
        >
          <DownloadIcon className="h-4 w-4" />
          Download CV
        </a>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
          <a href={`tel:${profile.phone}`} className="transition hover:text-accent-bright">
            {profile.phone}
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-accent-bright"
          >
            {profile.linkedin}
          </a>
          <a
            href={profile.gitlabUrl}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-accent-bright"
          >
            {profile.gitlab}
          </a>
        </div>

        {/* "Ask Medo about fit" CTA — re-enable once the chat feature is back
        <div className="mt-10 border-t border-line pt-8">
          <p className="font-sans text-sm text-fg-muted">
            Wondering if Ahmed fits your role? Ask {profile.assistantName} directly.
          </p>
          <button className="mt-4 rounded-full bg-accent-strong px-7 py-3 font-sans text-sm font-semibold text-white transition hover:bg-accent">
            Ask {profile.assistantName} about fit
          </button>
        </div>
        */}
      </div>
    </motion.section>
  );
}
