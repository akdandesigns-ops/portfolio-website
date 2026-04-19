"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

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
  title: string;
  tagline: string;
  category: string;
  year: string;
  client: string;
  location: string;
  deliverable?: string;
  description: string;
  approach?: string;
  heroImage: string;
  imageFit?: "cover" | "contain";
  useCuratedGallery?: boolean;
  gallery: { src: string; alt: string; span?: "full" | "half"; caption?: string; aspectRatio?: string }[];
  colors?: ColorSwatch[];
  typography?: TypographyInfo;
  nextSlug: string;
  nextTitle: string;
}

/* ─── Project Data ─── */
const projectDetails: Record<string, ProjectData> = {
  "licet-15": {
    title: "LICET 15",
    tagline: "15 years of building engineers.\nOne mark that says it all.",
    category: "Visual Identity",
    year: "2025",
    client: "Loyola-ICAM College of Engineering & Technology",
    location: "Chennai, India",
    description:
      "A commemorative visual identity for Loyola-ICAM College of Engineering & Technology, Chennai, marking their 15th anniversary. The logomark is constructed from the numeral 15 with the college's top-view floor plan embedded in the negative space — a hidden blueprint.",
    approach:
      "Built using the brand's signature deep navy blue and amber orange, the mark is minimal, geometric and meaningful. Every angle, every line references the institutional architecture — turning a number into a monument.",
    heroImage: "/works/licet-15/licet -15 - t-shirt-mockup.jpg",
    gallery: [
      { src: "/works/licet-15/licet15-wordmark-logo.jpg", alt: "LICET 15 Wordmark Logo", span: "full", caption: "The complete wordmark system — LICET 15, with the college motto integrated beneath." },
      { src: "/works/licet-15/licet -15 -LOGO BLACK-mockup.jpg", alt: "Logo Black Mockup", span: "half" },
      { src: "/works/licet-15/display mockup.jpg", alt: "Stage Display Mockup", span: "half" },
      { src: "/works/licet-15/licet-15 pattern.jpg", alt: "LICET 15 Brand Pattern", span: "full", caption: "A tessellated pattern derived from the logomark, built for large-format applications." },
      { src: "/works/licet-15/licet -15 - memento.jpg", alt: "Glass Memento", span: "half" },
      { src: "/works/licet-15/black t shirt mockup.jpg", alt: "Black T-shirt Mockup", span: "half" },
      { src: "/works/licet-15/magazine.jpg", alt: "College Magazine Cover", span: "full", caption: "A magazine spread integrating the anniversary branding into the editorial system." },
    ],
    colors: [
      {
        name: "Navy Blue",
        hex: "#1B1464",
        rgb: "27, 20, 100",
        cmyk: "100, 95, 0, 40",
        psychology: "Represents academic excellence, trust, and institutional authority. Navy conveys depth and seriousness — the foundation of a 15-year legacy.",
      },
      {
        name: "Amber Orange",
        hex: "#F5A623",
        rgb: "245, 166, 35",
        cmyk: "0, 35, 90, 0",
        psychology: "Symbolizes energy, warmth, and forward momentum. The amber counterbalances the navy's formality with optimism and approachability.",
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        rgb: "255, 255, 255",
        cmyk: "0, 0, 0, 0",
        psychology: "Provides breathing room and clarity. White space is not emptiness — it is the canvas that gives the mark its architectural precision.",
      },
      {
        name: "Deep Black",
        hex: "#111111",
        rgb: "17, 17, 17",
        cmyk: "0, 0, 0, 95",
        psychology: "Used for mono applications and high-contrast scenarios. Black adds gravitas and ensures the mark reads powerfully at any scale.",
      },
    ],
    typography: {
      fontFamily: "'Impact', 'Haettenschweiler', sans-serif",
      fontName: "Impact Bold",
      cssClass: "font-impact",
      description: "A realist sans-serif typeface designed by Geoffrey Lee in 1965. Impact's ultra-condensed, heavy letterforms command immediate attention — engineered for headlines that demand to be read. Its unapologetic weight delivers the institutional gravitas LICET 15's anniversary identity requires.",
    },
    nextSlug: "sans-badminton",
    nextTitle: "SANS",
  },
  "sans-badminton": {
    title: "SANS",
    tagline: "Built for speed.\nDesigned to dominate.",
    category: "Logo Design",
    year: "2025",
    client: "Personal Project",
    location: "Chennai, India",
    deliverable: "Logomark, Brand Identity",
    description:
      "A bold brand identity for SANS — Supreme Agility Net Sport, a badminton sports brand. The logomark is born from the jump smash — the most aggressive, airborne strike in badminton — captured mid-flight and distilled into a geometric mark. Sharp, angular, and built for motion. Set in Brother Oblique to reinforce the dynamic, forward-leaning energy of competitive sport. The neo green and charcoal palette cuts through the noise — electric on court, unmistakable off it.",
    approach:
      "The identity system is engineered around tension and release. The jump smash logomark carries diagonal momentum — every angle references the explosive upward leap and downward strike. Brother Oblique's italic construction mirrors that same forward pressure. The neo green isn't decorative — it's adrenaline made visible.",
    heroImage: "/works/sans-badminton/sans-09.png",
    gallery: [
      { src: "/works/sans-badminton/sans-07.png", alt: "SANS Logomark — White on Charcoal Grey", span: "full", caption: "Brand in action — the jump smash logomark references the explosive mid-air strike that defines competitive badminton." },
      { src: "/works/sans-badminton/sans-08.png", alt: "SANS Logomark — Neo Green on Charcoal", span: "half", aspectRatio: "3/4" },
      { src: "/works/sans-badminton/sans-10.png", alt: "SANS Logomark — Dark on Neo Green", span: "half", aspectRatio: "3/4" },
      { src: "/works/sans-badminton/sans-09.png", alt: "SANS Carbon Fibre Texture Logomark", span: "full", aspectRatio: "4/5", caption: "The logomark on carbon fibre — raw material meets raw intent. Every angle of the jump smash mark carries diagonal momentum." },
      { src: "/works/sans-badminton/sans-11.png", alt: "SANS Logo — Royal Blue Alternate Colorway", span: "half", aspectRatio: "3/4" },
      { src: "/works/sans-badminton/website-img.png", alt: "SANS Brand Showcase — Jump Smash Player", span: "half", aspectRatio: "3/4" },
      { src: "/works/sans-badminton/untitled-2.jpg", alt: "SANS Brand Collateral — Bottle Mockup & Player Action", span: "full", caption: "From branded merchandise to court-side presence — the identity system extends across every athlete touchpoint." },
      { src: "/works/sans-badminton/sans-12.png", alt: "SANS Logo Color Variations — Four Colorways", span: "full", caption: "The logomark across the full colorway system — charcoal, neo green, royal blue, and sunset red. Built to flex, built to dominate." },
    ],
    colors: [
      {
        name: "Neo Green",
        hex: "#C8FF00",
        rgb: "200, 255, 0",
        cmyk: "22, 0, 100, 0",
        psychology: "The signature colour. Neo green is adrenaline — raw, electric, impossible to ignore. It captures the explosive energy of a jump smash and the relentless intensity of competitive badminton.",
      },
      {
        name: "Charcoal Grey",
        hex: "#3D3D3D",
        rgb: "61, 61, 61",
        cmyk: "0, 0, 0, 76",
        psychology: "The grounding force. Charcoal provides the serious, performance-grade backbone of the identity — technical, controlled, and unapologetically premium.",
      },
      {
        name: "Carbon Black",
        hex: "#1A1A1A",
        rgb: "26, 26, 26",
        cmyk: "0, 0, 0, 90",
        psychology: "Used for deep backgrounds and high-contrast applications. Carbon black creates the void against which neo green burns brightest — dominance through depth.",
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        rgb: "255, 255, 255",
        cmyk: "0, 0, 0, 0",
        psychology: "The counterforce. White delivers clarity and precision. On dark surfaces, it makes the logomark cut like a blade — sharp, clean, undeniable.",
      },
    ],
    typography: {
      fontFamily: "'Brother Oblique', sans-serif",
      fontName: "Brother Oblique",
      cssClass: "font-brother",
      description: "A bold, forward-leaning display typeface that mirrors the diagonal momentum of competitive sport. Brother Oblique's italic construction captures the same aggressive energy as the jump smash — every letter leans into the action.",
    },
    nextSlug: "solstice-pick",
    nextTitle: "SOLSTICE PICK",
  },
  "solstice-pick": {
    title: "SOLESTICE PICK",
    tagline: "Premium for\naffordable people.",
    category: "Logo Design",
    year: "2026",
    client: "Solestice Pick",
    location: "Global",
    description:
      "Solestice Pick is an e-commerce brand that curates high-quality products and offers them at affordable prices. The positioning is “premium for affordable people” — combining aspirational quality with accessibility.",
    approach:
      "The logo represents a thumb and index finger holding an object, symbolizing careful product selection and quality assurance. The overall form subtly resembles a shopping bag, reinforcing the e-commerce identity.",
    heroImage: "/works/solstice-pick/solstice pick mockup - image 2.png",
    gallery: [
      { src: "/works/solstice-pick/solstice pick - imagery style.png", alt: "Solestice Pick Imagery Style", span: "full", caption: "The brand imagery evokes warmth and honesty, establishing the accessible premium positioning." },
      { src: "/works/solstice-pick/Solstice pick - logos-01.png", alt: "Solestice Pick Logo Variation", span: "half", aspectRatio: "9/16" },
      { src: "/works/solstice-pick/Solstice pick - logos-02.png", alt: "Solestice Pick Logo Variation 2", span: "half", aspectRatio: "9/16" },
      { src: "/works/solstice-pick/solstice pick - pattern.png", alt: "Solestice Pick Brand Pattern", span: "full", aspectRatio: "22/10", caption: "The brand pattern deployed as an asset across the packaging landscape." },
      { src: "/works/solstice-pick/Solstice pick - logos-04.png", alt: "Solestice Pick Iconography", span: "half", aspectRatio: "9/16" },
      { src: "/works/solstice-pick/Solstice pick - logos-03.png", alt: "Solestice Pick Secondary Monogram", span: "half", aspectRatio: "9/16", caption: "Secondary monogram logo preserving the idea of careful selection." },
      { src: "/works/solstice-pick/Solstice pick - logos-05.png", alt: "Solestice Pick Logomark", span: "full", aspectRatio: "1/1", caption: "The standalone logomark." },
    ],
    colors: [
      {
        name: "Forest Dawn",
        hex: "#108577",
        rgb: "16, 133, 119",
        cmyk: "85, 20, 50, 5",
        psychology: "Trust, quality, and a calm premium feel. This colour grounds the brand in reliability and aspirational value.",
      },
      {
        name: "Sunlit Cream",
        hex: "#FDF6B0",
        rgb: "253, 246, 176",
        cmyk: "2, 2, 35, 0",
        psychology: "Warmth, friendliness, and youthful energy. When paired with the deep teal, it establishes an accessible premium positioning that welcomes the user.",
      },
    ],
    typography: {
      fontFamily: "'Adelle', serif",
      fontName: "Adelle",
      cssClass: "font-serif",
      description: "Adelle is a slab serif typeface that blends modern readability with traditional strength. It adds a premium editorial tone while maintaining clarity, making it suitable for a brand that communicates trust and quality.",
    },
    nextSlug: "we-safe",
    nextTitle: "WE SAFE",
  },
  "we-safe": {
    title: "WE SAFE",
    tagline: "Safety, reimagined\nthrough design.",
    category: "AI Product Photography",
    year: "2023",
    client: "WE Safe",
    location: "India",
    description:
      "AI-powered product photography and visual identity for WE Safe — bringing a safety brand into the modern era with hyper-realistic product renders and a clean, trustworthy visual language.",
    heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000",
    gallery: [],
    nextSlug: "footgraphy",
    nextTitle: "FOOTGRAPHY",
  },
  "footgraphy": {
    title: "FOOTGRAPHY",
    tagline: "Step into the future.\nAI Product Photography.",
    category: "AI Product Photography",
    year: "2026",
    client: "Footgraphy",
    location: "Global",
    description:
      "A comprehensive exploration of AI product photography for 'Footgraphy'. This project demonstrates the power of generative AI to create hyper-realistic, high-fidelity shoe concepts. By crafting precise prompts and leveraging AI rendering, we established a visual narrative that merges cinematic global-fashion aesthetic with modern streetwear.",
    approach:
      "The goal was not just to create images of shoes, but to capture an entire mood — dramatic lighting, premium textures, and dynamic angles. Each generated image acts as a standalone piece of editorial photography, proving that AI can deliver commercially viable, striking visuals without a studio.",
    heroImage: "/works/footgraphy/08.png",
    imageFit: "contain",
    useCuratedGallery: true,
    gallery: [
      { src: "/works/footgraphy/09.png", alt: "Cinematic Shoe Photography 1", span: "full", caption: "High-contrast editorial lighting highlighting material texture." },
      { src: "/works/footgraphy/10.png", alt: "AI generated shoe 2", span: "half", aspectRatio: "3/4" },
      { src: "/works/footgraphy/11.png", alt: "AI generated shoe 3", span: "half", aspectRatio: "3/4" },
      { src: "/works/footgraphy/12.png", alt: "Cinematic Shoe Photography 4", span: "full", aspectRatio: "16/9", caption: "Vibrant global-fashion aesthetic captured entirely through generative AI." },
      { src: "/works/footgraphy/13.png", alt: "AI generated shoe 5", span: "half", aspectRatio: "4/5" },
      { src: "/works/footgraphy/15.png", alt: "AI generated shoe 6", span: "half", aspectRatio: "4/5" },
      { src: "/works/footgraphy/16.png", alt: "Cinematic Shoe Photography 7", span: "full", aspectRatio: "2/1", caption: "The raw intent of design, crystallized in synthetic light." },
      { src: "/works/footgraphy/14.png", alt: "AI generated shoe 14", span: "full" },
      { src: "/works/footgraphy/01.png", alt: "AI generated shoe 01", span: "full" },
      { src: "/works/footgraphy/02.png", alt: "AI generated shoe 02", span: "half" },
      { src: "/works/footgraphy/03.png", alt: "AI generated shoe 03", span: "half" },
      { src: "/works/footgraphy/04.png", alt: "AI generated shoe 04", span: "full" },
      { src: "/works/footgraphy/05.png", alt: "AI generated shoe 05", span: "half" },
      { src: "/works/footgraphy/06.png", alt: "AI generated shoe 06", span: "half" },
      { src: "/works/footgraphy/07.png", alt: "AI generated shoe 07", span: "full" },
      { src: "/works/footgraphy/17.png", alt: "AI generated shoe 17", span: "half" },
      { src: "/works/footgraphy/18.png", alt: "AI generated shoe 18", span: "half" },
      { src: "/works/footgraphy/19.png", alt: "AI generated shoe 19", span: "full" },
      { src: "/works/footgraphy/20.png", alt: "AI generated shoe 20", span: "half" },
      { src: "/works/footgraphy/21.png", alt: "AI generated shoe 21", span: "half" },
      { src: "/works/footgraphy/22.png", alt: "AI generated shoe 22", span: "full" },
      { src: "/works/footgraphy/23.png", alt: "AI generated shoe 23", span: "half" },
      { src: "/works/footgraphy/24.png", alt: "AI generated shoe 24", span: "half" },
      { src: "/works/footgraphy/25.png", alt: "AI generated shoe 25", span: "full" },
      { src: "/works/footgraphy/26.png", alt: "AI generated shoe 26", span: "half" },
      { src: "/works/footgraphy/27.png", alt: "AI generated shoe 27", span: "half" },
      { src: "/works/footgraphy/28.png", alt: "AI generated shoe 28", span: "full" },
      { src: "/works/footgraphy/29.png", alt: "AI generated shoe 29", span: "half" },
      { src: "/works/footgraphy/30.png", alt: "AI generated shoe 30", span: "half" }
    ],
    nextSlug: "licet-15",
    nextTitle: "LICET 15",
  },
};

