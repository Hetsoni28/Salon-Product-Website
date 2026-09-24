'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/molecules';

export interface ProductGridProps {
  products: any[];
  title?: string;
  loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, title, loading = false }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full">
      {title && (
        <h2 className="font-serif text-3xl text-brand-charcoal mb-8">{title}</h2>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4 w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No products found.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
        >
          <AnimatePresence>
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants} layout className="h-full">
                <ProductCard {...product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
export default ProductGrid;

