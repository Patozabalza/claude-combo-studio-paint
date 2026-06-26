import { NextRequest, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s().+-]{7,20}$/;

type LeadBody = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  type?: unknown;
  service?: unknown;
  location?: unknown;
  message?: unknown;
  method?: unknown;
  website?: unknown; // honeypot — debe llegar vacío; si trae texto, es un bot
};

function isValidString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.length <= maxLength;
}

function isLeadValid(body: LeadBody): boolean {
  if (typeof body.website === "string" && body.website.trim() !== "") return false;

  if (!isValidString(body.name, 100) || body.name.trim() === "") return false;
  if (!isValidString(body.email, 254) || !EMAIL_PATTERN.test(body.email.trim())) return false;
  if (body.phone && (!isValidString(body.phone, 20) || !PHONE_PATTERN.test(body.phone.trim()))) return false;
  if (body.type !== undefined && !isValidString(body.type, 100)) return false;
  if (body.service !== undefined && !isValidString(body.service, 100)) return false;
  if (body.location !== undefined && !isValidString(body.location, 100)) return false;
  if (body.method !== undefined && !isValidString(body.method, 100)) return false;
  if (body.message !== undefined && !isValidString(body.message, 2000)) return false;

  return true;
}

export async function POST(req: NextRequest) {
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!sheetsUrl) {
    console.error("submit-lead error: GOOGLE_SHEETS_WEBHOOK_URL is not set");
    return NextResponse.json({ success: false, error: "server_misconfigured" }, { status: 500 });
  }

  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "invalid_input" }, { status: 400 });
  }

  // El honeypot relleno se rechaza con el mismo error genérico que un input
  // inválido — no le damos a un bot ninguna señal de que fue detectado.
  if (!isLeadValid(body)) {
    return NextResponse.json({ success: false, error: "invalid_input" }, { status: 400 });
  }

  // Whitelist explícita de los campos que se reenvían — el honeypot nunca llega al Sheet.
  const lead = {
    name: body.name,
    phone: body.phone,
    email: body.email,
    type: body.type,
    service: body.service,
    location: body.location,
    message: body.message,
    method: body.method,
  };

  try {
    await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, timestamp: new Date().toISOString() }),
      redirect: "follow",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("submit-lead error:", err);
    return NextResponse.json({ success: false, error: "submission_failed" }, { status: 500 });
  }
}
