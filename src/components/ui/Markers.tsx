import { showPlaceholders } from "@/content/site";
import { cn } from "@/lib/cn";

/** Small amber tag marking content that still needs hospital confirmation. */
export function ToConfirm({ show = true, className }: { show?: boolean; className?: string }) {
  if (!show || !showPlaceholders) return null;
  return (
    <span
      title="Placeholder: to be confirmed by the hospital before publishing"
      className={cn(
        "ml-2 inline-flex translate-y-[-1px] items-center gap-1 rounded-full border border-dashed border-gold-500/60 bg-gold-200/40 px-2 py-0.5 align-middle font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-gold-500",
        className,
      )}
    >
      To confirm
    </span>
  );
}

/** Labels stock photography standing in for real hospital photographs. */
export function SampleBadge({ className }: { className?: string }) {
  if (!showPlaceholders) return null;
  return (
    <span
      className={cn(
        "pointer-events-none absolute z-10 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/90 backdrop-blur-md",
        className ?? "left-3 top-3",
      )}
    >
      Sample photo
    </span>
  );
}
