import { resetDatabase } from "../lib/db";

/**
 * Recreates data/kopra.db from the verified seed content.
 * Run with `npm run db:seed` (or `npm run db:reset` to delete first).
 */
const db = resetDatabase();
const categories = db.prepare("SELECT COUNT(*) AS n FROM categories").get() as { n: number };
const products = db.prepare("SELECT COUNT(*) AS n FROM products").get() as { n: number };
const events = db.prepare("SELECT COUNT(*) AS n FROM events").get() as { n: number };
const gallery = db.prepare("SELECT COUNT(*) AS n FROM gallery").get() as { n: number };

console.log(
  `KOPRA database seeded → ${categories.n} categories, ${products.n} menu items, ${events.n} experiences, ${gallery.n} photos.`,
);
