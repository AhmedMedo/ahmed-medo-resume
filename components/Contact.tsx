"use client";

import { motion } from "framer-motion";
import { MailIcon } from "./icons/MailIcon";
import { PhoneIcon } from "./icons/PhoneIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { GitHubIcon } from "./icons/GitHubIcon";
import { profile } from "@/lib/data/resume";

const CONTACT_LINKS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, Icon: PhoneIcon, external: false },
  { label: "LinkedIn", value: "ahmedalaa100", href: profile.linkedinUrl, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: "AhmedMedo", href: profile.githubUrl, Icon: GitHubIcon, external: true },
];

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

        <p className="mt-5 max-w-xl font-sans text-base leading-[1.7] text-fg-muted">
          Have a project or role in mind? Reach out through any of these.
        </p>

        <div className="mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {CONTACT_LINKS.map(({ label, value, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external && { target: "_blank", rel: "noreferrer" })}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-canvas/60 p-4 transition hover:-translate-y-0.5 hover:border-accent/60 hover:bg-canvas"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-canvas">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-xs tracking-wide text-fg-muted">
                  {label}
                </span>
                <span className="block truncate font-sans text-sm font-medium text-fg transition group-hover:text-accent-bright">
                  {value}
                </span>
              </span>
            </a>
          ))}
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
