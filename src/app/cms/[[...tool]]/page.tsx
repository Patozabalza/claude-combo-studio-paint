"use client";

import dynamic from "next/dynamic";
import config from "../../../../sanity.config";

// ssr: false prevents React null errors — Sanity Studio must run client-only
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false }
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
