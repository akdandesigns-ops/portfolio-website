"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import worksData from "@/data/works.json";
import CaseStudyHero from "@/components/CaseStudyHero";
import AsymmetricGallery from "@/components/AsymmetricGallery";
import ScrollReveal from "@/components/ScrollReveal";

/* ─── Types ─── */
interface ColorSwatch {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  psychology: string;
}

interface TypographyInfo {
  fontFamily: string;
  fontName: string;
  cssClass: string;
  description?: string;
}

interface ProjectData {
  id: string;
  title?: string;
  name: string;
  slug: string;
  tagline: string;
  category: string;
  year: string;
  client: string;
  location: string;
  deliverable?: string;
  description: string;
  approach?: string;
  link?: string;
  heroImage?: string;
  heroVideo?: string;
  bannerImage?: string;
  hideBannerImage?: boolean;
  bannerBackgroundColor?: string;
  imageFit?: "cover" | "contain";
  useCuratedGallery?: boolean;
  gallery: { src: string; alt: string; span?: "full" | "half"; caption?: string; aspectRatio?: string }[];
  colors?: ColorSwatch[];
  typography?: TypographyInfo;
  nextSlug: string;
  nextTitle: string;
}

const idToSlug: Record<string, string> = {
  "01": "licet-15",
  "02": "sans-badminton",
  "03": "solstice-pick",
  "04": "footgraphy",
  "05": "tarak-food",
  "06": "top-step-constructions",
};

