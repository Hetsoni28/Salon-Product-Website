"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/providers/WishlistProvider";
import { BreadCrumb, ProductCard } from "@/components/molecules";
import { Button } from "@/components/atoms";

export default function WishlistPage() {
  const { items } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-brand-cream pt-32 pb-24 flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full bg-brand-gold/20" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <BreadCrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Wishlist' }
          ]} 
          className="mb-12"
        />

        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">Your Wishlist</h1>
          <p className="text-gray-500 font-light text-lg">
            {items.length} {items.length === 1 ? "item" : "items"} saved for later.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-brand-divider flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mb-6 text-brand-gold">
              <Heart size={32} />
            </div>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Save your favorite professional salon products here to easily find them later.
            </p>
            <Link href="/shop">
              <Button variant="primary" className="rounded-full tracking-widest uppercase text-sm px-8">
                Explore Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.name}
                slug={item.slug}
                price={item.price}
                image={item.image || ""}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
