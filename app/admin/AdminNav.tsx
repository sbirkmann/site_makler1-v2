"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconClock, IconDashboard, IconHouse, IconInbox, IconKey } from "@/components/icons";

const items = [
  { href: "/admin", label: "Dashboard", Icon: IconDashboard, exact: true },
  { href: "/admin/immobilien", label: "Immobilien", Icon: IconHouse },
  { href: "/admin/anfragen", label: "Anfragen", Icon: IconInbox },
  { href: "/admin/blog", label: "Ratgeber", Icon: IconHouse },
  { href: "/admin/oeffnungszeiten", label: "Öffnungszeiten", Icon: IconClock },
  { href: "/admin/schnittstellen", label: "Schnittstellen", Icon: IconKey },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Verwaltungsnavigation" className="mx-auto max-w-[100rem] border-t border-line px-5 sm:px-8">
      <ul className="hide-scrollbar -mb-px flex gap-6 overflow-x-auto">
        {items.map(({ href, label, Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap border-b-2 py-3 text-[0.875rem] font-medium transition-colors",
                  active
                    ? "border-accent-500 text-primary-950"
                    : "border-transparent text-ink-muted hover:border-line-strong hover:text-primary-900",
                )}
              >
                <Icon size={16} className={active ? "text-accent-600" : "text-ink-subtle"} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
