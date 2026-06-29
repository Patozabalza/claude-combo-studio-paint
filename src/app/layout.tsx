import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { fetchTrackingSettings } from "@/lib/sanity.queries";

export const dynamic = "force-dynamic";

const FALLBACK_GTM_ID = "GTM-WDXXGQJ9";

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
  verification: {
    other: {
      "facebook-domain-verification": "rsk7jspea9e7jl9ssj3ir2o9tslvyc",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tracking = await fetchTrackingSettings();
  const gtmId = tracking.gtmId?.trim() || FALLBACK_GTM_ID;
  const ga4Id = tracking.ga4Id?.trim();
  const metaPixelId = tracking.metaPixelId?.trim();

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
        {/* AEO: detailed service-matrix schema for AI answer engines (ChatGPT, Gemini, Perplexity). Separate from the LocalBusiness/WebSite/FAQ block above — does not replace it. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HousePainter",
              "@id": "https://combostudiopaint.com/#painting-contractor",
              name: "Combo Studio Paint",
              url: "https://combostudiopaint.com",
              telephone: "+13055426364",
              email: "combostudiopaint@gmail.com",
              description: "Premium painting contractor specializing in Limewash, Venetian Plaster, and Roman Clay decorative finishes, full residential repainting, and commercial painting programs for hospitality, corporate office, and HOA clients across Miami-Dade County.",
              knowsAbout: [
                "Limewash painting",
                "Venetian plaster",
                "Roman clay finishes",
                "Decorative wall finishes",
                "Hospitality painting scheduling",
                "HOA community painting programs",
                "Drywall repair",
                "Exterior pressure washing and resanding",
              ],
              areaServed: [
                { "@type": "City", name: "Miami" },
                { "@type": "Place", name: "Brickell" },
                { "@type": "City", name: "Doral" },
                { "@type": "City", name: "Miami Beach" },
                { "@type": "City", name: "Coral Gables" },
                { "@type": "City", name: "Pinecrest" },
                { "@type": "City", name: "Aventura" },
                { "@type": "City", name: "Kendall" },
                { "@type": "City", name: "Hialeah" },
                { "@type": "City", name: "South Miami" },
                { "@type": "AdministrativeArea", name: "Miami-Dade County" },
                { "@type": "AdministrativeArea", name: "South Florida" },
              ],
              makesOffer: [
                {
                  "@type": "OfferCatalog",
                  name: "Residential Painting & Decorative Finishes",
                  itemListElement: [
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Painting", description: "Full-room and whole-home interior repaints with premium, low-VOC paint systems." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limewash Finishes", description: "Authentic breathable limewash application — one of Miami's fastest-growing luxury decorative finish trends." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roman Clay Finishes", description: "Multi-coat specialty clay plaster applied by trained signature finish specialists." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Venetian Plaster", description: "Multi-coat burnished plaster finish for feature walls and full-room luxury applications." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Exterior Painting", description: "Full exterior repaints including pressure washing and stucco/surface resanding." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "HOA & Condo Projects", description: "Scalable, community-wide residential painting programs." } },
                  ],
                },
                {
                  "@type": "OfferCatalog",
                  name: "Commercial Painting Programs",
                  itemListElement: [
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hospitality Painting", description: "Hotels and restaurants, with overnight and off-hours scheduling to avoid disrupting guest service." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Office Painting", description: "Interior painting for office suites, scheduled around business hours." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "HOA Community Painting", description: "Large-scale, phased painting programs for HOA boards and condo associations." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drywall Repair", description: "Commercial-grade drywall patch and finish work." } },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased bg-[#F4F0E8] text-[#5B3A29] overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
        {/* GA4 directo (solo si se configura en CMS y no se usa GTM) */}
        {ga4Id && (
          <>
            <Script
              id="ga4-script"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            />
            <Script
              id="ga4-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`,
              }}
            />
          </>
        )}
        {/* Meta Pixel (solo si se configura en CMS) */}
        {metaPixelId && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`,
            }}
          />
        )}
      </body>
    </html>
  );
}
