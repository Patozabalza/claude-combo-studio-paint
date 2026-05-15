import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Combo Studio Paint | Premium Painting & Color Design Miami",
  description: "Premium painting and color design solutions for residential and commercial spaces across Miami-Dade County. Interior, exterior, luxury homes, condos, HOA, commercial projects.",
  keywords: [
    "premium painting company Miami",
    "residential painting Miami",
    "commercial painting Miami",
    "luxury home painting Miami",
    "interior painting Miami",
    "exterior painting Miami",
    "painting contractors Miami-Dade",
    "color consultation Miami",
    "painting company Coral Gables",
    "painting company Doral",
    "empresa de pintura en Miami",
    "pintores profesionales en Miami",
    "pintura residencial Miami",
    "pintura comercial Miami",
  ],
  authors: [{ name: "Combo Studio Paint" }],
  creator: "Combo Studio Paint",
  publisher: "Combo Studio Paint",
  metadataBase: new URL("https://combostudiopaint.com"),
  alternates: {
    canonical: "https://combostudiopaint.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://combostudiopaint.com",
    title: "Combo Studio Paint | Premium Painting & Color Design Miami",
    description: "Premium painting and color design solutions for residential and commercial spaces across Miami-Dade County.",
    siteName: "Combo Studio Paint",
    images: [
      {
        url: "/images/pintor/1.png",
        width: 1200,
        height: 630,
        alt: "Combo Studio Paint - Premium Painting Miami",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Combo Studio Paint | Premium Painting Miami",
    description: "Premium painting and color design for residential and commercial spaces in Miami-Dade.",
    images: ["/images/pintor/1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://combostudiopaint.com",
              name: "Combo Studio Paint",
              description: "Premium painting and color design studio serving Miami-Dade County with impeccable craftsmanship, modern design thinking and reliable project execution.",
              url: "https://combostudiopaint.com",
              telephone: "+13055426364",
              email: "combostudiopaint@gmail.com",
              priceRange: "$$-$$$",
              image: "https://combostudiopaint.com/images/pintor/1.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Miami",
                addressRegion: "FL",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 25.7617,
                longitude: -80.1918,
              },
              areaServed: {
                "@type": "AdministrativeArea",
                name: "Miami-Dade County",
              },
              serviceType: [
                "Residential Painting",
                "Commercial Painting",
                "Interior Painting",
                "Exterior Painting",
                "Color Consultation",
                "Pressure Cleaning",
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:00",
                closes: "18:00",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased bg-brand-black text-brand-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
