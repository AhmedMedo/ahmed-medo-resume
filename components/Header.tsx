"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function MenuIcon({ className, open }: { className?: string; open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-espresso/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="#" aria-label="Home" className="shrink-0">
          <Logo className="h-7 w-auto" />
        </Link>

        <nav className="hidden gap-9 font-sans text-sm tracking-wide text-cream-muted md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-0.5 transition hover:border-gold hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs tracking-widest text-cream-muted sm:inline">
            EGYPT · REMOTE
          </span>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="rounded-full border border-line p-2 text-cream transition hover:border-gold hover:text-gold md:hidden"
          >
            <MenuIcon className="h-4 w-4" open={mobileOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-espresso md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4 font-sans text-sm text-cream-muted">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 transition hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
              <span className="mt-2 border-t border-line pt-4 font-mono text-xs tracking-widest">
                EGYPT · REMOTE
              </span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
