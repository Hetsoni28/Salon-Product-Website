"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/providers/CartProvider";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { Button, Price, SanityImage } from "@/components/atoms";
import { QuantitySelector } from "@/components/molecules";
import Image from "next/image";

export const CartDrawer = () => {
  const {
    isCartOpen,
    toggleCart,
    items,
    removeItem,
    updateQuantity,
    cartTotal,
  } = useCart();

  // Prevent background scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-divider">
              <h2 className="font-serif text-2xl text-brand-dark flex items-center gap-2">
                <ShoppingBag size={24} />
                Your Cart
              </h2>
              <button
                onClick={toggleCart}
                className="p-2 text-gray-400 hover:text-brand-charcoal transition-colors rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold">
                    <ShoppingBag size={32} />
                  </div>
                  <h3 className="font-serif text-xl text-brand-dark">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 font-light max-w-[250px]">
                    Looks like you haven't added any professional tools yet.
                  </p>
                  <Button
                    onClick={toggleCart}
                    variant="outline"
                    className="mt-4 rounded-full px-8"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-brand-cream-mid/30 rounded-2xl border border-brand-divider"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-white shrink-0">
                        {item.image ? (
                          typeof item.image === "string" ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <SanityImage
                              image={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          )
                        ) : (
                          <div className="w-full h-full bg-gray-100" />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-sans font-semibold text-sm text-brand-dark line-clamp-2 pr-4">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <Price
                          amount={item.price}
                          className="text-sm font-medium mb-3"
                        />

                        <div className="mt-auto flex items-center justify-between">
                          <QuantitySelector
                            value={item.quantity}
                            onChange={(qty) => updateQuantity(item.id, qty)}
                            min={1}
                            max={99}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-brand-cream border-t border-brand-divider">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-brand-charcoal font-medium">
                    Subtotal
                  </span>
                  <Price amount={cartTotal} className="text-2xl" />
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full rounded-full h-14 uppercase tracking-widest text-sm font-semibold"
                  onClick={() => {
                    toggleCart();
                    window.location.href = "/checkout";
                  }}
                >
                  Proceed to Checkout
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4 font-light">
                  Taxes calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
