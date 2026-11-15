import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { updateEnquiryStatusAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDashboardCounts, getEnquiries } from "@/lib/db";
import { formatDate, formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  "private-event": "Private event",
  workshop: "Workshop",
  event: "Group / event",
  general: "General",
};

export default async function AdminEnquiriesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const enquiries = getEnquiries();
  const counts = getDashboardCounts();

  return (
    <AdminShell current="/admin/enquiries" pending={counts.pendingReservations}>
      <div>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#877f72]">Enquiries</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Private events &amp; messages</h1>
        <p className="mt-2 text-[0.85rem] text-[#6b655b]">
          {enquiries.length} total. Reply by phone or email, then mark the enquiry as in progress or closed.
        </p>
      </div>

      {enquiries.length === 0 ? (
        <div className="admin-card mt-6 p-6">
          <p className="text-[0.9rem] text-[#877f72]">
            No enquiries yet. Private event, workshop and contact form submissions appear here.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {enquiries.map((enquiry) => (
            <article key={enquiry.id} className="admin-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[1rem] font-semibold text-ink">{enquiry.name}</h2>
                    <span className="rounded-none bg-[#f1e9dc] px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[#6b655b]">
                      {TYPE_LABELS[enquiry.type] ?? enquiry.type}
                    </span>
                    <span
                      className={`status-pill ${
                        enquiry.status === "new"
                          ? "status-pending"
                          : enquiry.status === "in-progress"
                            ? "status-confirmed"
                            : "status-declined"
                      }`}
                    >
                      {enquiry.status}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.8rem] text-[#6b655b]">
                    <a href={`tel:${enquiry.phone}`} className="text-scarlet-deep hover:underline">
                      {enquiry.phone}
                    </a>
                    {" · "}
                    <a href={`mailto:${enquiry.email}`} className="hover:underline">
                      {enquiry.email}
                    </a>
                    {enquiry.eventDate ? ` · Preferred ${formatDate(enquiry.eventDate)}` : ""}
                    {enquiry.guests ? ` · ${enquiry.guests} guests` : ""}
                  </p>
                  <p className="mt-1 font-mono text-[0.66rem] text-[#9b9184]">{enquiry.reference}</p>
                </div>
                <p className="text-[0.7rem] text-[#9b9184]">{formatDateTime(enquiry.createdAt)}</p>
              </div>

              <p className="mt-4 whitespace-pre-line border-t border-[rgba(36,27,21,0.08)] pt-4 text-[0.86rem] leading-relaxed text-[#56514a]">
                {enquiry.message}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {(["new", "in-progress", "closed"] as const).map((status) => (
                  <form key={status} action={updateEnquiryStatusAction}>
                    <input type="hidden" name="id" value={enquiry.id} />
                    <input type="hidden" name="status" value={status} />
                    <button
                      type="submit"
                      disabled={enquiry.status === status}
                      className={`rounded-none px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] ${
                        enquiry.status === status
                          ? "cursor-default bg-[#e8dfd1] text-[#9b9184]"
                          : "border border-[rgba(36,27,21,0.2)] text-[#56514a] hover:border-[var(--ink)] hover:text-ink"
                      }`}
                    >
                      Mark {status}
                    </button>
                  </form>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
