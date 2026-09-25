"use client";

import { motion } from "framer-motion";
import { Gem, Timer, Heart, Package } from "lucide-react";

const benefits = [
  {
    icon: Gem,
    title: "Salon Grade",
    description: "Formulated exclusively for professional salon use",
  },
  {
    icon: Timer,
    title: "Long-Lasting Results",
    description: "Up to 4 weeks of smooth, hair-free skin per treatment",
  },
  {
    icon: Heart,
    title: "Skin Safe",
    description: "Gentle hypoallergenic formula for all skin types",
  },
  {
    icon: Package,
    title: "Bulk Available",
    description: "Volume pricing and wholesale programs for dealers",
  },
];

export function BenefitsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white border-y border-brand-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 divide-y md:divide-y-0 lg:divide-x divide-brand-divider"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="flex flex-col items-center text-center lg:px-8 group pt-8 md:pt-0"
            >
              <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500 text-brand-gold">
                <benefit.icon strokeWidth={1.5} size={28} />
              </div>
              <h3 className="text-sm uppercase tracking-widest font-semibold text-brand-charcoal mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default BenefitsSection;
