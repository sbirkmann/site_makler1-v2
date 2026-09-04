import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Wortmarke: Serifen-Versalien mit weiter Sperrung, darueber ein feines
 * Linien-Haus. `stacked` (Header-Mitte) setzt das Zeichen ueber den Namen,
 * sonst steht es links daneben.
 */
export function Logo({
  className,
  tone = "dark",
  href = "/",
  stacked = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  href?: string | null;
  stacked?: boolean;
}) {
  const stroke = tone === "light" ? "#ffffff" : "var(--color-accent-500)";
  const mark = (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", stacked ? "h-7 w-11" : "h-6 w-9")}
      stroke={stroke}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15 24 3l20 12" />
      <path d="M9 13.5V30h30V13.5" />
      <path d="M19 30V20h10v10" />
      <path d="M14 18h3M31 18h3" />
      <path d="M33 6v-3h3v5" />
    </svg>
  );

  const content = (
    <span
      className={cn(
        "inline-flex min-w-0",
        stacked ? "flex-col items-center gap-1.5" : "items-center gap-3",
        className,
      )}
    >
      {mark}
      <span
        className={cn(
          "flex min-w-0 leading-none",
          stacked ? "flex-col items-center" : "flex-col",
        )}
      >
        <span
          className={cn(
            "truncate font-[family-name:var(--font-display)] font-medium uppercase",
            stacked
              ? "text-[1.5rem] tracking-[0.32em] sm:text-[1.75rem]"
              : "text-[1.125rem] tracking-[0.28em] sm:text-[1.375rem]",
            tone === "light" ? "text-white" : "text-accent-500",
          )}
        >
          {site.shortName}
        </span>
        <span
          className={cn(
            "mt-1.5 hidden truncate text-[0.5625rem] font-normal uppercase tracking-[0.3em] sm:block",
            tone === "light" ? "text-white/70" : "text-ink-subtle",
          )}
        >
          Immobilien
        </span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label={`${site.name} – Startseite`} className={cn("min-w-0 max-w-full", className)}>
      {content}
    </Link>
  );
}
