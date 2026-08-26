export function Mark({ className = "size-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="24" height="22" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 12h14M9 16.5h14M9 21h9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 21h3" stroke="#1F6B4A" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}