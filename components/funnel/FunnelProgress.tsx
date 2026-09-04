"use client";

import { cn } from "@/lib/utils";
import { IconCheck } from "@/components/icons";

export function FunnelProgress({
  steps,
  current,
  onStepClick,
  maxReached,
}: {
  steps: string[];
  current: number;
  onStepClick?: (index: number) => void;
  maxReached: number;
}) {
  const percent = ((current + 1) / steps.length) * 100;

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-[family-name:var(--font-display)] text-[1.125rem] font-medium leading-none text-primary-950">
          Schritt <span className="italic text-accent-500">{current + 1}</span> von {steps.length}
        </p>
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">{steps[current]}</p>
      </div>

      {/* Fortschrittsbalken */}
      <div
        className="h-px w-full overflow-hidden bg-line-strong"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label="Fortschritt"
      >
        <div
          className="h-full bg-accent-500 transition-[width] duration-500 [transition-timing-function:var(--ease-out-quint)]"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Schrittmarken – nur bereits erreichte Schritte sind anklickbar */}
      <ol className="hidden items-center justify-between gap-2 sm:flex">
        {steps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          const reachable = i <= maxReached;
          return (
            <li key={label} className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
              <button
                type="button"
                disabled={!reachable || !onStepClick}
                onClick={() => onStepClick?.(i)}
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-xs)] border font-[family-name:var(--font-display)] text-[0.75rem] font-medium transition-colors",
                  done
                    ? "border-accent-500 bg-accent-500 text-ink"
                    : active
                      ? "border-primary-900 bg-primary-900 text-ink-inverse"
                      : "border-line-strong text-ink-subtle",
                  reachable && onStepClick ? "cursor-pointer" : "cursor-default",
                )}
                aria-current={active ? "step" : undefined}
              >
                {done ? <IconCheck size={12} strokeWidth={3} /> : i + 1}
              </button>
              <span
                className={cn(
                  "truncate text-[0.75rem]",
                  active ? "font-semibold text-primary-900" : done ? "text-ink-muted" : "text-ink-subtle",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
