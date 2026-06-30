import { MetadataRoute } from "next";
import blogsData from "@/data/blogs.json";
import worksData from "@/data/works.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://akdandesigns.in";

  const staticRoutes: MetadataRoute.Sitemap = ["", "/about", "/services", "/contact", "/blogs", "/works"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogsData.map((post: any) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const workRoutes: MetadataRoute.Sitemap = worksData.map((project: any) => ({
    url: `${baseUrl}/works/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...workRoutes];
}
