import { MetadataRoute } from "next";
import blogsData from "@/data/blogs.json";
import worksData from "@/data/works.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://akdandesigns.in";

  // Static routes
  const routes: MetadataRoute.Sitemap = ["", "/about", "/services", "/contact", "/blogs", "/works"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Blog routes from JSON
  blogsData.forEach((post: any) => {
    routes.push({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    });
  });

  // Dynamic Case Study routes from JSON
  worksData.forEach((project: any) => {
    routes.push({
      url: `${baseUrl}/works/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  });

  return routes;
}
