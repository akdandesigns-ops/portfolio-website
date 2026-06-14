"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import MagneticButton from "@/components/MagneticButton";
import AnimatedHeading from "@/components/AnimatedHeading";
import { FinalCTA } from "@/components/FinalCTA";

import aboutData from "@/data/about.json";

interface Service {
  num: string;
  name: string;
  desc: string;
}

interface Client {
  name: string;
  color: string;
}

interface AboutData {
  profileImage: string;
  philosophyParagraphs: string[];
  services: Service[];
  clients: Client[];
}

export default function AboutPage() {
  const data = aboutData as AboutData;
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".fade-in").forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
    });
  }, { scope: containerRef, dependencies: [data] });

  if (!data) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-bg text-text pt-40">
        <div className="font-mono text-muted text-sm uppercase tracking-widest">
          Failed to load content.
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full flex flex-col bg-bg text-text pt-28 md:pt-40 px-4 sm:px-6 md:px-12 pb-24 md:pb-32 max-w-[2000px] mx-auto min-h-screen">
      
      {/* Opening Statement */}
      <div className="w-full mb-20 md:mb-32">
        <AnimatedHeading 
          text="I BUILD BRANDS THAT RESIST THE ORDINARY."
          className="font-bebas text-[clamp(48px,10vw,180px)] leading-[0.85] tracking-[0.02em] w-full"
        />
      </div>

      {/* Philosophy */}
      <div className="w-full flex flex-col md:flex-row justify-between mb-24 md:mb-40 gap-12 md:gap-8 items-center md:items-start">
        <div className="fade-in w-full sm:w-[80%] md:w-[40%] flex flex-col gap-6">
          <div className="w-full aspect-[3/4] relative overflow-hidden bg-surface">
            <Image 
              src={data.profileImage || "/profile.jpg"} 
              alt="Aswin Kumaaran" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          
          <div className="flex flex-col gap-2 mt-4">
            <h3 className="font-mono text-[11px] text-muted tracking-[0.2em] uppercase mb-2">FOUNDER & DIRECTOR</h3>
            <h4 className="font-bebas text-3xl uppercase">ASWIN KUMAARAN</h4>
            <span className="font-mono text-[11px] brand-text-gradient tracking-[0.1em]">Brand Identity Designer</span>
            <p className="font-sans font-light text-[15px] text-text/60 max-w-[400px] mt-2">
              Self-taught brand identity designer with an obsession for clarity, precision, and making brands impossible to ignore.
            </p>
          </div>
        </div>
        
        <div
          className="fade-in max-w-[720px] w-full md:w-[50%] flex flex-col gap-6 font-sans font-light text-[16px] md:text-[20px] leading-[1.7] text-text/80"
        >
          {data.philosophyParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Services Strip */}
      {data.services && data.services.length > 0 && (
        <div
          className="fade-in w-full mb-24 md:mb-40"
        >
          <div className="border-t border-b border-border py-12 flex flex-col md:flex-row gap-12 md:gap-6 justify-between overflow-x-auto hide-scrollbar">
            {data.services.map((service) => (
              <div key={service.num} className="flex flex-col gap-4 min-w-[280px]">
                <span className="font-mono text-[13px] brand-text-gradient tracking-widest">{service.num}</span>
                <h3 className="font-bebas text-4xl uppercase">{service.name}</h3>
                <p className="font-sans font-light text-[15px] text-text/60 max-w-[240px]">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clients Section */}
      {data.clients && data.clients.length > 0 && (
        <div
          className="fade-in w-full mb-24 md:mb-32"
        >
          <h3 className="font-mono text-[11px] text-muted tracking-[0.2em] uppercase mb-12">Our clients</h3>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 items-center opacity-80">
            {data.clients.map((client) => (
              <MagneticButton key={client.name}>
                  <div 
                  className="font-bebas text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase cursor-pointer text-center"
                  style={{ color: client.color }}
                >
                  {client.name}
                </div>
              </MagneticButton>
            ))}
          </div>
        </div>
      )}

      {/* What I bring to D2C brands */}
      <div className="fade-in w-full mb-24 md:mb-32">
        <div className="border-t border-border py-12 flex flex-col md:flex-row gap-12 md:gap-24">
          <h3 className="font-bebas text-4xl uppercase md:w-1/3">What I bring to D2C brands</h3>
          <ul className="flex flex-col gap-4 md:w-2/3">
            {[
              "Strategic brand thinking",
              "Clean and memorable identity systems",
              "Consumer-focused visual direction",
              "Packaging and social media awareness",
              "AI-assisted creative workflow",
              "Practical brand systems for launch and growth"
            ].map((point, i) => (
              <li key={i} className="flex items-center gap-4 py-3 border-b border-border/50">
                <div className="w-1.5 h-1.5 rounded-full brand-bg-gradient" />
                <span className="font-sans font-light text-[15px] md:text-[17px] text-text/90">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}
