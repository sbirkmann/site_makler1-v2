import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "success" | "accent" | "muted" | "inverse" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-primary-900 text-ink-inverse",
  success: "bg-[color-mix(in_srgb,var(--color-success)_14%,var(--color-surface))] text-[var(--color-success)]",
  accent: "bg-accent-300 text-ink",
  muted: "bg-surface-sunken text-ink-muted",
  inverse: "bg-surface/92 text-primary-900 backdrop-blur-sm",
  outline: "border border-line-strong text-ink-muted",
};

/** Etiketten v2: knappe Ecken statt Pille – wie ein Typenschild. */
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
        "inline-flex items-center gap-1.5 rounded-[var(--radius-xs)] px-2 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
