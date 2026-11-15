import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Manrope } from "next/font/google";
import { BUSINESS } from "@/lib/business";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KOPRA — India's First Non-Alcoholic Cocktail Bar in Trivandrum",
    template: "%s | KOPRA Trivandrum",
  },
  description:
    "KOPRA is India's first non-alcoholic cocktail bar, in Nanthancodu, Thiruvananthapuram. House ferments, Kerala flavours and cocktails built from scratch — open daily, 7 AM to 11 PM.",
  keywords: [
    "non-alcoholic cocktail bar Trivandrum",
    "mocktail bar Thiruvananthapuram",
    "cocktail experiences Trivandrum",
    "non-alcoholic beverages Kerala",
    "places to visit in Nanthancodu",
    "KOPRA Nanthancodu",
    "zero alcohol cocktails India",
    "cocktail workshop Trivandrum",
  ],
  authors: [{ name: "KOPRA" }],
  creator: "KOPRA",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "KOPRA",
    title: "KOPRA — India's First Non-Alcoholic Cocktail Bar",
    description:
      "A full bar experience without alcohol. House ferments, fresh produce and Kerala's own flavours, on the third floor in Nanthancodu, Trivandrum.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "A non-alcoholic cocktail served at KOPRA, Thiruvananthapuram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOPRA — India's First Non-Alcoholic Cocktail Bar",
    description: "Cocktails built from scratch, without alcohol. Nanthancodu, Thiruvananthapuram.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  "@id": `${siteUrl}/#business`,
  name: "KOPRA",
  alternateName: "KOPRA — Non Alcoholic Cocktail Bar",
  description:
    "India's first non-alcoholic cocktail bar. House ferments, fresh produce and Kerala-inspired non-alcoholic cocktails, plus bar food and workshops.",
  url: siteUrl,
  telephone: BUSINESS.phone,
  image: [
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "3rd Floor, Capitol Building, Nalanda Lane, Nanthancodu",
    addressLocality: "Thiruvananthapuram",
    addressRegion: "Kerala",
    postalCode: "695003",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.lat,
    longitude: BUSINESS.geo.lng,
  },
  hasMap: BUSINESS.mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "23:00",
    },
  ],
  servesCuisine: ["Non-alcoholic cocktails", "Kerala", "Bar food", "Coffee"],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Card",
  menu: `${siteUrl}/menu`,
  acceptsReservations: `${siteUrl}/reservations`,
  sameAs: [BUSINESS.instagramUrl, BUSINESS.mapsUrl],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.rating.value,
    reviewCount: BUSINESS.rating.count,
    bestRating: 5,
  },
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/reservations`,
      inLanguage: "en-IN",
      actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${manrope.variable} ${mono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
