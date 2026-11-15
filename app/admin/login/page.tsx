import Link from "next/link";
import { redirect } from "next/navigation";
import { loginAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="admin flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="flex flex-col items-center leading-none">
          <span className="text-lg font-semibold uppercase tracking-[0.4em] text-ink">Kopra</span>
          <span className="mt-2 text-[7px] uppercase tracking-[0.3em] text-[#877f72]">Non-alcoholic cocktail bar</span>
        </Link>

        <form action={loginAction} className="admin-card mt-8 p-7">
          <h1 className="font-display text-2xl text-ink">Team sign in</h1>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-[#6b655b]">
            This area is for KOPRA staff. Reservations, enquiries, menu prices and photography are managed here.
          </p>

          {error ? (
            <p role="alert" className="mt-5 border border-[#c4442e]/30 bg-[#c4442e]/10 px-4 py-3 text-[0.82rem] text-[#8b2a19]">
              That password is not right. Try again, or ask the owner to reset it.
            </p>
          ) : null}

          <label className="mt-6 block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#6b655b]">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
              className="input mt-2"
              placeholder="••••••••"
            />
          </label>

          <button type="submit" className="btn btn-dark mt-5 w-full">
            Sign in
          </button>

          <p className="mt-5 border-t border-[rgba(36,27,21,0.12)] pt-4 text-[0.72rem] leading-relaxed text-[#877f72]">
            Access is logged in the application server. Never share the password — ask for a personal one.
          </p>
        </form>

        <p className="mt-6 text-center text-[0.72rem] text-[#877f72]">
          <Link href="/" className="underline decoration-dotted hover:text-ink">
            Back to the website
          </Link>
        </p>
      </div>
    </div>
  );
}
