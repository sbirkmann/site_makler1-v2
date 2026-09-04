import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "success" | "accent" | "muted" | "inverse" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-primary-900 text-white",
  success: "bg-[color-mix(in_srgb,var(--color-success)_14%,white)] text-[var(--color-success)]",
  accent: "bg-accent-500 text-white",
  muted: "bg-surface-sunken text-ink-muted",
  inverse: "bg-white/92 text-primary-900",
  outline: "border border-line-strong text-ink-muted",
};

/** Etiketten: kantig, Versalien, gesperrt. */
export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 text-[0.625rem] font-normal uppercase tracking-[0.14em] leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
