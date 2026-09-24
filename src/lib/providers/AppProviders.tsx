"use client";

import React from "react";
import { CartProvider } from "./CartProvider";
import { DealerAttributionProvider } from "./DealerAttributionProvider";
import { CartDrawer } from "@/components/organisms/CartDrawer";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DealerAttributionProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </DealerAttributionProvider>
  );
}
