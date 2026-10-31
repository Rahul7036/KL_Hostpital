import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em]",
        tone === "dark" ? "text-teal-700" : "text-mint-300",
      )}
    >
      <span className={cn("h-px w-8", tone === "dark" ? "bg-gold-400" : "bg-gold-400/80")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-5 text-[2.1rem] leading-[1.08] font-semibold sm:text-5xl",
          tone === "dark" ? "text-teal-950" : "text-ivory-50",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-5 text-[17px] leading-relaxed",
            tone === "dark" ? "text-muted" : "text-mint-100/75",
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/** Serif italic accent used for emphasis words in headlines. */
export function Accent({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn("font-serif font-normal tracking-normal italic", className)}>{children}</em>;
}
