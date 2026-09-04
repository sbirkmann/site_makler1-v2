import { redirect } from "next/navigation";
import { getSession } from "@/lib/services/auth";
import { prisma } from "@/lib/db";
import { createFtpAccountAction, deleteFtpAccountAction, saveBlogApiSettingsAction, saveLeadPushProvidersAction } from "@/lib/actions/admin";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

const providers = ["ONOFFICE", "PROPSTACK", "FLOWFACT"] as const;

export default async function IntegrationsPage() {
  if (!(await getSession())) redirect("/admin/login");
  const [accounts, configured, blogApi] = await Promise.all([
    prisma.ftpAccount.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.leadPushProvider.findMany(),
    prisma.blogApiSettings.findUnique({ where: { id: "default" } }),
  ]);
  const byProvider = Object.fromEntries(configured.map((p) => [p.provider, p]));
  const input = "mt-1.5 w-full rounded-[var(--radius-md)] border border-line-strong bg-surface px-3.5 py-2.5 text-[0.9375rem] font-normal text-ink placeholder:text-ink-subtle transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/15";

  return <div className="flex max-w-4xl flex-col gap-10">
    <div><h1 className="display-3 text-primary-950">Schnittstellen</h1><p className="mt-2 text-[0.9375rem] text-ink-muted">FTP-Import, CRM-Übergaben und die API für automatisierte Ratgeberinhalte.</p></div>
    <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-7">
      <h2 className="heading-4 text-primary-950">OpenImmo-FTP</h2><p className="mt-1 text-sm text-ink-muted">ZIP-Dateien mit <code className="rounded-[var(--radius-xs)] border border-line bg-surface-muted px-1 py-0.5 text-[0.8125rem]">openimmo.xml</code> und Bildern nach <code className="rounded-[var(--radius-xs)] border border-line bg-surface-muted px-1 py-0.5 text-[0.8125rem]">/imports</code> hochladen. Der Importdienst löscht erfolgreich verarbeitete und doppelte Dateien.</p>
      <form action={createFtpAccountAction} className="mt-5 grid gap-3 sm:grid-cols-2"><label className="text-[0.8125rem] font-medium text-ink-muted">Benutzername<input required name="username" pattern="[a-z0-9][a-z0-9_-]{2,63}" className={input} /></label><label className="text-[0.8125rem] font-medium text-ink-muted">Passwort (mind. 12 Zeichen)<input required name="password" type="password" minLength={12} className={input} /></label><Button type="submit" className="w-fit">FTP-Zugang anlegen</Button></form>
      <div className="mt-5 divide-y divide-line">{accounts.length ? accounts.map((account) => <div key={account.id} className="flex items-center justify-between py-3 text-sm"><span><b className="font-[family-name:var(--font-display)] text-[1rem] font-medium text-primary-950">{account.username}</b><span className="ml-2 text-ink-subtle">{account.homeDir}</span></span><form action={deleteFtpAccountAction}><input type="hidden" name="id" value={account.id}/><button className="text-[0.8125rem] text-[var(--color-danger)] underline decoration-1 underline-offset-4 hover:decoration-2">Entfernen</button></form></div>) : <p className="py-3 text-sm text-ink-subtle">Noch kein FTP-Zugang angelegt.</p>}</div>
    </section>
    <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-7"><h2 className="heading-4 text-primary-950">Anfragen an CRM weiterleiten</h2><p className="mt-1 text-sm text-ink-muted">Pro Anbieter die jeweilige Webhook-/API-URL und den API-Key eintragen. Nur aktivierte Ziele erhalten neue Anfragen.</p><form action={saveLeadPushProvidersAction} className="mt-5 space-y-5">{providers.map((name) => { const p = byProvider[name]; return <fieldset key={name} className="grid gap-3 border-t border-line pt-4 sm:grid-cols-[auto_1fr_1fr]"><label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name={`${name}_enabled`} defaultChecked={p?.enabled} className="accent-primary-800"/>{name}</label><label className="text-[0.8125rem] font-medium text-ink-muted">Endpoint<input name={`${name}_endpoint`} type="url" defaultValue={p?.endpoint ?? ""} placeholder="https://…" className={input}/></label><label className="text-[0.8125rem] font-medium text-ink-muted">API-Key<input name={`${name}_apiKey`} type="password" defaultValue={p?.apiKey ?? ""} className={input}/></label></fieldset>; })}<Button type="submit" className="w-fit">CRM-Einstellungen speichern</Button></form></section>
    <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-7"><h2 className="heading-4 text-primary-950">Ratgeber-API</h2><p className="mt-1 text-sm text-ink-muted">POST <code className="rounded-[var(--radius-xs)] border border-line bg-surface-muted px-1 py-0.5 text-[0.8125rem]">/api/blog-import</code> akzeptiert title, slug, excerpt, content, coverImage und published. Damit kann eine KI Inhalte als Entwurf oder veröffentlicht anlegen/aktualisieren.</p><form action={saveBlogApiSettingsAction} className="mt-4 grid gap-3 sm:grid-cols-2"><label className="flex items-center gap-2 text-sm"><input name="enabled" type="checkbox" defaultChecked={blogApi?.enabled} className="accent-primary-800"/> API aktiv</label><label className="flex items-center gap-2 text-sm"><input name="allowUnauthenticated" type="checkbox" defaultChecked={blogApi?.allowUnauthenticated} className="accent-primary-800"/> ohne Auth erlauben</label><label className="text-[0.8125rem] font-medium text-ink-muted sm:col-span-2">API-Key<input name="apiKey" type="password" defaultValue={blogApi?.apiKey ?? ""} className={input}/></label><Button type="submit" className="w-fit">API-Einstellungen speichern</Button></form></section>
  </div>;
}
