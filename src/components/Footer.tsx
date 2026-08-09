"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import MagneticButton from "./MagneticButton";
import { GravityGraphic } from "./GravityGraphic";
import TextLoop from "./TextLoop";
import ParticleText from "./ParticleText";

const Ballpit = dynamic(() => import("./Ballpit"), { ssr: false });

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";
  return (
    <footer className="w-full bg-bg border-t border-border mt-auto relative overflow-hidden flex flex-col">
      <div className="w-full mt-10 md:mt-16 relative z-10 block">
        <TextLoop 
          text="DESIGN IS EVERYWHERE" 
          separator="✦" 
          color="#ffffff" 
          ribbonColor="#22c55e" 
          ribbon={true} 
          shape="wave" 
          pauseOnHover={false}
        />
      </div>

      <div className="max-w-[2000px] mx-auto px-6 md:px-12 pt-12 pb-32 md:pb-64 flex flex-col items-center md:items-start relative z-10 pointer-events-none">
        
        <div className="flex flex-col md:flex-row w-full justify-between items-center mb-12 gap-8">
          <div className="font-bebas text-[28px] tracking-[0.05em] text-text">
            AK DAN DESIGNS
          </div>
          
          <nav className="flex flex-wrap justify-center gap-4 md:gap-12 text-center pointer-events-auto">
            {["HOME", "WORKS", "BLOGS", "ABOUT", "SERVICES", "BOOK A CALL"].map((label) => {
              const href = label === "HOME" ? "/" : label === "BOOK A CALL" ? "/contact" : `/${label.toLowerCase()}`;
              return (
                <MagneticButton key={label}>
                  <Link
                    href={href}
                    className="font-mono text-[13px] uppercase tracking-[0.12em] text-text hover:brand-text-gradient transition-colors"
                  >
                    {label}
                  </Link>
                </MagneticButton>
              );
            })}
          </nav>
          
          <div className="flex gap-6 items-center pointer-events-auto">
            <MagneticButton>
              <a
                href="https://www.instagram.com/the_akdan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-text hover:text-muted hover:scale-110 transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://www.linkedin.com/in/aswin-kumaaran-26as04/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BVcVlpZI6RPOBsCH5QFn2wA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text hover:text-muted hover:scale-110 transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-6 md:gap-12 mb-10 text-text/80 pointer-events-auto">
          <MagneticButton>
            <a 
              href="mailto:design@akdandesigns.in" 
              className="flex items-center gap-3 hover:text-accent transition-colors duration-300 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail group-hover:scale-110 transition-transform duration-300">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span className="font-mono text-[13px] tracking-widest uppercase">design@akdandesigns.in</span>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a 
              href="tel:+918754172676" 
              className="flex items-center gap-3 hover:text-accent transition-colors duration-300 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone group-hover:scale-110 transition-transform duration-300">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="font-mono text-[13px] tracking-widest uppercase">+91 8754172676</span>
            </a>
          </MagneticButton>
        </div>

        <div className="w-full text-center border-t border-border/50 pt-8">
          <span className="font-mono text-[12px] text-muted tracking-widest uppercase">
            © {new Date().getFullYear()} AK DAN DESIGNS. All rights reserved.
          </span>
        </div>

      </div>

      {/* Particle Text Background (Half visible at bottom) */}
      <div className="absolute bottom-0 translate-y-[30%] md:translate-y-[35%] left-0 w-full h-[300px] md:h-[600px] z-0 flex items-center justify-center pointer-events-none opacity-80 overflow-hidden">
        <div className="w-full h-full font-bebas pointer-events-auto flex items-center justify-center">
          <ParticleText
            style={{}}
            text="AK DAN DESIGNS"
            particleSize={4}
            density={8}
            color="#0AE448"
            highlightColor="#0AE448"
            scatter={190}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={42}
            repelRadius={120}
            idleDrift={0.5}
            trigger="mount"
            fontSize="clamp(5rem, 20vw, 40rem)"
            fontWeight={400}
            fontFamily="inherit"
            glow={false}
          />
        </div>
      </div>
    </footer>
  );
}