export default function CaseStudyPage() {
  const { id } = useParams();
  
  // Find project synchronously
  const requestedId = Array.isArray(id) ? id[0] : id;
  const targetSlug = idToSlug[requestedId] || requestedId;
  const project = (worksData as unknown as ProjectData[]).find(
    (p) => p.slug === targetSlug || p.id === requestedId
  );

  if (!project) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-bg text-text pt-40 px-6 text-center gap-8">
        <h1 className="font-bebas text-5xl md:text-7xl uppercase tracking-wider brand-text-gradient">
          CASE STUDY NOT FOUND
        </h1>
        <p className="font-sans font-light text-text/60 max-w-[500px]">
          The case study you are looking for does not exist or has been removed by the administrator.
        </p>
        <MagneticButton>
          <Link href="/works" className="group px-8 py-4 brand-button transition-all duration-300 flex items-center justify-center min-w-[200px]">
            <span className="font-mono text-sm uppercase tracking-widest font-bold">
              Back to Works
            </span>
          </Link>
        </MagneticButton>
      </div>
    );
  }

  return (
    <div key={project.slug} className="w-full flex-col flex bg-bg text-text selection:bg-[#FF00E5] selection:text-white pt-20">

      {/* ═══════════ HERO SECTION ═══════════ */}
      <CaseStudyHero 
        title={project.title || project.name}
        category={project.category}
        year={project.year}
        heroImage={project.heroImage}
        heroVideo={project.heroVideo}
        bannerImage={project.bannerImage}
        hideBannerImage={project.hideBannerImage}
        imageFit={project.imageFit}
        bannerBackgroundColor={project.bannerBackgroundColor}
      />

      {/* ═══════════ EDITORIAL BODY ═══════════ */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-20 md:py-40">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {/* Left column — Tagline */}
            <div className="md:col-span-5 lg:col-span-4">
              <ScrollReveal>
                <h2 className="font-bebas text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] uppercase leading-[1.05] text-text whitespace-pre-line">
                  {project.tagline}
                </h2>
              </ScrollReveal>
            </div>

            {/* Right column — Description + Metadata */}
            <div className="md:col-span-7 lg:col-span-7 lg:col-start-6 flex flex-col gap-10 md:gap-14">
              <ScrollReveal delay={0.1}>
                <p className="font-sans font-light text-[17px] md:text-[22px] leading-[1.7] md:leading-[1.8] text-text/75 max-w-[640px]">
                  {project.description}
                </p>
              </ScrollReveal>

              {project.approach && (
                <ScrollReveal delay={0.15}>
                  <p className="font-sans font-light text-[15px] md:text-[18px] leading-[1.7] text-text/55 max-w-[640px]">
                    {project.approach}
                  </p>
                </ScrollReveal>
              )}

              {/* Metadata grid */}
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-8 pt-6 border-t border-border">
                  {[
                    { label: "Type", value: project.category },
                    { label: "Client", value: project.client },
                    ...(project.deliverable
                      ? [{ label: "Deliverable", value: project.deliverable }]
                      : [{ label: "Location", value: project.location }]),
                  ].map((item) => (
                    <div key={item.label}>
                      <span className="font-mono text-[10px] md:text-[11px] text-text/40 tracking-[0.2em] uppercase block mb-1">
                        {item.label}
                      </span>
                      <span className="font-sans text-[13px] md:text-[15px] text-text/80 leading-snug">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {project.link && (
                <ScrollReveal delay={0.3}>
                  <div className="pt-4">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text/80 font-mono text-[11px] uppercase tracking-widest hover:border-text hover:text-text transition-colors">
                      Visit Live Site
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY ═══════════ */}
      {project.gallery && project.gallery.length > 0 && (
         <AsymmetricGallery items={project.gallery} imageFit={project.imageFit} />
      )}

      {/* ═══════════ COLOR PALETTE SECTION ═══════════ */}
      {project.colors && project.colors.length > 0 && (
        <section className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto">
            <ScrollReveal className="mb-12 md:mb-20">
              <span className="font-mono text-[10px] md:text-[11px] text-text/40 tracking-[0.3em] uppercase">
                Colour Palette
              </span>
              <h3 className="font-bebas text-[32px] md:text-[48px] text-text mt-2 tracking-wide">
                THE BRAND COLOURS
              </h3>
            </ScrollReveal>

            <div className="flex flex-col gap-0">
              {project.colors.map((color, idx) => (
                <ScrollReveal key={color.hex} delay={idx * 0.1}>
                  <div
                     className="group grid grid-cols-1 md:grid-cols-12 items-stretch border-t border-border last:border-b border-b-border"
                  >
                    <div
                      className="md:col-span-2 h-20 md:h-auto min-h-[80px]"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="md:col-span-10 grid grid-cols-1 sm:grid-cols-12 gap-4 md:gap-0 py-6 md:py-8 px-0 md:px-8">
                      <div className="sm:col-span-3 flex flex-col justify-center">
                        <span className="font-sans font-medium text-[16px] md:text-[18px] text-text tracking-wide">
                          {color.name}
                        </span>
                      </div>
                      <div className="sm:col-span-3 flex flex-col justify-center gap-1.5">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[9px] md:text-[10px] text-text/50 tracking-[0.15em] uppercase w-10">HEX</span>
                          <span className="font-mono text-[12px] md:text-[13px] text-text/80">{color.hex}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[9px] md:text-[10px] text-text/50 tracking-[0.15em] uppercase w-10">RGB</span>
                          <span className="font-mono text-[12px] md:text-[13px] text-text/80">{color.rgb}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[9px] md:text-[10px] text-text/50 tracking-[0.15em] uppercase w-10">CMYK</span>
                          <span className="font-mono text-[12px] md:text-[13px] text-text/80">{color.cmyk}</span>
                        </div>
                      </div>
                      <div className="sm:col-span-6 flex items-center">
                        <p className="font-sans font-light text-[13px] md:text-[14px] text-text/70 leading-[1.7] max-w-[420px]">
                          {color.psychology}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ TYPOGRAPHY SECTION ═══════════ */}
      {project.typography && (
        <section className="w-full px-6 md:px-16 lg:px-24 py-8 md:py-16">
          <div className="max-w-[1400px] mx-auto">
            <ScrollReveal className="mb-10 md:mb-16">
              <span className="font-mono text-[10px] md:text-[11px] text-text/40 tracking-[0.3em] uppercase">
                Typography
              </span>
              <h3 className="font-bebas text-[32px] md:text-[48px] text-text mt-2 tracking-wide">
                THE BRAND TYPEFACE
              </h3>
            </ScrollReveal>

            <ScrollReveal>
              <div
                className="w-full border-t border-b border-border py-10 md:py-14 flex flex-col sm:flex-row items-center sm:items-baseline gap-6 sm:gap-12 md:gap-16"
              >
                <span
                  className={`${project.typography.cssClass} text-[120px] sm:text-[160px] md:text-[200px] leading-none text-text select-none`}
                >
                  Aa
                </span>
                <div className="flex flex-col gap-2">
                  <span className="font-sans font-medium text-[20px] md:text-[28px] text-text tracking-wide">
                    {project.typography.fontName}
                  </span>
                  <span className="font-mono text-[11px] md:text-[13px] text-text/50 tracking-[0.15em]">
                    {project.typography.fontFamily}
                  </span>
                  {project.typography.description && (
                    <p className="font-sans font-light text-[13px] md:text-[15px] text-text/70 leading-[1.8] max-w-[500px] mt-3">
                      {project.typography.description}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ══ Final spacer before footer ══ */}
      <div className="h-16 md:h-32" />

      {/* ═══════════ NEXT PROJECT FOOTER ═══════════ */}
      {project.nextSlug && (
        <div className="w-full min-h-[45vh] md:min-h-[55vh] flex flex-col items-center justify-center border-t border-border group cursor-pointer transition-colors duration-500 hover:bg-text/5">
          <MagneticButton>
            <Link href={`/works/${project.nextSlug}`} className="flex flex-col items-center px-6">
              <ScrollReveal>
                <span
                  className="font-mono text-[10px] md:text-[11px] text-text/40 tracking-[0.3em] mb-5 md:mb-6 uppercase inline-block text-center w-full"
                >
                  Next Project
                </span>
              </ScrollReveal>
              <div className="flex items-center gap-4 md:gap-8">
                <h2 className="font-bebas text-[44px] sm:text-[64px] md:text-[100px] lg:text-[130px] text-text/80 group-hover:text-text transition-colors duration-700 text-center leading-none tracking-wider">
                  {project.nextTitle}
                </h2>
                <span className="text-[28px] md:text-[60px] text-text/30 group-hover:text-text group-hover:translate-x-4 transition-all duration-700">
                  →
                </span>
              </div>
            </Link>
          </MagneticButton>
        </div>
      )}
    </div>
  );
}
