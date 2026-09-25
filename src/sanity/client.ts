import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityConfig } from "./config";

// ── Read client (public, safe in RSC / browser) ─────────────────────────────
export const client = createClient({
  ...sanityConfig,
  stega: { enabled: false },
  // Phase 21: Aggressive caching. Cache API responses for 1 hour
  // If you need immediate updates during development, lower this or use on-demand revalidation.
  fetch: { next: { revalidate: 3600 } }
});

// ── Write client (uses API token — server-side only) ────────────────────────
export const writeClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ── Image URL builder ────────────────────────────────────────────────────────
const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
