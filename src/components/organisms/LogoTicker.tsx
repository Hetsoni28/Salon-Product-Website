"use client";

import React from "react";
import { motion } from "framer-motion";

const SALONS = [
  "LA SUITE SPA",
  "AESTHETICA",
  "THE WAX BAR",
  "LUMIERE STUDIO",
  "BARE & CO",
  "ELITE ESTHETICS",
  "SILK ROOM",
  "GLOW HAUS",
];

export function LogoTicker() {
  return (
    <div className="w-full bg-brand-charcoal py-8 overflow-hidden flex flex-col items-center border-b border-white/10">
      <p className="text-gray-400 text-xs uppercase tracking-widest mb-6">
        Partnering with Elite Salons Worldwide
      </p>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden group">
        {/* Left/Right Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-brand-charcoal to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-brand-charcoal to-transparent z-10" />

        {/* Animated Track */}
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          className="flex whitespace-nowrap"
        >
          {/* Duplicate the array twice to create a seamless loop */}
          {[...SALONS, ...SALONS, ...SALONS, ...SALONS].map((salon, i) => (
            <div key={i} className="flex items-center justify-center mx-12">
              <span className="text-xl md:text-2xl font-serif uppercase text-white/40 tracking-wider">
                {salon}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default LogoTicker;
