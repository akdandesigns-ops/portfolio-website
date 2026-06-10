"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lora } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "@/components/AnimatedHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });

export default function WrittenByRiversPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Fade up text paragraphs
    gsap.utils.toArray(".fade-up").forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });

    // Reveal images with a slight scale
    gsap.utils.toArray(".reveal-img").forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        y: 40,
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    });
  }, { scope: containerRef });

  return (
    <article ref={containerRef} className={`bg-white text-black min-h-screen selection:bg-[#1A3A2A] selection:text-white ${lora.className}`}>
      
      {/* SECTION 1 — HERO BLOCK */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-end overflow-hidden pt-[64px]">
        <div className="absolute inset-0 z-0 reveal-img">
          <Image 
            src="/blogs/written-by-rivers/hero-aerial.png"
            alt="Aerial satellite photograph of the Amazon River basin"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 w-full p-8 md:p-16 lg:p-24 pb-8 md:pb-16 flex flex-col gap-4 text-white">
          <span className="font-mono text-xs tracking-[0.2em] uppercase font-light fade-up">
            BRANDING · APRIL 2026
          </span>
          <AnimatedHeading 
            text="Written by Rivers"
            className="font-bebas text-6xl md:text-[80px] lg:text-[100px] leading-[0.9] tracking-wide m-0"
          />
          <p className="font-sans text-xl md:text-[22px] max-w-[800px] font-light leading-relaxed mt-2 opacity-90 fade-up">
            The Brazilian Amazon has its first brand identity — and its letters were drawn from the land itself.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto w-full">

        {/* SECTION 2 — OPENING BODY */}
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row gap-16 md:gap-24 justify-between">
          <div className="w-full md:w-[65%] text-[17px] md:text-[19px] leading-[1.8] text-[#111] fade-up">
            <p>
              When FutureBrand São Paulo was tasked by Embratur and RAI to design an official brand mark for the Brazilian Legal Amazon, the challenge was monumental. How do you condense an ecosystem of unimaginable scale, profound cultural density, and critical global importance into a single graphic expression? The answer wasn't found in a sketchbook, but in the satellite topography of the basin itself.
            </p>
          </div>
          
          <div className="w-full md:w-[35%] font-mono text-[13px] uppercase tracking-tight text-[#333] fade-up">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-500">Studio</span>
              <span className="text-right">FutureBrand São Paulo</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-500">Client</span>
              <span className="text-right">RAI + Embratur</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-500">Year</span>
              <span className="text-right">2026</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-500">Region</span>
              <span className="text-right">Brazilian Legal Amazon</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-500">Website</span>
              <span className="text-right">visiteamazonia.com.br</span>
            </div>
          </div>
        </section>

        {/* SECTION 3 — IMAGE BREAK */}
        <section className="w-full px-6 md:px-12 lg:px-24 pb-24 md:pb-32 reveal-img">
          <div className="w-full relative aspect-[21/9] bg-gray-50 overflow-hidden">
            <Image 
              src="/blogs/written-by-rivers/logo.png"
              alt="The official Amazon brand identity logo"
              fill
              className="object-contain p-12"
            />
          </div>
          <p className="text-[12px] font-sans text-gray-400 mt-4 text-left">
            Each letter of the wordmark is derived from a real waterway in one of the nine states of the Brazilian Legal Amazon. Credit: RAI / Embratur / FutureBrand São Paulo
          </p>
        </section>

        {/* SECTION 4 — BODY CONTINUES */}
        <section className="max-w-[780px] mx-auto px-6 w-full pb-20 md:pb-24">
          <div className="mb-6 fade-up">
            <span className="font-mono text-[12px] uppercase text-[#1A3A2A] font-semibold tracking-[0.15em]">
              THE IDEA
            </span>
          </div>
          <div className="flex flex-col gap-8 text-[17px] md:text-[19px] leading-[1.8] text-[#111]">
            <p className="fade-up">
              The creative directive was rooted in authenticity—a rejection of the typical palm fronds and stylized wildlife motifs that plague tourism branding. The team at FutureBrand mapped out the nine states comprising the Legal Amazon (Acre, Amapá, Amazonas, Pará, Rondônia, Roraima, Tocantins, Mato Grosso, and Maranhão). They realized that the true connective tissue of the region was its water.
            </p>
            <p className="fade-up">
              By utilizing advanced satellite imagery, designers isolated specific curves, oxbows, and meandering paths of massive rivers. These geographical coordinates were then meticulously traced to form typographic characters. The result is a bespoke, cursive wordmark where the Earth itself is the typographer.
            </p>
          </div>
        </section>

        {/* SECTION 5 — PULL QUOTE */}
        <section className="w-full bg-white py-16 md:py-24 my-8 md:my-16 border-y-2 border-[#1A3A2A] overflow-hidden">
          <div className="max-w-[1000px] mx-auto px-6 text-center">
            <AnimatedHeading 
              text="&quot;Not designed. Discovered.&quot;"
              className="text-3xl md:text-[40px] font-light italic text-[#111] leading-tight mb-8"
            />
            <div className="fade-up">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#666]">
                — FutureBrand São Paulo, 2026
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 6 — IMAGE GRID */}
        <section className="px-6 md:px-12 lg:px-24 py-20 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="reveal-img">
            <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden mb-4">
              <Image 
                src="/blogs/written-by-rivers/letter-extraction.png"
                alt="Individual letter extraction showing a river bend"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[12px] font-sans text-gray-500">
              The 'A' in the wordmark aligned precisely with the curvature of the Juruá River.
            </p>
          </div>
          <div className="reveal-img">
            <div className="relative aspect-[4/5] bg-[#1A3A2A]/5 overflow-hidden mb-4">
              <Image 
                src="/blogs/written-by-rivers/seal.png"
                alt="Feito de Amazônia seal applied to product"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[12px] font-sans text-gray-500">
              The 'Feito de Amazônia' sub-brand guarantees sustainable, local origin for artisanal products.
            </p>
          </div>
        </section>

        {/* SECTION 7 — BODY CONTINUES */}
        <section className="max-w-[780px] mx-auto px-6 w-full py-16 md:py-24 flex flex-col gap-8 text-[17px] md:text-[19px] leading-[1.8] text-[#111]">
          <div className="mb-2 fade-up">
            <span className="font-mono text-[12px] uppercase text-[#1A3A2A] font-semibold tracking-[0.15em]">
              A LIVING BRAND
            </span>
          </div>
          <p className="fade-up">
            The project extends beyond digital applications. The identity system introduces the "Feito de Amazônia" (Made in the Amazon) seal, designed to certify and uplift local artisanal goods, bio-cosmetics, and sustainable culinary products. This transforms the visual identity from a mere tourism campaign into an economic catalyst, securing value directly for the region's indigenous and local populations.
          </p>
          <p className="fade-up">
            When branding relies not on arbitrary stylistic choices, but on undeniable physical truths of the land, it transcends marketing. It becomes a document. An artifact. The "Amazônia" identity is successful exactly because it refuses to invent a story; instead, it provides a frame for the landscape to speak for itself.
          </p>
        </section>

        {/* SECTION 8 — CLOSING IMAGE */}
        <section className="w-full relative h-[60vh] md:h-[80vh] min-h-[500px] mt-12 mb-24 overflow-hidden reveal-img">
          <Image 
            src="/blogs/written-by-rivers/community.png"
            alt="Local community photograph in the Amazon rainforest"
            fill
            className="object-cover"
          />
        </section>

        {/* SECTION 9 — CLOSING TEXT + CTA */}
        <section className="max-w-[780px] mx-auto px-6 w-full pb-32">
          <p className="font-sans font-bold text-[20px] md:text-[22px] text-black mb-8 leading-snug fade-up">
            The best brands don't tell you what to feel about a place. They make you feel it.
          </p>
          <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#333] mb-12 fade-up">
            Through geographical alignment, conceptual purity, and profound restraint, FutureBrand has delivered an identity that matches the magnitude of its subject. By listening to the rivers, they've ensured the world will hear the Amazon.
          </p>
          <div className="fade-up">
            <Link 
              href="https://visiteamazonia.com.br" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[14px] text-[#1A3A2A] hover:text-black transition-colors"
            >
              <span className="border-b border-[#1A3A2A] pb-1 hover:border-black uppercase tracking-wider">
                {`->`} Explore the identity at visiteamazonia.com.br
              </span>
            </Link>
          </div>
        </section>

        {/* FOOTER BLOCK */}
        <footer className="w-full border-t border-gray-200 py-12 px-6 md:px-12 lg:px-24 mb-32 fade-up">
          <div className="flex flex-wrap gap-4 font-mono text-[12px] text-gray-500 uppercase tracking-widest">
            <span>BRANDING</span>
            <span>·</span>
            <span>TYPOGRAPHY</span>
            <span>·</span>
            <span>PLACE IDENTITY</span>
            <span>·</span>
            <span>LATIN AMERICA</span>
            <span>·</span>
            <span>2026</span>
          </div>
        </footer>

      </div>
    </article>
  );
}
