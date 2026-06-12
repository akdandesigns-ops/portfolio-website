"use client";
import { useEffect, useState } from "react";

let cachedNoiseUrl = "";
function getNoiseDataUrl() {
  if (cachedNoiseUrl) return cachedNoiseUrl;
  if (typeof document === "undefined") return "";
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const idata = ctx.createImageData(64, 64);
  const data = idata.data;
  for (let i = 0; i < data.length; i += 4) {
    const val = Math.random() * 255 | 0;
    data[i] = val;
    data[i+1] = val;
    data[i+2] = val;
    data[i+3] = 200; // Alpha
  }
  ctx.putImageData(idata, 0, 0);
  cachedNoiseUrl = canvas.toDataURL("image/png");
  return cachedNoiseUrl;
}

export default function GrainOverlay() {
  const [noiseUrl, setNoiseUrl] = useState("");

  useEffect(() => {
    const url = getNoiseDataUrl();
    setNoiseUrl(url);
    document.documentElement.style.setProperty('--noise-url', `url("${url}")`);
  }, []);

  if (!noiseUrl) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] opacity-20 mix-blend-overlay"
      style={{
        backgroundImage: `url("${noiseUrl}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
