import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { deleteCategoryAction, deleteProductAction, saveCategoryAction, saveProductAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAllCategories, getAllProducts, getDashboardCounts } from "@/lib/db";
import { inr } from "@/lib/format";

export const dynamic = "force-dynamic";

const labelClass = "block text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#7d7365]";
const inputClass = "input mt-1.5";

export default async function AdminMenuPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const categories = getAllCategories();
  const products = getAllProducts();
  const counts = getDashboardCounts();
  const categoryName = new Map(categories.map((category) => [category.id, category.name]));

  return (
    <AdminShell current="/admin/menu" pending={counts.pendingReservations}>
      <div>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#877f72]">Menu &amp; prices</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Menu management</h1>
        <p className="mt-2 max-w-2xl text-[0.85rem] leading-relaxed text-[#6b655b]">
          Update names, descriptions, ingredients, prices and photography. Leaving a price blank shows &ldquo;Price on
          request&rdquo; — only enter prices KOPRA has confirmed.
        </p>
      </div>

      {/* ---------------------------------------------------------- products */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#56514a]">
            Menu items ({products.length})
          </h2>
        </div>

        <div className="mt-3 grid gap-2">
          {products.map((product) => (
            <details key={product.id} className="admin-card group">
              <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="font-medium text-ink">{product.name}</span>
                  {product.isSignature ? (
                    <span className="rounded-none bg-[var(--brass)]/25 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-[#7a5417]">
                      Signature
                    </span>
                  ) : null}
                  {!product.isAvailable ? (
                    <span className="rounded-none bg-[#f6d9d3] px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-[#8b2a19]">
                      Hidden
                    </span>
                  ) : null}
                </span>
                <span className="flex items-center gap-4 text-[0.72rem] text-[#7d7365]">
                  {categoryName.get(product.categoryId) ?? "—"}
                  <span className="font-medium text-[#3f352c]">{inr(product.priceInr)}</span>
                  <span aria-hidden="true" className="transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </span>
              </summary>

              <div className="border-t border-[rgba(36,27,21,0.08)] p-4">
                <form action={saveProductAction} className="grid gap-3 sm:grid-cols-2">
                  <input type="hidden" name="id" value={product.id} />

                  <label className={labelClass}>
                    Name
                    <input name="name" defaultValue={product.name} className={inputClass} required />
                  </label>
                  <label className={labelClass}>
                    Category
                    <select name="categoryId" defaultValue={product.categoryId} className={inputClass}>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={labelClass}>
                    Tagline
                    <input name="tagline" defaultValue={product.tagline ?? ""} className={inputClass} />
                  </label>
                  <label className={labelClass}>
                    Price (INR) — blank = on request
                    <input
                      name="priceInr"
                      type="number"
                      min={0}
                      defaultValue={product.priceInr ?? ""}
                      className={inputClass}
                      placeholder="e.g. 320"
                    />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    Ingredients
                    <input name="ingredients" defaultValue={product.ingredients ?? ""} className={inputClass} />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    Description
                    <textarea name="description" defaultValue={product.description ?? ""} rows={3} className={inputClass} />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    Notes (allergens, dietary)
                    <input name="notes" defaultValue={product.notes ?? ""} className={inputClass} />
                  </label>
                  <label className={labelClass}>
                    Image URL
                    <input name="imageUrl" defaultValue={product.imageUrl ?? ""} className={inputClass} />
                  </label>
                  <label className={labelClass}>
                    Upload image (jpg/png/webp, max 5 MB)
                    <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className={inputClass} />
                  </label>
                  <label className={labelClass}>
                    Sort order
                    <input name="sortOrder" type="number" defaultValue={product.sortOrder} className={inputClass} />
                  </label>
                  <div className="flex items-end gap-5 pb-1">
                    <label className="flex items-center gap-2 text-[0.78rem] text-[#56514a]">
                      <input type="checkbox" name="isSignature" defaultChecked={Boolean(product.isSignature)} />
                      Signature
                    </label>
                    <label className="flex items-center gap-2 text-[0.78rem] text-[#56514a]">
                      <input type="checkbox" name="isAvailable" defaultChecked={Boolean(product.isAvailable)} />
                      Visible on site
                    </label>
                  </div>

                  <div className="flex items-center gap-3 sm:col-span-2">
                    <button type="submit" className="btn btn-dark btn-sm">
                      Save item
                    </button>
                  </div>
                </form>

                <form action={deleteProductAction} className="mt-3 border-t border-[rgba(36,27,21,0.08)] pt-3">
                  <input type="hidden" name="id" value={product.id} />
                  <button
                    type="submit"
                    className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#8b2a19] hover:underline"
                  >
                    Delete this item permanently
                  </button>
                </form>
              </div>
            </details>
          ))}
        </div>

        <details className="admin-card mt-3">
          <summary className="cursor-pointer list-none px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-scarlet-deep [&::-webkit-details-marker]:hidden">
            + Add a menu item
          </summary>
          <form action={saveProductAction} className="grid gap-3 border-t border-[rgba(36,27,21,0.08)] p-4 sm:grid-cols-2">
            <label className={labelClass}>
              Name
              <input name="name" className={inputClass} required />
            </label>
            <label className={labelClass}>
              Category
              <select name="categoryId" className={inputClass} defaultValue={categories[0]?.id}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Tagline
              <input name="tagline" className={inputClass} />
            </label>
            <label className={labelClass}>
              Price (INR) — blank = on request
              <input name="priceInr" type="number" min={0} className={inputClass} />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Ingredients
              <input name="ingredients" className={inputClass} />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Description
              <textarea name="description" rows={3} className={inputClass} />
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
              Notes
              <input name="notes" className={inputClass} />
            </label>
            <label className={labelClass}>
              Sort order
              <input name="sortOrder" type="number" defaultValue={0} className={inputClass} />
            </label>
            <div className="flex items-center gap-5 sm:col-span-2">
              <label className="flex items-center gap-2 text-[0.78rem] text-[#56514a]">
                <input type="checkbox" name="isSignature" /> Signature
              </label>
              <label className="flex items-center gap-2 text-[0.78rem] text-[#56514a]">
                <input type="checkbox" name="isAvailable" defaultChecked /> Visible on site
              </label>
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="btn btn-dark btn-sm">
                Add item
              </button>
            </div>
          </form>
        </details>
      </section>

      {/* -------------------------------------------------------- categories */}
      <section className="mt-10">
        <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#56514a]">
          Categories ({categories.length})
        </h2>
        <div className="mt-3 grid gap-2">
          {categories.map((category) => (
            <details key={category.id} className="admin-card">
              <summary className="cursor-pointer list-none px-4 py-3 text-[0.85rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                {category.name}
                <span className="ml-2 text-[0.7rem] text-[#877f72]">
                  {products.filter((product) => product.categoryId === category.id).length} items
                </span>
              </summary>
              <div className="border-t border-[rgba(36,27,21,0.08)] p-4">
                <form action={saveCategoryAction} className="grid gap-3 sm:grid-cols-2">
                  <input type="hidden" name="id" value={category.id} />
                  <label className={labelClass}>
                    Name
                    <input name="name" defaultValue={category.name} className={inputClass} required />
                  </label>
                  <label className={labelClass}>
                    Slug
                    <input name="slug" defaultValue={category.slug} className={inputClass} />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    Description
                    <textarea name="description" defaultValue={category.description ?? ""} rows={2} className={inputClass} />
                  </label>
                  <label className={labelClass}>
                    Sort order
                    <input name="sortOrder" type="number" defaultValue={category.sortOrder} className={inputClass} />
                  </label>
                  <div className="flex items-end">
                    <button type="submit" className="btn btn-dark btn-sm">
                      Save category
                    </button>
                  </div>
                </form>
                <form action={deleteCategoryAction} className="mt-3 border-t border-[rgba(36,27,21,0.08)] pt-3">
                  <input type="hidden" name="id" value={category.id} />
                  <button
                    type="submit"
                    className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#8b2a19] hover:underline"
                  >
                    Delete category and its items
                  </button>
                </form>
              </div>
            </details>
          ))}
        </div>

        <details className="admin-card mt-3">
          <summary className="cursor-pointer list-none px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-scarlet-deep [&::-webkit-details-marker]:hidden">
            + Add a category
          </summary>
          <form action={saveCategoryAction} className="grid gap-3 border-t border-[rgba(36,27,21,0.08)] p-4 sm:grid-cols-2">
            <label className={labelClass}>
              Name
              <input name="name" className={inputClass} required />
            </label>
            <label className={labelClass}>
              Slug (optional)
              <input name="slug" className={inputClass} />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Description
              <textarea name="description" rows={2} className={inputClass} />
            </label>
            <label className={labelClass}>
              Sort order
              <input name="sortOrder" type="number" defaultValue={categories.length + 1} className={inputClass} />
            </label>
            <div className="flex items-end">
              <button type="submit" className="btn btn-dark btn-sm">
                Add category
              </button>
            </div>
          </form>
        </details>
      </section>
    </AdminShell>
  );
}
