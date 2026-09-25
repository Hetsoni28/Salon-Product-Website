import React from 'react';
import Link from 'next/link';
import { client } from '@/sanity/client';
import { allProductsQuery } from '@/sanity/queries';
import { Button, Price, SanityImage } from '@/components/atoms';
import { BreadCrumb, AddToCartButton } from '@/components/molecules';
import { Eye, ShoppingBag } from 'lucide-react';

export const revalidate = 60;

// Helper to safely extract slug string from either format
function getSlug(slug: string | { current: string } | undefined): string {
  if (!slug) return '';
  if (typeof slug === 'string') return slug;
  return slug.current || '';
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

export default async function ShopPage() {
  const products: Product[] = await client.fetch(allProductsQuery);

  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <BreadCrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop' }
          ]} 
          className="mb-8"
        />

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
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {products.map((product) => {
            const slug = getSlug(product.slug);

            return (
              <div key={product.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-divider">

                {/* Image Container — position:relative is required for fill images */}
                <div className="relative w-full aspect-square bg-[#F8F8F6] overflow-hidden">
                  <Link href={`/product/${slug}`} className="block absolute inset-0">
                    <SanityImage
                      image={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
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
                    <div className="flex-1">
                      <AddToCartButton
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                      />
                    </div>
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
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6">
              <ShoppingBag size={28} className="text-brand-gold" />
            </div>
            <h2 className="font-serif text-2xl text-brand-dark mb-3">Collection Coming Soon</h2>
            <p className="text-gray-400 font-light max-w-sm">
              Our curated range of professional salon products is being prepared. Check back shortly.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
