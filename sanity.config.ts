import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { sanityConfig } from "@/sanity/config";
import { schema } from "@/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio", // Sanity Studio served at /studio
  ...sanityConfig,
  title: "Skincare CMS",
  plugins: [
    structureTool(),
    visionTool(), // GROQ query playground
  ],
  schema: {
    types: schema.types,
  },
});
