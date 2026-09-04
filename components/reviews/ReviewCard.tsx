import type { Review } from "@prisma/client";
import { cn, formatDate } from "@/lib/utils";
import { propertyTypeLabels } from "@/lib/labels";
import { RatingStars } from "@/components/reviews/RatingStars";

/**
 * Bewertungskarte v2: Hairline-Rahmen ohne Schatten, grosses Serifen-
 * Anfuehrungszeichen in Gold, Zitat in der Display-Schrift.
 */
export function ReviewCard({ review, className }: { review: Review; className?: string }) {
  return (
    <figure
      className={cn(
        "relative flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:p-7",
        className,
      )}
    >
      <div className="flex min-w-0 items-start justify-between gap-4">
        <RatingStars rating={review.rating} size={16} />
        <span
          aria-hidden="true"
          className="-mt-3 select-none font-[family-name:var(--font-display)] text-[3.5rem] leading-none text-accent-400"
        >
          &ldquo;
        </span>
      </div>

      {review.title ? (
        <h3 className="heading-4 mt-2 text-primary-950">{review.title}</h3>
      ) : null}

      <blockquote className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
        {review.body}
      </blockquote>

      <figcaption className="mt-6 flex flex-wrap items-center gap-x-3.5 gap-y-2 border-t border-line pt-5">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong font-[family-name:var(--font-display)] text-[0.9375rem] tracking-wide text-primary-900"
        >
          {review.initials}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-[0.9375rem] font-medium text-primary-950">
            {review.authorName}
          </span>
          <span className="truncate text-[0.8125rem] text-ink-subtle">
            {[
              review.serviceType,
              review.propertyType ? propertyTypeLabels[review.propertyType] : null,
              review.city,
            ]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </span>
        <time
          dateTime={review.reviewedAt.toISOString()}
          className="shrink-0 text-[0.75rem] text-ink-subtle"
        >
          {formatDate(review.reviewedAt)}
        </time>
      </figcaption>
    </figure>
  );
}
