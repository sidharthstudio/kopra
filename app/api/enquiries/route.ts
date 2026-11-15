import { NextResponse, type NextRequest } from "next/server";
import { createEnquiry } from "@/lib/db";
import { rateLimit, validateEnquiry } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const limit = rateLimit(`enquiry:${ip}`, 5, 10 * 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please WhatsApp us on +91 96336 67600." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const { errors, value } = validateEnquiry(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors, message: "Please check the highlighted fields." }, { status: 422 });
  }

  try {
    const reference = createEnquiry(value);
    return NextResponse.json(
      {
        ok: true,
        reference,
        message: "Enquiry received. The KOPRA team will get back to you on the phone or email you shared.",
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, message: "Something went wrong saving your enquiry. Please WhatsApp us on +91 96336 67600." },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}
