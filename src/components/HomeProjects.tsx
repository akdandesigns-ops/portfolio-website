"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const slider = sliderRef.current;
      if (!slider) return;

      const getScrollAmount = () => {
        let sliderWidth = slider.scrollWidth;
        return -(sliderWidth - window.innerWidth);
      };

      const tween = gsap.to(slider, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${slider.scrollWidth}`, // Increased scroll distance to make it smoother and slower
        pin: true,
        animation: tween,
        scrub: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="w-full md:h-screen bg-bg relative z-10 flex flex-col md:block"
    >
      <div className="w-full overflow-hidden h-full relative">
        <div className="md:hidden w-full pt-20 px-6">
          <AnimatedHeading 
            text="SELECTED WORKS" 
            className="font-bebas text-5xl tracking-wide uppercase text-text"
          />
        </div>

        <div 
          ref={sliderRef} 
          className="flex flex-col md:flex-row h-full w-full md:w-max items-center px-6 md:px-[5vw] gap-12 md:gap-24 py-12 md:py-0"
        >
        {/* The title for desktop - becomes part of the horizontal scroll track */}
        <div className="hidden md:flex w-[40vw] shrink-0 flex-col justify-center">
          <AnimatedHeading 
            text="SELECTED" 
            className="font-bebas text-7xl md:text-8xl tracking-wide uppercase text-text leading-none"
          />
          <AnimatedHeading 
            text="WORKS" 
            className="font-bebas text-7xl md:text-8xl tracking-wide uppercase text-text leading-none ml-12"
          />
        </div>

        {projects.map((project, index) => (
          <Link 
            key={project.title}
            href={project.href} 
            className="group w-full md:w-[35vw] lg:w-[30vw] shrink-0 flex flex-col gap-6"
          >
            <div className="w-full aspect-square relative overflow-hidden rounded-[12px] bg-surface/50">
              <Image 
                src={project.image} 
                alt={project.title}
                fill
                priority={index <= 1}
                quality={85}
                className={`transition-transform duration-700 ease-out group-hover:scale-[1.05] grayscale hover:grayscale-0 ${project.imageFit === "contain" ? "object-contain p-8" : "object-cover"}`}
                sizes="(max-width: 768px) 100vw, 30vw"
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
        ))}

        {/* View All Button inside the slider track */}
        <div className="w-full md:w-[25vw] shrink-0 flex justify-center md:justify-start items-center pb-12 md:pb-0 pr-[5vw]">
          <MagneticButton>
            <Link 
              href="/works" 
              className="group px-10 py-5 brand-button transition-all duration-300 flex items-center justify-center min-w-[200px]"
            >
              <span className="font-mono text-sm uppercase tracking-widest font-bold">
                View All Projects
              </span>
            </Link>
          </MagneticButton>
        </div>
        </div>
      </div>
    </section>
  );
}
