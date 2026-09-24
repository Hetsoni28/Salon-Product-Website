import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";

import { env } from "@/lib/env";
import { Navbar, Footer } from "@/components/organisms";
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
    "Discover LUMIÈRE's curated collection of premium, natural skincare products. Dermatologist-tested, cruelty-free formulas crafted for radiant skin.",
  keywords: [
    "salon supplies", "waxing", "professional wax",
    "natural skincare",
    "premium beauty",
    "cruelty free",
    "dermatologist tested",
    "Lumiere",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "LUMIÈRE",
    title: "LUMIÈRE | Professional Salon Supplies",
    description:
      "Discover LUMIÈRE's curated collection of premium, natural skincare products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMIÈRE | Professional Salon Supplies",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${geistMono.variable}`}
    >
      <body className="bg-brand-cream text-brand-charcoal antialiased selection:bg-brand-gold selection:text-white">
        <AppProviders>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
