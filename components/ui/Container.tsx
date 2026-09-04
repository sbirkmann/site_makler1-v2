import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "wide" && "max-w-[1600px]",
        size === "default" && "max-w-[1440px]",
        size === "narrow" && "max-w-[68rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Abschnitte v2: Flaechen wechseln zwischen Elfenbein und warmem Grau,
 * getrennt durch Hairlines statt durch Schatten oder Radien.
 */
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
        "border-t border-line py-14 sm:py-18 lg:py-22",
        tone === "default" && "bg-surface",
        tone === "muted" && "bg-surface-muted",
        tone === "sunken" && "bg-surface-sunken",
        tone === "dark" && "border-primary-800 bg-primary-950 text-ink-inverse",
        className,
      )}
    >
      {children}
    </section>
  );
}
