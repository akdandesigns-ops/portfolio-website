import { Metadata } from "next";
import blogsData from "@/data/blogs.json";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogsData.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  // Use the first paragraph as description, truncated to ~160 chars
  const description = post.paragraphs[0]
    ? post.paragraphs[0].substring(0, 160) + (post.paragraphs[0].length > 160 ? "..." : "")
    : "Read this article on akdandesigns journal.";

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: `${post.title} | akdandesigns Journal`,
      description: description,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | akdandesigns Journal`,
      description: description,
      images: [post.image],
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
