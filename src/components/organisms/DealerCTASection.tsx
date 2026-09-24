"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/atoms";
import Image from "next/image";

export function DealerCTASection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative rounded-4xl overflow-hidden bg-brand-charcoal"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20 lg:p-24 flex flex-col justify-center relative z-10">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mb-8">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-brand-gold"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                Become a <br /> Certified Dealer.
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-10 max-w-md">
                Partner with LumiÃ¨re Professional and offer your clients the
                pinnacle of waxing luxury. Gain access to exclusive wholesale
                pricing, dedicated hands-on training, and premium salon support.
              </p>
              <div>
                <Button
                  variant="primary"
                  size="lg"
                  className="h-14 px-8 rounded-full tracking-widest uppercase text-sm border border-transparent hover:border-brand-gold"
                >
                  Apply for Wholesale
                </Button>
              </div>
            </div>

            <div className="relative h-64 lg:h-auto hidden md:block">
              <Image
                src="/images/dealer-cta.jpg"
                alt="Spa Treatment Room"
                fill
                className="object-cover opacity-80"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-r from-brand-charcoal via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-charcoal via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default DealerCTASection;

