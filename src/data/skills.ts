export interface SkillCategory {
  title: string;
  description: string;
  items: Array<{
    name: string;
    stage: "Core Foundation" | "Actively Learning" | "Explored in Projects";
    notes?: string;
  }>;
}

export const skillsData: SkillCategory[] = [
  {
    title: "Programming & Fundamentals",
    description: "The analytical foundations and core programming skills that support software engineering.",
    items: [
      {
        name: "Python Fundamentals",
        stage: "Core Foundation",
        notes: "Primary language for algorithmic problem-solving, data manipulation, and ML scripts."
      },
      {
        name: "Data Structures & Algorithms",
        stage: "Actively Learning",
        notes: "Arrays, linked lists, trees, graphs, sorting algorithms, and complexity analysis."
      },
      {
        name: "Object-Oriented Programming",
        stage: "Core Foundation",
        notes: "Encapsulation, inheritance, polymorphism, and modular class design."
      },
      {
        name: "Computer Science Fundamentals",
        stage: "Actively Learning",
        notes: "Operating systems concepts, memory management, and computational logic."
      }
    ]
  },
  {
    title: "AI & Emerging Technologies",
    description: "Concepts and methodologies in intelligent systems, machine learning, and generative models.",
    items: [
      {
        name: "AI & ML Concepts",
        stage: "Actively Learning",
        notes: "Supervised & unsupervised learning, classification, regression, and model evaluation."
      },
      {
        name: "Generative AI Tools & Prompting",
        stage: "Explored in Projects",
        notes: "Prompt design, multimodal inputs, reasoning chains, and API workflows."
      },
      {
        name: "AI-Assisted Prototyping",
        stage: "Explored in Projects",
        notes: "Rapid interface generation, iterative code synthesis, and architectural validation."
      }
    ]
  },
  {
    title: "Development Tools & Environments",
    description: "Tools, version control, and creative development platforms used for building and testing ideas.",
    items: [
      {
        name: "Git & GitHub",
        stage: "Core Foundation",
        notes: "Version control, branching workflows, repository management, and code tracking."
      },
      {
        name: "Google Antigravity & Google Flow",
        stage: "Explored in Projects",
        notes: "Exploration of Google's creative agent workflows and generative flow scene animations."
      },
      {
        name: "VS Code & Modern AI Tooling",
        stage: "Core Foundation",
        notes: "Integrated development environments, debugging extensions, and terminal workflows."
      },
      {
        name: "React & TypeScript Exploration",
        stage: "Actively Learning",
        notes: "Component-based web architecture, typed interfaces, and reactive UI state."
      }
    ]
  }
];

export interface FocusArea {
  number: string;
  title: string;
  tagline: string;
  description: string;
  keyTopics: string[];
}

export const focusAreasData: FocusArea[] = [
  {
    number: "01",
    title: "ARTIFICIAL INTELLIGENCE & MACHINE LEARNING",
    tagline: "Exploring intelligent systems and practical machine learning applications.",
    description: "Investigating how models recognize patterns in complex data, how evaluation metrics guide training, and how machine learning can automate repetitive or difficult cognitive tasks.",
    keyTopics: ["Pattern Recognition", "Feature Engineering", "Supervised Learning", "Model Evaluation"]
  },
  {
    number: "02",
    title: "SOFTWARE DEVELOPMENT",
    tagline: "Building solid programming foundations and application architecture.",
    description: "Focusing on writing clean, readable, modular code. Transforming theoretical algorithm solutions into stable scripts and interactive client-side applications.",
    keyTopics: ["Modular Code", "Clean Interfaces", "Error Handling", "Component Hierarchies"]
  },
  {
    number: "03",
    title: "AI-POWERED PROTOTYPING",
    tagline: "Accelerating concept-to-prototype workflows using modern AI tools.",
    description: "Leveraging generative agents, code synthesis, and intelligent assistance to draft early-stage UI layouts, test mock backend logic, and validate user experience concepts rapidly.",
    keyTopics: ["Fast Iteration", "Workflow Automation", "Proof of Concepts", "Feedback Loops"]
  },
  {
    number: "04",
    title: "COMPUTER SCIENCE FUNDAMENTALS",
    tagline: "Strengthening core theoretical and algorithmic pillars.",
    description: "Deepening understanding of time and space complexity, relational database schemas, memory allocation, and operating system principles essential for engineering scalable software.",
    keyTopics: ["Data Structures & Algorithms", "DBMS & SQL", "Operating Systems", "Computational Logic"]
  },
  {
    number: "05",
    title: "PRODUCT THINKING & PROBLEM-SOLVING",
    tagline: "Designing digital tools that solve genuine, relatable human problems.",
    description: "Approaching problems from the user's perspective: identifying friction in daily routines, designing straightforward interfaces, and keeping software accessible for non-technical users.",
    keyTopics: ["User Centricity", "Friction Reduction", "Explainable Tech", "Accessibility"]
  }
];

export interface EducationData {
  degree: string;
  specialization: string;
  institution: string;
  period: string;
  status: string;
  description: string;
  courseworkAreas: Array<{
    name: string;
    focus: string;
  }>;
}

export const educationData: EducationData = {
  degree: "Bachelor of Engineering (B.E.) in Computer Science and Engineering",
  specialization: "Specialization in Artificial Intelligence and Machine Learning",
  institution: "AMS College of Engineering",
  period: "2024 — 2028 (Expected)",
  status: "Undergraduate Student · Enrolled",
  description: "Pursuing rigorous undergraduate coursework combining foundational computer science disciplines with specialized artificial intelligence and machine learning theory and lab practices.",
  courseworkAreas: [
    { name: "Data Structures & Algorithms", focus: "Algorithmic thinking, complexity analysis, trees & graphs" },
    { name: "Object-Oriented Programming", focus: "Design patterns, classes, inheritance, modularity" },
    { name: "Database Management Systems", focus: "Relational models, SQL, indexing, database normalization" },
    { name: "Operating Systems", focus: "Process management, memory virtualization, concurrency" },
    { name: "Artificial Intelligence", focus: "Search strategies, knowledge representation, heuristics" },
    { name: "Machine Learning", focus: "Supervised/unsupervised algorithms, regression, classification" },
    { name: "Deep Learning Foundations", focus: "Neural network fundamentals, backpropagation, activation functions" },
    { name: "Natural Language Processing", focus: "Text tokenization, vector embeddings, sequence models" }
  ]
};
