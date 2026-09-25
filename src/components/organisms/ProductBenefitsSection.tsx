"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

export function ProductBenefitsSection() {
  const benefits = [
    {
      title: "Ultra-low melt temperature",
      desc: "Maximum client comfort — zero risk of burns during application.",
    },
    {
      title: "Superior elasticity",
      desc: "No breaking or snapping mid-pull. One clean, confident removal.",
    },
    {
      title: "True-grip formula",
      desc: "Captures even the finest, shortest hairs on the very first pass.",
    },
    {
      title: "Zero residue release",
      desc: "Clean peel, no sticky aftermath — faster client turnover per day.",
    },
    {
      title: "Hypoallergenic certified",
      desc: "Safe for face, underarm, and Brazilian — even ultra-sensitive skin.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image Side with Arch */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-3/4 w-full max-w-md mx-auto overflow-hidden rounded-t-[10rem] rounded-b-3xl shadow-2xl border-8 border-white">
              <Image
                src="/images/product-benefits.jpg"
                alt="Premium Waxing"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating Element */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-12 -left-4 md:left-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 max-w-[200px]"
            >
              <div className="text-brand-gold mb-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                  />
                </svg>
              </div>
              <p className="text-brand-charcoal font-serif leading-tight">
                Increase Salon Profit Margins
              </p>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6 leading-tight">
                Why Salons Choose <br /> LUMIÈRE Wax.
              </h2>
              <p className="text-gray-600 mb-12 text-lg font-light leading-relaxed">
                Our proprietary wax formula is engineered to deliver faster
                treatments, happier clients, and higher repeat bookings — every
                session, every time.
              </p>

              <div className="space-y-8">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                    className="flex gap-5 group"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold transition-colors duration-300">
                      <Check
                        className="text-brand-gold group-hover:text-white transition-colors duration-300"
                        size={16}
                        strokeWidth={3}
                      />
                    </div>
                    <div>
                      <h4 className="text-brand-charcoal font-medium text-lg mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-500 font-light text-sm">
                        {benefit.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductBenefitsSection;

