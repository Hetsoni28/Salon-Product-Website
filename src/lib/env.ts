/**
 * Environment configuration and validation.
 * Centralizes all process.env access to ensure type safety and fallback defaults.
 */

export const env = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-20",
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3007",
    name: "LUMIÈRE",
  },
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
} as const;

export function validateEnv() {
  if (!env.sanity.projectId) {
    console.warn(
      "⚠️ Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment variables.",
    );
  }
}
