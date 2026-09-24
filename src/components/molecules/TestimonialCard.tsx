'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Rating, SanityImage } from '@/components/atoms';

export interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
  rating: number;
  avatar?: Record<string, unknown>;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  location,
  rating,
  avatar,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-2xl bg-white p-6 shadow-sm sm:p-8 ${className}`}
    >
      <div className="absolute right-6 top-6 text-gray-100">
        <Quote size={48} className="rotate-180 fill-current" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4">
          <Rating value={rating} />
        </div>

        <p className="mb-6 flex-1 text-base leading-relaxed text-gray-700 italic">
          &ldquo;{quote}&rdquo;
        </p>

        <div className="flex items-center gap-3">
          {avatar ? (
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
              <SanityImage image={avatar} alt={author} fill className="object-cover" />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10 text-lg font-semibold text-brand-gold">
              {author.charAt(0)}
            </div>
          )}

          <div>
            <h4 className="text-sm font-bold text-gray-900">{author}</h4>
            {location && <p className="text-xs text-gray-500">{location}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
