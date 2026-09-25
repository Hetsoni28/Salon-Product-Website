"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section className="py-24 bg-brand-cream border-t border-brand-divider">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold mb-4">
            Dedicated Support
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">
            We are here to help.
          </h2>
          <p className="text-gray-500 font-light text-lg">
            Reach out to our professional support team for guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group flex flex-col items-center text-center p-12 bg-white rounded-3xl shadow-sm border border-brand-divider hover:shadow-xl hover:border-brand-gold transition-all duration-500"
          >
            <div className="w-16 h-16 bg-brand-cream text-brand-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Phone size={24} strokeWidth={1.5} />
            </div>
            <h4 className="font-serif text-2xl mb-3 text-brand-charcoal">
              Call Us
            </h4>
            <p className="text-gray-500 font-light mb-6">
              Mon-Fri from 9am to 6pm EST.
            </p>
            <a
              href="tel:+919327775751"
              className="text-brand-gold font-semibold tracking-widest uppercase text-sm hover:text-brand-charcoal transition-colors"
            >
              +91 93277 75751
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group flex flex-col items-center text-center p-12 bg-white rounded-3xl shadow-sm border border-brand-divider hover:shadow-xl hover:border-brand-gold transition-all duration-500"
          >
            <div className="w-16 h-16 bg-brand-cream text-brand-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Mail size={24} strokeWidth={1.5} />
            </div>
            <h4 className="font-serif text-2xl mb-3 text-brand-charcoal">
              Email Us
            </h4>
            <p className="text-gray-500 font-light mb-6">
              We&apos;ll respond within 24 hours.
            </p>
            <a
              href="mailto:professionals@lumiere.com"
              className="text-brand-gold font-semibold tracking-widest uppercase text-sm hover:text-brand-charcoal transition-colors"
            >
              pros@lumiere.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
