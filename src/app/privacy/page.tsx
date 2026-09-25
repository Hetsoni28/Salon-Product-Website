import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LUMIÈRE",
  description: "Privacy Policy for LUMIÈRE Professional Salon Products.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-24 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brand-divider">
        <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-10">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-brand max-w-none text-gray-600 font-light leading-relaxed space-y-6">
          <p>
            At LUMIÈRE Professional (&quot;we&quot;, &quot;our&quot;, or
            &quot;us&quot;), we respect your privacy and are committed to
            protecting your personal data. This privacy policy will inform you
            as to how we look after your personal data when you visit our
            website and tell you about your privacy rights.
          </p>

          <h2 className="font-serif text-2xl text-brand-charcoal pt-4 font-normal">
            1. Information We Collect
          </h2>
          <p>
            We may collect, use, store and transfer different kinds of personal
            data about you, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Identity Data</strong> includes first name, last name, and
              salon name.
            </li>
            <li>
              <strong>Contact Data</strong> includes billing address, delivery
              address, email address, and telephone numbers.
            </li>
            <li>
              <strong>Transaction Data</strong> includes details about payments
              to and from you and other details of products you have purchased
              from us.
            </li>
            <li>
              <strong>Technical Data</strong> includes internet protocol (IP)
              address, browser type and version, time zone setting, and
              operating system.
            </li>
          </ul>

          <h2 className="font-serif text-2xl text-brand-charcoal pt-4 font-normal">
            2. How We Use Your Data
          </h2>
          <p>
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data in the following
            circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Where we need to perform the contract we are about to enter into
              or have entered into with you (e.g., fulfilling your order).
            </li>
            <li>
              Where it is necessary for our legitimate interests (or those of a
              third party) and your interests and fundamental rights do not
              override those interests.
            </li>
            <li>
              Where we need to comply with a legal or regulatory obligation.
            </li>
          </ul>

          <h2 className="font-serif text-2xl text-brand-charcoal pt-4 font-normal">
            3. Data Security
          </h2>
          <p>
            We have put in place appropriate security measures to prevent your
            personal data from being accidentally lost, used, or accessed in an
            unauthorized way, altered, or disclosed. In addition, we limit
            access to your personal data to those employees, agents,
            contractors, and other third parties who have a business need to
            know.
          </p>

          <h2 className="font-serif text-2xl text-brand-charcoal pt-4 font-normal">
            4. Contact Us
          </h2>
          <p>
            If you have any questions about this privacy policy or our privacy
            practices, please contact us at{" "}
            <strong>info@lumieresalons.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
