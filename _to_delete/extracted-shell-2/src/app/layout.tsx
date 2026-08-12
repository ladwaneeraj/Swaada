import type { Metadata } from "next";
import { business, seo } from "@/data/swaada";
// Self-hosted fonts (latin + latin-ext, needed for "SWĀDA")
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "/",
    siteName: business.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 2048, height: 1152, alt: "Swaada nursery café, Davanagere" }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: { index: true, follow: true },
};

function JsonLd() {
  const { address, geo, hours, rating } = business;
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: business.name,
    alternateName: business.shortName,
    description: seo.description,
    url: business.siteUrl,
    telephone: business.phone,
    servesCuisine: ["Indian", "Italian", "Cafe", "Fast Food"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.landmark}`,
      addressLocality: `${address.locality}, ${address.city}`,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    hasMap: business.links.maps,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.schema.dayOfWeek,
      opens: hours.schema.opens,
      closes: hours.schema.closes,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.count,
      bestRating: 5,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain antialiased">
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
