import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { dealerBySlugQueryV2, allActiveProductsQuery } from "@/sanity/queries";
import { DealerStorefront } from "@/components/organisms/DealerStorefront";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dealerSlug: string }>;
}) {
  const { dealerSlug } = await params;
  const dealer = await client.fetch(dealerBySlugQueryV2, { slug: dealerSlug });
  if (!dealer) return { title: "Dealer Not Found" };
  return {
    title: `${dealer.name} | Lumiere Professional`,
    description:
      dealer.bio ||
      `Shop premium salon products with ${dealer.name}, your authorized Lumiere dealer.`,
  };
}

export default async function DealerPage({
  params,
}: {
  params: Promise<{ dealerSlug: string }>;
}) {
  const { dealerSlug } = await params;
  const dealer = await client.fetch(dealerBySlugQueryV2, { slug: dealerSlug });

  if (!dealer) {
    notFound();
  }

  // If dealer has featured products, show only those. Otherwise show all.
  const products = dealer.featuredProducts?.length
    ? dealer.featuredProducts
    : await client.fetch(allActiveProductsQuery);

  return <DealerStorefront dealer={dealer} products={products} />;
}
