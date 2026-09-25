import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/client';
import { allProductsQuery } from '@/sanity/queries';
import { Button, Price } from '@/components/atoms';
import { ShoppingCart, Eye } from 'lucide-react';

export const revalidate = 60;

// Helper to safely extract slug string from either format
function getSlug(slug: string | { current: string } | undefined): string {
  if (!slug) return '';
  if (typeof slug === 'string') return slug;
  return slug.current || '';
}

// Helper to safely extract image src
function getImageSrc(image: string | Record<string, unknown> | null | undefined): string | null {
  if (!image) return null;
  if (typeof image === 'string') return image;
  return null; // Let SanityImage handle sanity objects
}

interface Product {
  id: string;
  slug: string | { current: string };
  title: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  image: string | Record<string, unknown> | null;
  badge?: string;
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'premium-hard-wax',
    title: 'Premium Hard Wax Beans — Pearl',
    shortDescription: 'Our signature professional-grade hard wax beans formulated for sensitive skin. Provides excellent grip on stubborn hairs with a gentle, skin-loving formula.',
    price: 2400,
    originalPrice: 3000,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    slug: 'pre-wax-cleansing-gel',
    title: 'Pre-Wax Cleansing Gel',
    shortDescription: 'Prepares and sanitizes the skin before waxing. Removes oils, makeup, and deodorant to ensure optimal wax adhesion every time.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    slug: 'post-wax-calming-oil',
    title: 'Post-Wax Calming Oil',
    shortDescription: 'Soothes and nourishes the skin after waxing. Infused with chamomile and aloe vera to reduce redness and calm irritation immediately.',
    price: 1950,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1200&auto=format&fit=crop',
  },
];

export default async function ShopPage() {
  let products: Product[] = await client.fetch(allProductsQuery);

  if (!products || products.length === 0) {
    products = FALLBACK_PRODUCTS;
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest">Professional Collection</span>
            <div className="h-px w-12 bg-brand-gold" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-dark mb-6">The Collection</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg font-light leading-relaxed">
            A curated selection of our highest-performing professional waxes and salon supplies, engineered for perfection.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {products.map((product) => {
            const slug = getSlug(product.slug);
            const imageSrc = getImageSrc(product.image);

            return (
              <div key={product.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-divider">

                {/* Image Container — position:relative is required for fill images */}
                <div className="relative w-full aspect-video bg-gray-50 overflow-hidden">
                  <Link href={`/product/${slug}`} className="block absolute inset-0">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-cream-dark flex items-center justify-center text-gray-300 text-sm">
                        No Image
                      </div>
                    )}
                  </Link>

                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <Link href={`/product/${slug}`}>
                      <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal leading-tight group-hover:text-brand-gold transition-colors">
                        {product.title}
                      </h2>
                    </Link>
                    <Price amount={product.price} originalAmount={product.originalPrice} className="text-xl shrink-0" />
                  </div>

                  <p className="text-gray-500 font-light leading-relaxed mb-8 flex-grow">
                    {product.shortDescription || 'Professional grade salon wax designed for optimal performance and maximum client comfort.'}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <Link href={`/product/${slug}`} className="flex-1">
                      <Button variant="primary" className="w-full h-12 rounded-full uppercase tracking-widest text-xs font-semibold gap-2 group/btn">
                        <ShoppingCart size={16} className="group-hover/btn:scale-110 transition-transform" />
                        Add to Cart
                      </Button>
                    </Link>
                    <Link href={`/product/${slug}`} className="flex-1">
                      <Button variant="outline" className="w-full h-12 rounded-full uppercase tracking-widest text-xs font-semibold gap-2 border-brand-divider text-brand-charcoal hover:border-brand-gold hover:bg-brand-gold hover:text-white">
                        <Eye size={16} />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
