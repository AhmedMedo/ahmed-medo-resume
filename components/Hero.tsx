"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AvatarLoadingSkeleton } from "./AvatarLoadingSkeleton";

const Avatar = dynamic(() => import("./Avatar"), {
  ssr: false,
  loading: () => <AvatarLoadingSkeleton />,
});

const MARQUEE_ITEMS = [
  "Python",
  "FastAPI",
  "Node.js",
  "TypeScript",
  "Laravel",
  "Symfony",
  "React",
  "Vue.js",
  "AWS",
  "Docker",
  "Kubernetes",
  "LLMs & RAG",
  "Fintech",
  "Telecom",
  "E-commerce",
];

export function Hero() {
  return (
    <section id="hero" className="relative">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-14 pt-12 md:grid-cols-[1.1fr_0.9fr] md:pb-20 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Senior Software Engineer
          </span>

          <h1 className="mt-5 font-display text-7xl font-black leading-[0.85] tracking-tight text-cream sm:text-8xl lg:text-9xl">
            Ahmed
            <br />
            <span className="text-gold">Alaa</span>
          </h1>

          <div className="mt-7 h-px w-24 bg-gold" />

          <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-cream-muted">
            Building <span className="font-semibold text-gold">backend systems</span>, APIs, and
            AI-powered features for fintech, telecom, and commerce that hold up in production.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#experience"
              className="rounded-full bg-gold px-7 py-3 font-sans text-sm font-semibold text-espresso transition hover:bg-gold-bright"
            >
              View experience
            </a>
            <a
              href="#contact"
              className="rounded-full border border-gold-deep px-7 py-3 font-sans text-sm font-medium text-cream transition hover:border-gold hover:text-gold"
            >
              Get in touch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="relative h-[420px] overflow-hidden rounded-t-full border border-gold-deep/60 bg-espresso-raised sm:h-[480px]">
            <Avatar />
          </div>
          {/* AI concierge caption — re-enable once the chat feature is back
          <div className="flex items-center justify-center gap-2 border-x border-b border-gold-deep/60 bg-espresso-raised py-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream-muted">
              {profile.assistantName} · AI Concierge
            </span>
          </div>
          */}
        </motion.div>
      </div>

      <div className="overflow-hidden border-y border-line py-4">
        <div className="flex w-max animate-marquee gap-0 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="mx-6 font-mono text-xs uppercase tracking-[0.25em] text-cream-muted"
                >
                  {item} <span className="ml-10 text-gold">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
