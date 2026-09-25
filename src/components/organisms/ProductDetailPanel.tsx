"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage, Button, Price } from "@/components/atoms";
import { QuantitySelector, ProductCard } from "@/components/molecules";
import { ShoppingCart, Heart, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/providers/CartProvider";

export interface ProductDetailPanelProps {
  id: string;
  title: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  shortDescription?: string;
  fullDescription?: string;
  benefits?: string[];
  howToUse?: string;
  sizeQuantity?: string;
  availability?: string;
  mainImage: Record<string, unknown> | string;
  gallery?: (Record<string, unknown> | string)[];
  relatedProducts?: Record<string, unknown>[];
}

export const ProductDetailPanel: React.FC<ProductDetailPanelProps> = ({
  id,
  title,
  brand = "LumiÃ¨re Professional",
  price,
  originalPrice,
  shortDescription,
  fullDescription,
  benefits,
  howToUse,
  sizeQuantity,
  availability,
  mainImage,
  gallery = [],
  relatedProducts = [],
}) => {
  const allImages = [mainImage, ...gallery].filter(Boolean);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "howToUse">(
    "description",
  );

  const { addItem } = useCart();

  const inStock = availability !== "Out of Stock";

  const handleAddToCart = () => {
    addItem({
      id,
      name: title,
      price,
      image: mainImage,
      quantity,
    });
  };

  return (
    <div className="container-luxury max-w-7xl mx-auto py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-32">
        {/* Left: Product Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-4/5 w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-divider"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {allImages[activeImage] ? (
                  typeof allImages[activeImage] === "string" ? (
                    <Image
                      src={allImages[activeImage]}
                      alt={title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <SanityImage
                      image={allImages[activeImage]}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={
                    `relative w-20 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ` +
                    (activeImage === idx
                      ? "border-brand-gold"
                      : "border-transparent opacity-70 hover:opacity-100")
                  }
                >
                  {typeof img === "string" ? (
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <SanityImage
                      image={img}
                      alt={`Thumbnail ${idx}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold mb-4">
              {brand}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">
              {title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              {inStock ? (
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle2 size={16} /> {availability || "In Stock"}
                </span>
              ) : (
                <span className="text-sm text-red-500 font-medium">
                  {availability}
                </span>
              )}
            </div>

            <Price
              amount={price}
              originalAmount={originalPrice}
              className="text-3xl mb-8"
            />

            <p className="text-gray-600 font-light leading-relaxed mb-8">
              {shortDescription}
            </p>

            <div className="space-y-6 mb-10 pb-10 border-b border-brand-divider">
              {sizeQuantity && (
                <div>
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-brand-charcoal mb-3">
                    Size / Quantity
                  </h4>
                  <div className="inline-flex items-center justify-center px-4 py-2 border-2 border-brand-charcoal rounded-lg font-medium text-brand-charcoal">
                    {sizeQuantity}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-brand-charcoal mb-3">
                  Quantity
                </h4>
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={10}
                />
              </div>
            </div>

            <div className="flex gap-4 mb-12">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="flex-1 h-14 rounded-full uppercase tracking-widest text-sm"
                disabled={!inStock}
              >
                <ShoppingCart size={18} className="mr-2" />
                {inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-14 h-14 shrink-0 rounded-full p-0 flex items-center justify-center border-brand-divider hover:border-brand-gold text-brand-charcoal hover:bg-brand-gold hover:text-white transition-colors"
              >
                <Heart size={20} />
              </Button>
            </div>

            {/* Benefits Quick List */}
            {benefits && benefits.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-semibold tracking-widest uppercase text-brand-charcoal mb-4">
                  Key Benefits
                </h4>
                <ul className="space-y-3">
                  {benefits.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-gray-600 font-light text-sm items-start"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-brand-gold shrink-0 mt-0.5"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Accordion Info */}
            <div className="border-t border-brand-divider pt-6 mt-8">
              <div className="flex gap-8 border-b border-brand-divider mb-6">
                <button
                  onClick={() => setActiveTab("description")}
                  className={
                    `pb-4 text-sm font-semibold tracking-widest uppercase transition-colors relative ` +
                    (activeTab === "description"
                      ? "text-brand-charcoal"
                      : "text-gray-400")
                  }
                >
                  Description
                  {activeTab === "description" && (
                    <motion.div
                      layoutId="tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-charcoal"
                    />
                  )}
                </button>
                {howToUse && (
                  <button
                    onClick={() => setActiveTab("howToUse")}
                    className={
                      `pb-4 text-sm font-semibold tracking-widest uppercase transition-colors relative ` +
                      (activeTab === "howToUse"
                        ? "text-brand-charcoal"
                        : "text-gray-400")
                    }
                  >
                    How To Use
                    {activeTab === "howToUse" && (
                      <motion.div
                        layoutId="tab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-charcoal"
                      />
                    )}
                  </button>
                )}
              </div>

              <div className="min-h-[150px]">
                <AnimatePresence mode="wait">
                  {activeTab === "description" && (
                    <motion.div
                      key="desc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-gray-600 font-light leading-relaxed prose-luxury"
                    >
                      {fullDescription || shortDescription}
                    </motion.div>
                  )}
                  {activeTab === "howToUse" && (
                    <motion.div
                      key="how"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-gray-600 font-light leading-relaxed prose-luxury"
                    >
                      {howToUse}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="pt-24 border-t border-brand-divider">
          <div className="text-center mb-16">
            <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
              Complete Your Setup
            </h3>
            <p className="text-gray-500 font-light text-lg">
              Professional tools that pair perfectly with this item.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p: Record<string, unknown>) => (
              <ProductCard key={p.id as string} {...(p as unknown as React.ComponentProps<typeof ProductCard>)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
