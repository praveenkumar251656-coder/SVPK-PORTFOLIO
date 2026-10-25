export interface ProfileData {
  name: string;
  shortName: string;
  degree: string;
  specialization: string;
  department: string;
  institution: string;
  graduationYear: number;
  currentYear: string;
  professionalIdentity: string;
  heroTagline: string;
  heroSubheadline: string;
  heroDescription: string;
  aboutText: string;
  careerObjective: string;
  personalityTraits: string[];
  principles: Array<{
    number: string;
    title: string;
    description: string;
  }>;
  photos: {
    portrait: string;
    banner: string;
  };
  contact: {
    email: string;
    emailDisplay: string;
    linkedIn: {
      url: string;
      handle: string;
      isConfigured: boolean;
    };
    github: {
      url: string;
      handle: string;
      isConfigured: boolean;
    };
    resume: {
      url: string;
      filename: string;
      isConfigured: boolean;
    };
    location: string;
  };
}

export const profileData: ProfileData = {
  name: "S.V. Praveen Kumar",
  shortName: "Praveen",
  degree: "Bachelor of Engineering (B.E.)",
  specialization: "Artificial Intelligence and Machine Learning",
  department: "Computer Science and Engineering",
  institution: "AMS College of Engineering",
  graduationYear: 2028,
  currentYear: "Undergraduate Student",
  professionalIdentity: "Aspiring AI/ML & Software Developer · Student Builder",
  heroTagline: "FROM CURIOSITY TO INTELLIGENCE.",
  heroSubheadline: "Exploring AI, building digital solutions, and turning ideas into working prototypes.",
  heroDescription: "A Computer Science student focused on learning machine learning fundamentals, rapid software prototyping, and turning everyday problems into practical applications.",
  aboutText: "I'm a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at AMS College of Engineering. I'm interested in how technology can solve practical problems, and I enjoy exploring ideas, experimenting with AI-powered tools, and building digital prototypes. I'm continuously developing my programming, problem-solving, and software development skills while working toward opportunities to contribute to real-world products.",
  careerObjective: "Seeking opportunities to learn, contribute, build practical solutions, and grow through internships and collaborative technical projects.",
  personalityTraits: [
    "Curious",
    "Ambitious",
    "Creative",
    "Growth-Oriented",
    "Experimenter"
  ],
  principles: [
    {
      number: "01",
      title: "STAY CURIOUS",
      description: "Learn new concepts, question assumptions, and explore possibilities with an open, analytical mind."
    },
    {
      number: "02",
      title: "BUILD TO LEARN",
      description: "Turn concepts into prototypes, test ideas through execution, and continuously improve through iteration."
    },
    {
      number: "03",
      title: "SOLVE REAL PROBLEMS",
      description: "Focus on making technology genuinely useful, understandable, and accessible for everyday situations."
    }
  ],
  photos: {
    portrait: "/assets/aistudio/abc_3c096142.jpeg",
    banner: "/assets/aistudio/pk_5b0b668f.jpeg"
  },
  contact: {
    email: "praveenkumar251656@gmail.com",
    emailDisplay: "praveenkumar251656@gmail.com",
    linkedIn: {
      url: "https://www.linkedin.com/in/praveen-kumar-s-v-188364432",
      handle: "praveen-kumar-s-v-188364432",
      isConfigured: true
    },
    github: {
      url: "https://github.com/praveenkumar251656-coder",
      handle: "praveenkumar251656-coder",
      isConfigured: true
    },
    resume: {
      url: "/api/resume/download",
      filename: "Praveen_Kumar_Resume.pdf",
      isConfigured: true
    },
    location: "Tamil Nadu, India"
  }
};
