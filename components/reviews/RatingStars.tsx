import { cn } from "@/lib/utils";
import { IconStar } from "@/components/icons";

/** Sterne v2: Safran-Gold auf Elfenbein, leere Sterne als Hairline. */
export function RatingStars({
  rating,
  size = 16,
  className,
  showValue = false,
}: {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}) {
  const rounded = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <IconStar
            key={i}
            size={size}
            filled={i <= rounded}
            strokeWidth={1.2}
            className={i <= rounded ? "text-accent-500" : "text-line-strong"}
          />
        ))}
      </span>
      {showValue ? (
        <span className="font-[family-name:var(--font-display)] text-[0.9375rem] tabular-nums text-primary-900">
          {rating.toFixed(1).replace(".", ",")}
        </span>
      ) : null}
      <span className="sr-only">{rating.toFixed(1).replace(".", ",")} von 5 Sternen</span>
    </span>
  );
}
