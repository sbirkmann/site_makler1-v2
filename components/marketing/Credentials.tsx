import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Auszeichnungs-Leiste. Die Siegel sind eigene, rein typografische
 * Umsetzungen – bewusst ohne fremde Logos oder Markenzeichen.
 * Fuer ein echtes Projekt werden hier die tatsaechlichen Auszeichnungen
 * des Maklers hinterlegt.
 */
const awards = [
  { source: "Regionalreport", label: "Top Makler Rheinland", year: "2026" },
  { source: "Immobilien-Kompass", label: "Bestbewertet Köln", year: "2025" },
  { source: "Wirtschaft & Wohnen", label: "Beratungsqualität", year: "2025" },
  { source: "IHK Köln", label: "Zertifizierter Fachbetrieb", year: "seit 2011" },
];

/** Siegel v2: doppelter Kreis in Gruen, Lorbeer in Gold, Haken in Waldgruen. */
function Seal({ source, label, year }: (typeof awards)[number]) {
  return (
    <div className="flex items-center gap-4">
      <span
        aria-hidden="true"
        className="relative flex h-14 w-14 shrink-0 items-center justify-center"
      >
        <svg viewBox="0 0 56 56" fill="none" className="absolute inset-0 h-full w-full">
          <circle cx="28" cy="28" r="26.5" stroke="var(--color-line-strong)" strokeWidth="1" />
          <circle
            cx="28"
            cy="28"
            r="22.5"
            stroke="var(--color-primary-800)"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          {/* Lorbeer-artige Klammer, eigenstaendig konstruiert */}
          <path
            d="M19 15c-5 3.5-7.5 8-7.5 13s2.5 9.5 7.5 13"
            stroke="var(--color-accent-500)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M37 15c5 3.5 7.5 8 7.5 13s-2.5 9.5-7.5 13"
            stroke="var(--color-accent-500)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="m24.2 28.4 2.8 2.8 5.2-6"
            stroke="var(--color-primary-800)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.13em] text-ink-subtle">
          {source}
        </span>
        <span className="font-[family-name:var(--font-display)] text-[1.0625rem] font-medium leading-snug text-primary-950">
          {label}
        </span>
        <span className="text-[0.75rem] text-accent-600">{year}</span>
      </span>
    </div>
  );
}

export function Credentials() {
  return (
    <section className="border-y border-line bg-surface py-12 sm:py-14 lg:py-16">
      <Container size="wide">
        <p className="flex justify-center text-center">
          <span className="eyebrow">Ausgezeichnete Beratungsqualität im Rheinland</span>
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {awards.map((award, i) => (
            <Reveal
              key={award.label}
              delay={i * 80}
              className="lg:border-l lg:border-line lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <Seal {...award} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
