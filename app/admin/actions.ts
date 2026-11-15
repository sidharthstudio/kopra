"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteCategory,
  deleteEvent,
  deletePhoto,
  deleteProduct,
  saveCategory,
  saveEvent,
  savePhoto,
  saveProduct,
  setEnquiryStatus,
  setReservationStatus,
} from "@/lib/db";
import { destroySession, establishSession, isAdminAuthenticated, verifyPassword } from "@/lib/auth";
import { storeUpload } from "@/lib/uploads";
import type { Enquiry, Reservation } from "@/lib/types";

async function assertAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Not authorised. Sign in again.");
  }
}

function text(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim();
}

function integer(data: FormData, key: string, fallback = 0) {
  const value = Number(text(data, key));
  return Number.isFinite(value) ? Math.round(value) : fallback;
}

function optionalInteger(data: FormData, key: string) {
  const raw = text(data, key);
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? Math.round(value) : null;
}

function refreshPublic() {
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/events");
  revalidatePath("/gallery");
  revalidatePath("/admin");
  revalidatePath("/admin/menu");
  revalidatePath("/admin/events");
  revalidatePath("/admin/gallery");
}

/* --------------------------------- auth --------------------------------- */

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await establishSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

/* ------------------------------ reservations ---------------------------- */

export async function updateReservationStatusAction(formData: FormData) {
  await assertAdmin();
  const id = integer(formData, "id");
  const status = text(formData, "status") as Reservation["status"];
  if (!["pending", "confirmed", "declined"].includes(status)) return;
  setReservationStatus(id, status);
  revalidatePath("/admin/reservations");
  revalidatePath("/admin");
}

/* -------------------------------- enquiries ----------------------------- */

export async function updateEnquiryStatusAction(formData: FormData) {
  await assertAdmin();
  const id = integer(formData, "id");
  const status = text(formData, "status") as Enquiry["status"];
  if (!["new", "in-progress", "closed"].includes(status)) return;
  setEnquiryStatus(id, status);
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

/* -------------------------------- categories ---------------------------- */

export async function saveCategoryAction(formData: FormData) {
  await assertAdmin();
  const id = optionalInteger(formData, "id");
  const name = text(formData, "name");
  if (!name) return;
  const slug = (text(formData, "slug") || name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  saveCategory({
    id: id ?? undefined,
    name,
    slug: slug || `category-${Date.now()}`,
    description: text(formData, "description"),
    sortOrder: integer(formData, "sortOrder"),
  });
  refreshPublic();
}

export async function deleteCategoryAction(formData: FormData) {
  await assertAdmin();
  deleteCategory(integer(formData, "id"));
  refreshPublic();
}

/* --------------------------------- products ----------------------------- */

export async function saveProductAction(formData: FormData) {
  await assertAdmin();
  const id = optionalInteger(formData, "id");
  const uploaded = await storeUpload(formData.get("image"));
  const imageUrl = uploaded ?? text(formData, "imageUrl");

  saveProduct({
    id: id ?? undefined,
    categoryId: integer(formData, "categoryId"),
    name: text(formData, "name"),
    tagline: text(formData, "tagline"),
    description: text(formData, "description"),
    ingredients: text(formData, "ingredients"),
    priceInr: optionalInteger(formData, "priceInr"),
    imageUrl,
    notes: text(formData, "notes"),
    isSignature: formData.get("isSignature") === "on",
    isAvailable: formData.get("isAvailable") === "on",
    sortOrder: integer(formData, "sortOrder"),
  });
  refreshPublic();
}

export async function deleteProductAction(formData: FormData) {
  await assertAdmin();
  deleteProduct(integer(formData, "id"));
  refreshPublic();
}

/* ---------------------------------- events ------------------------------ */

export async function saveEventAction(formData: FormData) {
  await assertAdmin();
  const id = optionalInteger(formData, "id");
  const uploaded = await storeUpload(formData.get("image"));
  const imageUrl = uploaded ?? text(formData, "imageUrl");
  const title = text(formData, "title");
  if (!title) return;

  saveEvent({
    id: id ?? undefined,
    title,
    slug:
      (text(formData, "slug") || title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || `event-${Date.now()}`,
    kind: text(formData, "kind") || "Experience",
    description: text(formData, "description"),
    detail: text(formData, "detail"),
    startsAt: text(formData, "startsAt") || null,
    priceInr: optionalInteger(formData, "priceInr"),
    imageUrl,
    ctaHref: text(formData, "ctaHref") || "/private-events",
    isPublished: formData.get("isPublished") === "on",
    sortOrder: integer(formData, "sortOrder"),
  });
  refreshPublic();
}

export async function deleteEventAction(formData: FormData) {
  await assertAdmin();
  deleteEvent(integer(formData, "id"));
  refreshPublic();
}

/* --------------------------------- gallery ------------------------------ */

export async function savePhotoAction(formData: FormData) {
  await assertAdmin();
  const id = optionalInteger(formData, "id");
  const uploaded = await storeUpload(formData.get("image"));
  const url = uploaded ?? text(formData, "url");
  if (!url) return;

  savePhoto({
    id: id ?? undefined,
    url,
    caption: text(formData, "caption") || "KOPRA",
    category: text(formData, "category") || "Interior",
    orientation: text(formData, "orientation") || "landscape",
    sortOrder: integer(formData, "sortOrder"),
  });
  refreshPublic();
}

export async function deletePhotoAction(formData: FormData) {
  await assertAdmin();
  deletePhoto(integer(formData, "id"));
  refreshPublic();
}
