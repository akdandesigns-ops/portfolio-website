"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

const projects = [
  {
    id: "01",
    name: "LICET 15",
    slug: "licet-15",
    category: "Visual Identity",
    year: "2025",
    image: "/works/licet-15/licet -15 - t-shirt-mockup.jpg",
    size: "featured", // full-width featured
  },
  {
    id: "02",
    name: "SANS",
    slug: "sans-badminton",
    category: "Logo Design",
    year: "2025",
    image: "/works/sans-badminton/sans-09.png",
    size: "half",
  },
  {
    id: "03",
    name: "Solestice Pick Branding",
    slug: "solstice-pick",
    category: "Logo Design",
    year: "2026",
    image: "/works/solstice-pick/solstice pick - mockup 1.png",
    size: "half",
  },
  {
    id: "04",
    name: "FOOTGRAPHY",
    slug: "footgraphy",
    category: "AI Product Photography",
    year: "2026",
    image: "/works/footgraphy/08.png",
    size: "featured",
    imageFit: "contain",
  },
];

export default function WorkIndex() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Group projects for the asymmetric layout
  const renderProjects = () => {
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < projects.length) {
      const p = projects[i];

      if (p.size === "featured") {
        // Full-width featured project
        elements.push(
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/works/${p.slug}`} className="group block">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "16/9" }}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
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
          </motion.div>
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
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/works/${proj.slug}`} className="group block">
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: "4/3" }}
                    onMouseEnter={() => setHoveredId(proj.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <Image
                      src={proj.image}
                      alt={proj.name}
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
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
              </motion.div>
            ))}
          </div>
        );
        i += 2;
      } else {
        // Wide single project (wider than half but not full)
        elements.push(
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:w-[65%]"
          >
            <Link href={`/works/${p.slug}`} className="group block">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "3/2" }}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
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
          </motion.div>
        );
        i++;
      }
    }

    return elements;
  };

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 mt-8">
      {/* Heading */}
      <AnimatedHeading
        text="WORKS"
        className="font-bebas text-5xl sm:text-7xl md:text-[120px] text-text leading-none tracking-wide"
      />

      {/* Asymmetric project grid — Airey style */}
      <div className="w-full flex flex-col gap-16 md:gap-24">
        {renderProjects()}
      </div>
    </div>
  );
}
