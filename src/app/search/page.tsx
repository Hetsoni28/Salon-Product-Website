import React from 'react';
import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import { ProductCard } from '@/components/molecules';

export const revalidate = 0; // Dynamic route

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';

  let products = [];
  
  if (q) {
    const searchTerm = `*${q}*`;
    try {
      products = await client.fetch(groq`
        *[_type == "product" && (name match $searchTerm || shortDescription match $searchTerm || category->name match $searchTerm)] | order(_createdAt desc) {
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
      `, { searchTerm });
    } catch (error) {
      console.error("Sanity search error:", error);
    }
  }

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <div className="container-luxury max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-4">Search Results</p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">
            {q ? `Results for "${q}"` : 'Search our collection'}
          </h1>
          <p className="text-gray-500 font-light text-lg">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-brand-divider shadow-sm mt-8">
            <h3 className="font-serif text-2xl text-brand-dark mb-4">No products found</h3>
            <p className="text-gray-500 font-light mb-8 max-w-md mx-auto">
              We couldn't find anything matching "{q}". Try searching for something else like "Wax", "Gel", or "Heater".
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
