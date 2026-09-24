'use client';

import React from 'react';
import { ProductGrid } from '@/components/organisms/ProductGrid';

// Mock product for client presentation when CMS is empty
const MOCK_PRODUCT = {
  id: 'mock-1',
  title: 'Premium Hard Wax Beans - Pearl',
  slug: 'premium-hard-wax',
  price: 2400,
  originalPrice: 3000,
  rating: 4.9,
  reviewCount: 128,
  badge: 'Bestseller',
  category: 'Hard Wax',
  image: '/images/product-1.jpg',
};

interface ShopClientProps {
  initialProducts: any[];
  categories?: string[];
  initialCategory?: string;
}

export default function ShopClient({ initialProducts, initialCategory = 'All' }: ShopClientProps) {
  // If Sanity is empty, fallback to mock products for client presentation
  const products = initialProducts.length > 0 ? initialProducts : [
    MOCK_PRODUCT, 
    { ...MOCK_PRODUCT, id: 'mock-2', title: 'Pre-Wax Cleansing Gel', price: 1800, badge: 'New', category: 'Pre & Post Care', image: '/images/product-2.jpg' }, 
    { ...MOCK_PRODUCT, id: 'mock-3', title: 'Post-Wax Calming Oil', price: 1200, badge: '', category: 'Pre & Post Care', image: '/images/product-3.jpg' },
    { ...MOCK_PRODUCT, id: 'mock-4', title: 'Professional Wax Heater', price: 4500, badge: 'Sale', category: 'Accessories', image: '/images/product-4.jpg' }
  ];

  const displayProducts = initialCategory === 'All' 
    ? products 
    : products.filter(p => p.category === initialCategory);

  return (
    <div className="container-luxury section-py min-h-screen">
      <div className="text-center mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">
          {initialCategory === 'All' ? 'Our Products' : initialCategory}
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover our premium selection of professional salon supplies and waxing essentials.
        </p>
      </div>

      <div className="w-full">
        {displayProducts.length > 0 ? (
          <ProductGrid products={displayProducts} />
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-serif text-brand-dark mb-2">No products found</h3>
            <p className="text-gray-500">Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}


