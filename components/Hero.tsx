"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AvatarLoadingSkeleton } from "./AvatarLoadingSkeleton";
import { DownloadIcon } from "./icons/DownloadIcon";
import { profile } from "@/lib/data/resume";

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
    <section id="hero" className="relative overflow-x-clip">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-14 pt-12 md:grid-cols-[1.1fr_0.9fr] md:pb-20 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="font-mono text-[13px] tracking-wide text-accent">
            Senior Software Engineer
          </span>

          <h1 className="mt-5 font-display text-7xl font-bold leading-[1.05] tracking-tight text-fg sm:text-8xl lg:text-8xl">
            Ahmed
            <br />
            <span className="text-accent">Alaa</span>
          </h1>

          <div className="mt-7 h-px w-24 bg-accent" />

          <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-fg-muted">
            Building <span className="font-semibold text-accent">backend systems</span>, APIs, and
            AI-powered features for fintech, telecom, and commerce that hold up in production.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#experience"
              className="rounded-full bg-accent px-7 py-3 font-sans text-sm font-semibold text-canvas transition hover:bg-accent-bright"
            >
              View experience
            </a>
            <a
              href={profile.cvUrl}
              download={profile.cvFileName}
              className="inline-flex items-center gap-2 rounded-full border border-fg-muted/40 px-7 py-3 font-sans text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
            >
              <DownloadIcon className="h-4 w-4" />
              Download CV
            </a>
            <a
              href="#contact"
              className="rounded-full border border-fg-muted/40 px-7 py-3 font-sans text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 inset-y-10 -z-10 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative h-[420px] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] sm:h-[480px]">
            <Avatar />
          </div>
          {/* AI concierge caption — re-enable once the chat feature is back
          <div className="flex items-center justify-center gap-2 border-x border-b border-accent/60 bg-surface py-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-xs tracking-wide text-fg-muted">
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
                  className="mx-6 font-mono text-[13px] tracking-wide text-fg-muted"
                >
                  {item} <span className="ml-10 text-spark">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
