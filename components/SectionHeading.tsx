interface SectionHeadingProps {
  label: string;
  heading: string;
  intro?: string;
}

export function SectionHeading({ label, heading, intro }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <span className="font-mono text-[13px] tracking-wide text-accent">
        — {label}
      </span>
      <h2 className="mt-3 font-display text-4xl font-bold text-fg sm:text-5xl">
        {heading}
      </h2>
      {intro && (
        <p className="mt-3 max-w-xl font-sans text-sm text-fg-muted">{intro}</p>
      )}
    </div>
  );
}
