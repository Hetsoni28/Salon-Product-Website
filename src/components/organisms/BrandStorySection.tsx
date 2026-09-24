"use client";

import { motion } from "framer-motion";

export function BrandStorySection() {
  return (
    <section className="relative py-32 md:py-48 bg-brand-cream overflow-hidden">
      {/* Decorative large text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
        <span className="font-serif text-[15vw] leading-none whitespace-nowrap">
          LUMIÈRE
        </span>
      </div>

      <div className="container-luxury relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm tracking-[0.25em] uppercase text-brand-charcoal mb-10 font-semibold"
          >
            The Lumière Philosophy
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl text-brand-dark leading-[1.3] font-serif"
          >
            &quot;We believe that salon care should be a{" "}
            <span className="italic text-brand-gold">ritual of luxury</span>.
            Our waxes are meticulously crafted to reveal your clients&apos;{" "}
            <span className="italic text-brand-gold">smooth, radiant skin</span>
            ."
          </motion.p>

          
        </div>
      </div>
    </section>
  );
}

export default BrandStorySection;
