import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/services/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { IconPlus } from "@/components/icons";

export const dynamic = "force-dynamic";
export default async function AdminBlogPage() {
  if (!(await getSession())) redirect("/admin/login");
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
  return (
    <div className="flex max-w-4xl flex-col gap-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="display-3 text-primary-950">Ratgeber</h1>
          <p className="mt-2 text-[0.9375rem] text-ink-muted">
            Beiträge manuell anlegen oder über die konfigurierte API befüllen.
          </p>
        </div>
        <ButtonLink href="/admin/blog/neu">
          <IconPlus size={17} />
          Beitrag anlegen
        </ButtonLink>
      </div>
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 text-sm last:border-b-0"
          >
            <span className="min-w-0">
              <span className="font-[family-name:var(--font-display)] text-[1.0625rem] font-medium text-primary-950">
                {post.title}
              </span>
              <span className="ml-2 text-ink-subtle">/{post.slug}</span>
            </span>
            <Badge tone={post.published ? "success" : "muted"}>
              {post.published ? "Veröffentlicht" : "Entwurf"}
            </Badge>
          </div>
        ))}
        {!posts.length && (
          <p className="p-8 text-center text-sm text-ink-subtle">Noch keine Beiträge vorhanden.</p>
        )}
      </div>
      <Link
        href="/admin/schnittstellen"
        className="w-fit text-[0.8125rem] text-ink-muted underline-offset-4 hover:text-primary-800 hover:underline"
      >
        Ratgeber-API konfigurieren
      </Link>
    </div>
  );
}
