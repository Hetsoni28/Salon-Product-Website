import { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout | LUMIÈRE',
  description: 'Complete your professional salon supplies order.',
};

export default function CheckoutPage() {
  return (
    <div className="bg-brand-cream min-h-screen pt-24">
      <CheckoutClient />
    </div>
  );
}
