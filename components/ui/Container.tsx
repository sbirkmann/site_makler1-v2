import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Breiten nach Referenz (gemessen bei 1920 px):
 * wide 1550 px, default 1200 px, narrow 965 px.
 */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        size === "wide" && "max-w-[1630px]",
        size === "default" && "max-w-[1280px]",
        size === "narrow" && "max-w-[1045px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Abschnitte: 80 px Rhythmus, Weiss und helles Grau im Wechsel, keine Linien. */
export function Section({
  children,
  className,
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted" | "sunken" | "dark";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 sm:py-16 lg:py-20",
        tone === "default" && "bg-surface",
        tone === "muted" && "bg-surface-muted",
        tone === "sunken" && "bg-surface-sunken",
        tone === "dark" && "bg-primary-900 text-ink-inverse",
        className,
      )}
    >
      {children}
    </section>
  );
}
