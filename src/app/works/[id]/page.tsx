"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import worksData from "@/data/works.json";

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
  title: string;
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
  heroImage: string;
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


const MediaItem = ({ src, alt, fill, className, sizes, quality, priority, style, loading }: any) => {
  if (src?.endsWith('.mp4') || src?.endsWith('.webm')) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
        style={{ ...style, objectFit: className?.includes('object-contain') ? 'contain' : 'cover' }}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt || ''}
      fill={fill}
      className={className}
      sizes={sizes}
      quality={quality}
      priority={priority}
      style={style}
      loading={loading}
    />
  );
};


const idToSlug: Record<string, string> = {
  "01": "licet-15",
  "02": "sans-badminton",
  "03": "solstice-pick",
  "04": "footgraphy",
  "05": "tarak-food",
};

export default function CaseStudyPage() {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Find project synchronously
  const requestedId = Array.isArray(id) ? id[0] : id;
  const targetSlug = idToSlug[requestedId] || requestedId;
  const project = (worksData as unknown as ProjectData[]).find(
    (p) => p.slug === targetSlug || p.id === requestedId
  );

  useGSAP(() => {
    if (!project) return;

    gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
      });
    });

    gsap.utils.toArray<HTMLElement>(".fade-in").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    });
  }, { scope: containerRef, dependencies: [project] });

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
          <Link href="/works" className="px-8 py-4 brand-bg-gradient text-bg font-mono text-sm uppercase tracking-widest hover:bg-transparent hover:brand-text-gradient border border-transparent hover:brand-border-gradient transition-all duration-300">
            Back to Works
          </Link>
        </MagneticButton>
      </div>
    );
  }

  return (
    <div ref={containerRef} key={project.slug} className="w-full flex-col flex bg-bg text-text selection:bg-[#FF00E5] selection:text-bg pt-20">

      {/* ═══════════ FULL-BLEED HERO ═══════════ */}
      <section 
        className="relative w-full h-[55vh] min-h-[450px] md:h-[90vh] overflow-hidden"
        style={project.bannerBackgroundColor ? { backgroundColor: project.bannerBackgroundColor } : {}}
      >
        {!project.hideBannerImage && (
          <MediaItem
            src={project.bannerImage || project.heroImage}
            alt={project.title || project.name}
            fill
            className={
              project.bannerImage 
                ? "object-contain object-right md:object-right px-4 md:px-0 md:pr-12 lg:pr-24" 
                : `object-cover object-center ${project.imageFit === 'contain' ? '!object-contain' : ''}`
            }
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, 100vw"
          />
        )}
        {/* Gradient overlay — bottom-heavy for text legibility (Only for regular cover images) */}
        {!project.bannerImage && !project.hideBannerImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        )}

        {/* Hero text — bottom-left, editorial positioning */}
        <div className="absolute bottom-10 md:bottom-16 left-6 md:left-16 lg:left-24"
        >
          <h1 className="font-bebas text-[56px] sm:text-[80px] md:text-[140px] lg:text-[180px] leading-[0.9] tracking-wider text-white uppercase">
            {project.title || project.name}
          </h1>
          <div className="flex items-center gap-3 mt-4 md:mt-6"
          >
            <span className="w-8 md:w-12 h-px bg-white/40" />
            <span className="font-mono text-[11px] md:text-[13px] text-white/70 tracking-[0.25em] uppercase">
              {project.category} — {project.year}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════ EDITORIAL BODY ═══════════ */}

      {/* ── Section 1: Project Overview ── */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-20 md:py-40">
        <div className="max-w-[1400px] mx-auto">
          <div className="fade-up grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {/* Left column — Tagline */}
            <div className="md:col-span-5 lg:col-span-4">
              <h2 className="font-bebas text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] uppercase leading-[1.05] brand-text-gradient whitespace-pre-line">
                {project.tagline}
              </h2>
            </div>

            {/* Right column — Description + Metadata */}
            <div className="md:col-span-7 lg:col-span-7 lg:col-start-6 flex flex-col gap-10 md:gap-14">
              <p className="font-sans font-light text-[17px] md:text-[22px] leading-[1.7] md:leading-[1.8] text-text/75 max-w-[640px]">
                {project.description}
              </p>

              {project.approach && (
                <p className="font-sans font-light text-[15px] md:text-[18px] leading-[1.7] text-text/55 max-w-[640px]">
                  {project.approach}
                </p>
              )}

              {/* Metadata grid — David Airey style inline details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-8 pt-6 border-t border-border">
                {[
                  { label: "Type", value: project.category },
                  { label: "Client", value: project.client },
                  ...(project.deliverable
                    ? [{ label: "Deliverable", value: project.deliverable }]
                    : [{ label: "Location", value: project.location }]),
                ].map((item) => (
                  <div key={item.label}>
                    <span className="font-mono text-[10px] md:text-[11px] text-text/30 tracking-[0.2em] uppercase block mb-1">
                      {item.label}
                    </span>
                    <span className="font-sans text-[13px] md:text-[15px] text-text/80 leading-snug">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {project.link && (
                <div className="pt-4">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text/80 font-mono text-[11px] uppercase tracking-widest hover:border-text hover:text-text transition-colors">
                    Visit Live Site
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {project.gallery && project.gallery.length > 0 && (
        <>
          {/* ── First gallery image — full-bleed wordmark ── */}
          {project.gallery[0] && (
            <section className="fade-in w-full">
              <div className="w-full px-0 md:px-16 lg:px-24">
                <div className={`relative w-full ${project.imageFit === 'contain' ? 'aspect-[4/5] md:aspect-[2/1]' : 'aspect-[16/9] md:aspect-[2/1]'} overflow-hidden`}>
                  <MediaItem
                    src={project.gallery[0].src}
                    alt={project.gallery[0].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain !p-0 sm:!p-4 md:!p-12 bg-surface/10 rounded-sm' : 'object-cover'}`}
                    sizes="(max-width: 768px) 100vw, 100vw"
                    quality={85}
                  />
                </div>
                {project.gallery[0].caption && (
                  <p className="font-sans text-[13px] md:text-[14px] text-text/35 mt-4 md:mt-5 max-w-[600px] leading-relaxed px-6 md:px-0">
                    {project.gallery[0].caption}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* ── Spacer ── */}
          {project.gallery[1] && project.gallery[2] && (
            <div className="h-16 md:h-32" />
          )}

          {/* ── Side-by-side pair (gallery items 1+2) ── */}
          {project.gallery[1] && project.gallery[2] && (
            <section className="fade-up w-full px-6 md:px-16 lg:px-24">
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: project.gallery[1]?.aspectRatio || "4/5" }}>
                  <MediaItem
                    src={project.gallery[1].src}
                    alt={project.gallery[1].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain !p-1 sm:!p-4 bg-surface/10 rounded-sm' : 'object-cover'}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                </div>
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: project.gallery[2]?.aspectRatio || "4/5" }}>
                  <MediaItem
                    src={project.gallery[2].src}
                    alt={project.gallery[2].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain !p-1 sm:!p-4 bg-surface/10 rounded-sm' : 'object-cover'}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ═══════════ COLOR PALETTE SECTION ═══════════ */}
      {project.colors && project.colors.length > 0 && (
        <>
          <section className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="max-w-[1400px] mx-auto">
              {/* Section header */}
              <div className="fade-up mb-12 md:mb-20">
                <span className="font-mono text-[10px] md:text-[11px] text-text/30 tracking-[0.3em] uppercase">
                  Colour Palette
                </span>
                <h3 className="font-bebas text-[32px] md:text-[48px] text-text/90 mt-2 tracking-wide">
                  THE BRAND COLOURS
                </h3>
              </div>

              {/* Color swatches — vertical stack, Airey-style horizontal bars */}
              <div className="flex flex-col gap-0">
                {project.colors.map((color, idx) => (
                  <div
                    key={color.hex} className="group grid grid-cols-1 md:grid-cols-12 items-stretch border-t border-border last:border-b"
                  >
                    {/* Color bar */}
                    <div
                      className="md:col-span-2 h-20 md:h-auto min-h-[80px]"
                      style={{ backgroundColor: color.hex }}
                    />

                    {/* Info section */}
                    <div className="md:col-span-10 grid grid-cols-1 sm:grid-cols-12 gap-4 md:gap-0 py-6 md:py-8 px-0 md:px-8">
                      {/* Color name */}
                      <div className="sm:col-span-3 flex flex-col justify-center">
                        <span className="font-sans font-medium text-[16px] md:text-[18px] text-text tracking-wide">
                          {color.name}
                        </span>
                      </div>

                      {/* Color codes */}
                      <div className="sm:col-span-3 flex flex-col justify-center gap-1.5">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[9px] md:text-[10px] text-text/25 tracking-[0.15em] uppercase w-10">HEX</span>
                          <span className="font-mono text-[12px] md:text-[13px] text-text/70">{color.hex}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[9px] md:text-[10px] text-text/25 tracking-[0.15em] uppercase w-10">RGB</span>
                          <span className="font-mono text-[12px] md:text-[13px] text-text/70">{color.rgb}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[9px] md:text-[10px] text-text/25 tracking-[0.15em] uppercase w-10">CMYK</span>
                          <span className="font-mono text-[12px] md:text-[13px] text-text/70">{color.cmyk}</span>
                        </div>
                      </div>

                      {/* Psychology — the "why" */}
                      <div className="sm:col-span-6 flex items-center">
                        <p className="font-sans font-light text-[13px] md:text-[14px] text-text/45 leading-[1.7] max-w-[420px]">
                          {color.psychology}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════ TYPOGRAPHY SECTION ═══════════ */}
      {project.typography && (
        <section className="w-full px-6 md:px-16 lg:px-24 py-8 md:py-16">
          <div className="max-w-[1400px] mx-auto">
            {/* Section header */}
            <div className="fade-up mb-10 md:mb-16">
              <span className="font-mono text-[10px] md:text-[11px] text-text/30 tracking-[0.3em] uppercase">
                Typography
              </span>
              <h3 className="font-bebas text-[32px] md:text-[48px] text-text/90 mt-2 tracking-wide">
                THE BRAND TYPEFACE
              </h3>
            </div>

            {/* Typography strip */}
            <div
              className="fade-up w-full border-t border-b border-border py-10 md:py-14 flex flex-col sm:flex-row items-center sm:items-baseline gap-6 sm:gap-12 md:gap-16"
            >
              <span
                className={`${project.typography.cssClass} text-[120px] sm:text-[160px] md:text-[200px] leading-none text-text/90 select-none`}
              >
                Aa
              </span>
              <div className="flex flex-col gap-2">
                <span className="font-sans font-medium text-[20px] md:text-[28px] text-text/80 tracking-wide">
                  {project.typography.fontName}
                </span>
                <span className="font-mono text-[11px] md:text-[13px] text-text/30 tracking-[0.15em]">
                  {project.typography.fontFamily}
                </span>
                {project.typography.description && (
                  <p className="font-sans font-light text-[13px] md:text-[15px] text-text/45 leading-[1.8] max-w-[500px] mt-3">
                    {project.typography.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Remaining Gallery Items (post-palette) ── */}
      {project.gallery && project.gallery.length > 0 && (
        <>
          {/* ── Spacer ── */}
          <div className="h-8 md:h-16" />

          {/* ── Full-bleed pattern image (gallery item 3) ── */}
          {project.gallery[3] && (
            <section className="fade-in w-full">
              <div className="w-full px-0 md:px-16 lg:px-24">
                <div className={`relative w-full overflow-hidden max-h-[85vh] ${project.imageFit === 'contain' ? 'aspect-[4/5] md:aspect-[16/10]' : ''}`} style={{ aspectRatio: project.imageFit === 'contain' ? undefined : (project.gallery[3]?.aspectRatio || "16/10") }}>
                  <MediaItem
                    src={project.gallery[3].src}
                    alt={project.gallery[3].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain !p-0 sm:!p-4 md:!p-12 bg-surface/10 rounded-sm' : 'object-cover'}`}
                    sizes="(max-width: 768px) 100vw, 100vw"
                    quality={85}
                  />
                </div>
                {project.gallery[3].caption && (
                  <div className="px-6 md:px-0">
                    <p className="font-sans text-[13px] md:text-[14px] text-text/35 mt-4 md:mt-5 max-w-[600px] leading-relaxed">
                      {project.gallery[3].caption}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── Spacer ── */}
          <div className="h-16 md:h-32" />

          {/* ── Side-by-side pair (gallery items 4+5) ── */}
          {project.gallery[4] && project.gallery[5] && (
            <section className="fade-up w-full px-6 md:px-16 lg:px-24">
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: project.gallery[4]?.aspectRatio || "4/5" }}>
                  <MediaItem
                    src={project.gallery[4].src}
                    alt={project.gallery[4].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain !p-1 sm:!p-4 bg-surface/10 rounded-sm' : 'object-cover'}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                </div>
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: project.gallery[5]?.aspectRatio || "4/5" }}>
                  <MediaItem
                    src={project.gallery[5].src}
                    alt={project.gallery[5].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain !p-1 sm:!p-4 bg-surface/10 rounded-sm' : 'object-cover'}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                </div>
              </div>
            </section>
          )}

          {/* ── Single gallery item 4 when no pair exists ── */}
          {project.gallery[4] && !project.gallery[5] && (
            <section className="fade-up w-full px-6 md:px-16 lg:px-24">
              <div className="max-w-[700px] mx-auto">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: project.gallery[4]?.aspectRatio || "4/5" }}>
                  <MediaItem
                    src={project.gallery[4].src}
                    alt={project.gallery[4].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    sizes="50vw"
                  />
                </div>
              </div>
            </section>
          )}

          {/* ── Spacer ── */}
          <div className="h-16 md:h-32" />

          {/* ── Final full-bleed image (gallery item 6) ── */}
          {project.gallery[6] && (
            <section className="fade-in w-full">
              <div className="w-full px-6 md:px-16 lg:px-24">
                <div className="max-w-[1400px] mx-auto">
                  <div className={`relative w-full overflow-hidden ${project.imageFit === 'contain' ? 'aspect-[4/5] md:aspect-[16/10]' : 'aspect-[16/10]'}`}>
                    <MediaItem
                      src={project.gallery[6].src}
                      alt={project.gallery[6].alt}
                      fill
                      className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain !p-0 sm:!p-4 md:!p-12 bg-surface/10 rounded-sm' : 'object-cover'}`}
                      sizes="(max-width: 768px) 100vw, 100vw"
                      quality={85}
                    />
                  </div>
                  {project.gallery[6].caption && (
                    <p className="font-sans text-[13px] md:text-[14px] text-text/35 mt-4 md:mt-5 max-w-[600px] leading-relaxed">
                      {project.gallery[6].caption}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ── Spacer ── */}
          <div className="h-16 md:h-32" />

          {/* ── Gallery item 7 (e.g. color variations grid) ── */}
          {project.gallery[7] && (
            <section className="fade-in w-full">
              <div className="w-full px-6 md:px-16 lg:px-24">
                <div className="max-w-[1400px] mx-auto">
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <MediaItem
                      src={project.gallery[7].src}
                      alt={project.gallery[7].alt}
                      fill
                      className={`object-contain ${project.imageFit === 'contain' ? 'p-4 md:p-12 bg-surface/30 rounded-sm' : ''}`}
                      sizes="(max-width: 768px) 100vw, 100vw"
                      quality={85}
                    />
                  </div>
                  {project.gallery[7].caption && (
                    <p className="font-sans text-[13px] md:text-[14px] text-text/35 mt-4 md:mt-5 max-w-[600px] leading-relaxed">
                      {project.gallery[7].caption}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ── Dynamic fallback gallery matching high-end Fashion Studio staggered layouts ── */}
      {project.gallery && project.gallery.length > (project.useCuratedGallery ? 8 : 0) && !project.colors && (
        <section className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-32">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-24 md:gap-48">
            {(() => {
              const elements: React.ReactNode[] = [];
              let i = project.useCuratedGallery ? 8 : 0;
              while (i < project.gallery.length) {
                const img = project.gallery[i];
                
                if (img.span === "full") {
                  elements.push(
                    <div key={`full-${i}`} className="fade-in w-full md:w-[75%] lg:w-[65%] mx-auto flex flex-col gap-4">
                      <div className="relative w-full overflow-hidden" style={{ aspectRatio: img.aspectRatio || "4/5" }}>
                        <MediaItem src={img.src} alt={img.alt || `Gallery Image ${i}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 75vw" quality={85} loading="lazy" />
                      </div>
                      {img.caption && (
                        <p className="font-sans text-[13px] md:text-[14px] text-text/40 leading-relaxed mx-auto text-center mt-2 max-w-[500px]">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  );
                  i++;
                } else if (img.span === "half" && i + 1 < project.gallery.length && project.gallery[i + 1].span === "half") {
                  const img2 = project.gallery[i + 1];
                  elements.push(
                    <div key={`half-${i}`} className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-start">
                      <div className="fade-up md:col-span-5 md:col-start-2 flex flex-col gap-3">
                        <div className="relative w-full overflow-hidden" style={{ aspectRatio: img.aspectRatio || "3/4" }}>
                          <MediaItem src={img.src} alt={img.alt || `Gallery Image ${i}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" quality={85} loading="lazy" />
                        </div>
                        {img.caption && <p className="font-sans text-[12px] md:text-[13px] text-text/40">{img.caption}</p>}
                      </div>

                      <div className="fade-up md:col-span-4 md:col-start-8 flex flex-col gap-3 mt-8 md:mt-48">
                        <div className="relative w-full overflow-hidden" style={{ aspectRatio: img2.aspectRatio || "4/5" }}>
                          <MediaItem src={img2.src} alt={img2.alt || `Gallery Image ${i+1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" quality={85} loading="lazy" />
                        </div>
                        {img2.caption && <p className="font-sans text-[12px] md:text-[13px] text-text/40">{img2.caption}</p>}
                      </div>
                    </div>
                  );
                  i += 2;
                } else {
                  elements.push(
                    <div key={`single-${i}`} className="fade-in w-full md:w-[60%] lg:w-[50%] mr-auto flex flex-col gap-4">
                      <div className="relative w-full overflow-hidden" style={{ aspectRatio: img.aspectRatio || "1/1" }}>
                        <MediaItem src={img.src} alt={img.alt || `Gallery Image ${i}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" />
                      </div>
                      {img.caption && <p className="font-sans text-[12px] md:text-[13px] text-text/40">{img.caption}</p>}
                    </div>
                  );
                  i++;
                }
              }
              return elements;
            })()}
          </div>
        </section>
      )}

      {/* ══ Final spacer before footer ══ */}
      <div className="h-16 md:h-32" />

      {/* ═══════════ NEXT PROJECT FOOTER ═══════════ */}
      {project.nextSlug && (
        <div className="w-full min-h-[45vh] md:min-h-[55vh] flex flex-col items-center justify-center border-t border-border group cursor-pointer transition-colors duration-500 hover:bg-surface/50">
          <MagneticButton>
            <Link href={`/works/${project.nextSlug}`} className="flex flex-col items-center px-6">
              <span
                className="fade-up font-mono text-[10px] md:text-[11px] text-text/25 tracking-[0.3em] mb-5 md:mb-6 uppercase"
              >
                Next Project
              </span>
              <div className="flex items-center gap-4 md:gap-8">
                <h2 className="font-bebas text-[44px] sm:text-[64px] md:text-[100px] lg:text-[130px] text-text/80 group-hover:brand-text-gradient transition-colors duration-700 text-center leading-none tracking-wider">
                  {project.nextTitle}
                </h2>
                <span className="text-[28px] md:text-[60px] text-text/30 group-hover:brand-text-gradient group-hover:translate-x-4 transition-all duration-700">
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
