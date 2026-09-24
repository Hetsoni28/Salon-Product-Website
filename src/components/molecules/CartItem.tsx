'use client';

import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { SanityImage, Price } from '@/components/atoms';

export interface CartItemProps {
  id: string;
  title: string;
  price: number;
  image: Record<string, unknown>;
  quantity: number;
  variant?: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  // id is kept in the interface for parent list keying
  title,
  price,
  image,
  quantity,
  variant,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-50">
        <SanityImage image={image} alt={title} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {variant && <p className="mt-1 text-xs text-gray-500">{variant}</p>}

        <div className="mt-2 flex items-center justify-between">
          <Price amount={price} className="text-sm font-semibold" />

          <div className="flex items-center rounded-md border border-gray-200">
            <button
              onClick={onDecrement}
              disabled={quantity <= 1}
              className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-xs font-medium">{quantity}</span>
            <button
              onClick={onIncrement}
              className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
