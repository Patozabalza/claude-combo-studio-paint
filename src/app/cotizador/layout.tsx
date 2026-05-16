import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Estimator — Combo Studio Paint",
  robots: { index: false, follow: false },
};

export default function CotizadorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
