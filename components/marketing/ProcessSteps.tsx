"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  IconConsulting,
  IconValuation,
  IconCompass,
  IconCamera,
  IconHandshake,
} from "@/components/icons";

const steps = [
  {
    number: "01",
    icon: IconConsulting,
    title: "Kostenlose Erstberatung",
    description:
      "Wir lernen Ihre Situation und Ihre Immobilie kennen – ohne Verkaufsdruck und ohne Vertrag. Meist reicht ein Gespräch von zwanzig Minuten, um die richtigen Fragen zu klären.",
  },
  {
    number: "02",
    icon: IconValuation,
    title: "Professionelle Bewertung",
    description:
      "Analyse von Lage, Markt und Objekt. Sie erhalten eine nachvollziehbare Wertspanne mit Vergleichsobjekten – keine Zahl, die nur gut klingt.",
  },
  {
    number: "03",
    icon: IconCompass,
    title: "Individuelle Vermarktungsstrategie",
    description:
      "Öffentlich oder diskret, breit oder gezielt: Wir legen gemeinsam fest, wie Ihre Immobilie positioniert wird und wen wir ansprechen.",
  },
  {
    number: "04",
    icon: IconCamera,
    title: "Vermarktung & Besichtigungen",
    description:
      "Professionelle Fotos, Grundrisse und Exposé. Anfragen werden vorqualifiziert, damit nur Interessenten kommen, die auch kaufen können.",
  },
  {
    number: "05",
    icon: IconHandshake,
    title: "Erfolgreicher Abschluss",
    description:
      "Verhandlung, Kaufvertrag und Übergabe. Wir begleiten Sie bis zum Notartermin – und darüber hinaus bis zur protokollierten Schlüsselübergabe.",
  },
];

/**
 * Ablauf v2: vertikale Zeitleiste. Der Marker traegt die Serifen-Ziffer
 * in einem Hairline-Kreis, die Goldlinie waechst mit dem Scrollfortschritt.
 */
export function ProcessSteps() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target as HTMLLIElement);
            if (index >= 0) setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const el of refs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ol className="relative">
      {/* Verbindungslinie */}
      <span
        aria-hidden="true"
        className="absolute left-[1.4375rem] top-4 bottom-4 w-px bg-line-strong lg:left-1/2 lg:-translate-x-1/2"
      />
      <span
        aria-hidden="true"
        className="absolute left-[1.4375rem] top-4 w-px bg-accent-500 transition-[height] duration-700 [transition-timing-function:var(--ease-out-quint)] lg:left-1/2 lg:-translate-x-1/2"
        style={{ height: `${((active + 1) / steps.length) * 100}%`, maxHeight: "calc(100% - 2rem)" }}
      />

      {steps.map((step, i) => {
        const isActive = i <= active;
        const alignRight = i % 2 === 1;

        return (
          <li
            key={step.number}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={cn(
              "relative grid gap-x-12 pb-12 last:pb-0",
              "grid-cols-[3rem_1fr] lg:grid-cols-[1fr_3rem_1fr]",
            )}
          >
            {/* Desktop: linke Spalte */}
            <div className={cn("hidden lg:block", alignRight ? "" : "lg:text-right")}>
              {!alignRight ? <StepContent step={step} active={isActive} align="right" /> : null}
            </div>

            {/* Marker: Serifen-Ziffer im Hairline-Kreis */}
            <div className="relative flex justify-center lg:justify-center">
              <span
                className={cn(
                  "sticky top-1/2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-surface font-[family-name:var(--font-display)] text-[1.0625rem] leading-none tracking-[-0.01em] transition-colors duration-500",
                  isActive
                    ? "border-accent-500 text-primary-900"
                    : "border-line-strong text-ink-subtle",
                )}
              >
                {step.number}
              </span>
            </div>

            {/* Mobile + Desktop rechte Spalte */}
            <div className="lg:hidden">
              <StepContent step={step} active={isActive} align="left" />
            </div>
            <div className="hidden lg:block">
              {alignRight ? <StepContent step={step} active={isActive} align="left" /> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function StepContent({
  step,
  active,
  align,
}: {
  step: (typeof steps)[number];
  active: boolean;
  align: "left" | "right";
}) {
  const Icon = step.icon;
  return (
    <div
      className={cn(
        "transition-opacity duration-500",
        active ? "opacity-100" : "opacity-55",
        align === "right" && "lg:text-right",
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-3",
          align === "right" && "lg:flex-row-reverse",
        )}
      >
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-500",
            active ? "border-line bg-primary-50 text-primary-800" : "border-line text-ink-subtle",
          )}
        >
          <Icon size={17} />
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-8 transition-colors duration-500",
            active ? "bg-accent-500" : "bg-line-strong",
          )}
        />
      </span>
      <h3 className="heading-4 mt-4 text-primary-950">{step.title}</h3>
      <p
        className={cn(
          "mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted",
          align === "right" && "lg:ml-auto",
        )}
      >
        {step.description}
      </p>
    </div>
  );
}
