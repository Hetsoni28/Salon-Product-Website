import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadCrumbItem {
  label: string;
  href?: string;
}

export interface BreadCrumbProps {
  items: BreadCrumbItem[];
  className?: string;
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-sm ${className}`}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {isLast || !item.href ? (
                <span className="font-medium text-[#C8A882]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight size={14} className="mx-2 text-gray-400" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
