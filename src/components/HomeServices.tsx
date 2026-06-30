"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";
import Link from "next/link";
import MagneticButton from "./MagneticButton";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

const services = [
  {
    title: "D2C Brand Identity",
    desc: "For consumer brands that need a complete identity system before entering or growing in the market.",
    image: "/images/service_branding.png",
    color: "#0AE448",
    includes: [
      "Logo system",
      "Color palette",
      "Typography system",
      "Visual language",
      "Brand guidelines",
      "Social media direction"
    ]
  },
  {
    title: "Packaging & Product Visual Direction",
    desc: "For FMCG, fashion, sports, and lifestyle brands that need their product to look premium and trustworthy.",
    image: "/images/service_packaging.png",
    color: "#FF8709",
    includes: [
      "Packaging visual direction",
      "Product presentation style",
      "Label / surface design direction",
      "Campaign image direction",
      "Shelf and marketplace visual thinking"
    ]
  },
  {
    title: "Landing Page & Digital Brand Presence",
    desc: "For D2C brands that need a clean digital presence to explain the product, build trust, and drive enquiries or sales.",
    image: "/images/service_digital.png",
    color: "#00BAE2",
    includes: [
      "Landing page structure",
      "UI direction",
      "Copy hierarchy",
      "Product-focused layout",
      "Responsive design",
      "Conversion-focused CTA placement"
    ]
  }
];

export function HomeServices() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full flex justify-center py-24 md:py-32 px-6 md:px-12 max-w-[2000px] mx-auto z-10 relative bg-bg overflow-visible">
      <div className="w-full flex flex-col gap-16 md:gap-24">
        
        <div className="w-full border-b border-border pb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <AnimatedHeading 
            text="Brand identity services for D2C growth." 
            className="font-bebas text-5xl md:text-7xl tracking-wide uppercase text-text max-w-4xl"
          />
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted max-w-[250px] md:text-right">
            Custom brand systems can be created based on product category, launch stage, and business goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {services.map((service, i) => (
            <CardContainer key={i} containerClassName="service-card w-full h-full max-w-[450px] mx-auto" className="inter-var w-full h-full">
              <CardBody 
                className="bg-surface relative group/card border-border hover:border-[color:var(--hover-color)] transition-colors duration-500 w-full aspect-square flex flex-col p-6 pb-16 border rounded-[12px]"
                style={{ '--hover-color': service.color } as React.CSSProperties}
              >

                <CardItem translateZ="30" className="flex flex-col gap-2.5">
                  <h3 className="font-bebas text-2xl md:text-3xl tracking-wide uppercase text-text line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="font-sans font-light text-[13px] leading-[1.5] text-text/70 line-clamp-2 md:line-clamp-3">
                    {service.desc}
                  </p>
                </CardItem>

                <CardItem translateZ="20" className="flex flex-col gap-2 mt-auto pt-4 border-t border-border/50">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-text">Includes:</span>
                  <ul className="flex flex-col gap-1.5">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="font-sans font-light text-[12px] text-muted flex items-start gap-3">
                        <span className="text-accent group-hover/card:text-[color:var(--hover-color)] transition-colors duration-500 mt-[4px] text-[9px]">✦</span>
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardItem>

                <CardItem translateZ="40" className="absolute bottom-6 right-6 bg-bg/80 backdrop-blur-md px-3 py-2 rounded-md">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text group-hover/card:text-[color:var(--hover-color)] transition-colors duration-500 group/btn"
                  >
                    Start Project <span className="text-lg leading-none transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Link>
                </CardItem>

              </CardBody>
            </CardContainer>
          ))}
        </div>

        <div className="w-full flex justify-center mt-4">
          <MagneticButton>
            <Link 
              href="/contact" 
              className="group px-10 py-5 brand-button transition-all duration-300 flex items-center justify-center min-w-[200px]"
            >
              <span className="font-mono text-sm uppercase tracking-widest font-bold">
                Start a Project
              </span>
            </Link>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
