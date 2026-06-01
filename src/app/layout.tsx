import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Combo Studio Paint | Premium Painting & Specialty Finishes Miami-Dade",
  description: "Combo Studio Paint — Miami's premier painting company. Interior & exterior painting, Limewash, Venetian Plaster, Roman Clay, HOA & commercial projects. 500+ projects completed. Serving all Miami-Dade County. Call +1 (305) 542-6364.",
  keywords: [
    // Core service + location
    "painting company Miami",
    "painting contractors Miami-Dade",
    "premium painting company Miami",
    "best painting company Miami",
    // Residential
    "residential painting Miami",
    "interior painting Miami",
    "exterior painting Miami",
    "luxury home painting Miami",
    "HOA painting Miami",
    "condo painting Miami",
    "house painting Miami",
    // Commercial
    "commercial painting Miami",
    "commercial painting contractors Miami",
    "office painting Miami",
    "warehouse painting Miami",
    // Signature / Specialty — high intent, low competition
    "limewash painting Miami",
    "limewash wall finishes Miami",
    "venetian plaster Miami",
    "venetian plaster contractor Miami",
    "Roman clay finishes Miami",
    "decorative painting Miami",
    "specialty wall finishes Miami",
    "luxury wall finishes Miami",
    "textured wall finishes Miami",
    "decorative wall coatings Miami",
    "limewash interior Miami",
    "venetian plaster interior Miami",
    // Local city targeting
    "painting company Coral Gables",
    "painting company Doral",
    "painting company Miami Beach",
    "painting company Kendall",
    "painting company Aventura",
    "painting company Pinecrest",
    "painting company Hialeah",
    "painting company Brickell",
    "painting company South Miami",
    "pintura en Miami",
    // Spanish
    "empresa de pintura en Miami",
    "pintores profesionales en Miami",
    "pintura residencial Miami",
    "pintura comercial Miami",
    "pintura interior Miami",
    "pintura exterior Miami",
    "estuco veneciano Miami",
    "limewash Miami",
    "pintores Miami-Dade",
    "combo studio paint",
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
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://combostudiopaint.com/#business",
                name: "Combo Studio Paint",
                alternateName: "Combo Studio Paint Miami",
                description: "Miami's premier premium painting company specializing in residential and commercial painting, Limewash finishes, Venetian Plaster, Roman Clay, and luxury decorative wall treatments across Miami-Dade County.",
                url: "https://combostudiopaint.com",
                telephone: "+13055426364",
                email: "combostudiopaint@gmail.com",
                priceRange: "$$-$$$",
                image: [
                  "https://combostudiopaint.com/images/pintor/1.png",
                  "https://combostudiopaint.com/images/pintor/34.png",
                  "https://combostudiopaint.com/images/proyectos/1.png",
                ],
                logo: "https://combostudiopaint.com/logo.png",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Miami",
                  addressRegion: "FL",
                  postalCode: "33101",
                  addressCountry: "US",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 25.7617,
                  longitude: -80.1918,
                },
                areaServed: [
                  { "@type": "City", name: "Miami" },
                  { "@type": "City", name: "Miami Beach" },
                  { "@type": "City", name: "Coral Gables" },
                  { "@type": "City", name: "Doral" },
                  { "@type": "City", name: "Hialeah" },
                  { "@type": "City", name: "Kendall" },
                  { "@type": "City", name: "Aventura" },
                  { "@type": "City", name: "Pinecrest" },
                  { "@type": "City", name: "South Miami" },
                  { "@type": "City", name: "North Miami" },
                  { "@type": "AdministrativeArea", name: "Miami-Dade County" },
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+13055426364",
                  contactType: "customer service",
                  availableLanguage: ["English", "Spanish"],
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "5.0",
                  reviewCount: "100",
                  bestRating: "5",
                  worstRating: "1",
                },
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Painting & Decorative Finish Services",
                  itemListElement: [
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Painting Miami" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Exterior Painting Miami" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limewash Painting Miami" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Venetian Plaster Miami" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roman Clay Finishes Miami" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Painting Miami" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "HOA Painting Miami" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Home Painting Miami" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pressure Cleaning Miami" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Color Consultation Miami" } },
                  ],
                },
                openingHoursSpecification: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "08:00",
                  closes: "18:00",
                },
                sameAs: [
                  "https://wa.me/13055426364",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://combostudiopaint.com/#website",
                url: "https://combostudiopaint.com",
                name: "Combo Studio Paint",
                description: "Premium painting company and specialty finishes studio in Miami-Dade County",
                inLanguage: ["en", "es"],
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Do you offer limewash and venetian plaster finishes in Miami?",
                    acceptedAnswer: { "@type": "Answer", text: "Yes. Combo Studio Paint specializes in Signature decorative finishes including Limewash, Venetian Plaster, Roman Clay, textured feature walls and luxury matte finishes — the most sought-after wall treatments in Miami's premium residential market." },
                  },
                  {
                    "@type": "Question",
                    name: "Do you offer residential and commercial painting in Miami?",
                    acceptedAnswer: { "@type": "Answer", text: "Yes. We serve luxury homes, condos, HOA communities, offices, retail spaces, restaurants, warehouses, multifamily buildings and large-scale developments across Miami-Dade County." },
                  },
                  {
                    "@type": "Question",
                    name: "What areas of Miami-Dade do you serve?",
                    acceptedAnswer: { "@type": "Answer", text: "We cover all of Miami-Dade County including Miami, Miami Beach, Coral Gables, Doral, Hialeah, Kendall, Homestead, Aventura, Pinecrest and surrounding areas." },
                  },
                ],
              },
            ]),
          }}
        />
      </head>
      <body className="antialiased bg-[#F4F0E8] text-[#5B3A29] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
