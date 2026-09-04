import Link from "next/link";
import { site } from "@/lib/site";
import { footerNav } from "@/components/layout/nav";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { IconLocation, IconMail, IconPhone } from "@/components/icons";

/**
 * Footer nach Referenz: anthrazitfarbene Flaeche, Logo mittig, Verzeichnis
 * in Versalien, ruhige Copyright-Zeile. Davor ein taupefarbener
 * Conversion-Block.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-ink-inverse">
      {/* Abschliessender Conversion-Block */}
      <div className="bg-accent-500 text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 px-5 py-16 text-center sm:px-8 lg:py-20">
          <h2 className="display-2 max-w-3xl text-white">Sprechen wir über Ihre Immobilie.</h2>
          <p className="max-w-2xl text-[1rem] font-light leading-relaxed text-white/85">
            Ob Verkauf, Kauf oder einfach eine Einschätzung: Das erste Gespräch ist
            unverbindlich und kostet Sie nichts außer zwanzig Minuten.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/kontakt" size="lg" variant="inverse">
              Beratung vereinbaren
            </ButtonLink>
            <ButtonLink
              href={site.contact.phoneHref}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-accent-600"
            >
              <IconPhone size={16} />
              {site.contact.phone}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="bg-primary-900">
        <div className="mx-auto flex max-w-[1630px] flex-col items-center gap-10 px-5 py-16 sm:px-8 lg:px-10">
          <Logo tone="light" stacked />

          <p className="max-w-2xl text-center text-[0.9375rem] font-light leading-relaxed text-white/65">
            {site.description}
          </p>

          <address className="flex flex-col items-center gap-3 text-[0.9375rem] font-light not-italic text-white/75 sm:flex-row sm:gap-8">
            <span className="flex items-center gap-2">
              <IconLocation size={16} className="shrink-0 text-accent-300" />
              {site.address.street}, {site.address.zipCode} {site.address.city}
            </span>
            <a href={site.contact.phoneHref} className="flex items-center gap-2 transition-colors hover:text-white">
              <IconPhone size={16} className="shrink-0 text-accent-300" />
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
              <IconMail size={16} className="shrink-0 text-accent-300" />
              {site.contact.email}
            </a>
          </address>

          <div className="grid w-full gap-10 border-t border-white/15 pt-10 sm:grid-cols-3">
            {Object.values(footerNav).map((group) => (
              <nav key={group.title} aria-label={group.title} className="flex flex-col items-center gap-4 text-center">
                <h3 className="font-[family-name:var(--font-display)] text-[1.0625rem] font-medium uppercase tracking-[0.18em] text-accent-300">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.8125rem] uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-[1630px] flex-col items-center gap-2 px-5 py-6 text-center text-[0.8125rem] font-light text-white/55 sm:px-8 lg:px-10">
            <p>© {year} {site.legalName}. Alle Rechte vorbehalten.</p>
            <p className="max-w-xl">
              Musterprojekt: Objekte, Personen und Bewertungen auf dieser Seite dienen
              ausschließlich Demonstrationszwecken.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
