"use client";

import React from "react";
import { CartProvider } from "./CartProvider";
import { DealerAttributionProvider } from "./DealerAttributionProvider";
import { WishlistProvider } from "./WishlistProvider";
import { CartDrawer } from "@/components/organisms/CartDrawer";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DealerAttributionProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </WishlistProvider>
    </DealerAttributionProvider>
  );
}
