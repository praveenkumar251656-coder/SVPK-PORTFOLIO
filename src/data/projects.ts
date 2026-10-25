export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  status: "Prototype / In Progress" | "Concept / Prototype";
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  conceptualFeatures: string[];
  techStack: string[];
  currentStatusDetails: string;
  challengesAndLessons: string[];
  nextSteps: string[];
  colorAccent: string;
  demoAvailable: boolean;
  demoType: "trustlens" | "smart-edu" | "business" | "laptop";
  links?: {
    liveUrl?: string;
    repoUrl?: string;
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: "trustlens",
    number: "01",
    title: "TRUSTLENS",
    category: "AI-Assisted Digital Safety Concept",
    status: "Prototype / In Progress",
    tagline: "Exploring how technology could help users assess suspicious digital content and recognize online scams.",
    overview: "TrustLens explores how technology could help users assess suspicious digital content and recognize potential online scams or threats through guided heuristic and model-assisted checks.",
    problem: "As synthetic media, manipulated screenshots, and deceptive phishing messages become more pervasive, everyday users lack accessible, explainable tools to verify what they encounter before taking risky actions.",
    solution: "A prototype interface that accepts suspicious inputs (such as message text, suspicious links, and image screenshots) and runs simulated threat analysis heuristics, highlighting red flags and explainable warning signs in simple language.",
    conceptualFeatures: [
      "Suspicious content input (text, links, and simulated media upload)",
      "Multi-heuristic threat evaluation with simulated confidence metrics",
      "Explainable breakdowns highlighting warning signs (urgency triggers, spoofed domains, synthetic artifacts)",
      "Actionable safety recommendations for non-technical users"
    ],
    techStack: [
      "Python / Scikit-learn (heuristic modeling)",
      "React & TypeScript (interface prototype)",
      "Tailwind CSS (minimalist cybersecurity UI)",
      "Simulated Analysis Engine"
    ],
    currentStatusDetails: "Prototype currently running simulated inspection rules and keyword-frequency analysis for phishing text. Image and audio deepfake detection are in conceptual research phase with mock verification pipelines.",
    challengesAndLessons: [
      "Balancing accuracy vs. false alarms in text-based scam heuristics.",
      "Making warning messages calm, educational, and actionable rather than alarming or cryptic.",
      "Understanding the complexity of multimodal deepfake detection models and their compute requirements."
    ],
    nextSteps: [
      "Integrate lightweight client-side URL reputation lookup APIs.",
      "Experiment with small open-source transformer models fine-tuned on known phishing corpora.",
      "Design an educational quiz mode that tests user scam-spotting ability."
    ],
    colorAccent: "#EF4444",
    demoAvailable: true,
    demoType: "trustlens"
  },
  {
    id: "smart-education",
    number: "02",
    title: "SMART EDUCATION",
    category: "Personalized Diagnostic Learning Concept",
    status: "Prototype / In Progress",
    tagline: "A learning platform concept designed to help students identify knowledge gaps and explore personalized study paths.",
    overview: "A learning platform concept designed to help students identify knowledge gaps and explore personalized study plans based on diagnostic assessments rather than one-size-fits-all curricula.",
    problem: "Standard online courses present a uniform syllabus regardless of prior student knowledge, causing learners to waste time reviewing familiar topics or struggle when prerequisite foundations are missing.",
    solution: "A diagnostic assessment engine that maps concept dependencies as a directed knowledge graph. When a student completes a brief diagnostic quiz, the system isolates exact prerequisite gaps and adapts study recommendations accordingly.",
    conceptualFeatures: [
      "Adaptive diagnostic assessment with prerequisite dependency tracking",
      "Visual concept mastery map with clear gap identification",
      "Personalized module study path sequencing",
      "Progress tracking and review reminders for flagged topics"
    ],
    techStack: [
      "Python (graph dependency mapping)",
      "React & TypeScript (mastery radar & interactive syllabus)",
      "Graph Data Structures (prerequisite trees)"
    ],
    currentStatusDetails: "Prototype supports a curated Computer Science fundamentals question bank (Data Structures & Big-O) with diagnostic scoring and automated study plan generation. Full student database and multi-subject curricula are planned.",
    challengesAndLessons: [
      "Designing question rubrics that test genuine conceptual comprehension rather than rote syntax memorization.",
      "Modeling prerequisite relationships as a clean directed acyclic graph (DAG).",
      "Creating an encouraging visual representation of gaps without discouraging students."
    ],
    nextSteps: [
      "Expand question bank to include Object-Oriented Programming and Algorithms.",
      "Experiment with dynamic quiz generation using open LLM prompt templates.",
      "Build progress persistence across study sessions."
    ],
    colorAccent: "#3B82F6",
    demoAvailable: true,
    demoType: "smart-edu"
  },
  {
    id: "small-business-assistant",
    number: "03",
    title: "SMALL BUSINESS MANAGEMENT ASSISTANT",
    category: "Conversational Small-Business Productivity",
    status: "Concept / Prototype",
    tagline: "Exploring how small businesses could record everyday transactions through voice-to-text input and conversational workflows.",
    overview: "A simplified business-management concept exploring how small businesses could record everyday transactions through a conversational interface, including WhatsApp-style workflows and voice-to-text input.",
    problem: "Local shopkeepers and sole proprietors often find standard accounting software overwhelming, cluttered with complex double-entry menus, leading them to rely on disorganized paper notebooks or mental tallies.",
    solution: "A lightweight conversational transaction logger where a business owner can simply type or speak in natural phrasing (e.g., 'Sold 5 sacks of rice for 1200 rupees cash') to parse and organize entries into a daily ledger automatically.",
    conceptualFeatures: [
      "Natural conversational transaction input with regex/NLP parsing",
      "Simulated voice-to-text speech transcription pipeline",
      "Automatic categorization into sales, inventory purchases, or expenses",
      "Clean daily cash flow summary with exportable daily totals"
    ],
    techStack: [
      "JavaScript / Web Speech API (voice capture prototype)",
      "React & TypeScript (conversational chat & ledger interface)",
      "Tailwind CSS (responsive card layouts)"
    ],
    currentStatusDetails: "Conceptual prototype demonstrating text-based conversational parsing and simulated audio transcription. Financial calculations are simulated locally without third-party accounting platform connections.",
    challengesAndLessons: [
      "Parsing varied vernacular phrasing and informal numbers from mixed language inputs.",
      "Designing high-contrast, large-button mobile interfaces suitable for busy shop environments.",
      "Understanding strict accounting rules for transaction immutability and audit trails."
    ],
    nextSteps: [
      "Improve speech recognition handling for Indian regional accents and local currency slang.",
      "Add offline-first local storage support for areas with spotty network coverage.",
      "Build a simple receipt photo scanner using lightweight OCR."
    ],
    colorAccent: "#10B981",
    demoAvailable: true,
    demoType: "business"
  },
  {
    id: "laptop-recommendation",
    number: "04",
    title: "LAPTOP RECOMMENDATION TOOL",
    category: "Decision-Support Hardware Matching Concept",
    status: "Concept / Prototype",
    tagline: "Helping students and developers compare specifications and identify suitable devices based on requirements and budget.",
    overview: "A laptop recommendation concept intended to help users compare specifications and identify suitable devices based on their requirements and budget with explainable reasoning.",
    problem: "Evaluating modern laptops is confusing for students and non-hardware specialists: marketing jargon like CPU generations, thermal TDP limits, RAM upgradability, and GPU wattage often obscure whether a machine actually fits a specific workflow.",
    solution: "A transparent decision-support system that asks users about their primary workloads (e.g. AI model training, web development, video editing, lightweight coursework) and budget constraints, then scores curated laptop tiers with clear rationale for each recommendation.",
    conceptualFeatures: [
      "Workflow-driven requirement questionnaire (AI/ML, Dev, Media, Student)",
      "Transparent multi-criteria scoring algorithm (performance, battery, portability, value)",
      "Side-by-side specification radar and bottleneck explanations",
      "Curated device tier catalog with verified technical specifications"
    ],
    techStack: [
      "Python / pandas (data preprocessing and feature weighting)",
      "React & TypeScript (decision filter matrix & radar comparison)",
      "Tailwind CSS (clean spec comparison table)"
    ],
    currentStatusDetails: "Interactive prototype loaded with a verified catalog of popular developer laptops across budget, mid-range, and workstation categories. Pricing and spec data are curated reference baselines.",
    challengesAndLessons: [
      "Developing a scoring formula that does not over-prioritize raw peak benchmark numbers at the expense of battery life or build quality.",
      "Translating complex GPU/VRAM requirements for local AI experimentation into clear guidance for beginners.",
      "Designing responsive comparison cards that stay readable on mobile screens."
    ],
    nextSteps: [
      "Include refurbished and student discount tier tracking.",
      "Add custom hardware builder advice (RAM and NVMe SSD upgrade feasibility).",
      "Incorporate user benchmarks for popular developer tooling (Docker, VS Code, PyTorch compile times)."
    ],
    colorAccent: "#8B5CF6",
    demoAvailable: true,
    demoType: "laptop"
  }
];
