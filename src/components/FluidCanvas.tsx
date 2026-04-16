"use client";

import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  phase: number;
  speed: number;
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;

  constructor(x: number, y: number, vx: number, vy: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.maxLife = 100 + Math.random() * 50;
    this.life = this.maxLife;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    // Antigravity drift — particles float upward and swirl
    this.vx += Math.sin(this.y * 0.01) * 0.1;
    this.vy += Math.cos(this.x * 0.01) * 0.1;
    this.vy -= 0.02; // subtle upward float (antigravity)

    // Friction
    this.vx *= 0.95;
    this.vy *= 0.95;

    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D, isLight: boolean) {
    const alpha = (this.life / this.maxLife) * 0.15;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = isLight
      ? `rgba(0, 0, 0, ${alpha})`
      : `rgba(200, 255, 0, ${alpha})`;
    ctx.fill();
  }
}

export default function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 768) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let animationFrameId: number;
    const particles: Particle[] = [];
    let lastMouseX = width / 2;
    let lastMouseY = height / 2;
    let lastMouseTime = performance.now();

    // Theme detection
    let isLight = document.documentElement.classList.contains("light");
    const observer = new MutationObserver(() => {
      isLight = document.documentElement.classList.contains("light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Create ambient organic blobs
    const blobs: Blob[] = [];
    const blobCount = 6;
    for (let i = 0; i < blobCount; i++) {
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 120 + Math.random() * 180,
        baseRadius: 120 + Math.random() * 180,
        phase: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.005,
      });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now();
      const dt = currentTime - lastMouseTime;

      const vx = ((e.clientX - lastMouseX) / dt) * 10 || 0;
      const vy = ((e.clientY - lastMouseY) / dt) * 10 || 0;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Spawn sparkling particles on movement
      const speed = Math.sqrt(vx * vx + vy * vy);
      const spawnCount = Math.min(Math.floor(speed), 5);
      for (let i = 0; i < spawnCount; i++) {
        particles.push(
          new Particle(
            mouseX + (Math.random() - 0.5) * 20,
            mouseY + (Math.random() - 0.5) * 20,
            vx + (Math.random() - 0.5) * 2,
            vy + (Math.random() - 0.5) * 2
          )
        );
      }

      lastMouseX = mouseX;
      lastMouseY = mouseY;
      lastMouseTime = currentTime;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // === LAYER 1: Ambient fluid blobs ===
      for (const blob of blobs) {
        blob.phase += blob.speed;
        blob.radius = blob.baseRadius + Math.sin(blob.phase) * 30;
        blob.x += blob.vx;
        blob.y += blob.vy;

        blob.vx *= 0.985;
        blob.vy *= 0.985;

        if (blob.x < -blob.radius) blob.vx += 0.3;
        if (blob.x > width + blob.radius) blob.vx -= 0.3;
        if (blob.y < -blob.radius) blob.vy += 0.3;
        if (blob.y > height + blob.radius) blob.vy -= 0.3;
      }

      const accentColors = isLight
        ? [
            "rgba(0, 0, 0, 0.04)",
            "rgba(60, 60, 60, 0.03)",
            "rgba(120, 120, 120, 0.025)",
          ]
        : [
            "rgba(200, 255, 0, 0.06)",
            "rgba(100, 200, 0, 0.04)",
            "rgba(150, 255, 50, 0.035)",
          ];

      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];
        const colorIdx = i % accentColors.length;

        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );

        const baseColor = accentColors[colorIdx];
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.5, baseColor.replace(/[\d.]+\)$/, `${parseFloat(baseColor.match(/[\d.]+\)$/)?.[0] || "0.04") * 0.5})`));
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // === LAYER 2: Sparkling particles on mouse hover ===
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx, isLight);
        if (p.life <= 0) particles.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-70"
      style={{ isolation: "isolate" }}
    />
  );
}
