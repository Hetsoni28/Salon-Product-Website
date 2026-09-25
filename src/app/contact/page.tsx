import React from 'react';
import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/atoms';

export const metadata: Metadata = {
  title: 'Contact Us | LUMIÈRE',
  description: 'Get in touch with LUMIÈRE Professional for dealer inquiries, support, or general questions.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-gold uppercase tracking-[0.3em] text-sm font-semibold mb-4">Support & Inquiries</p>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-dark mb-6">Get in Touch</h1>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">
            Whether you're a salon owner looking to stock our products or an existing dealer needing support, our dedicated team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brand-divider">
            <h3 className="font-serif text-3xl text-brand-dark mb-8">Send a Message</h3>
            <form className="flex flex-col gap-6" action="/contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-brand-charcoal uppercase tracking-wider">First Name *</label>
                  <input type="text" id="firstName" required className="h-14 px-4 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none bg-gray-50/50" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-brand-charcoal uppercase tracking-wider">Last Name *</label>
                  <input type="text" id="lastName" required className="h-14 px-4 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none bg-gray-50/50" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-brand-charcoal uppercase tracking-wider">Email Address *</label>
                <input type="email" id="email" required className="h-14 px-4 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none bg-gray-50/50" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-brand-charcoal uppercase tracking-wider">Inquiry Type</label>
                <select id="subject" className="h-14 px-4 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none bg-gray-50/50 appearance-none">
                  <option>General Inquiry</option>
                  <option>Become a Dealer</option>
                  <option>Order Support</option>
                  <option>Product Information</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-brand-charcoal uppercase tracking-wider">Message *</label>
                <textarea id="message" rows={5} required className="p-4 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none bg-gray-50/50 resize-none"></textarea>
              </div>

              <Button type="submit" variant="primary" className="h-14 w-full mt-4 rounded-full uppercase tracking-widest text-sm">
                Send Message
              </Button>
            </form>
          </div>

          {/* Right: Contact Information */}
          <div className="flex flex-col justify-center gap-10">
            <div>
              <h3 className="font-serif text-3xl text-brand-dark mb-8">Contact Information</h3>
              <p className="text-gray-500 font-light mb-10 leading-relaxed">
                Prefer to reach out directly? Use the information below to contact our national headquarters.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-brand-divider flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-brand-charcoal font-semibold mb-1">Corporate Headquarters</h4>
                  <p className="text-gray-500 font-light">LUMIÈRE Towers, Level 4<br />Business Park Road, Mumbai<br />Maharashtra, India 400051</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-brand-divider flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-brand-charcoal font-semibold mb-1">Phone Support</h4>
                  <p className="text-gray-500 font-light">+91 93277 75751<br />Available across India</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-brand-divider flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-brand-charcoal font-semibold mb-1">Email Inquiries</h4>
                  <p className="text-gray-500 font-light">info@lumieresalons.com<br />dealers@lumieresalons.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-brand-divider flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-brand-charcoal font-semibold mb-1">Operating Hours</h4>
                  <p className="text-gray-500 font-light">Monday - Friday: 9:00 AM - 6:00 PM (IST)<br />Saturday: 10:00 AM - 2:00 PM (IST)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
