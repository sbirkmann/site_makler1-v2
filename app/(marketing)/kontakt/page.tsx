import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { findAgents } from "@/lib/repositories/agents";
import { findOpeningHours } from "@/lib/repositories/settings";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/marketing/ContactForm";
import { SearchProfileFunnel } from "@/components/funnel/SearchProfileFunnel";
import { PropertyMap } from "@/components/map/PropertyMap";
import { IconClock, IconLocation, IconMail, IconPhone, IconWhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Sprechen Sie mit uns: Telefon, E-Mail oder Kontaktformular. WohnWert Immobilien in Köln – persönlich erreichbar von Montag bis Freitag.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt – WohnWert Immobilien",
    description: "Persönlich erreichbar in Köln, Bonn und dem Rheinland.",
    url: `${site.url}/kontakt`,
  },
};

export const revalidate = 600;

const subjectMap: Record<string, string> = {
  suchprofil: "Suchprofil hinterlegen",
  verkauf: "Ich möchte verkaufen",
  bewertung: "Immobilienbewertung",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ anliegen?: string }>;
}) {
  const { anliegen } = await searchParams;
  const [agents, openingHours] = await Promise.all([findAgents(), findOpeningHours()]);
  const defaultSubject = anliegen ? subjectMap[anliegen] : undefined;
  // Beim Anliegen "Suchprofil" fuehrt der Funnel gezielter als das freie
  // Kontaktformular – er fragt ab, was gesucht wird.
  const showSearchProfile = anliegen === "suchprofil";

  return (
    <>
      <Section className="pb-0">
        <Container size="wide">
          <Reveal>
            <span className="eyebrow">Kontakt</span>
            <h1 className="page-title mt-4 max-w-3xl text-balance text-primary-950">
              Sprechen wir über <em className="font-normal italic text-accent-500">Ihre Immobilie</em>
            </h1>
            <p className="lead mt-5 max-w-2xl">
              Rufen Sie an, schreiben Sie oder nutzen Sie das Formular. Wir antworten in der Regel
              innerhalb eines Werktages – und leiten Sie an die Person weiter, die Ihr Thema am
              besten kennt.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="pt-8">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* Kontaktinformationen */}
            <div className="flex flex-col gap-8">
              <Reveal>
                <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-7">
                  <h2 className="heading-4 text-primary-950">So erreichen Sie uns</h2>
                  <div className="mt-6 flex flex-col gap-5">
                    <a
                      href={site.contact.phoneHref}
                      className="group flex items-start gap-4 transition-colors"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-primary-700 transition-colors group-hover:border-primary-900 group-hover:bg-primary-900 group-hover:text-ink-inverse">
                        <IconPhone size={20} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                          Telefon
                        </span>
                        <span className="font-[family-name:var(--font-display)] text-[1.125rem] font-medium text-primary-950">
                          {site.contact.phone}
                        </span>
                      </span>
                    </a>

                    <a
                      href={`mailto:${site.contact.email}`}
                      className="group flex items-start gap-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-primary-700 transition-colors group-hover:border-primary-900 group-hover:bg-primary-900 group-hover:text-ink-inverse">
                        <IconMail size={20} />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                          E-Mail
                        </span>
                        <span className="break-all font-[family-name:var(--font-display)] text-[1.125rem] font-medium text-primary-950">
                          {site.contact.email}
                        </span>
                      </span>
                    </a>

                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-primary-700">
                        <IconWhatsApp size={20} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                          WhatsApp
                        </span>
                        <span className="font-[family-name:var(--font-display)] text-[1.125rem] font-medium text-primary-950">
                          {site.contact.whatsapp}
                        </span>
                      </span>
                    </div>

                    <address className="flex items-start gap-4 not-italic">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-primary-700">
                        <IconLocation size={20} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                          Büro
                        </span>
                        <span className="font-[family-name:var(--font-display)] text-[1.125rem] font-medium leading-snug text-primary-950">
                          {site.address.street}
                          <br />
                          {site.address.zipCode} {site.address.city}
                        </span>
                      </span>
                    </address>
                  </div>
                </div>
              </Reveal>

              {/* Oeffnungszeiten */}
              <Reveal delay={90}>
                <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-7">
                  <h2 className="heading-4 flex items-center gap-3 text-primary-950">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-primary-700">
                      <IconClock size={17} />
                    </span>
                    Öffnungszeiten
                  </h2>
                  <dl className="mt-5 divide-y divide-line">
                    {openingHours.map((row) => (
                      <div key={row.days} className="flex justify-between gap-4 py-3">
                        <dt className="text-[0.9375rem] text-ink-muted">{row.days}</dt>
                        <dd
                          className={
                            row.closed
                              ? "text-[0.9375rem] text-ink-subtle"
                              : "text-[0.9375rem] font-medium text-primary-950"
                          }
                        >
                          {row.hours}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-subtle">
                    Besichtigungen und Beratungstermine bieten wir auf Wunsch auch abends und
                    samstags an.
                  </p>
                </div>
              </Reveal>

              {/* Anfahrt */}
              <Reveal delay={140}>
                <PropertyMap
                  className="aspect-[16/9] w-full"
                  zoom={15}
                  markers={[
                    {
                      id: "buero",
                      latitude: site.address.latitude,
                      longitude: site.address.longitude,
                      title: site.name,
                      subtitle: `${site.address.street}, ${site.address.zipCode} ${site.address.city}`,
                    },
                  ]}
                />
              </Reveal>
            </div>

            {/* Formular bzw. Suchprofil-Funnel */}
            <Reveal delay={60}>
              <div className="rounded-[var(--radius-lg)] border border-line-strong bg-surface p-6 sm:p-8">
                <span aria-hidden="true" className="mb-5 block h-px w-8 bg-accent-500" />
                <h2 className="display-3 text-primary-950">
                  {showSearchProfile ? "Ihr Suchprofil" : "Schreiben Sie uns"}
                </h2>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {showSearchProfile
                    ? "In wenigen Schritten: Wir melden uns, sobald ein passendes Objekt in die Vermarktung geht – oft bevor es öffentlich inseriert wird."
                    : "Je konkreter Ihr Anliegen, desto gezielter können wir antworten."}
                </p>
                <div className="mt-7">
                  {showSearchProfile ? (
                    <SearchProfileFunnel />
                  ) : (
                    <ContactForm defaultSubject={defaultSubject} />
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Ansprechpartner */}
      <Section tone="muted">
        <Container size="wide">
          <span aria-hidden="true" className="mb-5 block h-px w-8 bg-accent-500" />
          <h2 className="display-2 text-primary-950">Ihre Ansprechpartner</h2>
          <p className="lead mt-4 max-w-2xl">
            Sie können sich auch direkt an die Person wenden, die Ihr Thema betreut.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {agents.map((agent, i) => (
              <Reveal key={agent.id} delay={(i % 4) * 80}>
                <div className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6">
                  <div className="flex items-center gap-4">
                    {agent.imageUrl ? (
                      <Image
                        src={agent.imageUrl}
                        alt=""
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-full border border-line object-cover"
                      />
                    ) : null}
                    <div className="min-w-0">
                      <p className="truncate font-[family-name:var(--font-display)] text-[1.0625rem] font-medium text-primary-950">
                        {agent.firstName} {agent.lastName}
                      </p>
                      <p className="mt-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] leading-snug text-accent-600">
                        {agent.role}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
                    {agent.phone ? (
                      <a
                        href={`tel:${agent.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-2.5 text-[0.8125rem] text-ink-muted transition-colors hover:text-primary-800"
                      >
                        <IconPhone size={15} className="shrink-0 text-primary-500" />
                        {agent.phone}
                      </a>
                    ) : null}
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-2.5 break-all text-[0.8125rem] text-ink-muted transition-colors hover:text-primary-800"
                    >
                      <IconMail size={15} className="shrink-0 text-primary-500" />
                      {agent.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
