/**
 * Reusable project-wide constants
 */

export const APP_NAME = "Hackathon Starter";

export const DEFAULT_METADATA = {
  title: APP_NAME,
  description: "A high-performance reusable starter kit built for rapid prototyping.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  maxLimit: 100,
};

export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
