import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export async function sendQuoteEmail(to: string, subject: string, html: string) {
  if (!resendApiKey) {
    // Fallback in dev: log to console
    console.log("[MAILER:DEV] To:", to);
    console.log("[MAILER:DEV] Subject:", subject);
    console.log("[MAILER:DEV] Body HTML:\n", html);
    return { id: "dev-log", error: null } as const;
  }
  const resend = new Resend(resendApiKey);
  try {
    const result: unknown = await resend.emails.send({
      from: "quotes@pntcustomz.com",
      to,
      subject,
      html,
    });
    let id = "ok" as string;
    const r1 = result as { data?: { id?: string } } | undefined;
    if (r1 && r1.data && r1.data.id) id = r1.data.id;
    const r2 = result as { id?: string } | undefined;
    if (id === "ok" && r2 && r2.id) id = r2.id;
    return { id, error: null } as const;
  } catch (error) {
    console.error("Resend error", error);
    return { id: "", error: error as unknown } as const;
  }
}


