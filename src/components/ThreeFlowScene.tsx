import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeFlowSceneProps {
  stageId: number; // 1 to 4
  accentHue: number; // 0 to 360
  className?: string;
  scrollProgress?: number; // 0 to 1
}

export const ThreeFlowScene: React.FC<ThreeFlowSceneProps> = ({
  stageId,
  accentHue,
  className = "",
  scrollProgress = 0,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const targetStageRef = useRef(stageId);
  const currentStageRef = useRef(stageId);
  const accentHueRef = useRef(accentHue);
  const scrollProgressRef = useRef(scrollProgress);

  targetStageRef.current = stageId;
  accentHueRef.current = accentHue;
  scrollProgressRef.current = scrollProgress;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as prescribed by Three.js skill
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement("canvas");
        const gl = probeCanvas.getContext("webgl2") || probeCanvas.getContext("webgl");
        if (!gl) return true;
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0c0c, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 1. Procedural 3D Particle Cloud (Curiosity & Exploration dynamics)
    const particleCount = isSoftwareGl ? 350 : prefersReducedMotion ? 500 : 1400;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Cylindrical/spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 9;
      const z = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 8;

      positions[i3] = Math.cos(theta) * radius;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      basePositions[i3] = positions[i3];
      basePositions[i3 + 1] = positions[i3 + 1];
      basePositions[i3 + 2] = positions[i3 + 2];

      scales[i] = Math.random() * 0.8 + 0.3;

      tempColor.setHSL(accentHueRef.current / 360, 0.8, 0.65);
      colors[i3] = tempColor.r;
      colors[i3 + 1] = tempColor.g;
      colors[i3 + 2] = tempColor.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    // Custom procedural particle texture (sharp circular glow without external PNG)
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(0.7, "rgba(255, 255, 255, 0.15)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);
    particleTexture.colorSpace = THREE.SRGBColorSpace;

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 2. Harmonic 3D Ribbon Wave (Waveform Architecture for Creation)
    const ribbonSegments = 80;
    const ribbonRings = 4;
    const ribbonGroup = new THREE.Group();

    for (let r = 0; r < ribbonRings; r++) {
      const curvePoints: THREE.Vector3[] = [];
      const zOffset = (r - ribbonRings / 2) * 2;

      for (let s = 0; s <= ribbonSegments; s++) {
        const u = (s / ribbonSegments) * 2 - 1; // -1 to 1
        const x = u * 12;
        const y = Math.sin(u * Math.PI * 2) * 1.5;
        curvePoints.push(new THREE.Vector3(x, y, zOffset));
      }

      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 70, 0.04, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(accentHueRef.current / 360, 0.75, 0.6),
        transparent: true,
        opacity: 0.22 - r * 0.04,
        blending: THREE.AdditiveBlending,
      });

      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      ribbonGroup.add(tubeMesh);
    }
    scene.add(ribbonGroup);

    // 3. Neural Synaptic Lines (for Stage 3 Intelligence)
    const neuralLineCount = isSoftwareGl ? 30 : 90;
    const neuralGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(neuralLineCount * 6);
    neuralGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const neuralMat = new THREE.LineBasicMaterial({
      color: new THREE.Color().setHSL(accentHueRef.current / 360, 0.85, 0.7),
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const neuralLines = new THREE.LineSegments(neuralGeo, neuralMat);
    scene.add(neuralLines);

    // Mouse Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId = 0;
    let lastTime = performance.now();
    let elapsedTime = 0;

    const renderLoop = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      elapsedTime += delta;
      const time = elapsedTime;

      // Smooth exponential damping on stage transitions
      currentStageRef.current = THREE.MathUtils.damp(
        currentStageRef.current,
        targetStageRef.current,
        3.5,
        delta
      );

      // Smooth mouse follow
      mouse.x = THREE.MathUtils.damp(mouse.x, mouse.targetX, 4, delta);
      mouse.y = THREE.MathUtils.damp(mouse.y, mouse.targetY, 4, delta);

      camera.position.x = THREE.MathUtils.damp(camera.position.x, mouse.x * 2.2, 2.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, mouse.y * 1.5, 2.5, delta);
      camera.lookAt(0, 0, 0);

      // Color interpolation
      const targetColor = new THREE.Color().setHSL(accentHueRef.current / 360, 0.8, 0.65);
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const colAttr = particleGeometry.attributes.color as THREE.BufferAttribute;

      const stage = currentStageRef.current;

      // Update particle positions based on narrative stage dynamics
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];
        const bz = basePositions[i3 + 2];

        if (stage < 1.8) {
          // Stage 1: Curiosity - gentle orbital drift & curious wave pulses
          posAttr.array[i3] = bx + Math.sin(time * 0.4 + bz * 0.3) * 0.6;
          posAttr.array[i3 + 1] = by + Math.cos(time * 0.5 + bx * 0.4) * 0.6;
          posAttr.array[i3 + 2] = bz + Math.sin(time * 0.3 + by * 0.2) * 0.4;
        } else if (stage < 2.8) {
          // Stage 2: Exploration - accelerated vortex spiral
          const angle = time * 0.8 + Math.sqrt(bx * bx + bz * bz) * 0.2;
          const r = Math.sqrt(bx * bx + bz * bz);
          posAttr.array[i3] = Math.cos(angle) * r;
          posAttr.array[i3 + 1] = by + Math.sin(time * 1.5 + r) * 0.8;
          posAttr.array[i3 + 2] = Math.sin(angle) * r;
        } else if (stage < 3.5) {
          // Stage 3: Intelligence - neural matrix attraction to discrete clusters
          const clusterX = Math.round(bx / 3) * 3;
          const clusterY = Math.round(by / 2.5) * 2.5;
          const clusterZ = Math.round(bz / 3) * 3;
          posAttr.array[i3] = THREE.MathUtils.lerp(bx, clusterX, 0.4) + Math.sin(time + by) * 0.15;
          posAttr.array[i3 + 1] = THREE.MathUtils.lerp(by, clusterY, 0.4) + Math.cos(time + bx) * 0.15;
          posAttr.array[i3 + 2] = THREE.MathUtils.lerp(bz, clusterZ, 0.4);
        } else {
          // Stage 4: Creation - harmonic alignment into flowing structured ribbons
          posAttr.array[i3] = bx + Math.sin(time * 0.7 + by) * 0.3;
          posAttr.array[i3 + 1] = Math.sin((bx * 0.25) + time) * 2.2;
          posAttr.array[i3 + 2] = bz;
        }

        // Color update
        colAttr.array[i3] = targetColor.r;
        colAttr.array[i3 + 1] = targetColor.g;
        colAttr.array[i3 + 2] = targetColor.b;
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Update Neural Synaptic Lines in Stage 3
      if (stage >= 2.2 && !isSoftwareGl) {
        const linePos = neuralGeo.attributes.position as THREE.BufferAttribute;
        let lineIdx = 0;
        for (let i = 0; i < Math.min(particleCount, 120); i += 2) {
          if (lineIdx >= neuralLineCount * 6) break;
          const p1 = i * 3;
          const p2 = (i + 1) * 3;
          linePos.array[lineIdx++] = posAttr.array[p1];
          linePos.array[lineIdx++] = posAttr.array[p1 + 1];
          linePos.array[lineIdx++] = posAttr.array[p1 + 2];
          linePos.array[lineIdx++] = posAttr.array[p2];
          linePos.array[lineIdx++] = posAttr.array[p2 + 1];
          linePos.array[lineIdx++] = posAttr.array[p2 + 2];
        }
        linePos.needsUpdate = true;
        neuralLines.visible = true;
        neuralMat.opacity = THREE.MathUtils.damp(
          neuralMat.opacity,
          stage >= 2.7 && stage <= 3.6 ? 0.25 : 0.04,
          2.5,
          delta
        );
      } else {
        neuralLines.visible = false;
      }

      // Rotate and morph ribbon wave
      ribbonGroup.rotation.y = time * 0.08 + scrollProgressRef.current * 0.5;
      ribbonGroup.rotation.x = Math.sin(time * 0.15) * 0.1;
      ribbonGroup.position.y = Math.cos(time * 0.2) * 0.3;

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      neuralGeo.dispose();
      neuralMat.dispose();

      ribbonGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
