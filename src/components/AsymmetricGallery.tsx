"use client";

import ScrollReveal from "./ScrollReveal";
import MediaItem from "./MediaItem";

interface GalleryItem {
  src: string;
  alt: string;
  span?: "full" | "half";
  caption?: string;
  aspectRatio?: string;
}

interface AsymmetricGalleryProps {
  items: GalleryItem[];
  imageFit?: "cover" | "contain";
}

export default function AsymmetricGallery({ items, imageFit }: AsymmetricGalleryProps) {
  const elements = [];
  let i = 0;
  
  while (i < items.length) {
    const item = items[i];
    
    if (!item) {
        i++; continue;
    }

    if (item.span === "full") {
      elements.push(
        <div key={`gallery-full-${i}`} className="w-full md:w-[85%] mx-auto flex flex-col gap-4 my-16 md:my-32">
          <ScrollReveal yOffset={60}>
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: item.aspectRatio || "16/9" }}>
              <MediaItem allowUnmute src={item.src} alt={item.alt || `Gallery Image ${i}`} fill className={`transition-transform duration-[1.2s] hover:scale-[1.03] ${imageFit === 'contain' ? 'object-contain bg-surface/10 p-4 md:p-12' : 'object-cover'}`} sizes="100vw" quality={85} loading="lazy" />
            </div>
            {item.caption && (
              <p className="font-sans text-[13px] md:text-[14px] text-text/40 leading-relaxed mx-auto text-center mt-4 max-w-[600px]">
                {item.caption}
              </p>
            )}
          </ScrollReveal>
        </div>
      );
      i++;
    } else if (item.span === "half" && i + 1 < items.length && items[i + 1]?.span === "half") {
      const item2 = items[i + 1];
      elements.push(
        <div key={`gallery-pair-${i}`} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start my-16 md:my-32">
          <div className="md:col-span-5 md:col-start-2 flex flex-col gap-3">
            <ScrollReveal yOffset={60} duration={1.0}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: item.aspectRatio || "3/4" }}>
                <MediaItem allowUnmute src={item.src} alt={item.alt || `Gallery Image ${i}`} fill className={`transition-transform duration-[1.2s] hover:scale-[1.03] ${imageFit === 'contain' ? 'object-contain bg-surface/10 p-4 md:p-8' : 'object-cover'}`} sizes="(max-width: 768px) 100vw, 40vw" quality={85} loading="lazy" />
              </div>
              {item.caption && <p className="font-sans text-[12px] md:text-[13px] text-text/40 mt-2 max-w-[400px]">{item.caption}</p>}
            </ScrollReveal>
          </div>

          <div className="md:col-span-5 md:col-start-7 flex flex-col gap-3 mt-8 md:mt-48">
            <ScrollReveal yOffset={60} duration={1.2}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: item2.aspectRatio || "4/5" }}>
                <MediaItem allowUnmute src={item2.src} alt={item2.alt || `Gallery Image ${i+1}`} fill className={`transition-transform duration-[1.2s] hover:scale-[1.03] ${imageFit === 'contain' ? 'object-contain bg-surface/10 p-4 md:p-8' : 'object-cover'}`} sizes="(max-width: 768px) 100vw, 40vw" quality={85} loading="lazy" />
              </div>
              {item2.caption && <p className="font-sans text-[12px] md:text-[13px] text-text/40 mt-2 max-w-[400px]">{item2.caption}</p>}
            </ScrollReveal>
          </div>
        </div>
      );
      i += 2;
    } else {
      elements.push(
        <div key={`gallery-single-${i}`} className="w-full md:w-[60%] lg:w-[50%] mr-auto flex flex-col gap-4 my-16 md:my-32">
          <ScrollReveal yOffset={60}>
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: item.aspectRatio || "1/1" }}>
              <MediaItem allowUnmute src={item.src} alt={item.alt || `Gallery Image ${i}`} fill className={`transition-transform duration-[1.2s] hover:scale-[1.03] ${imageFit === 'contain' ? 'object-contain bg-surface/10 p-4 md:p-8' : 'object-cover'}`} sizes="(max-width: 768px) 100vw, 50vw" quality={85} loading="lazy" />
            </div>
            {item.caption && <p className="font-sans text-[12px] md:text-[13px] text-text/40 mt-2 max-w-[400px]">{item.caption}</p>}
          </ScrollReveal>
        </div>
      );
      i++;
    }
  }

  return (
    <div className="w-full px-6 md:px-16 lg:px-24">
       <div className="max-w-[1400px] mx-auto">
         {elements}
       </div>
    </div>
  );
}
