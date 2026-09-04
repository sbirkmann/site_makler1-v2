import Image from "next/image";
import { site } from "@/lib/site";
import { PropertySearch } from "@/components/property/PropertySearch";
import { ButtonLink } from "@/components/ui/Button";
import { RatingStars } from "@/components/reviews/RatingStars";
import { IconArrowRight } from "@/components/icons";

/**
 * Hero v2: geteilte Buehne statt Bildkarte.
 * Links Text auf Elfenbein mit grosser Serifen-Headline, rechts ein
 * randabfallendes Bild mit kantigen Ecken. Die Suche liegt als Leiste
 * unter beiden Spalten und ueberlappt die Bildkante leicht.
 */
export function Hero({ cities }: { cities: string[] }) {
  const years = new Date().getFullYear() - site.founded;

  return (
    <section className="bg-surface">
      <div className="mx-auto grid w-full max-w-[1600px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* Textspalte */}
        <div className="flex flex-col justify-center px-5 pb-12 pt-12 sm:px-8 lg:px-12 lg:py-20">
          <span className="eyebrow">Immobilienmakler · Köln, Bonn &amp; Rheinland</span>

          <h1 className="hero-title mt-6 max-w-[14ch] text-balance text-primary-950">
            Immobilien <em>mit Haltung.</em>
            <span className="block">Seit {years} Jahren.</span>
          </h1>

          <p className="lead mt-7 max-w-xl">
            Ehrliche Einschätzung statt Wunschpreisen – für Eigentümer, Käufer und alle,
            die eine Entscheidung in Ruhe treffen wollen.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/immobilienbewertung" size="lg" variant="primary">
              Immobilie kostenlos bewerten
              <IconArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="/immobilien" size="lg" variant="ghost">
              Aktuelle Angebote
            </ButtonLink>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-7">
            <div className="flex items-center gap-3">
              <RatingStars rating={site.stats.averageRating} size={16} />
              <span className="text-[0.875rem] text-ink-muted">
                <strong className="font-semibold text-primary-950">{site.stats.averageRating}</strong>{" "}
                von 5 bei Kundenbewertungen
              </span>
            </div>
            <p className="text-[0.875rem] text-ink-muted">
              <strong className="font-semibold text-primary-950">{site.stats.propertiesSold}+</strong>{" "}
              vermittelte Immobilien
            </p>
          </div>
        </div>

        {/* Bildspalte */}
        <div className="relative min-h-[22rem] sm:min-h-[28rem] lg:min-h-[44rem]">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="Modernes Wohnhaus mit großzügiger Verglasung und begrüntem Vorgarten"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950/35 to-transparent" />

          {/* Bildunterschrift wie in einer Zeitschrift */}
          <figcaption className="absolute bottom-6 left-6 hidden max-w-xs border-l-2 border-accent-400 pl-4 text-[0.8125rem] leading-relaxed text-white/85 sm:block lg:bottom-8 lg:left-8">
            Verkauft in Köln-Lindenthal · vermittelt innerhalb von sechs Wochen an eine Familie aus
            der Nachbarschaft.
          </figcaption>
        </div>
      </div>

      {/* Suchleiste */}
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="-mt-0 border-t border-line py-6 lg:-mt-10 lg:border-0 lg:py-0">
          <PropertySearch cities={cities} className="lg:max-w-none" />
        </div>
      </div>
      <div className="h-10" />
    </section>
  );
}
