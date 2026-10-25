export interface HeroScene {
  id: number;
  stageName: string;
  stageNumber: string;
  title: string;
  narrative: string;
  description: string;
  /**
   * The source path for this Google Flow video.
   * Drop your video files into the public/videos/ folder or adjust this path.
   */
  videoSrc: string;
  /** Fallback video poster or keyframe */
  posterSrc?: string;
  /** Accent hue in degrees for the procedural flow field shader */
  accentHue: number;
  /** Particle dynamics profile for procedural fallback */
  dynamicMode: "turbulent" | "convergent" | "neural" | "constructive";
  /** Descriptive keywords for this narrative stage */
  keywords: string[];
}

export const heroScenes: HeroScene[] = [
  {
    id: 1,
    stageNumber: "01",
    stageName: "Curiosity",
    title: "THE IMPULSE TO QUESTION",
    narrative: "Curiosity",
    description: "The initial spark to understand how computational systems behave, how algorithms process input, and why modern technologies work.",
    videoSrc: "/videos/flow-curiosity.mp4",
    posterSrc: "/images/poster-curiosity.jpg",
    accentHue: 215, // Restrained cobalt
    dynamicMode: "turbulent",
    keywords: ["Questions", "Wonder", "First Principles", "Investigation"]
  },
  {
    id: 2,
    stageNumber: "02",
    stageName: "Exploration",
    title: "ACTIVE EXPERIMENTATION",
    narrative: "Exploration",
    description: "Diving into code, testing hypotheses, rapid prototyping, and discovering insights through trial and iterative failure.",
    videoSrc: "/videos/flow-exploration.mp4",
    posterSrc: "/images/poster-exploration.jpg",
    accentHue: 230, // Deeper royal blue
    dynamicMode: "convergent",
    keywords: ["Trial", "Refinement", "Prototyping", "Discovery"]
  },
  {
    id: 3,
    stageNumber: "03",
    stageName: "Intelligence",
    title: "FROM PATTERNS TO STRUCTURE",
    narrative: "Intelligence",
    description: "Introducing machine learning concepts, neural patterns, structured architectures, and turning raw data into coherent understanding.",
    videoSrc: "/videos/flow-intelligence.mp4",
    posterSrc: "/images/poster-intelligence.jpg",
    accentHue: 250, // Subtle violet-blue
    dynamicMode: "neural",
    keywords: ["Neural Weights", "Pattern Recognition", "Logic", "Synthesis"]
  },
  {
    id: 4,
    stageNumber: "04",
    stageName: "Creation",
    title: "PRACTICAL SOLUTIONS",
    narrative: "Creation",
    description: "Channeling machine learning and software engineering into tangible digital tools that solve genuine everyday problems.",
    videoSrc: "/videos/flow-creation.mp4",
    posterSrc: "/images/poster-creation.jpg",
    accentHue: 210, // Electric cyan-blue
    dynamicMode: "constructive",
    keywords: ["Applications", "Human Utility", "Clean Interfaces", "Execution"]
  }
];
