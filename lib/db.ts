import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type {
  CategoryWithProducts,
  Category,
  Enquiry,
  EnquiryType,
  EventRecord,
  GalleryPhoto,
  Product,
  Reservation,
} from "./types";
import { seedCategories, seedEvents, seedGallery, seedProducts } from "./seed-data";

const DB_PATH = process.env.KOPRA_DB_PATH ?? path.join(process.cwd(), "data", "kopra.db");

type Row = Record<string, unknown>;

declare global {
  // eslint-disable-next-line no-var
  var __kopraDb: DatabaseSync | undefined;
}

function schema(db: DatabaseSync) {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      tagline TEXT,
      description TEXT,
      ingredients TEXT,
      price_inr INTEGER,
      image_url TEXT,
      notes TEXT,
      is_signature INTEGER NOT NULL DEFAULT 0,
      is_available INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      guests INTEGER NOT NULL,
      requests TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      event_date TEXT,
      guests INTEGER,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      kind TEXT NOT NULL,
      description TEXT NOT NULL,
      detail TEXT,
      starts_at TEXT,
      price_inr INTEGER,
      image_url TEXT,
      cta_href TEXT NOT NULL DEFAULT '/private-events',
      is_published INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      caption TEXT NOT NULL,
      category TEXT NOT NULL,
      orientation TEXT NOT NULL DEFAULT 'landscape',
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `);
}

function seed(db: DatabaseSync) {
  const count = db.prepare("SELECT COUNT(*) AS n FROM categories").get() as { n: number };
  if (count.n > 0) return;

  const insertCategory = db.prepare(
    "INSERT INTO categories (slug, name, description, sort_order) VALUES (?, ?, ?, ?)",
  );
  const ids = new Map<string, number>();
  for (const category of seedCategories) {
    const result = insertCategory.run(category.slug, category.name, category.description, category.sortOrder);
    ids.set(category.slug, Number(result.lastInsertRowid));
  }

  const insertProduct = db.prepare(`
    INSERT INTO products
      (category_id, name, tagline, description, ingredients, price_inr, image_url, notes, is_signature, is_available, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
  `);
  for (const product of seedProducts) {
    const categoryId = ids.get(product.categorySlug);
    if (!categoryId) continue;
    insertProduct.run(
      categoryId,
      product.name,
      product.tagline,
      product.description,
      product.ingredients,
      product.priceInr,
      product.imageUrl,
      product.notes,
      product.isSignature,
      product.sortOrder,
    );
  }

  const insertEvent = db.prepare(`
    INSERT INTO events (slug, title, kind, description, detail, starts_at, price_inr, image_url, cta_href, is_published, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const event of seedEvents) {
    insertEvent.run(
      event.slug,
      event.title,
      event.kind,
      event.description,
      event.detail,
      event.startsAt,
      event.priceInr,
      event.imageUrl,
      event.ctaHref,
      event.isPublished,
      event.sortOrder,
    );
  }

  const insertPhoto = db.prepare(
    "INSERT INTO gallery (url, caption, category, orientation, sort_order) VALUES (?, ?, ?, ?, ?)",
  );
  for (const photo of seedGallery) {
    insertPhoto.run(photo.url, photo.caption, photo.category, photo.orientation, photo.sortOrder);
  }
}

function connect(): DatabaseSync {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  schema(db);
  seed(db);
  return db;
}

export function getDb(): DatabaseSync {
  if (!globalThis.__kopraDb) {
    globalThis.__kopraDb = connect();
  }
  return globalThis.__kopraDb;
}

/** Only used by scripts/seed.ts — never imported by application code paths. */
export function resetDatabase() {
  if (fs.existsSync(DB_PATH)) fs.rmSync(DB_PATH);
  globalThis.__kopraDb = undefined;
  return connect();
}

export function newReference(prefix: "R" | "E") {
  const token = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `KOPRA-${prefix}-${token}`;
}

/* ------------------------------ reads ------------------------------ */

export function getCategoriesWithProducts(): CategoryWithProducts[] {
  const db = getDb();
  const categories = db
    .prepare("SELECT * FROM categories ORDER BY sort_order, id")
    .all() as unknown as Row[];
  const products = db
    .prepare("SELECT * FROM products WHERE is_available = 1 ORDER BY sort_order, id")
    .all() as unknown as Row[];

  return categories.map((category) => ({
    id: Number(category.id),
    slug: String(category.slug),
    name: String(category.name),
    description: (category.description as string | null) ?? null,
    sortOrder: Number(category.sort_order),
    products: products
      .filter((product) => Number(product.category_id) === Number(category.id))
      .map(mapProduct),
  }));
}

export function getAllCategories(): Category[] {
  return (getDb().prepare("SELECT * FROM categories ORDER BY sort_order, id").all() as unknown as Row[]).map(
    (row) => ({
      id: Number(row.id),
      slug: String(row.slug),
      name: String(row.name),
      description: (row.description as string | null) ?? null,
      sortOrder: Number(row.sort_order),
    }),
  );
}

export function getAllProducts(): Product[] {
  return (getDb().prepare("SELECT * FROM products ORDER BY category_id, sort_order, id").all() as unknown as Row[]).map(
    mapProduct,
  );
}

export function getSignatureProducts(limit = 3): Product[] {
  return (
    getDb()
      .prepare("SELECT * FROM products WHERE is_signature = 1 AND is_available = 1 ORDER BY sort_order, id LIMIT ?")
      .all(limit) as unknown as Row[]
  ).map(mapProduct);
}

export function getEvents(includeDrafts = false): EventRecord[] {
  const query = includeDrafts
    ? "SELECT * FROM events ORDER BY sort_order, id"
    : "SELECT * FROM events WHERE is_published = 1 ORDER BY sort_order, id";
  return (getDb().prepare(query).all() as unknown as Row[]).map((row) => ({
    id: Number(row.id),
    slug: String(row.slug),
    title: String(row.title),
    kind: String(row.kind),
    description: String(row.description),
    detail: (row.detail as string | null) ?? null,
    startsAt: (row.starts_at as string | null) ?? null,
    priceInr: row.price_inr === null ? null : Number(row.price_inr),
    imageUrl: (row.image_url as string | null) ?? null,
    ctaHref: String(row.cta_href),
    isPublished: Number(row.is_published),
    sortOrder: Number(row.sort_order),
  }));
}

export function getGallery(): GalleryPhoto[] {
  return (getDb().prepare("SELECT * FROM gallery ORDER BY sort_order, id").all() as unknown as Row[]).map(
    (row) => ({
      id: Number(row.id),
      url: String(row.url),
      caption: String(row.caption),
      category: String(row.category),
      orientation: (row.orientation as GalleryPhoto["orientation"]) ?? "landscape",
      sortOrder: Number(row.sort_order),
    }),
  );
}

export function getReservations(): Reservation[] {
  return (
    getDb().prepare("SELECT * FROM reservations ORDER BY created_at DESC, id DESC").all() as unknown as Row[]
  ).map(mapReservation);
}

export function getEnquiries(): Enquiry[] {
  return (getDb().prepare("SELECT * FROM enquiries ORDER BY created_at DESC, id DESC").all() as unknown as Row[]).map(
    (row) => ({
      id: Number(row.id),
      reference: String(row.reference),
      type: String(row.type) as EnquiryType,
      name: String(row.name),
      phone: String(row.phone),
      email: String(row.email),
      eventDate: (row.event_date as string | null) ?? null,
      guests: row.guests === null ? null : Number(row.guests),
      message: String(row.message),
      status: String(row.status) as Enquiry["status"],
      createdAt: String(row.created_at),
    }),
  );
}

export function getDashboardCounts() {
  const db = getDb();
  const pending = db
    .prepare("SELECT COUNT(*) AS n FROM reservations WHERE status = 'pending'")
    .get() as { n: number };
  const newEnquiries = db
    .prepare("SELECT COUNT(*) AS n FROM enquiries WHERE status = 'new'")
    .get() as { n: number };
  const upcoming = db
    .prepare("SELECT COUNT(*) AS n FROM events WHERE is_published = 1")
    .get() as { n: number };
  const dishes = db.prepare("SELECT COUNT(*) AS n FROM products").get() as { n: number };
  return {
    pendingReservations: Number(pending.n),
    newEnquiries: Number(newEnquiries.n),
    publishedEvents: Number(upcoming.n),
    products: Number(dishes.n),
  };
}

/* ------------------------------ writes ------------------------------ */

export function createReservation(input: {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  requests: string | null;
}) {
  const reference = newReference("R");
  getDb()
    .prepare(
      `INSERT INTO reservations (reference, name, phone, email, date, time, guests, requests)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      reference,
      input.name,
      input.phone,
      input.email,
      input.date,
      input.time,
      input.guests,
      input.requests,
    );
  return reference;
}

export function createEnquiry(input: {
  type: EnquiryType;
  name: string;
  phone: string;
  email: string;
  eventDate: string | null;
  guests: number | null;
  message: string;
}) {
  const reference = newReference("E");
  getDb()
    .prepare(
      `INSERT INTO enquiries (reference, type, name, phone, email, event_date, guests, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      reference,
      input.type,
      input.name,
      input.phone,
      input.email,
      input.eventDate,
      input.guests,
      input.message,
    );
  return reference;
}

export function setReservationStatus(id: number, status: Reservation["status"]) {
  getDb().prepare("UPDATE reservations SET status = ? WHERE id = ?").run(status, id);
}

export function setEnquiryStatus(id: number, status: Enquiry["status"]) {
  getDb().prepare("UPDATE enquiries SET status = ? WHERE id = ?").run(status, id);
}

export function saveCategory(input: { id?: number; slug: string; name: string; description: string; sortOrder: number }) {
  if (input.id) {
    getDb()
      .prepare("UPDATE categories SET slug = ?, name = ?, description = ?, sort_order = ? WHERE id = ?")
      .run(input.slug, input.name, input.description, input.sortOrder, input.id);
    return input.id;
  }
  const result = getDb()
    .prepare("INSERT INTO categories (slug, name, description, sort_order) VALUES (?, ?, ?, ?)")
    .run(input.slug, input.name, input.description, input.sortOrder);
  return Number(result.lastInsertRowid);
}

export function deleteCategory(id: number) {
  getDb().prepare("DELETE FROM categories WHERE id = ?").run(id);
}

export function saveProduct(input: {
  id?: number;
  categoryId: number;
  name: string;
  tagline: string;
  description: string;
  ingredients: string;
  priceInr: number | null;
  imageUrl: string;
  notes: string;
  isSignature: boolean;
  isAvailable: boolean;
  sortOrder: number;
}) {
  const db = getDb();
  if (input.id) {
    db.prepare(
      `UPDATE products SET category_id = ?, name = ?, tagline = ?, description = ?, ingredients = ?,
       price_inr = ?, image_url = ?, notes = ?, is_signature = ?, is_available = ?, sort_order = ? WHERE id = ?`,
    ).run(
      input.categoryId,
      input.name,
      input.tagline,
      input.description,
      input.ingredients,
      input.priceInr,
      input.imageUrl,
      input.notes,
      input.isSignature ? 1 : 0,
      input.isAvailable ? 1 : 0,
      input.sortOrder,
      input.id,
    );
    return input.id;
  }
  const result = db
    .prepare(
      `INSERT INTO products (category_id, name, tagline, description, ingredients, price_inr, image_url, notes, is_signature, is_available, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.categoryId,
      input.name,
      input.tagline,
      input.description,
      input.ingredients,
      input.priceInr,
      input.imageUrl,
      input.notes,
      input.isSignature ? 1 : 0,
      input.isAvailable ? 1 : 0,
      input.sortOrder,
    );
  return Number(result.lastInsertRowid);
}

export function deleteProduct(id: number) {
  getDb().prepare("DELETE FROM products WHERE id = ?").run(id);
}

export function saveEvent(input: {
  id?: number;
  slug: string;
  title: string;
  kind: string;
  description: string;
  detail: string;
  startsAt: string | null;
  priceInr: number | null;
  imageUrl: string;
  ctaHref: string;
  isPublished: boolean;
  sortOrder: number;
}) {
  const db = getDb();
  if (input.id) {
    db.prepare(
      `UPDATE events SET slug = ?, title = ?, kind = ?, description = ?, detail = ?, starts_at = ?,
       price_inr = ?, image_url = ?, cta_href = ?, is_published = ?, sort_order = ? WHERE id = ?`,
    ).run(
      input.slug,
      input.title,
      input.kind,
      input.description,
      input.detail,
      input.startsAt,
      input.priceInr,
      input.imageUrl,
      input.ctaHref,
      input.isPublished ? 1 : 0,
      input.sortOrder,
      input.id,
    );
    return input.id;
  }
  const result = db
    .prepare(
      `INSERT INTO events (slug, title, kind, description, detail, starts_at, price_inr, image_url, cta_href, is_published, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.slug,
      input.title,
      input.kind,
      input.description,
      input.detail,
      input.startsAt,
      input.priceInr,
      input.imageUrl,
      input.ctaHref,
      input.isPublished ? 1 : 0,
      input.sortOrder,
    );
  return Number(result.lastInsertRowid);
}

export function deleteEvent(id: number) {
  getDb().prepare("DELETE FROM events WHERE id = ?").run(id);
}

export function savePhoto(input: {
  id?: number;
  url: string;
  caption: string;
  category: string;
  orientation: string;
  sortOrder: number;
}) {
  const db = getDb();
  if (input.id) {
    db.prepare("UPDATE gallery SET url = ?, caption = ?, category = ?, orientation = ?, sort_order = ? WHERE id = ?").run(
      input.url,
      input.caption,
      input.category,
      input.orientation,
      input.sortOrder,
      input.id,
    );
    return input.id;
  }
  const result = db
    .prepare("INSERT INTO gallery (url, caption, category, orientation, sort_order) VALUES (?, ?, ?, ?, ?)")
    .run(input.url, input.caption, input.category, input.orientation, input.sortOrder);
  return Number(result.lastInsertRowid);
}

export function deletePhoto(id: number) {
  getDb().prepare("DELETE FROM gallery WHERE id = ?").run(id);
}

/* ------------------------------ mappers ------------------------------ */

function mapProduct(row: Row): Product {
  return {
    id: Number(row.id),
    categoryId: Number(row.category_id),
    name: String(row.name),
    tagline: (row.tagline as string | null) ?? null,
    description: (row.description as string | null) ?? null,
    ingredients: (row.ingredients as string | null) ?? null,
    priceInr: row.price_inr === null ? null : Number(row.price_inr),
    imageUrl: (row.image_url as string | null) ?? null,
    notes: (row.notes as string | null) ?? null,
    isSignature: Number(row.is_signature),
    isAvailable: Number(row.is_available),
    sortOrder: Number(row.sort_order),
  };
}

function mapReservation(row: Row): Reservation {
  return {
    id: Number(row.id),
    reference: String(row.reference),
    name: String(row.name),
    phone: String(row.phone),
    email: String(row.email),
    date: String(row.date),
    time: String(row.time),
    guests: Number(row.guests),
    requests: (row.requests as string | null) ?? null,
    status: String(row.status) as Reservation["status"],
    createdAt: String(row.created_at),
  };
}
