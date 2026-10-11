import { GitHubIcon } from "./icons/GitHubIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { GitLabIcon } from "./icons/GitLabIcon";
import { profile } from "@/lib/data/resume";

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-6 pt-12">
        <p
          aria-hidden
          className="select-none whitespace-nowrap text-center font-display text-[14vw] font-bold leading-none text-fg/[0.04] md:text-[9rem]"
        >
          AHMED ALAA
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 pb-8 pt-4 sm:flex-row">
        <span className="font-mono text-[13px] text-fg-muted">
          Built with Next.js, Tailwind CSS, Framer Motion &amp; Claude.
        </span>
        <div className="flex items-center gap-4 text-fg-muted">
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-accent">
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-accent">
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a href={profile.gitlabUrl} target="_blank" rel="noreferrer" aria-label="GitLab" className="transition hover:text-accent">
            <GitLabIcon className="h-5 w-5" />
          </a>
        </div>
        <span className="font-mono text-[13px] text-fg-muted">
          © {new Date().getFullYear()} Ahmed Alaa
        </span>
      </div>
    </footer>
  );
}
