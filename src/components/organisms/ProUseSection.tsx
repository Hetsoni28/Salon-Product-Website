"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/atoms";
import Image from "next/image";

export function ProUseSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop"
          alt="Professional Salon"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          unoptimized
        />
        <div className="absolute inset-0 bg-brand-charcoal/60" />
      </motion.div>

      <div className="container-luxury relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl mx-auto bg-black/20 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-3xl shadow-2xl"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-brand-gold" />
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold">
              Professional Edition
            </h2>
            <div className="h-px w-8 bg-brand-gold" />
          </div>

          <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-tight">
            Engineered exclusively <br className="hidden md:block" /> for
            estheticians.
          </h3>

          <p className="text-gray-300 text-lg md:text-xl font-light mb-12 leading-relaxed max-w-2xl mx-auto">
            We understand the rigorous demands of a high-volume salon. Our
            products are formulated to speed up service times, minimize client
            discomfort, and significantly maximize your profit margins.
          </p>

          <Button
            variant="primary"
            size="lg"
            className="h-14 px-10 rounded-full tracking-widest uppercase text-sm"
          >
            Explore Professional Kits
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProUseSection;
