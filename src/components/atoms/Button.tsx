"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

export interface ButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "size" | "children"
> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
      primary:
        "bg-brand-gold text-white hover:bg-brand-gold-dark shadow-[var(--shadow-gold)] rounded-md font-medium uppercase tracking-[0.06em]",
      secondary:
        "bg-brand-dark text-white hover:bg-neutral-700 rounded-md font-medium uppercase tracking-[0.06em]",
      outline:
        "border-[1.5px] border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white rounded-md font-medium uppercase tracking-[0.06em]",
      ghost:
        "bg-transparent text-brand-charcoal hover:bg-brand-cream-dark rounded-md font-medium",
      link: "bg-transparent underline-offset-4 hover:underline text-brand-gold p-0 font-medium",
    };

    const sizeStyles = {
      xs: "px-3 py-1.5 text-xs tracking-wide",
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm tracking-wide",
      lg: "px-8 py-3.5 text-base tracking-wide",
      xl: "px-10 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={disabled || isLoading ? undefined : { scale: 0.97 }}
        whileHover={disabled || isLoading ? undefined : { scale: 1.015 }}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          fullWidth && "w-full",
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {leftIcon}
            {children}
            {rightIcon}
          </span>
        )}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
export default Button;
