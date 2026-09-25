"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/atoms";
import { useCart } from "@/lib/providers/CartProvider";

interface AddToCartButtonProps {
  id: string;
  title: string;
  price: number;
  image: string | Record<string, unknown> | null;
  className?: string;
}

export function AddToCartButton({ id, title, price, image, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name: title, price, image: image ?? "", quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Button
      onClick={handleClick}
      variant="primary"
      className={`w-full h-12 rounded-full uppercase tracking-widest text-xs font-semibold gap-2 transition-all ${className ?? ""}`}
    >
      {added ? (
        <>
          <Check size={16} />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart size={16} />
          Add to Cart
        </>
      )}
    </Button>
  );
}
