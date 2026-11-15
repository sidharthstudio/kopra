import Link from "next/link";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDashboardCounts, getEnquiries, getReservations } from "@/lib/db";
import { formatDate, formatDateTime, formatTime } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const counts = getDashboardCounts();
  const reservations = getReservations().slice(0, 6);
  const enquiries = getEnquiries().slice(0, 5);

  const stats = [
    { label: "Pending reservations", value: counts.pendingReservations, href: "/admin/reservations" },
    { label: "New enquiries", value: counts.newEnquiries, href: "/admin/enquiries" },
    { label: "Published experiences", value: counts.publishedEvents, href: "/admin/events" },
    { label: "Menu items", value: counts.products, href: "/admin/menu" },
  ];

  return (
    <AdminShell current="/admin" pending={counts.pendingReservations}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#877f72]">Overview</p>
          <h1 className="mt-2 font-display text-3xl text-ink">Good evening, team.</h1>
          <p className="mt-2 max-w-xl text-[0.85rem] leading-relaxed text-[#6b655b]">
            Everything guests send through the website lands here. Confirm tables, reply to enquiries, and keep the
            menu and prices current.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/menu" className="btn btn-dark btn-sm">
            Edit menu
          </Link>
          <Link href="/admin/reservations" className="btn btn-sm border border-[rgba(36,27,21,0.2)] text-ink">
            Reservations
          </Link>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="admin-card p-5 transition-colors hover:bg-[#fbf6ec]">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#877f72]">{stat.label}</p>
            <p className="mt-3 font-display text-4xl text-ink">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <section className="admin-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-[rgba(36,27,21,0.1)] px-5 py-4">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#56514a]">
              Latest table requests
            </h2>
            <Link href="/admin/reservations" className="text-[0.68rem] text-scarlet-deep hover:underline">
              Manage all
            </Link>
          </div>
          {reservations.length === 0 ? (
            <p className="px-5 py-8 text-[0.85rem] text-[#877f72]">No requests yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>When</th>
                    <th>Party</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>
                        <span className="font-medium text-ink">{reservation.name}</span>
                        <span className="block text-[0.72rem] text-[#877f72]">{reservation.phone}</span>
                      </td>
                      <td className="whitespace-nowrap">
                        {formatDate(reservation.date)}
                        <span className="block text-[0.72rem] text-[#877f72]">{formatTime(reservation.time)}</span>
                      </td>
                      <td>{reservation.guests}</td>
                      <td>
                        <span className={`status-pill status-${reservation.status}`}>{reservation.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="admin-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-[rgba(36,27,21,0.1)] px-5 py-4">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#56514a]">New enquiries</h2>
            <Link href="/admin/enquiries" className="text-[0.68rem] text-scarlet-deep hover:underline">
              Manage all
            </Link>
          </div>
          {enquiries.length === 0 ? (
            <p className="px-5 py-8 text-[0.85rem] text-[#877f72]">No enquiries yet.</p>
          ) : (
            <ul className="divide-y divide-[rgba(36,27,21,0.08)]">
              {enquiries.map((enquiry) => (
                <li key={enquiry.id} className="px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.85rem] font-medium text-ink">{enquiry.name}</p>
                    <span className="text-[0.62rem] uppercase tracking-[0.12em] text-[#877f72]">{enquiry.type}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[0.78rem] leading-relaxed text-[#6b655b]">{enquiry.message}</p>
                  <p className="mt-1.5 text-[0.68rem] text-[#9b9184]">{formatDateTime(enquiry.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="admin-card mt-5 p-5">
        <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#56514a]">Before launch</h2>
        <ul className="mt-3 grid gap-2 text-[0.82rem] leading-relaxed text-[#56514a] sm:grid-cols-2">
          <li>• Change ADMIN_PASSWORD and ADMIN_SESSION_SECRET in the environment.</li>
          <li>• Publish drink prices once KOPRA confirms them.</li>
          <li>• Replace the representative photography with KOPRA&apos;s own shoot.</li>
          <li>• Add real workshop and event dates as they are announced.</li>
        </ul>
      </section>
    </AdminShell>
  );
}
