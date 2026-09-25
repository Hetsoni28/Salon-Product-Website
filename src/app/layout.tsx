import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";

import { env } from "@/lib/env";
import { SiteLayoutWrapper } from "@/components/organisms/SiteLayoutWrapper";
import { AppProviders } from "@/lib/providers/AppProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.site.url),
  title: {
    default: "LUMIÈRE | Professional Salon Supplies",
    template: "%s | LUMIÈRE",
  },
  description:
    "LUMIÈRE supplies India's top salons with premium professional waxing products — hard wax beans, pre & post-care essentials, and salon accessories trusted by 10,000+ professionals.",
  keywords: [
    "salon supplies India",
    "professional waxing",
    "hard wax beans",
    "pre wax gel",
    "post wax oil",
    "wax heater",
    "salon dealer",
    "Lumiere wax",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "LUMIÈRE",
    title: "LUMIÈRE | Professional Salon Supplies",
    description:
      "Premium professional waxing supplies for salons across India. Trusted by 10,000+ beauticians.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMIÈRE | Professional Salon Supplies",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LUMIÈRE Salon Supplies",
    url: env.site.url,
    logo: `${env.site.url}/logo.png`,
    sameAs: [
      "https://instagram.com/lumieresalons",
      "https://facebook.com/lumieresalons",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${geistMono.variable}`}
    >
      <body className="bg-brand-cream text-brand-charcoal antialiased selection:bg-brand-gold selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgStructuredData),
          }}
        />
        <AppProviders>
          <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
        </AppProviders>
      </body>
    </html>
  );
}
