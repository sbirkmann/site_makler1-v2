import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface-muted px-5 py-20 text-center">
      <p className="font-[family-name:var(--font-display)] text-[6rem] font-medium italic leading-none tracking-[-0.03em] text-accent-500">
        404
      </p>
      <span aria-hidden="true" className="mt-6 block h-px w-10 bg-line-strong" />
      <h1 className="display-2 mt-6 text-primary-950">
        Diese Seite <em>gibt es nicht</em>
      </h1>
      <p className="lead mt-4 max-w-md">
        Möglicherweise wurde das Objekt bereits vermittelt oder die Adresse hat sich geändert.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/immobilien" size="lg">
          Aktuelle Immobilien
          <IconArrowRight size={18} />
        </ButtonLink>
        <ButtonLink href="/" size="lg" variant="outline">
          Zur Startseite
        </ButtonLink>
      </div>
      <Link
        href="/kontakt"
        className="mt-8 text-[0.875rem] text-primary-900 underline decoration-accent-500 decoration-1 underline-offset-[6px] hover:decoration-2"
      >
        Sie suchen etwas Bestimmtes? Sprechen Sie uns an.
      </Link>
    </div>
  );
}
