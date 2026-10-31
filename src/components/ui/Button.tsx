import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal-800 text-ivory-50 hover:bg-teal-900 shadow-[0_10px_30px_-12px_rgb(14_71_68/0.7)]",
  secondary:
    "bg-white/70 text-teal-900 ring-1 ring-inset ring-teal-900/15 hover:ring-teal-900/40 hover:bg-white backdrop-blur",
  ghost: "text-teal-800 hover:text-teal-950",
  light: "bg-ivory-50 text-teal-950 hover:bg-white",
};

const base =
  "group relative inline-flex whitespace-nowrap items-center justify-center gap-2.5 rounded-full px-6 h-12 text-[15px] font-semibold tracking-[-0.01em] transition-all duration-300 ease-out-soft active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";

type CommonProps = { variant?: Variant; icon?: ReactNode | false; className?: string; children: ReactNode };

function Inner({ children, icon }: { children: ReactNode; icon?: ReactNode | false }) {
  return (
    <>
      <span>{children}</span>
      {icon !== false && (
        <span className="grid size-6 place-items-center overflow-hidden rounded-full transition-transform duration-300 group-hover:translate-x-0.5">
          {icon ?? (
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:rotate-45"
            />
          )}
        </span>
      )}
    </>
  );
}

export function ButtonLink({
  variant = "primary",
  icon,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  return (
    <Link className={cn(base, variants[variant], className)} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant = "primary",
  icon,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
