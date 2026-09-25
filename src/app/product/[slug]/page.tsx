import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProductDetailPanel } from "@/components/organisms/ProductDetailPanel";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { env } from "@/lib/env";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let product = null;
  try {
    product = await client.fetch(
      groq`*[_type == "product" && slug.current == $slug][0] { name, shortDescription }`,
      { slug },
    );
  } catch {}
  if (!product) return {};
  return {
    title: `${product.name} | LUMIÈRE Professional`,
    description: product.shortDescription || "",
    alternates: { canonical: `/product/${slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription || "",
      url: `${env.site.url}/product/${slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product = null;
  try {
    product = await client.fetch(
      groq`*[_type == "product" && slug.current == $slug][0] {
        "id": _id,
        "title": name,
        "brand": "LUMIÈRE Professional",
        price,
        "originalPrice": price * 1.2,
        shortDescription,
        fullDescription,
        howToUse,
        sizeQuantity,
        availability,
        mainImage,
        gallery,
      }`,
      { slug },
    );
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  if (!product) notFound();

  let relatedProducts = [];
  try {
    relatedProducts = await client.fetch(
      groq`*[_type == "product" && slug.current != $slug] | order(_createdAt desc)[0...4] {
        "id": _id,
        "title": name,
        "slug": slug.current,
        "image": mainImage,
        price,
        "originalPrice": price * 1.2,
        "badge": availability
      }`,
      { slug },
    );
  } catch {}

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product!.title,
    description: product!.shortDescription,
    brand: { "@type": "Brand", name: "LUMIÈRE Professional" },
    offers: {
      "@type": "Offer",
      url: `${env.site.url}/product/${slug}`,
      priceCurrency: "INR",
      price: product!.price,
      availability:
        product!.availability === "In Stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailPanel {...product} relatedProducts={relatedProducts} />
    </div>
  );
}
