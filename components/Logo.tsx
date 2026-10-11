// "AA" monogram — no container box.
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ahmed Alaa monogram"
    >
      <path
        d="M4 28L14 4L24 28"
        stroke="#EDEBF7"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="8.2" y1="19.5" x2="19.8" y2="19.5" stroke="#EDEBF7" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M22 28L32 4L42 28"
        stroke="#A78BFA"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="26.2" y1="19.5" x2="37.8" y2="19.5" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
      <circle cx="45.5" cy="27" r="1.6" fill="#A78BFA" />
    </svg>
  );
}
