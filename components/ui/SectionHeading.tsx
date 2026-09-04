import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Abschnittskopf: Serifen-Versalien in Gold als Titelzeile (eyebrow),
 * darunter optional die eigentliche Ueberschrift in heller Grotesk.
 * Standard ist mittig; mit `action` wird zweispaltig linksbuendig gesetzt.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align,
  as: Tag = "h2",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  action?: ReactNode;
}) {
  const centered = (align ?? (action ? "left" : "center")) === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-4", centered && "items-center", action && "md:max-w-2xl")}>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <Tag className={cn(Tag === "h1" ? "display-1" : "display-2", "text-balance text-ink")}>
          {title}
        </Tag>
        {description ? (
          <p className={cn("lead text-pretty", centered ? "max-w-3xl" : "max-w-xl")}>{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 md:pb-1">{action}</div> : null}
    </div>
  );
}
