import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Wortmarke v2: Serifen-Schriftzug mit einem Monogramm-Siegel –
 * ein Kreis mit dem Anfangsbuchstaben und einer goldenen Grundlinie,
 * die den Boden unter dem Haus andeutet.
 */
export function Logo({
  className,
  tone = "dark",
  href = "/",
}: {
  className?: string;
  tone?: "dark" | "light";
  href?: string | null;
}) {
  const initial = site.name.charAt(0);
  const content = (
    <span className={cn("inline-flex min-w-0 items-center gap-3", className)}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        aria-hidden="true"
        className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
      >
        <circle
          cx="22"
          cy="22"
          r="21"
          className={tone === "light" ? "stroke-white/40" : "stroke-primary-900"}
          strokeWidth="1.25"
        />
        <text
          x="22"
          y="27.5"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontStyle="italic"
          fontWeight="500"
          fontSize="22"
          className={tone === "light" ? "fill-white" : "fill-primary-900"}
        >
          {initial}
        </text>
        <path
          d="M13 33.5h18"
          stroke="var(--color-accent-500)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "truncate font-[family-name:var(--font-display)] text-[1.25rem] font-medium tracking-[-0.01em] sm:text-[1.5rem]",
            tone === "light" ? "text-white" : "text-primary-950",
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            "mt-1 hidden truncate text-[0.6875rem] font-semibold uppercase tracking-[0.18em] sm:block",
            tone === "light" ? "text-white/55" : "text-accent-600",
          )}
        >
          {site.claim}
        </span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label={`${site.name} – Startseite`}
      className={cn("min-w-0 max-w-full rounded-[var(--radius-sm)]", className)}
    >
      {content}
    </Link>
  );
}
