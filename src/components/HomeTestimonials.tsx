"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";

const testimonials = [
  {
    quote: "When we got the opportunity to exhibit in the global startup summit, we didn't have second thoughts on who should design our banners for our stall. AK Dan's studio is filled with talents that are eager to exploit and make a difference in the field of graphic and brand design and I'm very much thankful to Aswin for his professional guidance and designs for our banner.",
    name: "Harish A V",
    title: "Founder of Tridendt d3d",
    color: "from-[#0AE448] via-[#10b981] to-[#047857]",
    iconColor: "#0AE448"
  },
  {
    quote: "Great, Thanks a lot for all your support, guidance and good co-ordination with regards to website project start to end phases. Appreciate your all-hard work and effort!!!",
    name: "Manoj Kumar",
    title: "Founder of Tarak Food Products",
    color: "from-[#FFA6FA] via-[#db2777] to-[#9d174d]",
    iconColor: "#FFA6FA"
  },
  {
    quote: "The logo is thoughtfully designed for the college without being a generic celebration logo. Great thinking and excellent work!",
    name: "LICET",
    title: "Client",
    color: "from-[#FF8709] via-[#ea580c] to-[#9a3412]",
    iconColor: "#FF8709"
  }
];

export function HomeTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial fade in for all cards
    gsap.from(".testimonial-card-wrapper", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-24 md:py-32 flex flex-col px-4 sm:px-6 md:px-12 max-w-[2000px] mx-auto border-t border-border">
      <div className="w-full flex flex-col items-center text-center mb-24 gap-6">
        <h2 className="font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase text-muted">
          Client Testimonials
        </h2>
        <AnimatedHeading 
          text="WORDS FROM OUR PARTNERS."
          className="font-bebas text-5xl md:text-7xl uppercase max-w-[800px] text-center"
        />
      </div>

      <div className="w-full flex flex-col gap-[10vh] md:gap-[20vh] pb-[20vh] relative">
        {testimonials.map((t, i) => (
          <div 
            key={`testimonial-card-v2-${i}`} 
            className={`testimonial-card-wrapper sticky w-full flex justify-center mx-auto`}
            style={{ 
              top: `calc(15vh + ${i * 30}px)`,
              zIndex: i + 10 
            }}
          >
            <div className={`relative w-full max-w-[800px] min-h-[450px] md:min-h-[500px] flex flex-col justify-center rounded-[2.5rem] p-8 md:p-16 overflow-hidden shadow-2xl group`}>
              {/* Base Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${t.color} pointer-events-none`} />
              
              {/* Noise Texture */}
              <div 
                className="absolute inset-0 opacity-[0.35] pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center gap-8 md:gap-12">
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-full bg-[#0e100f] flex items-center justify-center mb-2 shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11L8 15H11V19H5V15L7 11H5V7H11V11H10ZM21 11L19 15H22V19H16V15L18 11H16V7H22V11H21Z" fill={t.iconColor}/>
                  </svg>
                </div>

                <p className="font-sans font-medium text-[16px] md:text-[20px] leading-[1.6] text-[#0e100f] italic">
                  "{t.quote}"
                </p>

                <div className="flex flex-col items-center gap-1 mt-2">
                  <h4 className="font-bebas text-2xl uppercase tracking-wider text-[#0e100f]">{t.name}</h4>
                  <p className="font-mono text-[10px] tracking-widest text-[#0e100f]/80 uppercase font-bold">
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
