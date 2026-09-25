'use client';

import { useState } from 'react';
import { loginAdmin } from './actions';
import { ArrowRight, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        {/* Subtle decorative background for mobile */}
        <div className="absolute inset-0 bg-brand-cream/30 lg:hidden" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12">
            <h2 className="text-3xl font-serif text-brand-gold tracking-widest text-center">LUMIÈRE</h2>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">Welcome back</h1>
            <p className="text-gray-500 font-light text-lg">
              Please enter your master password to access the LUMIÈRE command center.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative group mb-8">
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder=" "
                className="block w-full px-0 py-4 text-lg text-brand-dark bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-brand-gold peer transition-colors"
              />
              <label
                htmlFor="password"
                className="absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-gold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center gap-2"
              >
                <Lock size={16} /> Master Password
              </label>
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-xs font-bold uppercase tracking-widest mb-6"
              >
                {error}
              </motion.p>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className="group relative w-full flex justify-between items-center py-5 px-8 text-sm font-bold tracking-widest uppercase text-white bg-brand-charcoal hover:bg-black focus:outline-none transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              {/* Button hover effect layer */}
              <div className="absolute inset-0 w-0 bg-brand-gold transition-all duration-500 ease-out group-hover:w-full" />
              
              <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-charcoal">
                {loading ? 'Authenticating...' : 'Access Dashboard'}
              </span>
              
              {!loading && (
                <ArrowRight size={20} className="relative z-10 transform group-hover:translate-x-1 transition-all duration-500 group-hover:text-brand-charcoal" />
              )}
            </button>
          </form>

          <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 uppercase tracking-widest font-semibold">
            <span>Secure Admin Portal</span>
            <span>v2.0</span>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Brand Imagery (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-brand-charcoal relative items-center justify-center overflow-hidden">
        {/* Luxury Texture Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay scale-105 transition-transform duration-[20s] hover:scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop')" }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/80 to-transparent" />
        
        {/* Animated Brand Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-12"
        >
          <div className="w-16 h-16 border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <div className="absolute inset-0 border border-brand-gold rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-20" />
            <div className="w-2 h-2 bg-brand-gold rounded-full" />
          </div>
          <h2 className="text-6xl font-serif text-brand-gold mb-6 tracking-widest">LUMIÈRE</h2>
          <p className="text-white/60 font-light tracking-[0.2em] uppercase text-xs leading-loose max-w-sm mx-auto">
            Professional Salon Supplies
            <br />
            Internal Management System
          </p>
        </motion.div>
      </div>
    </div>
  );
}
