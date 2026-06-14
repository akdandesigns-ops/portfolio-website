"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";
import MagneticButton from "./MagneticButton";

const projects = [
  {
    title: "LICET 15",
    type: "Visual Identity",
    image: "/works/licet-15/licet -15 - t-shirt-mockup.jpg",
    href: "/works/licet-15",
    hoverColor: "group-hover:text-[#0AE448]" // Green
  },
  {
    title: "SANS BADMINTON",
    type: "Logo Design",
    image: "/works/sans-badminton/sans-09.png",
    href: "/works/sans-badminton",
    hoverColor: "group-hover:text-[#FFA6FA]" // Pink
  },
  {
    title: "SOLSTICE PICK",
    type: "Logo Design",
    image: "/works/solstice-pick/solstice pick - mockup 1.png",
    href: "/works/solstice-pick",
    hoverColor: "group-hover:text-[#FF8709]" // Orange
  },
  {
    title: "FOOTGRAPHY",
    type: "AI Product Photography",
    image: "/works/footgraphy/08.png",
    href: "/works/footgraphy",
    imageFit: "contain",
    hoverColor: "group-hover:text-[#00BAE2]" // Cyan
  },
];

export function HomeProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full flex justify-center py-20 px-6 md:px-12 max-w-[2000px] mx-auto z-10 relative bg-bg">
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
            <div
              key={project.title}
              className="project-card flex flex-col group w-full"
            >
              <Link href={project.href} className="w-full flex flex-col gap-6">
                <div className="w-full aspect-[4/3] md:aspect-[3/4] relative overflow-hidden" data-speed="0.95">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    priority={index <= 1}
                    quality={85}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <h2 className={`font-bebas text-4xl md:text-5xl uppercase tracking-wide transition-colors duration-300 text-text ${project.hoverColor}`}>
                    {project.title}
                  </h2>
                  <h3 className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.1em] text-muted">
                    {project.type}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center mt-12 md:mt-16">
          <MagneticButton>
            <Link 
              href="/works" 
              className="group px-10 py-5 brand-bg-gradient hover:brand-border-gradient border border-transparent transition-all duration-300 flex items-center justify-center min-w-[200px]"
            >
              <span className="font-mono text-sm uppercase tracking-widest text-bg group-hover:brand-text-gradient font-bold">
                View All Projects
              </span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
