import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KOPRA — Team Dashboard",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f4efe6]">{children}</div>;
}
