import { site } from "@/lib/site";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconAward, IconCompass, IconHandshake, IconUsers } from "@/components/icons";

const items = [
  {
    icon: IconAward,
    value: `${site.stats.yearsExperience} Jahre`,
    label: "am rheinischen Markt",
    detail: "Gegründet 2009 in Köln",
  },
  {
    icon: IconHandshake,
    value: `${site.stats.propertiesSold}+`,
    label: "vermittelte Immobilien",
    detail: "Wohnen, Gewerbe, Anlage",
  },
  {
    icon: IconUsers,
    value: `${site.stats.happyClients}+`,
    label: "begleitete Kundinnen und Kunden",
    detail: "Käufer wie Verkäufer",
  },
  {
    icon: IconCompass,
    value: "6 Regionen",
    label: "mit belastbarer Marktkenntnis",
    detail: "Köln, Bonn, Düsseldorf und Umland",
  },
];

/**
 * Kennzahlen v2: grosse Serifen-Ziffern ueber einer kurzen Goldlinie,
 * Spalten durch Hairlines getrennt. Das Icon sitzt klein daneben.
 */
export function TrustBar() {
  return (
    <Section className="py-12 sm:py-14">
      <Container size="wide">
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.label}
                delay={i * 80}
                className="lg:border-l lg:border-line lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <div className="flex flex-col gap-3">
                  <span aria-hidden="true" className="block h-px w-8 bg-accent-500" />
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="flex items-end justify-between gap-4">
                    <span className="font-[family-name:var(--font-display)] text-[2.75rem] leading-none tracking-[-0.025em] text-primary-900 sm:text-[3rem]">
                      {item.value}
                    </span>
                    <span className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-primary-600">
                      <Icon size={17} />
                    </span>
                  </dd>
                  <p className="text-[0.9375rem] font-medium leading-snug text-primary-950">
                    {item.label}
                  </p>
                  <p className="-mt-2 text-[0.8125rem] text-ink-subtle">{item.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </Section>
  );
}
