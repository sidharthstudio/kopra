import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { updateReservationStatusAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDashboardCounts, getReservations } from "@/lib/db";
import { formatDate, formatDateTime, formatTime } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const reservations = getReservations();
  const counts = getDashboardCounts();
  const pending = reservations.filter((reservation) => reservation.status === "pending").length;

  return (
    <AdminShell current="/admin/reservations" pending={counts.pendingReservations}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#877f72]">Reservations</p>
          <h1 className="mt-2 font-display text-3xl text-ink">Table requests</h1>
          <p className="mt-2 text-[0.85rem] text-[#6b655b]">
            {reservations.length} total · {pending} awaiting confirmation. Call or WhatsApp the guest before confirming.
          </p>
        </div>
        <a
          href={`https://wa.me/919633667600`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark btn-sm"
        >
          Open WhatsApp
        </a>
      </div>

      <div className="admin-card mt-6 overflow-x-auto">
        {reservations.length === 0 ? (
          <p className="px-5 py-10 text-[0.9rem] text-[#877f72]">
            No table requests yet. Requests sent from the Reservations page appear here.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Guest</th>
                <th>Contact</th>
                <th>Date &amp; time</th>
                <th>Party</th>
                <th>Requests</th>
                <th>Received</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="whitespace-nowrap font-mono text-[0.72rem] text-[#7d7365]">{reservation.reference}</td>
                  <td className="font-medium text-ink">{reservation.name}</td>
                  <td className="whitespace-nowrap text-[0.78rem]">
                    <a href={`tel:${reservation.phone}`} className="block text-scarlet-deep hover:underline">
                      {reservation.phone}
                    </a>
                    <a href={`mailto:${reservation.email}`} className="block text-[#7d7365] hover:underline">
                      {reservation.email}
                    </a>
                  </td>
                  <td className="whitespace-nowrap">
                    {formatDate(reservation.date)}
                    <span className="block text-[0.72rem] text-[#877f72]">{formatTime(reservation.time)}</span>
                  </td>
                  <td>{reservation.guests}</td>
                  <td className="max-w-[220px] text-[0.78rem] text-[#6b655b]">{reservation.requests ?? "—"}</td>
                  <td className="whitespace-nowrap text-[0.72rem] text-[#877f72]">
                    {formatDateTime(reservation.createdAt)}
                  </td>
                  <td>
                    <span className={`status-pill status-${reservation.status}`}>{reservation.status}</span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1.5">
                      <form action={updateReservationStatusAction}>
                        <input type="hidden" name="id" value={reservation.id} />
                        <input type="hidden" name="status" value="confirmed" />
                        <button
                          type="submit"
                          className="rounded-none bg-[#2f5b22] px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-white"
                        >
                          Confirm
                        </button>
                      </form>
                      <form action={updateReservationStatusAction}>
                        <input type="hidden" name="id" value={reservation.id} />
                        <input type="hidden" name="status" value="declined" />
                        <button
                          type="submit"
                          className="rounded-none border border-[#8b2a19]/40 px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[#8b2a19]"
                        >
                          Decline
                        </button>
                      </form>
                      {reservation.status !== "pending" ? (
                        <form action={updateReservationStatusAction}>
                          <input type="hidden" name="id" value={reservation.id} />
                          <input type="hidden" name="status" value="pending" />
                          <button
                            type="submit"
                            className="rounded-none border border-[rgba(36,27,21,0.2)] px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[#56514a]"
                          >
                            Reset
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-4 text-[0.75rem] text-[#877f72]">
        Guest details are personal data. Use them only to manage this booking and do not export or share the list.
      </p>
    </AdminShell>
  );
}
