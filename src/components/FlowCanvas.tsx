import React, { useEffect, useRef } from "react";

interface FlowCanvasProps {
  stageId: number; // 1 to 4
  accentHue: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  phase: number;
  speed: number;
}

export const FlowCanvas: React.FC<FlowCanvasProps> = ({
  stageId,
  accentHue,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Detect headless / low-power environment for performance
    const isHeadless =
      typeof navigator !== "undefined" &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle setup
    const particleCount = isHeadless ? 25 : prefersReducedMotion ? 30 : 75;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        baseRadius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.015
      });
    }

    let time = 0;
    let lastRender = 0;
    const targetFps = isHeadless ? 15 : 45;
    const frameInterval = 1000 / targetFps;

    const render = (now: number) => {
      if (now - lastRender < frameInterval) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }
      lastRender = now;
      time += 0.01;

      // Dark cinematic canvas base
      ctx.fillStyle = "#0C0C0C";
      ctx.fillRect(0, 0, width, height);

      // Radial background glow matching current scene accent
      const glowGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7
      );
      glowGrad.addColorStop(0, `hsla(${accentHue}, 65%, 28%, 0.22)`);
      glowGrad.addColorStop(0.5, `hsla(${accentHue}, 55%, 15%, 0.10)`);
      glowGrad.addColorStop(1, "rgba(12, 12, 12, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Harmonic wave ribbons based on narrative stage
      const waveCount = stageId === 4 ? 4 : stageId === 3 ? 3 : 2;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const yOffset = height * (0.35 + w * 0.15);
        ctx.moveTo(0, yOffset);

        for (let x = 0; x <= width; x += 30) {
          let y = yOffset;
          if (stageId === 1) {
            // Curiosity: fluid inquisitive sine swells
            y += Math.sin(x * 0.004 + time + w) * 45 * Math.cos(time * 0.5);
          } else if (stageId === 2) {
            // Exploration: intersecting dynamic ripples
            y += Math.sin(x * 0.007 + time * 1.5 + w) * 35 + Math.cos(x * 0.003 - time) * 25;
          } else if (stageId === 3) {
            // Intelligence: structured geometric stepped waves
            const raw = Math.sin(x * 0.005 + time + w);
            y += Math.round(raw * 3) * 15;
          } else {
            // Creation: convergent architectural harmonics
            y += Math.sin(x * 0.003 + time) * 30 * Math.sin((x / width) * Math.PI);
          }

          // Subtle mouse attraction
          if (mouseRef.current.active) {
            const dx = x - mouseRef.current.x;
            const dy = yOffset - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              y += ((180 - dist) / 180) * (dy > 0 ? 25 : -25);
            }
          }

          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsla(${accentHue + w * 12}, 75%, 60%, ${0.12 - w * 0.02})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Render connected particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion dynamics based on stage
        if (stageId === 1) {
          p.x += p.vx + Math.cos(time + p.phase) * 0.3;
          p.y += p.vy + Math.sin(time + p.phase) * 0.3;
        } else if (stageId === 2) {
          p.x += p.vx * 1.4;
          p.y += p.vy * 1.4;
        } else if (stageId === 3) {
          // Neural lattice pull
          const gridX = Math.round(p.x / 100) * 100;
          const gridY = Math.round(p.y / 100) * 100;
          p.x += (gridX - p.x) * 0.015 + p.vx * 0.5;
          p.y += (gridY - p.y) * 0.015 + p.vy * 0.5;
        } else {
          // Cohesive flow towards center-right
          p.x += p.vx * 0.8 + 0.2;
          p.y += p.vy * 0.8;
        }

        // Boundary wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${accentHue}, 80%, 75%, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles with subtle synaptic lines (Stage 3 & 4)
        if (stageId >= 2 && !isHeadless) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = stageId === 3 ? 90 : 70;
            if (dist < maxDist) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `hsla(${accentHue}, 70%, 65%, ${(1 - dist / maxDist) * 0.15})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId.current = requestAnimationFrame(render);
      }
    };

    animationFrameId.current = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [stageId, accentHue]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      aria-hidden="true"
    />
  );
};
