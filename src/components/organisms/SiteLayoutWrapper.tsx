"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar, Footer } from "@/components/organisms";

export function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Navbar and Footer on admin and studio routes
  const isIsolatedRoute =
    pathname?.startsWith("/admin") || pathname?.startsWith("/studio");

  if (isIsolatedRoute) {
    return <main className="bg-brand-cream min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className={`min-h-screen ${pathname === "/" ? "" : "pt-20"}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
