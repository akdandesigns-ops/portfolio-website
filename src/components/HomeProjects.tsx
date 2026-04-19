"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "./AnimatedHeading";

const projects = [
  {
    title: "LICET 15",
    type: "Visual Identity",
    image: "/works/licet-15/licet -15 - t-shirt-mockup.jpg",
    href: "/works/licet-15",
  },
  {
    title: "SANS BADMINTON",
    type: "Logo Design",
    image: "/works/sans-badminton/sans-09.png",
    href: "/works/sans-badminton",
  },
  {
    title: "SOLSTICE PICK",
    type: "Logo Design",
    image: "/works/solstice-pick/solstice pick - mockup 1.png",
    href: "/works/solstice-pick",
  },
  {
    title: "FOOTGRAPHY",
    type: "AI Product Photography",
    image: "/works/footgraphy/08.png",
    href: "/works/footgraphy",
    imageFit: "contain",
  },
];

export function HomeProjects() {
  return (
    <section className="w-full flex justify-center py-20 px-6 md:px-12 max-w-[2000px] mx-auto z-10 relative bg-bg">
      <div className="w-full flex flex-col gap-32">
        {/* Section Heading */}
        <div className="w-full border-b border-border pb-8">
          <AnimatedHeading 
            text="SELECTED WORKS" 
            className="font-bebas text-5xl md:text-7xl tracking-wide uppercase"
          />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex flex-col group w-full"
            >
              <Link href={project.href} className="w-full flex flex-col gap-6">
                <div className="w-full aspect-[4/3] md:aspect-[3/4] relative overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <h2 className="font-bebas text-4xl md:text-5xl uppercase tracking-wide group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  <h3 className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.1em] text-muted">
                    {project.type}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
