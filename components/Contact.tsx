"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/resume";

export function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-cream text-espresso"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-deep">
          — Contact
        </span>
        <h2 className="mt-4 max-w-3xl font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
          Let&rsquo;s build <span className="text-gold-deep">something.</span>
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block break-all font-display text-2xl font-bold underline decoration-gold decoration-2 underline-offset-8 transition hover:text-gold-deep sm:text-3xl"
        >
          {profile.email}
        </a>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
          <a href={`tel:${profile.phone}`} className="transition hover:text-gold-deep">
            {profile.phone}
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-gold-deep"
          >
            {profile.linkedin}
          </a>
          <a
            href={profile.gitlabUrl}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-gold-deep"
          >
            {profile.gitlab}
          </a>
        </div>

        {/* "Ask Medo about fit" CTA — re-enable once the chat feature is back
        <div className="mt-10 border-t border-espresso/15 pt-8">
          <p className="font-sans text-sm text-espresso/70">
            Wondering if Ahmed fits your role? Ask {profile.assistantName} directly.
          </p>
          <button className="mt-4 rounded-full bg-espresso px-7 py-3 font-sans text-sm font-semibold text-cream transition hover:bg-gold-deep">
            Ask {profile.assistantName} about fit
          </button>
        </div>
        */}
      </div>
    </motion.section>
  );
}
