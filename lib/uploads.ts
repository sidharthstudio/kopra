import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

/**
 * Stores an uploaded image in public/uploads and returns its public path.
 * Local-disk storage is intentional for a single-host deployment; see the
 * README for swapping this for object storage (S3/R2) when scaling.
 */
export async function storeUpload(file: FormDataEntryValue | null): Promise<string | null> {
  if (!file || typeof file === "string") return null;
  if (file.size === 0) return null;
  if (file.size > MAX_BYTES) throw new Error("Image must be smaller than 5 MB.");

  const extension = ALLOWED[file.type];
  if (!extension) throw new Error("Only JPEG, PNG, WebP or AVIF images can be uploaded.");

  const directory = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(directory, { recursive: true });
  const filename = `${Date.now()}-${crypto.randomBytes(5).toString("hex")}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(directory, filename), buffer);
  return `/uploads/${filename}`;
}
