"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Saves scroll position for each page to sessionStorage.
 * On refresh, the browser natively restores position.
 * This component additionally handles soft navigations.
 */
export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Tell the browser to handle scroll restoration itself (not Next.js)
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = `scroll_pos_${pathname}`;

    // Restore saved scroll position for this route
    const savedPos = sessionStorage.getItem(key);
    if (savedPos) {
      const { x, y } = JSON.parse(savedPos);
      // Small timeout ensures DOM is painted before we scroll
      const timer = setTimeout(() => {
        window.scrollTo({ top: y, left: x, behavior: "instant" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = `scroll_pos_${pathname}`;

    const saveScroll = () => {
      sessionStorage.setItem(
        key,
        JSON.stringify({ x: window.scrollX, y: window.scrollY }),
      );
    };

    window.addEventListener("scroll", saveScroll, { passive: true });
    return () => window.removeEventListener("scroll", saveScroll);
  }, [pathname]);

  return null;
}

export default ScrollRestoration;
