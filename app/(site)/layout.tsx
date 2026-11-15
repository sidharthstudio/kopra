import CursorLight from "@/components/site/CursorLight";
import SiteFooter from "@/components/site/SiteFooter";

export const revalidate = 300;
import SiteHeader from "@/components/site/SiteHeader";
import WhatsAppFab from "@/components/site/WhatsAppFab";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-none focus:bg-[var(--ivory)] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <CursorLight />
      <main id="main">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
