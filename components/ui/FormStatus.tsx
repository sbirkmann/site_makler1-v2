import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IconCheckCircle, IconInfo } from "@/components/icons";

/** Erfolgsmeldung v2: Hairline-Rahmen, Serifen-Titel, Haken auf gruener Scheibe. */
export function SuccessPanel({
  title,
  message,
  children,
  className,
}: {
  title: string;
  message: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center gap-5 rounded-[var(--radius-lg)] border border-line bg-surface px-6 py-12 text-center",
        className,
      )}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary-200 bg-primary-50 text-primary-800">
        <IconCheckCircle size={30} strokeWidth={1.4} />
      </span>
      <div className="max-w-md">
        <span aria-hidden="true" className="mx-auto mb-4 block h-px w-8 bg-accent-500" />
        <h3 className="display-3 text-primary-950">{title}</h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{message}</p>
      </div>
      {children}
    </div>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="flex items-start gap-2.5 rounded-[var(--radius-sm)] border-l-2 border-[var(--color-danger)] bg-[color-mix(in_srgb,var(--color-danger)_6%,var(--color-surface))] px-4 py-3 text-[0.875rem] leading-relaxed text-[var(--color-danger)]"
    >
      <IconInfo size={17} className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}
