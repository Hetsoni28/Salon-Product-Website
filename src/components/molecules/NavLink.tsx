'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  exact?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children, className = '', exact = false }) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} className={`relative block px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-brand-gold' : 'text-gray-600 hover:text-gray-900'} ${className}`}>
      {children}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

export default NavLink;
