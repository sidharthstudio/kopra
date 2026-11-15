import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/reservations", label: "Reservations" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/menu", label: "Menu & prices" },
  { href: "/admin/events", label: "Experiences" },
  { href: "/admin/gallery", label: "Gallery" },
];

export default function AdminShell({
  children,
  current,
  pending,
}: {
  children: React.ReactNode;
  current: string;
  pending?: number;
}) {
  return (
    <div className="admin">
      <header className="border-b border-[rgba(36,27,21,0.12)] bg-[#fffdf8]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex flex-col leading-none">
              <span className="text-[0.95rem] font-semibold uppercase tracking-[0.34em] text-ink">Kopra</span>
              <span className="mt-1 text-[6.5px] uppercase tracking-[0.24em] text-[#877f72]">Team dashboard</span>
            </Link>
            <span className="hidden h-8 w-px bg-[rgba(36,27,21,0.14)] sm:block" />
            <Link href="/" target="_blank" className="hidden text-[0.68rem] uppercase tracking-[0.16em] text-[#7d7365] hover:text-scarlet-deep sm:block">
              View site ↗
            </Link>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-none border border-[rgba(36,27,21,0.2)] px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#56514a] hover:border-[var(--ink)] hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </div>
        <nav aria-label="Admin" className="mx-auto max-w-6xl overflow-x-auto px-5">
          <ul className="flex gap-1 pb-1">
            {links.map((link) => {
              const active = current === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-t-md px-3 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                      active
                        ? "bg-[var(--ink)] text-ivory"
                        : "text-[#6b655b] hover:bg-[#f1e9dc] hover:text-ink"
                    }`}
                  >
                    {link.label}
                    {link.href === "/admin/reservations" && pending ? (
                      <span className="rounded-none bg-[var(--scarlet)] px-1.5 py-0.5 text-[0.55rem] text-white">
                        {pending}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-8">{children}</div>
    </div>
  );
}
