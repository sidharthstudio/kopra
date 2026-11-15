import { NextResponse, type NextRequest } from "next/server";
import { createReservation } from "@/lib/db";
import { rateLimit, validateReservation } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const limit = rateLimit(`reservation:${ip}`, 5, 10 * 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please call the bar on +91 96336 67600." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const { errors, value } = validateReservation(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors, message: "Please check the highlighted fields." }, { status: 422 });
  }

  try {
    const reference = createReservation(value);
    return NextResponse.json(
      {
        ok: true,
        reference,
        status: "pending",
        message:
          "Request received. This is not a confirmed booking yet — the KOPRA team will call or WhatsApp you to confirm.",
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, message: "Something went wrong saving your request. Please call the bar on +91 96336 67600." },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}
