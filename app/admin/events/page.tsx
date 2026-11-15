import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { deleteEventAction, saveEventAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDashboardCounts, getEvents } from "@/lib/db";
import { formatDate, inr } from "@/lib/format";

export const dynamic = "force-dynamic";

const labelClass = "block text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#7d7365]";
const inputClass = "input mt-1.5";

export default async function AdminEventsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const events = getEvents(true);
  const counts = getDashboardCounts();

  return (
    <AdminShell current="/admin/events" pending={counts.pendingReservations}>
      <div>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#877f72]">Experiences</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Events &amp; workshops</h1>
        <p className="mt-2 max-w-2xl text-[0.85rem] leading-relaxed text-[#6b655b]">
          Publish a date once it is confirmed. Experiences without a date show &ldquo;Next date on request&rdquo; on the
          site.
        </p>
      </div>

      <div className="mt-6 grid gap-2">
        {events.map((event) => (
          <details key={event.id} className="admin-card group">
            <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-3">
                <span className="font-medium text-ink">{event.title}</span>
                {!event.isPublished ? (
                  <span className="rounded-none bg-[#f6d9d3] px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-[#8b2a19]">
                    Draft
                  </span>
                ) : null}
              </span>
              <span className="flex items-center gap-4 text-[0.72rem] text-[#7d7365]">
                {event.kind}
                <span>{event.startsAt ? formatDate(event.startsAt) : "No date"}</span>
                <span className="font-medium text-[#3f352c]">{inr(event.priceInr)}</span>
              </span>
            </summary>

            <div className="border-t border-[rgba(36,27,21,0.08)] p-4">
              <form action={saveEventAction} className="grid gap-3 sm:grid-cols-2">
                <input type="hidden" name="id" value={event.id} />
                <label className={labelClass}>
                  Title
                  <input name="title" defaultValue={event.title} className={inputClass} required />
                </label>
                <label className={labelClass}>
                  Kind
                  <input name="kind" defaultValue={event.kind} className={inputClass} />
                </label>
                <label className={labelClass}>
                  Slug
                  <input name="slug" defaultValue={event.slug} className={inputClass} />
                </label>
                <label className={labelClass}>
                  Date (optional)
                  <input name="startsAt" type="date" defaultValue={event.startsAt ?? ""} className={inputClass} />
                </label>
                <label className={labelClass}>
                  Price (INR) — blank = on request
                  <input name="priceInr" type="number" min={0} defaultValue={event.priceInr ?? ""} className={inputClass} />
                </label>
                <label className={labelClass}>
                  CTA link
                  <input name="ctaHref" defaultValue={event.ctaHref} className={inputClass} />
                </label>
                <label className={`${labelClass} sm:col-span-2`}>
                  Description
                  <textarea name="description" defaultValue={event.description} rows={2} className={inputClass} />
                </label>
                <label className={`${labelClass} sm:col-span-2`}>
                  Detail line
                  <textarea name="detail" defaultValue={event.detail ?? ""} rows={2} className={inputClass} />
                </label>
                <label className={labelClass}>
                  Image URL
                  <input name="imageUrl" defaultValue={event.imageUrl ?? ""} className={inputClass} />
                </label>
                <label className={labelClass}>
                  Upload image
                  <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className={inputClass} />
                </label>
                <label className={labelClass}>
                  Sort order
                  <input name="sortOrder" type="number" defaultValue={event.sortOrder} className={inputClass} />
                </label>
                <label className="flex items-end gap-2 pb-1 text-[0.78rem] text-[#56514a]">
                  <input type="checkbox" name="isPublished" defaultChecked={Boolean(event.isPublished)} />
                  Published on the site
                </label>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn btn-dark btn-sm">
                    Save experience
                  </button>
                </div>
              </form>

              <form action={deleteEventAction} className="mt-3 border-t border-[rgba(36,27,21,0.08)] pt-3">
                <input type="hidden" name="id" value={event.id} />
                <button
                  type="submit"
                  className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#8b2a19] hover:underline"
                >
                  Delete this experience
                </button>
              </form>
            </div>
          </details>
        ))}
      </div>

      <details className="admin-card mt-3">
        <summary className="cursor-pointer list-none px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-scarlet-deep [&::-webkit-details-marker]:hidden">
          + Add an experience
        </summary>
        <form action={saveEventAction} className="grid gap-3 border-t border-[rgba(36,27,21,0.08)] p-4 sm:grid-cols-2">
          <label className={labelClass}>
            Title
            <input name="title" className={inputClass} required />
          </label>
          <label className={labelClass}>
            Kind
            <input name="kind" className={inputClass} placeholder="Workshop / Tasting / Private" />
          </label>
          <label className={labelClass}>
            Date (optional)
            <input name="startsAt" type="date" className={inputClass} />
          </label>
          <label className={labelClass}>
            Price (INR)
            <input name="priceInr" type="number" min={0} className={inputClass} />
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            Description
            <textarea name="description" rows={2} className={inputClass} required />
          </label>
          <label className={labelClass}>
            Image URL
            <input name="imageUrl" className={inputClass} />
          </label>
          <label className={labelClass}>
            Upload image
            <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className={inputClass} />
          </label>
          <label className={labelClass}>
            Sort order
            <input name="sortOrder" type="number" defaultValue={0} className={inputClass} />
          </label>
          <label className="flex items-end gap-2 pb-1 text-[0.78rem] text-[#56514a]">
            <input type="checkbox" name="isPublished" defaultChecked /> Published
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-dark btn-sm">
              Add experience
            </button>
          </div>
        </form>
      </details>
    </AdminShell>
  );
}
