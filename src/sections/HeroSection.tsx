import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { profileData } from "../data/profile";
import { heroScenes, HeroScene } from "../data/heroScenes";
import { ThreeFlowScene } from "../components/ThreeFlowScene";

interface HeroSectionProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onContactClick
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const currentScene: HeroScene = heroScenes[activeSceneIndex];

  // Scroll scrub listener for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (heroHeight * 0.8)));
      setScrollProgress(progress);

      // If video is loaded and user is scrolling, sync video currentTime with scroll progress
      if (videoRef.current && videoLoaded && videoRef.current.duration) {
        if (!isPlaying) {
          videoRef.current.currentTime = progress * videoRef.current.duration;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videoLoaded, isPlaying]);

  // Auto-advance scenes every 8.5 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % heroScenes.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [isPlaying, activeSceneIndex]);

  // Video play/pause effect
  useEffect(() => {
    setVideoLoaded(false);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay policy or video not yet dropped into public folder
        });
      }
    }
  }, [activeSceneIndex]);

  const handleTogglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (videoRef.current) {
        if (next) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
      }
      return next;
    });
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Cinematic Hero"
      className="relative min-h-[95vh] md:min-h-screen w-full flex flex-col justify-between bg-[#0C0C0C] text-[#F1F0EC] overflow-hidden pt-24 pb-10"
    >
      {/* Background Layer: Three.js Interactive 3D Flow Scene + Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Interactive Three.js 3D WebGL Scene */}
        <ThreeFlowScene
          stageId={currentScene.id}
          accentHue={currentScene.accentHue}
          scrollProgress={scrollProgress}
          className="transition-opacity duration-1000"
        />

        {/* Google Flow Video element (if supplied by user in /public/videos/) */}
        <video
          ref={videoRef}
          src={currentScene.videoSrc}
          poster={currentScene.posterSrc}
          muted={isMuted}
          playsInline
          loop
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded && !videoError ? "opacity-85" : "opacity-0"
          }`}
        />

        {/* Cinematic Vignette & Contrast Scrims */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0C0C0C]/50 to-[#0C0C0C]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/40 to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0C0C0C]/80 to-transparent pointer-events-none" />
      </div>

      {/* Hero Central Editorial Typography */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10 md:py-16">
        <div className="max-w-4xl space-y-6">
          {/* Identity line */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-wider text-[#A0A0A5]">
            <span className="text-[#4263EB] font-bold">0{currentScene.id} //</span>
            <span>CSE · ARTIFICIAL INTELLIGENCE & MACHINE LEARNING</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="hidden sm:inline">AMS COLLEGE OF ENGINEERING</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#F7F5F0] leading-none">
              HI, I'M PRAVEEN.
            </h1>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E4E4E8] to-[#888894] leading-tight">
              {profileData.heroTagline}
            </h2>
          </div>

          {/* Short description */}
          <p className="text-base sm:text-lg text-[#C4C4C8] max-w-2xl leading-relaxed font-normal">
            {profileData.heroSubheadline}
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onExploreClick}
              className="px-6 py-3 bg-white text-[#0C0C0C] font-semibold text-xs sm:text-sm tracking-tight rounded hover:bg-[#EBEBEB] transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Explore My Work
            </button>

            <button
              type="button"
              onClick={onContactClick}
              className="px-6 py-3 bg-transparent text-[#F1F0EC] border border-white/25 hover:border-white hover:bg-white/5 font-semibold text-xs sm:text-sm tracking-tight rounded transition-all cursor-pointer active:scale-95"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: 4-Scene Narrative Switcher & Playback Controls */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* 4 Narrative Stages Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 flex-1 max-w-3xl">
            {heroScenes.map((scene, idx) => {
              const isActive = idx === activeSceneIndex;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => {
                    setActiveSceneIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`text-left p-2.5 rounded transition-all cursor-pointer border ${
                    isActive
                      ? "bg-white/10 border-white/40 text-white"
                      : "bg-white/5 border-white/5 text-[#888890] hover:text-[#C0C0C8] hover:bg-white/8"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span>STAGE {scene.stageNumber}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#4263EB]" />}
                  </div>
                  <div className="text-xs font-bold truncate">{scene.narrative}</div>
                  <div className="text-[10px] text-[#A0A0A8] truncate mt-0.5 hidden sm:block">
                    {scene.keywords.slice(0, 2).join(" · ")}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Video / Timeline Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? "Pause cinematic sequence" : "Play cinematic sequence"}
              className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleToggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onExploreClick}
              aria-label="Scroll to about section"
              className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-[#A0A0A8] hover:text-white transition-colors pl-2"
            >
              <span>SCROLL</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
