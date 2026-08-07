import { Metadata } from "next";
import worksData from "@/data/works.json";

interface Props {
  params: { id: string };
}

const idToSlug: Record<string, string> = {
  "01": "licet-15",
  "02": "sans-badminton",
  "03": "solstice-pick",
  "04": "footgraphy",
  "05": "tarak-food",
  "06": "top-step-constructions",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const requestedId = params.id;
  const targetSlug = idToSlug[requestedId] || requestedId;
  const project = worksData.find(
    (p) => p.slug === targetSlug || p.id === requestedId
  );

  if (!project) {
    return {
      title: "Work Not Found",
    };
  }

  return {
    title: project.name,
    description: project.description.substring(0, 160),
    openGraph: {
      title: `${project.name} | akdandesigns`,
      description: project.description.substring(0, 160),
      images: [
        {
          url: project.heroImage || project.heroVideo || "",
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | akdandesigns`,
      description: project.description.substring(0, 160),
      images: [project.heroImage || project.heroVideo || ""],
    },
  };
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
