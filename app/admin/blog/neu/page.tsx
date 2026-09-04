import { redirect } from "next/navigation";
import { getSession } from "@/lib/services/auth";
import { saveBlogAction } from "@/lib/actions/admin";
import { Button } from "@/components/ui/Button";

export default async function NewBlogPage() {
  if (!(await getSession())) redirect("/admin/login");
  const input =
    "mt-1.5 w-full rounded-[var(--radius-md)] border border-line-strong bg-surface px-3.5 py-2.5 text-[0.9375rem] font-normal text-ink placeholder:text-ink-subtle transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/15";
  const label = "text-[0.8125rem] font-medium text-ink-muted";
  return (
    <div className="max-w-3xl">
      <h1 className="display-3 text-primary-950">Ratgeberbeitrag anlegen</h1>
      <form
        action={saveBlogAction}
        encType="multipart/form-data"
        className="mt-7 grid gap-5 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-7"
      >
        <label className={label}>
          Titel
          <input name="title" required className={input} />
        </label>
        <label className={label}>
          Slug
          <input name="slug" required pattern="[a-z0-9-]{3,160}" className={input} />
        </label>
        <label className={label}>
          Kurzbeschreibung
          <textarea name="excerpt" required className={input} />
        </label>
        <label className={label}>
          Inhalt
          <textarea name="content" required rows={14} className={input} />
        </label>
        <label className={label}>
          Titelbild
          <input
            name="coverImage"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="mt-2 block text-sm text-ink"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input name="published" type="checkbox" defaultChecked className="accent-primary-800" /> Sofort
          veröffentlichen
        </label>
        <Button type="submit" className="w-fit">
          Beitrag speichern
        </Button>
      </form>
    </div>
  );
}
