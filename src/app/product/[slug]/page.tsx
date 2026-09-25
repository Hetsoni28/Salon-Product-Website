import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProductDetailPanel } from '@/components/organisms/ProductDetailPanel';
import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import { env } from '@/lib/env';

const MOCK_PRODUCTS = [
  {
    id: '1',
    slug: 'premium-hard-wax',
    title: 'Premium Hard Wax Beans - Pearl',
    brand: 'LUMIÈRE Professional',
    price: 2400,
    originalPrice: 3000,
    rating: 4.9,
    reviewCount: 128,
    shortDescription: 'Our signature professional-grade hard wax beans formulated for sensitive skin.',
    fullDescription: 'Experience the ultimate in hair removal with our Pearl Hard Wax. Designed to melt evenly at low temperatures, it ensures maximum client comfort while grasping even the finest hairs for a flawless finish. Ideal for face, underarms, and bikini areas.',
    howToUse: 'Heat wax to 130°F. Cleanse skin with Pre-Wax Cleansing Gel. Apply wax in the direction of hair growth. Allow to cool for 10-15 seconds. Pull firmly in the opposite direction of hair growth.',
    benefits: ['Low temperature melting point', 'Removes hair as short as 1mm', 'Leaves no sticky residue', 'Dermatologist tested'],
    sizeQuantity: '1 kg / 2.2 lbs',
    availability: 'In Stock',
    mainImage: '/images/product-1.jpg',
    gallery: [
      '/images/product-1.jpg'
    ]
  },
  {
    id: '2',
    slug: 'pre-wax-cleansing-gel',
    title: 'Pre-Wax Cleansing Gel',
    brand: "LUMIÈRE Professional",
    price: 1800,
    rating: 4.8,
    reviewCount: 84,
    shortDescription: "Prepare the skin for optimal wax adhesion. This cooling gel removes oils and residue.",
    fullDescription: "Our Pre-Wax Cleansing Gel is the essential first step to a perfect wax. It gently removes body oils, sweat, and makeup, ensuring the wax adheres only to the hair and not the skin, minimizing discomfort and preventing breakouts.",
    howToUse: "Apply a small amount to a cotton pad and gently wipe over the area to be waxed. Allow to dry completely before applying wax.",
    benefits: ['Cools and soothes', 'Removes surface oils', 'Prevents post-wax breakouts'],
    sizeQuantity: '500ml / 16.9 fl oz',
    availability: 'In Stock',
    mainImage: "/images/product-2.jpg",
    gallery: []
  }
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let product = null;
  try {
    product = await client.fetch(groq`
      *[_type == "product" && slug.current == $slug][0] {
        name,
        shortDescription,
        mainImage
      }
    `, { slug });
  } catch (error) { }

  if (!product) {
    product = MOCK_PRODUCTS.find(p => p.slug === slug);
  }

  if (!product) return {};

  const title = product.name || product.title;
  const description = product.shortDescription || "";

  return {
    title,
    description,
    alternates: {
      canonical: `/product/${slug}`
    },
    openGraph: {
      title,
      description,
      type: "article", // Next JS mapping for standard pages, could be website.
      url: `${env.site.url}/product/${slug}`,
    },
  };
}


export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let product = null;

  try {
    const sanityProduct = await client.fetch(groq`
      *[_type == "product" && slug.current == $slug][0] {
        "id": _id,
        "title": name,
        "brand": "LUMIÈRE Professional",
        price,
        "originalPrice": price * 1.2,
        shortDescription,
        fullDescription,
        benefits,
        howToUse,
        sizeQuantity,
        availability,
        mainImage,
        gallery,
        "rating": 5,
        "reviewCount": 124
      }
    `, { slug });
    
    if (sanityProduct) {
      product = sanityProduct;
    }
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  if (!product) {
    product = MOCK_PRODUCTS.find(p => p.slug === slug);
  }

  if (!product) {
    notFound();
  }

  let relatedProducts = [];
  try {
    relatedProducts = await client.fetch(groq`
      *[_type == "product" && slug.current != $slug] | order(_createdAt desc)[0...4] {
        "id": _id,
        "title": name,
        "slug": slug.current,
        "image": mainImage,
        price,
        "originalPrice": price * 1.2,
        "rating": 5,
        "reviewCount": 124,
        "badge": availability
      }
    `, { slug });
  } catch(e) {}
  
  if (!relatedProducts || relatedProducts.length === 0) {
    relatedProducts = MOCK_PRODUCTS.filter(p => p.slug !== slug).map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      image: p.mainImage,
      price: p.price,
      originalPrice: p.originalPrice,
      rating: p.rating,
      reviewCount: p.reviewCount,
      badge: 'Pro'
    }));
  }

  // Product Structured Data
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.mainImage || `${env.site.url}/images/placeholder.jpg`,
    "description": product.shortDescription,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "LUMIÈRE Professional"
    },
    "offers": {
      "@type": "Offer",
      "url": `${env.site.url}/product/${slug}`,
      "priceCurrency": "INR",
      "price": product.price,
      "availability": product.availability === "In Stock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
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
