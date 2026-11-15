import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-aurora grain flex min-h-[100svh] items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="display display-xl mt-6 text-ivory">
          Nothing <span className="serif-italic">on this shelf.</span>
        </h1>
        <p className="lede mx-auto mt-6">
          That page is not on the menu. The bar is still open — head back to the home page or take a look at what is
          pouring.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back to KOPRA
          </Link>
          <Link href="/menu" className="btn btn-ghost">
            View the menu
          </Link>
        </div>
      </div>
    </div>
  );
}
