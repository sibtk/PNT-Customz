import { NextResponse } from "next/server";
import { quoteSchema, type QuoteData } from "@/lib/validators";
import { rateLimit } from "@/lib/rateLimit";
import { sendQuoteEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limited = rateLimit({ key: `quote:${ip}` });
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }
  try {
    const body = await req.json();
    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
    }
    const v: QuoteData = parsed.data;
    const subject = `Quote Request - ${v.serviceType} - ${v.vehicleYear} ${v.vehicleMake} ${v.vehicleModel}`;
    const html = `
      <h2>New Quote Request</h2>
      <p><b>Service:</b> ${v.serviceType}</p>
      <p><b>Vehicle:</b> ${v.vehicleYear} ${v.vehicleMake} ${v.vehicleModel}</p>
      <p><b>Name:</b> ${v.name}</p>
      <p><b>Phone:</b> ${v.phone}</p>
      <p><b>Email:</b> ${v.email}</p>
      ${v.estimatorRange ? `<p><b>Estimator:</b> $${v.estimatorRange.min} - $${v.estimatorRange.max} (${v.estimatorRange.label ?? ''})</p>` : ''}
      <p><b>Notes:</b> ${v.notes ?? ''}</p>
    `;
    const { error } = await sendQuoteEmail("pnt.tinting@gmail.com", subject, html);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}


