import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | LUMIÈRE',
  description: 'Terms and Conditions for LUMIÈRE Professional Salon Products.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-24 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brand-divider">
        <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">Terms and Conditions</h1>
        <p className="text-sm text-gray-400 mb-10">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-brand max-w-none text-gray-600 font-light leading-relaxed space-y-6">
          <p>
            Welcome to LUMIÈRE Professional. These terms and conditions outline the rules and regulations for the use of our website and the purchase of our products.
          </p>
          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use LUMIÈRE Professional if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          
          <h2 className="font-serif text-2xl text-brand-charcoal pt-4 font-normal">1. Professional Use Only</h2>
          <p>
            LUMIÈRE products are formulated and intended strictly for professional salon use by trained and licensed estheticians or cosmetologists. By purchasing these products, you acknowledge that you are a qualified professional or are purchasing on behalf of a registered salon entity. We are not liable for any misuse of products by untrained individuals.
          </p>

          <h2 className="font-serif text-2xl text-brand-charcoal pt-4 font-normal">2. Pricing and Payments</h2>
          <p>
            All prices are subject to change without notice. Prices listed do not include applicable taxes or shipping charges, which will be calculated at checkout. Payments are securely processed via verified third-party gateways (e.g., UPI, Credit/Debit cards). Orders will only be dispatched upon successful payment confirmation.
          </p>

          <h2 className="font-serif text-2xl text-brand-charcoal pt-4 font-normal">3. Returns and Refunds</h2>
          <p>
            Due to the hygienic nature of our products, we do not accept returns on opened or used wax, gels, or oils. Unopened products in their original packaging may be returned within 7 days of delivery for a full refund or exchange, subject to a restocking fee. Please contact our support team to initiate a return.
          </p>

          <h2 className="font-serif text-2xl text-brand-charcoal pt-4 font-normal">4. Limitation of Liability</h2>
          <p>
            In no event shall LUMIÈRE Professional, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website or our products.
          </p>

          <h2 className="font-serif text-2xl text-brand-charcoal pt-4 font-normal">5. Governing Law</h2>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
          </p>
        </div>
      </div>
    </div>
  );
}
