"use client";

/**
 * Dealer Attribution System
 *
 * When a customer visits /d/[dealerSlug], their dealer is stored
 * in localStorage and a cookie. This attribution persists silently
 * across the entire shopping session (Homepage → Cart → Checkout).
 *
 * Prices are NEVER affected. This is attribution-only.
 * Attribution expires after 30 days.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DealerAttribution {
  slug: string;
  code: string;
  name: string;
  capturedAt: string; // ISO timestamp
}

interface DealerAttributionContextType {
  attribution: DealerAttribution | null;
  setAttribution: (dealer: DealerAttribution) => void;
  clearAttribution: () => void;
  hasAttribution: boolean;
}

const STORAGE_KEY = 'lumiere_dealer_attribution';
const EXPIRY_DAYS = 30;

const DealerAttributionContext = createContext<DealerAttributionContextType | undefined>(undefined);

export const DealerAttributionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [attribution, setAttributionState] = useState<DealerAttribution | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from localStorage on mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: DealerAttribution = JSON.parse(stored);
        // Check expiry
        const capturedAt = new Date(parsed.capturedAt).getTime();
        const expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        if (Date.now() - capturedAt < expiryMs) {
          setAttributionState(parsed);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const setAttribution = (dealer: DealerAttribution) => {
    setAttributionState(dealer);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dealer));
      // Also set a cookie for server-side reading (30 days)
      document.cookie = `${STORAGE_KEY}=${encodeURIComponent(JSON.stringify(dealer))}; path=/; max-age=${EXPIRY_DAYS * 24 * 60 * 60}; SameSite=Lax`;
    } catch {
      // localStorage unavailable (private browsing etc.) — silently fail
    }
  };

  const clearAttribution = () => {
    setAttributionState(null);
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `${STORAGE_KEY}=; path=/; max-age=0`;
  };

  return (
    <DealerAttributionContext.Provider
      value={{
        attribution: mounted ? attribution : null,
        setAttribution,
        clearAttribution,
        hasAttribution: mounted && attribution !== null,
      }}
    >
      {children}
    </DealerAttributionContext.Provider>
  );
};

export const useDealerAttribution = () => {
  const context = useContext(DealerAttributionContext);
  if (!context) throw new Error('useDealerAttribution must be used within DealerAttributionProvider');
  return context;
};
