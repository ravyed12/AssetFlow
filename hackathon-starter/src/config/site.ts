import { DEFAULT_METADATA } from "@/constants";


export const siteConfig = {
  name: "Hackathon Starter",
  description:
    "A reusable Next.js starter kit for hackathons built with Next.js, TypeScript and Tailwind CSS.",
  url: "http://localhost:3000",

  ogImage: "/og-image.png",

  creator: "Your Team",

  keywords: [
    "Next.js",
    "Hackathon",
    "Starter",
    "React",
    "TypeScript",
    "Tailwind CSS",
  ],
} as const;