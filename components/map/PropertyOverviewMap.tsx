"use client";

import { useState } from "react";
import { PropertyMap, type MapMarker } from "@/components/map/PropertyMap";
import { cn } from "@/lib/utils";
import { IconLocation } from "@/components/icons";

/**
 * Aufklappbare Uebersichtskarte ueber der Trefferliste. Die Karte wird erst
 * beim Oeffnen eingebunden – so laedt Leaflet nicht bei jedem Seitenaufruf.
 */
export function PropertyOverviewMap({
  markers,
  defaultOpen = false,
  className,
}: {
  markers: MapMarker[];
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (markers.length === 0) return null;

  return (
    <div className={cn("rounded-[var(--radius-sm)] border border-line bg-surface", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-primary-700">
            <IconLocation size={16} />
          </span>
          <span className="text-[0.9375rem] font-medium text-primary-900">
            {open ? "Kartenansicht ausblenden" : "Objekte auf der Karte ansehen"}
          </span>
        </span>
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          {markers.length} {markers.length === 1 ? "Objekt" : "Objekte"}
        </span>
      </button>

      {open ? (
        <div className="border-t border-line p-4">
          <PropertyMap
            markers={markers}
            className="aspect-[16/10] w-full sm:aspect-[16/8]"
            zoom={12}
          />
        </div>
      ) : null}
    </div>
  );
}
