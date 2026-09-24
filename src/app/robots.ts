import { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/api/"], // Hide CMS and API routes from crawlers
    },
    sitemap: `${env.site.url}/sitemap.xml`,
  };
}
