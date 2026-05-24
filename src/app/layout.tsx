import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { SITE, TESTIMONIALS, AREAS_SERVED } from "@/lib/content";
import { PHONE_TEL } from "@/lib/whatsapp";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Chauffagiste Strasbourg | AK Énergies Confort — 5⭐ Google",
    template: "%s | AK Énergies Confort",
  },
  description:
    "Chauffagiste à Strasbourg depuis 15 ans ⭐ 5/5 Google. Installation, entretien, dépannage chaudière, pompe à chaleur, clim. Devis gratuit ☎ 06 30 26 93 08",
  keywords: [
    "chauffagiste Strasbourg",
    "pompe à chaleur Strasbourg",
    "climatisation Strasbourg",
    "dépannage chaudière",
    "CTA traitement d'air",
    "ballon thermodynamique",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE.url,
    siteName: SITE.name,
    title: "AK Énergies Confort — Le confort thermique réinventé à Strasbourg",
    description:
      "Chauffage, climatisation et traitement d'air. 15 ans d'expertise à Strasbourg. Devis gratuit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AK Énergies Confort — Chauffagiste à Strasbourg",
    description:
      "Chauffage, climatisation, PAC & traitement d'air. Devis gratuit, intervention rapide.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HVACBusiness"],
  name: SITE.name,
  image: `${SITE.url}/opengraph-image`,
  url: SITE.url,
  telephone: PHONE_TEL,
  email: SITE.email,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.adminRegion,
    postalCode: SITE.postalCode,
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.coords.lat,
    longitude: SITE.coords.lng,
  },
  areaServed: AREAS_SERVED.map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SITE.rating,
    reviewCount: SITE.reviewCount,
    bestRating: 5,
  },
  review: TESTIMONIALS.slice(0, 4).map((t) => ({
    "@type": "Review",
    reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    author: { "@type": "Person", name: t.author },
    reviewBody: t.quote,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${jetbrains.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500&f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-platinum focus:px-5 focus:py-2 focus:text-void"
        >
          Aller au contenu
        </a>
        <NoiseOverlay />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
