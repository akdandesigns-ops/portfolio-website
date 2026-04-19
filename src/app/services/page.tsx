"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";
import MagneticButton from "@/components/MagneticButton";

const servicesList = [
  {
    title: "Brand Identity Design",
    description: "Architecting the foundational core of your brand, from strategy to complete identity systems that demand attention.",
  },
  {
    title: "Visual Identity Design",
    description: "Crafting precise, unforgettable visual languages including typography, color theory, and logo systems that defy gravity.",
  },
  {
    title: "Logo Design",
    description: "A focused package starting with an in-depth brand discovery session, followed by 2 unique design concept explorations — refined until your mark is unmistakable.",
  },
  {
    title: "AI Product Photography",
    description: "Cutting-edge artificial intelligence workflows to place your product in impossible, high-fidelity environments.",
  },
  {
    title: "Landing Page Design",
    description: "High-performance landing pages engineered for maximum conversion, blending stunning aesthetics with razor-sharp user experience.",
  },
  {
    title: "Branding",
    description: "End-to-end holistic branding that strips away the noise and leaves only pure, devastating clarity.",
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full flex flex-col bg-bg text-text pt-28 md:pt-40 px-4 sm:px-6 md:px-12 pb-24 md:pb-32 max-w-[2000px] mx-auto min-h-screen">
      
      {/* Header */}
      <div className="w-full mb-16 md:mb-32">
        <AnimatedHeading 
          text="OUR SERVICES"
          className="font-bebas text-[clamp(64px,10vw,180px)] leading-[0.85] tracking-[0.02em] w-full"
        />
        <p className="font-mono text-[13px] md:text-[15px] text-muted tracking-widest mt-8 uppercase max-w-[600px]">
          We strip away ornamentation until nothing is left but the absolute essence of your identity.
        </p>
      </div>

      {/* Services List */}
      <div className="w-full flex flex-col mb-40 border-t border-border">
        {servicesList.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="w-full flex flex-col md:flex-row gap-6 md:gap-12 py-12 md:py-20 border-b border-border items-start md:items-center justify-between group transition-colors px-6 rounded-sm hover:bg-surface"
          >
            <h2 className="font-bebas text-3xl sm:text-5xl md:text-7xl uppercase transition-colors w-full md:w-1/2 text-text [.light_&]:group-hover:text-[#888888] group-hover:text-accent">
              {service.title}
            </h2>
            <div className="flex flex-col gap-8 w-full md:w-1/2">
              <p className="font-sans font-light text-[15px] md:text-[18px] text-text/70 leading-[1.6]">
                {service.description}
              </p>
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="self-start group/quote">
                <MagneticButton>
                  <div className="font-mono text-[12px] uppercase text-accent tracking-[0.1em] border-b border-accent pb-1 flex items-center gap-2 transition-opacity hover:opacity-80">
                    <span>Get Your Free Quote</span>
                    <span className="group-hover/quote:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="w-full flex flex-col items-center justify-center text-center gap-12 py-20 bg-surface rounded-sm">
        <h3 className="font-bebas text-4xl sm:text-6xl md:text-8xl uppercase tracking-wide px-4">
          READY FOR CLARITY?
        </h3>
        <MagneticButton>
          <Link 
            href="/contact"
            className="px-12 py-6 bg-accent text-bg font-mono text-[14px] uppercase tracking-widest hover:bg-bg hover:text-accent hover:border-accent border border-transparent transition-all duration-300"
          >
            GET A FREE QUOTE
          </Link>
        </MagneticButton>
      </div>

    </div>
  );
}
