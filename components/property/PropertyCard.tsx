import Image from "next/image";
import Link from "next/link";
import type { PropertyCardData } from "@/lib/repositories/properties";
import { cn, formatArea, formatPrice, formatRooms } from "@/lib/utils";
import { marketingTypeLabels, propertyTypeLabels, statusLabels, statusTone } from "@/lib/labels";
import { Badge } from "@/components/ui/Badge";
import { IconArea, IconLocation, IconRooms } from "@/components/icons";

/**
 * Objektkarte v2 "Editorial Estate": kantiges Bild, Hairline statt Schatten,
 * Typ und Ort als Kapitaelchen-Zeile, Serifen-Titel und Serifen-Preis auf
 * einer Grundlinie mit den Eckdaten. Hover bewegt nur Bild und Rahmenfarbe.
 */
export function PropertyCard({
  property,
  priority = false,
  className,
}: {
  property: PropertyCardData;
  priority?: boolean;
  className?: string;
}) {
  const cover = property.images[0];
  const isRent = property.marketingType === "MIETE";
  const showStatus = property.status !== "VERFUEGBAR";

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-sm)] border border-line bg-surface",
        "transition-colors duration-300 [transition-timing-function:var(--ease-out-quint)]",
        "hover:border-primary-900",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-surface-sunken">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-subtle">
            Kein Bild vorhanden
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3.5">
          <div className="flex flex-wrap gap-1.5">
            <Badge tone="inverse">{marketingTypeLabels[property.marketingType]}</Badge>
            {property.featured ? <Badge tone="accent">Empfehlung</Badge> : null}
          </div>
          {showStatus ? (
            <Badge tone={statusTone[property.status] === "success" ? "success" : "inverse"}>
              {statusLabels[property.status]}
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary-600">
          <span>{propertyTypeLabels[property.propertyType]}</span>
          <span aria-hidden="true" className="h-px w-4 bg-accent-500" />
          <span className="flex items-center gap-1 font-medium text-ink-muted">
            <IconLocation size={12} className="text-ink-subtle" />
            {property.region ? `${property.region}, ${property.city}` : property.city}
          </span>
        </p>

        <h3 className="heading-4 mt-3 text-primary-950">
          <Link
            href={`/immobilien/${property.slug}`}
            className="before:absolute before:inset-0 group-hover:text-primary-700"
          >
            <span className="line-clamp-2">{property.title}</span>
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-2 text-[0.875rem] leading-relaxed text-ink-muted">
          {property.shortDescription}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-line pt-4">
          <p className="font-[family-name:var(--font-display)] text-[1.375rem] leading-none tracking-[-0.015em] text-primary-900">
            {property.priceOnRequest ? (
              <span className="text-[1.0625rem] italic">Preis auf Anfrage</span>
            ) : (
              <>
                {formatPrice(property.price)}
                {isRent ? (
                  <span className="ml-1 font-sans text-[0.75rem] uppercase tracking-[0.08em] text-ink-subtle">
                    / Monat
                  </span>
                ) : null}
              </>
            )}
          </p>

          <dl className="flex items-center gap-3.5 text-[0.8125rem] text-ink-muted">
            {property.livingArea || property.plotArea ? (
              <div className="flex items-center gap-1.5">
                <IconArea size={15} className="text-ink-subtle" />
                <dt className="sr-only">
                  {property.livingArea ? "Wohnfläche" : "Grundstücksfläche"}
                </dt>
                <dd>{formatArea(property.livingArea ?? property.plotArea)}</dd>
              </div>
            ) : null}
            {property.rooms ? (
              <div className="flex items-center gap-1.5">
                <IconRooms size={15} className="text-ink-subtle" />
                <dt className="sr-only">Zimmer</dt>
                <dd>{formatRooms(property.rooms)} Zi.</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
    </article>
  );
}
