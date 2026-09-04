import Image from "next/image";
import { site } from "@/lib/site";
import { PropertySearch } from "@/components/property/PropertySearch";

/**
 * Hero nach Referenz: vollflaechiges Bild ueber die gesamte Breite,
 * Header transparent darueber, Zitat-Headline in heller Grotesk unten
 * links. Die Suchleiste liegt als weisse Flaeche auf der Bildunterkante.
 */
export function Hero({ cities }: { cities: string[] }) {
  const years = new Date().getFullYear() - site.founded;

  return (
    <section className="bg-surface">
      <div className="relative min-h-[34rem] w-full overflow-hidden bg-primary-900 sm:min-h-[40rem] lg:min-h-[calc(100vh-1px)] lg:max-h-[62rem]">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=80"
          alt="Modernes Wohnhaus mit großzügiger Verglasung und begrüntem Vorgarten"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto w-full max-w-[1630px] px-5 pb-28 sm:px-8 lg:px-10 lg:pb-32">
            <h1 className="hero-title max-w-[30ch] text-balance text-white">
              »Immobilien mit Haltung. Seit {years} Jahren im Rheinland – ehrlich eingeschätzt,
              persönlich begleitet.«
            </h1>
            <p className="mt-5 max-w-xl text-[1rem] font-light leading-relaxed tracking-[0.02em] text-white/80">
              Für Eigentümer, Käufer und alle, die eine Entscheidung in Ruhe treffen wollen.
            </p>
          </div>
        </div>
      </div>

      {/* Suchleiste auf der Bildunterkante */}
      <div className="relative z-10 mx-auto -mt-16 w-full max-w-[1630px] px-5 sm:px-8 lg:-mt-20 lg:px-10">
        <PropertySearch cities={cities} className="lg:max-w-none" />
      </div>
    </section>
  );
}
