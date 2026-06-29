import { createHash, timingSafeEqual } from "node:crypto";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AeoDashboard from "@/components/AeoDashboard";
import { AEO_CHECKLIST, getAeoScore } from "@/lib/aeo-checklist";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function isValidToken(provided: string | undefined, expected: string): boolean {
  if (!provided) return false;
  const providedHash = createHash("sha256").update(provided).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(providedHash, expectedHash);
}

export default async function AeoPage({
  searchParams,
}: {
  searchParams: Promise<{ auth?: string }>;
}) {
  const { auth } = await searchParams;
  const token = process.env.AEO_DASHBOARD_TOKEN;

  if (!token || !isValidToken(auth, token)) {
    notFound();
  }

  return <AeoDashboard score={getAeoScore()} checklist={AEO_CHECKLIST} />;
}
