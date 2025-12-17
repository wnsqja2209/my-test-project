import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://simte.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/search?"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
