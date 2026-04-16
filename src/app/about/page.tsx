"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import AnimatedHeading from "@/components/AnimatedHeading";

const services = [
  { num: "01", name: "BRAND STRATEGY", desc: "Positioning, architecture, and narrative design." },
  { num: "02", name: "VISUAL IDENTITY", desc: "Logo systems, typography, color, and art direction." },
  { num: "03", name: "DIGITAL PLATFORMS", desc: "Immersive WebGL experiences and e-commerce." },
  { num: "04", name: "SPATIAL DESIGN", desc: "Exhibition, retail, and environmental branding." },
];

const clients = [
  { name: "LICET", color: "#FF3366" },
  { name: "SOLSTICE PICK", color: "#33CCFF" },
  { name: "TRIDEN D3D", color: "#FFCC00" },
  { name: "CHENNAI CONNECTS", color: "#00FF66" },
  { name: "WESAFE", color: "#2ECC71" },
];

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col bg-bg text-text pt-28 md:pt-40 px-4 sm:px-6 md:px-12 pb-24 md:pb-32 max-w-[2000px] mx-auto min-h-screen">
      
      {/* Opening Statement */}
      <div className="w-full mb-20 md:mb-32">
        <AnimatedHeading 
          text="I BUILD BRANDS THAT RESIST THE ORDINARY."
          className="font-bebas text-[clamp(48px,10vw,180px)] leading-[0.85] tracking-[0.02em] w-full"
        />
      </div>

      {/* Philosophy */}
      <div className="w-full flex justify-end mb-24 md:mb-40">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1 }}
          className="max-w-[720px] w-full flex flex-col gap-6 font-sans font-light text-[16px] md:text-[20px] leading-[1.7] text-text/80"
        >
          <p>
            I&apos;m Aswin Kumaaran, a self-taught brand identity designer based in Chennai, crafting visual identities that make businesses impossible to ignore.
          </p>
          <p>
            I got into design the hard way — no classroom, no shortcuts. Just curiosity, countless hours, and a genuine obsession with what makes a brand feel right. In the past two years, I&apos;ve worked with real clients across industries, helping them go from forgettable to unforgettable through logos, visual identities, and complete brand systems.
          </p>
          <p>
            My approach is simple: I don&apos;t have a one-size-fits-all style, because your brand shouldn&apos;t look like everyone else&apos;s. Every project starts with understanding your business, your audience, and what you&apos;re really trying to say — then building a visual identity that says it better than words ever could.
          </p>
          <p>
            If you&apos;re starting a new venture, rebranding, or just tired of looking like an amateur — let&apos;s fix that.
          </p>
        </motion.div>
      </div>

      {/* Services Strip */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="w-full mb-24 md:mb-40"
      >
        <div className="border-t border-b border-border py-12 flex flex-col md:flex-row gap-12 md:gap-6 justify-between overflow-x-auto hide-scrollbar">
          {services.map((service) => (
            <div key={service.num} className="flex flex-col gap-4 min-w-[280px]">
              <span className="font-mono text-[13px] text-accent tracking-widest">{service.num}</span>
              <h3 className="font-bebas text-4xl uppercase">{service.name}</h3>
              <p className="font-sans font-light text-[15px] text-text/60 max-w-[240px]">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Clients Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full mb-24 md:mb-32"
      >
        <h3 className="font-mono text-[11px] text-muted tracking-[0.2em] uppercase mb-12">Our clients</h3>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 items-center opacity-80">
          {clients.map((client) => (
            <MagneticButton key={client.name}>
              <div 
                className="font-bebas text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer text-center"
                style={{ WebkitTextStroke: "1px var(--text)", color: "transparent" } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = client.color;
                  (e.currentTarget.style as any).WebkitTextStroke = `1px ${client.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "transparent";
                  (e.currentTarget.style as any).WebkitTextStroke = "1px var(--text)";
                }}
              >
                {client.name}
              </div>
            </MagneticButton>
          ))}
        </div>
      </motion.div>

      {/* Founder Grid (Minimal) */}
      <div className="w-full">
        <h3 className="font-mono text-[11px] text-muted tracking-[0.2em] uppercase mb-12">FOUNDER & DIRECTOR</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-2">
            <h4 className="font-bebas text-3xl uppercase">ASWIN KUMAARAN</h4>
            <span className="font-mono text-[11px] text-accent tracking-[0.1em]">Principal Designer</span>
            <p className="font-sans font-light text-[15px] text-text/60 max-w-[400px] mt-4">
              Self-taught brand identity designer with an obsession for clarity, precision, and making brands impossible to ignore.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
