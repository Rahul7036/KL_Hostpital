import { cn } from "@/lib/cn";

/**
 * Interim brand mark (monogram + leaf) until the hospital's official logo is supplied.
 * Replace this component's SVG with the official artwork when available.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-10", className)}>
      <rect width="40" height="40" rx="12" className="fill-teal-800" />
      <path
        d="M27.5 9.5c-6.6.4-10.9 4.6-11.3 11.2 6.6-.4 10.9-4.6 11.3-11.2Z"
        className="fill-gold-400"
      />
      <path d="M16.2 20.7c2.6-3 5.6-5.5 9-7.5" className="stroke-teal-800" strokeWidth="1.2" fill="none" />
      <path
        d="M11 12v17M11 21.2 18.6 29M11 21.2l5.2-5.4"
        className="stroke-ivory-50"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M22 22v7h6" className="stroke-ivory-50" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[17px] font-bold tracking-[-0.02em]",
            tone === "dark" ? "text-teal-950" : "text-ivory-50",
          )}
        >
          KL Hospital
        </span>
        <span
          className={cn(
            "mt-1 text-[10.5px] font-medium uppercase tracking-[0.16em]",
            tone === "dark" ? "text-muted" : "text-mint-200/70",
          )}
        >
          Skin & Children
        </span>
      </span>
    </span>
  );
}
