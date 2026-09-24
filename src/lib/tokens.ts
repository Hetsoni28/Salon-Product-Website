/**
 * LUMIÈRE Design System Tokens
 * Use these in Framer Motion variants, dynamic styles, and JS logic.
 * Keep in sync with src/app/globals.css @theme.
 */

export const colors = {
  brand: {
    gold: "#C8A882",
    goldLight: "#D9BFA0",
    goldDark: "#A8845E",
    goldSubtle: "#F5EDE3",
    dark: "#1A1A1A",
    charcoal: "#2D2D2D",
    warmGray: "#6B6B6B",
    muted: "#9C9C9C",
    border: "#E8E0D5",
    divider: "#F0E8DF",
    cream: "#FAF7F2",
    creamMid: "#F5EFE6",
    creamDark: "#EDE4D8",
    white: "#FFFFFF",
  },
  status: {
    success: "#3D7A5F",
    successLight: "#EBF5F0",
    warning: "#B8860B",
    warningLight: "#FFF8E6",
    error: "#C0392B",
    errorLight: "#FDEDEC",
    info: "#2471A3",
    infoLight: "#EBF5FB",
  },
} as const;

export const typography = {
  fontSerif: "var(--font-cormorant), Georgia, serif",
  fontSans: "var(--font-inter), system-ui, sans-serif",
  scale: {
    "2xs": "0.625rem",
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
  },
} as const;

export const spacing = {
  "0": "0",
  "1": "4px",
  "2": "8px",
  "3": "12px",
  "4": "16px",
  "5": "20px",
  "6": "24px",
  "8": "32px",
  "10": "40px",
  "12": "48px",
  "16": "64px",
  "20": "80px",
  "24": "96px",
} as const;

export const radius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  "3xl": "24px",
  "4xl": "32px",
  pill: "9999px",
} as const;

export const shadows = {
  xs: "0 1px 2px 0 rgba(26,15,6,0.05)",
  sm: "0 1px 3px 0 rgba(26,15,6,0.08)",
  DEFAULT: "0 4px 6px -1px rgba(26,15,6,0.08)",
  md: "0 8px 16px -2px rgba(26,15,6,0.10)",
  lg: "0 16px 32px -4px rgba(26,15,6,0.12)",
  xl: "0 24px 48px -6px rgba(26,15,6,0.14)",
  card: "0 2px 16px 0 rgba(44,28,14,0.08)",
  cardHover: "0 12px 40px 0 rgba(44,28,14,0.16)",
  gold: "0 4px 24px 0 rgba(200,168,130,0.30)",
} as const;

export const transitions = {
  fast: "150ms cubic-bezier(0.4,0,0.2,1)",
  base: "200ms cubic-bezier(0.4,0,0.2,1)",
  slow: "300ms cubic-bezier(0.4,0,0.2,1)",
  spring: "400ms cubic-bezier(0.34,1.56,0.64,1)",
  luxury: "500ms cubic-bezier(0.22,1,0.36,1)",
} as const;

export const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
} as const;

/** Reusable Framer Motion variants */
export const motionVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
  },
  slideRight: {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring" as const, damping: 26, stiffness: 220 },
    },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  },
} as const;

export type ColorToken = typeof colors;
export type SpacingToken = typeof spacing;
export type BreakpointToken = typeof breakpoints;
