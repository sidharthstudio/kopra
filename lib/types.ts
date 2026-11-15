export type Category = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  sortOrder: number;
};

export type Product = {
  id: number;
  categoryId: number;
  name: string;
  tagline: string | null;
  description: string | null;
  ingredients: string | null;
  priceInr: number | null;
  imageUrl: string | null;
  notes: string | null;
  isSignature: number;
  isAvailable: number;
  sortOrder: number;
};

export type CategoryWithProducts = Category & { products: Product[] };

export type Reservation = {
  id: number;
  reference: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  requests: string | null;
  status: "pending" | "confirmed" | "declined";
  createdAt: string;
};

export type EnquiryType = "private-event" | "workshop" | "general" | "event";

export type Enquiry = {
  id: number;
  reference: string;
  type: EnquiryType;
  name: string;
  phone: string;
  email: string;
  eventDate: string | null;
  guests: number | null;
  message: string;
  status: "new" | "in-progress" | "closed";
  createdAt: string;
};

export type EventRecord = {
  id: number;
  slug: string;
  title: string;
  kind: string;
  description: string;
  detail: string | null;
  startsAt: string | null;
  priceInr: number | null;
  imageUrl: string | null;
  ctaHref: string;
  isPublished: number;
  sortOrder: number;
};

export type GalleryPhoto = {
  id: number;
  url: string;
  caption: string;
  category: string;
  orientation: "portrait" | "landscape" | "square";
  sortOrder: number;
};

export type ActionResult = { ok: boolean; message: string; reference?: string };
