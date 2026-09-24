import React from 'react';
import Link from 'next/link';
import { client } from '@/sanity/client';
import { allProductsQuery } from '@/sanity/queries';
import { SanityImage, Button, Price, Rating } from '@/components/atoms';
import { ShoppingCart, Eye } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function ShopPage() {
  const products = await client.fetch(allProductsQuery);

  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest">Professional Tools</span>
            <div className="h-px w-12 bg-brand-gold" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-dark mb-6">The Collection</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg font-light leading-relaxed">
            A curated selection of our highest-performing professional waxes and salon supplies, engineered for perfection.
          </p>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {products.map((product: any) => (
            <div key={product.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-divider">
              
              {/* Large Image Container */}
              <div className="relative aspect-4/3 w-full bg-gray-50 overflow-hidden">
                <Link href={/product/ + product.slug} className="block w-full h-full">
                  <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                    <SanityImage 
                      image={product.image} 
                      alt={product.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                </Link>
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <Link href={/product/ + product.slug}>
                    <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal leading-tight group-hover:text-brand-gold transition-colors">
                      {product.title}
                    </h2>
                  </Link>
                  <Price amount={product.price} originalAmount={product.originalPrice} className="text-xl shrink-0" />
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <Rating value={product.rating} />
                  <span className="text-sm text-gray-500">({product.reviewCount} Reviews)</span>
                </div>

                <p className="text-gray-500 font-light leading-relaxed mb-8 flex-grow">
                  {product.shortDescription || 'Professional grade salon wax designed for optimal performance and maximum client comfort.'}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Button variant="primary" className="flex-1 h-12 rounded-full uppercase tracking-widest text-xs font-semibold gap-2 group/btn">
                    <ShoppingCart size={16} className="group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                  <Link href={/product/ + product.slug} className="flex-1">
                    <Button variant="outline" className="w-full h-12 rounded-full uppercase tracking-widest text-xs font-semibold gap-2 border-brand-divider text-brand-charcoal hover:border-brand-gold hover:bg-brand-gold hover:text-white">
                      <Eye size={16} />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
