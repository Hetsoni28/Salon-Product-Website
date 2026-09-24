import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { sanityConfig } from "@/sanity/config";

export default defineConfig({
  basePath: "/studio",          // Sanity Studio served at /studio
  ...sanityConfig,
  title: "Skincare CMS",
  plugins: [
    structureTool(),
    visionTool(),               // GROQ query playground
  ],
  schema: {
    types: [],                  // Add document types here as you build them
  },
});
