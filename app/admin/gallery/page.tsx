import Image from "next/image";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { deletePhotoAction, savePhotoAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDashboardCounts, getGallery } from "@/lib/db";

export const dynamic = "force-dynamic";

const labelClass = "block text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#7d7365]";
const inputClass = "input mt-1.5";

export default async function AdminGalleryPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const photos = getGallery();
  const counts = getDashboardCounts();

  return (
    <AdminShell current="/admin/gallery" pending={counts.pendingReservations}>
      <div>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#877f72]">Gallery</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Photography</h1>
        <p className="mt-2 max-w-2xl text-[0.85rem] leading-relaxed text-[#6b655b]">
          {photos.length} photos live. Upload KOPRA&apos;s own shots here — the images currently on the site are
          representative and should be replaced before launch.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <article key={photo.id} className="admin-card overflow-hidden">
            <div className="relative aspect-[4/3] bg-[#e8dfd1]">
              <Image src={photo.url} alt={photo.caption} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
            </div>
            <form action={savePhotoAction} className="grid gap-2 p-3">
              <input type="hidden" name="id" value={photo.id} />
              <label className={labelClass}>
                Caption
                <input name="caption" defaultValue={photo.caption} className={inputClass} />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className={labelClass}>
                  Category
                  <select name="category" defaultValue={photo.category} className={inputClass}>
                    {["Drinks", "Interior", "Craft", "Food", "Events"].map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>
                  Orientation
                  <select name="orientation" defaultValue={photo.orientation} className={inputClass}>
                    <option value="landscape">Landscape</option>
                    <option value="portrait">Portrait</option>
                    <option value="square">Square</option>
                  </select>
                </label>
              </div>
              <label className={labelClass}>
                Image URL
                <input name="url" defaultValue={photo.url} className={inputClass} />
              </label>
              <label className={labelClass}>
                Replace with upload
                <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className={inputClass} />
              </label>
              <label className={labelClass}>
                Sort order
                <input name="sortOrder" type="number" defaultValue={photo.sortOrder} className={inputClass} />
              </label>
              <button type="submit" className="btn btn-dark btn-sm mt-1">
                Save photo
              </button>
            </form>
            <form action={deletePhotoAction} className="border-t border-[rgba(36,27,21,0.08)] px-3 py-2">
              <input type="hidden" name="id" value={photo.id} />
              <button
                type="submit"
                className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#8b2a19] hover:underline"
              >
                Remove
              </button>
            </form>
          </article>
        ))}
      </div>

      <details className="admin-card mt-4">
        <summary className="cursor-pointer list-none px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-scarlet-deep [&::-webkit-details-marker]:hidden">
          + Add a photo
        </summary>
        <form action={savePhotoAction} className="grid gap-3 border-t border-[rgba(36,27,21,0.08)] p-4 sm:grid-cols-2">
          <label className={labelClass}>
            Image URL
            <input name="url" className={inputClass} placeholder="https://…" />
          </label>
          <label className={labelClass}>
            Or upload an image
            <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className={inputClass} />
          </label>
          <label className={labelClass}>
            Caption
            <input name="caption" className={inputClass} placeholder="First Night, garnished at the bar" />
          </label>
          <label className={labelClass}>
            Category
            <select name="category" className={inputClass}>
              {["Drinks", "Interior", "Craft", "Food", "Events"].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Orientation
            <select name="orientation" className={inputClass}>
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
              <option value="square">Square</option>
            </select>
          </label>
          <label className={labelClass}>
            Sort order
            <input name="sortOrder" type="number" defaultValue={photos.length + 1} className={inputClass} />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-dark btn-sm">
              Add photo
            </button>
          </div>
        </form>
      </details>
    </AdminShell>
  );
}
