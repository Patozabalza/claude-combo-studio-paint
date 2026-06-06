import { NextRequest, NextResponse } from "next/server";

const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbz8-noVFe8oIr_qRn10zvW1tsx_vJBVgvq3jhQ-n-DbCJN-RtwOeRYVmUJd7ij9Uu8H/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await fetch(SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, timestamp: new Date().toISOString() }),
      redirect: "follow",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("submit-lead error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
