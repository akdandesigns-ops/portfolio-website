"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MediaItemProps {
  src: string;
  alt?: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  allowUnmute?: boolean;
}

export default function MediaItem({ src, alt, fill, className, sizes, quality, priority, style, loading, allowUnmute }: MediaItemProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (src?.endsWith('.mp4') || src?.endsWith('.webm')) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full transform-gpu"
          style={{ ...style, objectFit: className?.includes('object-contain') ? 'contain' : 'cover' }}
        />
        {allowUnmute && (
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-20 p-2.5 bg-black/50 backdrop-blur-md rounded-full text-white/90 hover:bg-black/80 hover:text-white transition-all shadow-lg border border-white/10 flex items-center justify-center cursor-pointer"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={18} strokeWidth={1.5} /> : <Volume2 size={18} strokeWidth={1.5} />}
          </button>
        )}
      </div>
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
}
