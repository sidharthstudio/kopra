import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "kopra_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function secret() {
  return process.env.ADMIN_SESSION_SECRET ?? "kopra-development-session-secret-change-before-launch";
}

function password() {
  return process.env.ADMIN_PASSWORD ?? "kopra-admin-2026";
}

function sign(value: string) {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export function verifyPassword(candidate: string) {
  const expected = crypto.createHash("sha256").update(password()).digest("hex");
  const given = crypto.createHash("sha256").update(String(candidate)).digest("hex");
  return safeEqual(expected, given);
}

export function issueSessionToken() {
  const expiry = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${expiry}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload))) return false;
  const expiry = Number(payload);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

export async function establishSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, issueSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export const SESSION_COOKIE = COOKIE_NAME;
