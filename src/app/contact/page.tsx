import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/atoms";

export const metadata: Metadata = {
  title: "Contact Us | LUMIÈRE",
  description:
    "Get in touch with LUMIÈRE Professional for dealer inquiries, support, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Cinematic Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="LUMIÈRE Support"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <p className="text-brand-gold uppercase tracking-[0.3em] text-sm font-semibold mb-6">
            Support & Inquiries
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Our dedicated team is ready to assist salon owners, estheticians, and dealers nationwide.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Direct Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-20 -mt-32 relative z-20">
            <a 
              href="tel:+919327775751" 
              className="group flex flex-col items-center text-center bg-white p-10 rounded-3xl shadow-xl shadow-brand-charcoal/5 border border-brand-divider hover:border-brand-gold transition-colors duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone size={28} />
              </div>
              <h3 className="font-serif text-2xl text-brand-dark mb-2">Phone Support</h3>
              <p className="text-gray-500 font-light mb-4">Tap to call our direct support line.</p>
              <p className="text-brand-charcoal font-semibold text-lg tracking-wide">+91 93277 75751</p>
            </a>

            <a 
              href="mailto:info@lumieresalons.com" 
              className="group flex flex-col items-center text-center bg-white p-10 rounded-3xl shadow-xl shadow-brand-charcoal/5 border border-brand-divider hover:border-brand-gold transition-colors duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail size={28} />
              </div>
              <h3 className="font-serif text-2xl text-brand-dark mb-2">Email Us</h3>
              <p className="text-gray-500 font-light mb-4">We usually respond within 24 hours.</p>
              <p className="text-brand-charcoal font-semibold text-lg tracking-wide">info@lumieresalons.com</p>
            </a>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-brand-divider">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">Send a Message</h2>
              <p className="text-gray-500 font-light">Fill out the form below and a representative will contact you shortly.</p>
            </div>

            <form className="flex flex-col gap-8" action="/contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-semibold text-brand-charcoal uppercase tracking-[0.15em]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="h-14 px-4 rounded-none border-b-2 border-gray-200 focus:border-brand-gold outline-none bg-transparent transition-colors text-brand-charcoal"
                    placeholder="Jane"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="lastName"
                    className="text-xs font-semibold text-brand-charcoal uppercase tracking-[0.15em]"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="h-14 px-4 rounded-none border-b-2 border-gray-200 focus:border-brand-gold outline-none bg-transparent transition-colors text-brand-charcoal"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-brand-charcoal uppercase tracking-[0.15em]"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="h-14 px-4 rounded-none border-b-2 border-gray-200 focus:border-brand-gold outline-none bg-transparent transition-colors text-brand-charcoal"
                    placeholder="jane@salon.com"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold text-brand-charcoal uppercase tracking-[0.15em]"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="subject"
                    className="h-14 px-4 rounded-none border-b-2 border-gray-200 focus:border-brand-gold outline-none bg-transparent transition-colors text-brand-charcoal cursor-pointer"
                  >
                    <option>General Inquiry</option>
                    <option>Become a Dealer</option>
                    <option>Order Support</option>
                    <option>Product Information</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold text-brand-charcoal uppercase tracking-[0.15em]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  className="p-4 rounded-2xl border-2 border-gray-100 focus:border-brand-gold outline-none bg-gray-50/50 resize-none transition-colors text-brand-charcoal"
                ></textarea>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="h-14 w-full md:w-auto md:px-16 mx-auto mt-6 rounded-full uppercase tracking-widest text-sm"
              >
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
