"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  exact?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = "",
  exact = false,
}) => {
  const pathname = usePathname();
  const isActive =
    href === "/" || exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`relative block px-3 py-2 text-sm font-medium transition-colors ${isActive ? "text-brand-gold" : className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
