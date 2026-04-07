import { MetadataRoute } from "next";

export const runtime = "edge";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vresume.app/";

  const routes = ["es", "en"];

  const sitemap: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0
  }));

  return sitemap;
}
