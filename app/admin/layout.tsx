import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { getSession } from "@/lib/services/auth";
import { logoutAction } from "@/lib/actions/admin";
import { Logo } from "@/components/layout/Logo";
import { AdminNav } from "@/app/admin/AdminNav";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconLogout } from "@/components/icons";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: { default: "Verwaltung", template: "%s | Verwaltung" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  // Die Login-Seite bringt ihr eigenes, minimales Layout mit.
  if (!session) {
    return <div className="min-h-dvh bg-surface-muted">{children}</div>;
  }

  return (
    <div className="min-h-dvh bg-surface-muted">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between gap-6 px-5 sm:px-8">
          <div className="flex items-center gap-5">
            <Logo href="/admin" />
            <Badge tone="outline" className="hidden sm:inline-flex">
              Verwaltung
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden text-[0.8125rem] text-ink-muted transition-colors hover:text-primary-800 sm:inline"
            >
              Website ansehen ↗
            </Link>
            <span className="hidden text-[0.8125rem] text-ink-subtle md:inline">
              {session.email}
            </span>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm">
                <IconLogout size={16} />
                Abmelden
              </Button>
            </form>
          </div>
        </div>
        <AdminNav />
      </header>

      <main className="mx-auto max-w-[100rem] px-5 py-8 sm:px-8 sm:py-10">{children}</main>
    </div>
  );
}
