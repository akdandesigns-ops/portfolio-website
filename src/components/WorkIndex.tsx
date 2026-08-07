"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MediaItem from "./MediaItem";
import Link from "next/link";
import worksData from "@/data/works.json";
import AnimatedHeading from "@/components/AnimatedHeading";

interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  year: string;
  heroImage?: string;
  heroVideo?: string;
  size: "featured" | "half" | "wide" | string;
  imageFit?: "cover" | "contain";
}

export default function WorkIndex() {
  const projects = worksData as unknown as Project[];
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (projects.length === 0) return;
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
      });
    });
  }, { scope: containerRef, dependencies: [projects] });

  // Group projects for the asymmetric layout
  const renderProjects = () => {
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < projects.length) {
      const p = projects[i];

      if (p.size === "featured") {
        // Full-width featured project
        elements.push(
          <div
            key={p.id}
            className="project-card"
          >
            <Link href={`/works/${p.slug}`} className="group block">
              <div
                className="relative w-full overflow-hidden rounded-[12px]"
                style={{ aspectRatio: "16/9" }}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <MediaItem
                  src={p.heroVideo || p.heroImage || ""}
                  alt={p.name}
                  fill
                  className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${p.imageFit === 'contain' ? 'object-contain bg-surface/5 p-4 md:p-12' : 'object-cover'}`}
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <div className="mt-4 md:mt-6">
                <h3 className="font-sans font-medium text-[15px] md:text-[17px] text-text tracking-[0.01em]">
                  {p.name}
                </h3>
                <p className="font-sans font-light text-[13px] md:text-[15px] text-text/50 mt-1">
                  {p.category}
                </p>
              </div>
            </Link>
          </div>
        );
        i++;
      } else if (
        p.size === "half" &&
        i + 1 < projects.length &&
        projects[i + 1].size === "half"
      ) {
        // Two-column row
        const p2 = projects[i + 1];
        elements.push(
          <div key={`row-${p.id}`} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[p, p2].map((proj, idx) => (
              <div
                key={proj.id}
                className="project-card"
              >
                <Link href={`/works/${proj.slug}`} className="group block">
                  <div
                    className="relative w-full overflow-hidden rounded-[12px]"
                    style={{ aspectRatio: "4/3" }}
                    onMouseEnter={() => setHoveredId(proj.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <MediaItem
                      src={proj.heroVideo || proj.heroImage || ""}
                      alt={proj.name}
                      fill
                      className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${proj.imageFit === 'contain' ? 'object-contain bg-surface/5 p-4' : 'object-cover'}`}
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div className="mt-4 md:mt-6">
                    <h3 className="font-sans font-medium text-[15px] md:text-[17px] text-text tracking-[0.01em]">
                      {proj.name}
                    </h3>
                    <p className="font-sans font-light text-[13px] md:text-[15px] text-text/50 mt-1">
                      {proj.category}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        );
        i += 2;
      } else {
        // Wide single project (wider than half but not full)
        elements.push(
          <div
            key={p.id}
            className="md:w-[65%] project-card"
          >
            <Link href={`/works/${p.slug}`} className="group block">
              <div
                className="relative w-full overflow-hidden rounded-[12px]"
                style={{ aspectRatio: "3/2" }}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <MediaItem
                  src={p.heroVideo || p.heroImage || ""}
                  alt={p.name}
                  fill
                  className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${p.imageFit === 'contain' ? 'object-contain bg-surface/5 p-4' : 'object-cover'}`}
                  sizes="65vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <div className="mt-4 md:mt-6">
                <h3 className="font-sans font-medium text-[15px] md:text-[17px] text-text tracking-[0.01em]">
                  {p.name}
                </h3>
                <p className="font-sans font-light text-[13px] md:text-[15px] text-text/50 mt-1">
                  {p.category}
                </p>
              </div>
            </Link>
          </div>
        );
        i++;
      }
    }

    return elements;
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-16 md:gap-24 mt-8">
      {/* Heading */}
      <AnimatedHeading
        text="WORKS"
        className="font-bebas text-5xl sm:text-7xl md:text-[120px] text-text leading-none tracking-wide"
      />

      {/* Asymmetric project grid — Airey style */}
      <div className="w-full flex flex-col gap-16 md:gap-24">
        {projects.length === 0 ? (
          <div className="font-mono text-muted text-sm uppercase tracking-widest py-10">
            No works found.
          </div>
        ) : (
          renderProjects()
        )}
      </div>
    </div>
  );
}
