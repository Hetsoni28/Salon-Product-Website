'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Badge, Rating, Price, Button, SanityImage } from '@/components/atoms';
import { useCart } from '@/lib/providers/CartProvider';

export interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: Record<string, unknown> | string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  slug,
  price,
  originalPrice,
  image,
  rating = 5,
  reviewCount = 0,
  badge,
  isWishlisted,
  onWishlistToggle,
}) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id,
      name: title,
      price,
      image,
      quantity: 1
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md border border-brand-divider"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/product/${slug}`} className="block h-full w-full">
          <motion.div whileHover={{ scale: 1.05 }} className="h-full w-full transition-transform duration-300">
            {typeof image === 'string' ? (
               <div className="relative w-full h-full">
                 <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover absolute inset-0" />
               </div>
            ) : (
               <SanityImage image={image} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            )}
          </motion.div>
        </Link>
        {badge && (
          <div className="absolute left-3 top-3 z-10">
            <Badge label={badge} variant="new" />
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            onWishlistToggle?.();
          }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-sm backdrop-blur-sm transition-colors hover:text-red-500"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${slug}`} className="mb-2 block">
          <h3 className="line-clamp-2 text-[15px] font-sans font-semibold text-brand-dark group-hover:text-brand-gold leading-tight">{title}</h3>
        </Link>
        <div className="mb-3 flex items-center gap-2">
          <Rating value={rating} />
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <Price amount={price} originalAmount={originalPrice} />
          <Button onClick={handleAddToCart} variant="outline" size="sm" className="h-8 w-8 shrink-0 rounded-full p-0 border-brand-divider text-brand-charcoal hover:border-brand-gold hover:bg-brand-gold hover:text-white" aria-label="Add to cart">
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
