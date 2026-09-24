import { notFound } from 'next/navigation';
import { ProductDetailPanel } from '@/components/organisms/ProductDetailPanel';
import { client } from '@/sanity/client';
import { groq } from 'next-sanity';

const MOCK_PRODUCTS = [
  {
    id: '1',
    slug: 'premium-hard-wax',
    title: 'Premium Hard Wax Beans - Pearl',
    brand: 'Lumière Professional',
    price: 2400,
    originalPrice: 3000,
    rating: 4.9,
    reviewCount: 128,
    shortDescription: 'Our signature professional-grade hard wax beans formulated for sensitive skin.',
    fullDescription: 'Experience the ultimate in hair removal with our Pearl Hard Wax. Designed to melt evenly at low temperatures, it ensures maximum client comfort while grasping even the finest hairs for a flawless finish. Ideal for face, underarms, and bikini areas.',
    howToUse: 'Heat wax to 130�F. Cleanse skin with Pre-Wax Cleansing Gel. Apply wax in the direction of hair growth. Allow to cool for 10-15 seconds. Pull firmly in the opposite direction of hair growth.',
    benefits: ['Low temperature melting point', 'Removes hair as short as 1mm', 'Leaves no sticky residue', 'Dermatologist tested'],
    sizeQuantity: '1 kg / 2.2 lbs',
    availability: 'In Stock',
    mainImage: 'https://images.unsplash.com/photo-1629198728070-7a5482348ebf?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    slug: 'pre-wax-cleansing-gel',
    title: 'Pre-Wax Cleansing Gel',
    brand: "Lumière Professional",
    price: 1800,
    rating: 4.8,
    reviewCount: 84,
    shortDescription: "Prepare the skin for optimal wax adhesion. This cooling gel removes oils and residue.",
    fullDescription: "Our Pre-Wax Cleansing Gel is the essential first step to a perfect wax. It gently removes body oils, sweat, and makeup, ensuring the wax adheres only to the hair and not the skin, minimizing discomfort and preventing breakouts.",
    howToUse: "Apply a small amount to a cotton pad and gently wipe over the area to be waxed. Allow to dry completely before applying wax.",
    benefits: ['Cools and soothes', 'Removes surface oils', 'Prevents post-wax breakouts'],
    sizeQuantity: '500ml / 16.9 fl oz',
    availability: 'In Stock',
    mainImage: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=800&auto=format&fit=crop",
    gallery: []
  }
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let product = null;

  try {
    const sanityProduct = await client.fetch(groq`
      *[_type == "product" && slug.current == $slug][0] {
        "id": _id,
        "title": name,
        "brand": "Lumière Professional",
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

  return (
    <div className="bg-brand-cream min-h-screen pt-20">
      <ProductDetailPanel {...product} relatedProducts={relatedProducts} />
    </div>
  );
}
