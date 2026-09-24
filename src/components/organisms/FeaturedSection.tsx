"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/molecules";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  products: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title,
  subtitle,
  products,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section className="py-24 lg:py-32 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-brand-gold" />
              <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest">
                Curated Selection
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-tight mb-4">
              {title}
            </h2>
            {subtitle && <p className="text-gray-500 text-lg">{subtitle}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/shop"
              className="group flex items-center gap-3 text-brand-charcoal font-medium uppercase tracking-widest text-sm hover:text-brand-gold transition-colors"
            >
              <span>View Full Collection</span>
              <div className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="h-full"
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
