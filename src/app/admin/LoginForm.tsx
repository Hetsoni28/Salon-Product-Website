'use client';

import { useState } from 'react';
import { loginAdmin } from './actions';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(formData);
    
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.refresh(); // Refresh to let the server component re-check the cookie
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-brand-divider max-w-md w-full relative overflow-hidden">
        
        {/* Decorative background elements */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-cream rounded-full mix-blend-multiply opacity-50" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-cream rounded-full mix-blend-multiply opacity-50" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-6 text-brand-gold">
            <Lock size={24} />
          </div>
          
          <h1 className="text-3xl font-serif text-brand-dark mb-2">Admin Access</h1>
          <p className="text-gray-500 text-sm mb-8 font-light">
            Enter your master password to view the LUMIÈRE dashboard.
          </p>
          
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter password..."
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-gold bg-gray-50 text-brand-dark transition-colors text-center font-medium placeholder:font-light"
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-xs font-semibold uppercase tracking-widest">{error}</p>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-charcoal text-white rounded-xl py-4 font-semibold tracking-widest text-xs uppercase hover:bg-black transition-colors disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