// Backward-compat numeric IDs
const idToSlug: Record<string, string> = {
  "01": "licet-15",
  "02": "sans-badminton",
  "03": "solstice-pick",
  "04": "we-safe",
  "05": "footgraphy",
};

/* ─── Shared animation presets ─── */
const fadeUp: any = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8%" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

const fadeIn: any = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-5%" },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
};

/* ─── Component ─── */
export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const slug = idToSlug[params.id] || params.id;
  const project = projectDetails[slug] || projectDetails["licet-15"];

  return (
    <div className="w-full flex-col flex bg-bg text-text selection:bg-accent selection:text-bg">

      {/* ═══════════ FULL-BLEED HERO ═══════════ */}
      <section className="relative w-full h-[75vh] md:h-screen overflow-hidden">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay — bottom-heavy for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Hero text — bottom-left, editorial positioning */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-10 md:bottom-16 left-6 md:left-16 lg:left-24"
        >
          <h1 className="font-bebas text-[56px] sm:text-[80px] md:text-[140px] lg:text-[180px] leading-[0.9] tracking-wider text-white">
            {project.title}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-3 mt-4 md:mt-6"
          >
            <span className="w-8 md:w-12 h-px bg-white/40" />
            <span className="font-mono text-[11px] md:text-[13px] text-white/70 tracking-[0.25em] uppercase">
              {project.category} — {project.year}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ EDITORIAL BODY ═══════════ */}

      {/* ── Section 1: Project Overview ── */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-20 md:py-40">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {/* Left column — Tagline */}
            <div className="md:col-span-5 lg:col-span-4">
              <h2 className="font-bebas text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] uppercase leading-[1.05] text-accent whitespace-pre-line">
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {project.gallery.length > 0 && (
        <>
          {/* ── First gallery image — full-bleed wordmark ── */}
          {project.gallery[0] && (
            <motion.section {...fadeIn} className="w-full">
              <div className="w-full px-0 md:px-16 lg:px-24">
                <div className="relative w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden">
                  <Image
                    src={project.gallery[0].src}
                    alt={project.gallery[0].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    sizes="100vw"
                  />
                </div>
                {project.gallery[0].caption && (
                  <p className="font-sans text-[13px] md:text-[14px] text-text/35 mt-4 md:mt-5 max-w-[600px] leading-relaxed px-6 md:px-0">
                    {project.gallery[0].caption}
                  </p>
                )}
              </div>
            </motion.section>
          )}

          {/* ── Spacer ── */}
          <div className="h-16 md:h-32" />

          {/* ── Side-by-side pair (gallery items 1+2) ── */}
          {project.gallery[1] && project.gallery[2] && (
            <motion.section {...fadeUp} className="w-full px-6 md:px-16 lg:px-24">
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: project.gallery[1]?.aspectRatio || "4/3" }}>
                  <Image
                    src={project.gallery[1].src}
                    alt={project.gallery[1].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    sizes="50vw"
                  />
                </div>
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: project.gallery[2]?.aspectRatio || "4/3" }}>
                  <Image
                    src={project.gallery[2].src}
                    alt={project.gallery[2].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    sizes="50vw"
                  />
                </div>
              </div>
            </motion.section>
          )}
        </>
      )}

      {/* ═══════════ COLOR PALETTE SECTION ═══════════ */}
      {project.colors && project.colors.length > 0 && (
        <>
          {/* ── Spacer ── */}
          <div className="h-16 md:h-32" />

          <section className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-32">
              <div className="max-w-[1400px] mx-auto">
                {/* Section header */}
                <motion.div {...fadeUp} className="mb-12 md:mb-20">
                  <span className="font-mono text-[10px] md:text-[11px] text-text/30 tracking-[0.3em] uppercase">
                    Colour Palette
                  </span>
                  <h3 className="font-bebas text-[32px] md:text-[48px] text-text/90 mt-2 tracking-wide">
                    THE BRAND COLOURS
                  </h3>
                </motion.div>

                {/* Color swatches — vertical stack, Airey-style horizontal bars */}
                <div className="flex flex-col gap-0">
                  {project.colors.map((color, idx) => (
                    <motion.div
                      key={color.hex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-5%" }}
                      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="group grid grid-cols-1 md:grid-cols-12 items-stretch border-t border-border last:border-b"
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
                    </motion.div>
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
            <motion.div {...fadeUp} className="mb-10 md:mb-16">
              <span className="font-mono text-[10px] md:text-[11px] text-text/30 tracking-[0.3em] uppercase">
                Typography
              </span>
              <h3 className="font-bebas text-[32px] md:text-[48px] text-text/90 mt-2 tracking-wide">
                THE BRAND TYPEFACE
              </h3>
            </motion.div>

            {/* Typography strip */}
            <motion.div
              {...fadeUp}
              className="w-full border-t border-b border-border py-10 md:py-14 flex flex-col sm:flex-row items-center sm:items-baseline gap-6 sm:gap-12 md:gap-16"
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
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Remaining Gallery Items (post-palette) ── */}
      {project.gallery.length > 0 && (
        <>
          {/* ── Spacer ── */}
          <div className="h-8 md:h-16" />

          {/* ── Full-bleed pattern image (gallery item 3) ── */}
          {project.gallery[3] && (
            <motion.section {...fadeIn} className="w-full">
              <div className="w-full px-0 md:px-16 lg:px-24">
                <div className="relative w-full overflow-hidden max-h-[85vh]" style={{ aspectRatio: project.gallery[3]?.aspectRatio || "16/10" }}>
                  <Image
                    src={project.gallery[3].src}
                    alt={project.gallery[3].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    sizes="100vw"
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
            </motion.section>
          )}

          {/* ── Spacer ── */}
          <div className="h-16 md:h-32" />

          {/* ── Side-by-side pair (gallery items 4+5) ── */}
          {project.gallery[4] && project.gallery[5] && (
            <motion.section {...fadeUp} className="w-full px-6 md:px-16 lg:px-24">
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: project.gallery[4]?.aspectRatio || "4/5" }}>
                  <Image
                    src={project.gallery[4].src}
                    alt={project.gallery[4].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    sizes="50vw"
                  />
                </div>
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: project.gallery[5]?.aspectRatio || "4/5" }}>
                  <Image
                    src={project.gallery[5].src}
                    alt={project.gallery[5].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    sizes="50vw"
                  />
                </div>
              </div>
            </motion.section>
          )}

          {/* ── Single gallery item 4 when no pair exists ── */}
          {project.gallery[4] && !project.gallery[5] && (
            <motion.section {...fadeUp} className="w-full px-6 md:px-16 lg:px-24">
              <div className="max-w-[700px] mx-auto">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: project.gallery[4]?.aspectRatio || "4/5" }}>
                  <Image
                    src={project.gallery[4].src}
                    alt={project.gallery[4].alt}
                    fill
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    sizes="50vw"
                  />
                </div>
              </div>
            </motion.section>
          )}

          {/* ── Spacer ── */}
          <div className="h-16 md:h-32" />

          {/* ── Final full-bleed image (gallery item 6) ── */}
          {project.gallery[6] && (
            <motion.section {...fadeIn} className="w-full">
              <div className="w-full px-6 md:px-16 lg:px-24">
                <div className="max-w-[1400px] mx-auto">
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.gallery[6].src}
                      alt={project.gallery[6].alt}
                      fill
                      className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                      sizes="100vw"
                    />
                  </div>
                  {project.gallery[6].caption && (
                    <p className="font-sans text-[13px] md:text-[14px] text-text/35 mt-4 md:mt-5 max-w-[600px] leading-relaxed">
                      {project.gallery[6].caption}
                    </p>
                  )}
                </div>
              </div>
            </motion.section>
          )}

          {/* ── Spacer ── */}
          <div className="h-16 md:h-32" />

          {/* ── Gallery item 7 (e.g. color variations grid) ── */}
          {project.gallery[7] && (
            <motion.section {...fadeIn} className="w-full">
              <div className="w-full px-6 md:px-16 lg:px-24">
                <div className="max-w-[1400px] mx-auto">
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.gallery[7].src}
                      alt={project.gallery[7].alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                  {project.gallery[7].caption && (
                    <p className="font-sans text-[13px] md:text-[14px] text-text/35 mt-4 md:mt-5 max-w-[600px] leading-relaxed">
                      {project.gallery[7].caption}
                    </p>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </>
      )}

      {/* ── Dynamic fallback gallery for projects without curated layout OR for remaining images ── */}
      {project.gallery.length > (project.useCuratedGallery ? 8 : 0) && !project.colors && (
        <section className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-32">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-6 md:gap-8">
            {(() => {
              const elements: React.ReactNode[] = [];
              let i = project.useCuratedGallery ? 8 : 0;
              while (i < project.gallery.length) {
                const img = project.gallery[i];
                if (img.span === "full") {
                  elements.push(
                    <motion.div key={i} {...fadeIn} className="w-full relative overflow-hidden" style={{ aspectRatio: img.aspectRatio || "16/9" }}>
                      <Image src={img.src} alt={img.alt} fill className={project.imageFit === 'contain' ? 'object-contain' : 'object-cover'} sizes="100vw" />
                    </motion.div>
                  );
                  i++;
                } else if (img.span === "half" && i + 1 < project.gallery.length && project.gallery[i + 1].span === "half") {
                  const img2 = project.gallery[i + 1];
                  elements.push(
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <motion.div {...fadeUp} className="relative w-full overflow-hidden" style={{ aspectRatio: img.aspectRatio || "4/3" }}>
                        <Image src={img.src} alt={img.alt} fill className={project.imageFit === 'contain' ? 'object-contain' : 'object-cover'} sizes="50vw" />
                      </motion.div>
                      <motion.div {...fadeUp} className="relative w-full overflow-hidden" style={{ aspectRatio: img2.aspectRatio || "4/3" }}>
                        <Image src={img2.src} alt={img2.alt} fill className={project.imageFit === 'contain' ? 'object-contain' : 'object-cover'} sizes="50vw" />
                      </motion.div>
                    </div>
                  );
                  i += 2;
                } else {
                  elements.push(
                    <motion.div key={i} {...fadeIn} className="w-full relative overflow-hidden" style={{ aspectRatio: img.aspectRatio || "16/9" }}>
                      <Image src={img.src} alt={img.alt} fill className={project.imageFit === 'contain' ? 'object-contain' : 'object-cover'} sizes="100vw" />
                    </motion.div>
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
      <div className="w-full min-h-[45vh] md:min-h-[55vh] flex flex-col items-center justify-center border-t border-border group cursor-pointer transition-colors duration-500 hover:bg-surface/50">
        <MagneticButton>
          <Link href={`/work/${project.nextSlug}`} className="flex flex-col items-center px-6">
            <motion.span
              {...fadeUp}
              className="font-mono text-[10px] md:text-[11px] text-text/25 tracking-[0.3em] mb-5 md:mb-6 uppercase"
            >
              Next Project
            </motion.span>
            <div className="flex items-center gap-4 md:gap-8">
              <h2 className="font-bebas text-[44px] sm:text-[64px] md:text-[100px] lg:text-[130px] text-text/80 group-hover:text-accent transition-colors duration-700 text-center leading-none tracking-wider">
                {project.nextTitle}
              </h2>
              <span className="text-[28px] md:text-[60px] text-text/30 group-hover:text-accent group-hover:translate-x-4 transition-all duration-700">
                →
              </span>
            </div>
          </Link>
        </MagneticButton>
      </div>
    </div>
  );
}
