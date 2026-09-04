import Link from "next/link";
import { site } from "@/lib/site";
import { footerNav } from "@/components/layout/nav";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight, IconLocation, IconMail, IconPhone } from "@/components/icons";

/**
 * Footer v2: dunkles Waldgruen, grosser Serifen-Aufruf mit kursivem Akzent,
 * darunter ein vierspaltiges Verzeichnis mit Hairlines.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-ink-inverse">
      {/* Abschliessender Conversion-Block */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-22">
          <div className="max-w-2xl">
            <span className="eyebrow !text-accent-300">Nächster Schritt</span>
            <h2 className="display-1 mt-5 text-white">
              Sprechen wir <em className="!text-accent-300">über Ihre Immobilie.</em>
            </h2>
            <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-white/65">
              Ob Verkauf, Kauf oder einfach eine Einschätzung: Das erste Gespräch ist
              unverbindlich und kostet Sie nichts außer zwanzig Minuten.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <ButtonLink href="/kontakt" size="lg" variant="accent">
              Beratung vereinbaren
              <IconArrowRight size={18} />
            </ButtonLink>
            <ButtonLink
              href={site.contact.phoneHref}
              size="lg"
              variant="outline"
              className="border-white/25 text-white hover:border-white hover:bg-white hover:text-primary-950"
            >
              <IconPhone size={18} />
              {site.contact.phone}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:pr-12">
          <Logo tone="light" />
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-white/60">
            {site.description}
          </p>
          <address className="flex flex-col gap-3 text-[0.9375rem] not-italic text-white/70">
            <span className="flex items-start gap-3">
              <IconLocation size={18} className="mt-0.5 shrink-0 text-accent-300" />
              <span>
                {site.address.street}
                <br />
                {site.address.zipCode} {site.address.city}
              </span>
            </span>
            <a
              href={site.contact.phoneHref}
              className="flex items-center gap-3 transition-colors hover:text-white"
            >
              <IconPhone size={18} className="shrink-0 text-accent-300" />
              {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-3 transition-colors hover:text-white"
            >
              <IconMail size={18} className="shrink-0 text-accent-300" />
              {site.contact.email}
            </a>
          </address>
        </div>

        {Object.values(footerNav).map((group) => (
          <nav
            key={group.title}
            aria-label={group.title}
            className="flex flex-col gap-4 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          >
            <h3 className="font-[family-name:var(--font-display)] text-[1.125rem] font-medium text-white">
              {group.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-white/60 transition-colors hover:text-accent-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-6 text-[0.8125rem] text-white/45 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>
            © {year} {site.legalName}. Alle Rechte vorbehalten.
          </p>
          <p className="max-w-xl md:text-right">
            Musterprojekt: Objekte, Personen und Bewertungen auf dieser Seite dienen
            ausschließlich Demonstrationszwecken.
          </p>
        </div>
      </div>
    </footer>
  );
}
