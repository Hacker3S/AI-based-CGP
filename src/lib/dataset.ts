export type QuestionCategory = 'logic' | 'math' | 'cs' | 'problem_solving';

export interface Question {
  id: string;
  category: QuestionCategory;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const APTITUDE_QUESTIONS: Question[] = [
  // Logical Reasoning
  {
    id: 'l1',
    category: 'logic',
    text: 'What number should come next in the pattern: 2, 4, 8, 16, ...?',
    options: ['24', '32', '64', '20'],
    correctAnswer: 1
  },
  {
    id: 'l2',
    category: 'logic',
    text: 'If all Zorgs are Borks, and some Borks are Snargs, which of these must be true?',
    options: ['All Zorgs are Snargs', 'Some Zorgs might be Snargs', 'No Zorgs are Snargs', 'All Snargs are Borks'],
    correctAnswer: 1
  },
  
  // Mathematics Readiness
  {
    id: 'm1',
    category: 'math',
    text: 'If a server reduces latency by 20%, and the original latency was 50ms, what is the new latency?',
    options: ['30ms', '40ms', '45ms', '20ms'],
    correctAnswer: 1
  },
  {
    id: 'm2',
    category: 'math',
    text: 'What is the value of x if 3x + 12 = 27?',
    options: ['3', '5', '7', '4'],
    correctAnswer: 1
  },

  // Computer Science Readiness
  {
    id: 'cs1',
    category: 'cs',
    text: 'Which data structure follows the Last In, First Out (LIFO) principle?',
    options: ['Queue', 'Tree', 'Stack', 'Array'],
    correctAnswer: 2
  },
  {
    id: 'cs2',
    category: 'cs',
    text: 'What is the primary purpose of an algorithm?',
    options: ['To store data', 'To solve a specific problem logically', 'To compile code', 'To design an interface'],
    correctAnswer: 1
  },

  // Problem Solving
  {
    id: 'ps1',
    category: 'problem_solving',
    text: 'Your application suddenly crashes only when users upload large files. Where do you look first?',
    options: ['CSS Styling', 'Memory limits and backend processing', 'User passwords', 'Text input fields'],
    correctAnswer: 1
  },
  {
    id: 'ps2',
    category: 'problem_solving',
    text: 'If a project is behind schedule, which is usually the most effective immediate step?',
    options: ['Add more features', 'Work 24/7 without sleep', 'Re-prioritize and cut non-critical features', 'Change the programming language'],
    correctAnswer: 2
  }
];

export interface CareerContext {
  title: string;
  demand: string;
  difficulty: string;
  futureGrowth: string;
  industryTrend: string;
  tools: string[];
  subjectRelevance: {
    logic: string;
    math: string;
    cs: string;
    problem_solving: string;
  };
  description: string;
  relatedCareers: string[];
  roadmapStages: {
    foundation: string;
    practice: string;
    project: string;
    portfolio: string;
  };
}

export const CAREER_DATASET: Record<string, CareerContext> = {
  data_science: {
    title: "Data Science",
    demand: "High",
    difficulty: "Hard",
    futureGrowth: "Very High - Driven by AI trends",
    industryTrend: "Moving from basic analytics to predictive AI models",
    tools: ["Python", "SQL", "Pandas", "Scikit", "Tableau"],
    description: "Analyze complex data sets to build predictive models and help organizations make informed decisions.",
    relatedCareers: ["AI Engineer", "ML Engineer", "Business Analyst"],
    subjectRelevance: { logic: "High", math: "High", cs: "Medium", problem_solving: "High" },
    roadmapStages: {
      foundation: "Master Python syntax and basic statistics.",
      practice: "Manipulate datasets using Pandas and write complex SQL queries.",
      project: "Predict housing prices or customer churn using Kaggle datasets.",
      portfolio: "Build an end-to-end dashboard deployed on cloud showing live API predictions."
    }
  },
  devops: {
    title: "DevOps Engineer",
    demand: "High",
    difficulty: "Hard",
    futureGrowth: "High - Continuous integration standardizing globally",
    industryTrend: "Shift towards containerization and infrastructure as code",
    tools: ["Docker", "Kubernetes", "Linux", "CI/CD", "AWS/Terraform"],
    description: "Automate and secure infrastructure, bridging the gap between developers and IT operations.",
    relatedCareers: ["Cloud Engineer", "SRE", "SysAdmin"],
    subjectRelevance: { logic: "High", math: "Low", cs: "High", problem_solving: "High" },
    roadmapStages: {
      foundation: "Get comfortable strictly using Linux terminal and basic networking.",
      practice: "Write bash scripts and containerize a simple app using Docker.",
      project: "Build a CI/CD pipeline using GitHub Actions to deploy to AWS.",
      portfolio: "Configure a multi-tier Kubernetes cluster with automated rollback."
    }
  },
  cybersecurity: {
    title: "Cybersecurity Analyst",
    demand: "High",
    difficulty: "Hard",
    futureGrowth: "Very High - Increased digital threats",
    industryTrend: "Focus on proactive threat hunting and zero-trust architectures",
    tools: ["Kali Linux", "Wireshark", "Networking", "Python/Bash", "SIEM tools"],
    description: "Protect systems and networks from digital attacks and unauthorized access.",
    relatedCareers: ["Penetration Tester", "Security Engineer", "Forensics Analyst"],
    subjectRelevance: { logic: "High", math: "Low", cs: "High", problem_solving: "Very High" },
    roadmapStages: {
      foundation: "Understand TCP/IP, OSI model, and basic Linux administration.",
      practice: "Analyze network traffic with Wireshark and practice on HackTheBox.",
      project: "Write a custom Python script to scan for open network ports.",
      portfolio: "Publish a detailed vulnerability assessment report of a test environment."
    }
  },
  software_dev: {
    title: "Software Developer",
    demand: "High",
    difficulty: "Medium",
    futureGrowth: "High - Expanding into web3, AI agents, and mobile",
    industryTrend: "Full-stack capabilities and AI assisted coding",
    tools: ["JavaScript", "React", "Node.js", "Git", "REST APIs"],
    description: "Build robust frontend and backend applications fulfilling user requirements.",
    relatedCareers: ["Frontend Engineer", "Backend Engineer", "Fullstack Developer"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "High", problem_solving: "High" },
    roadmapStages: {
      foundation: "Learn core JavaScript, HTML, and CSS thoroughly.",
      practice: "Build interactive components in React and connect a Node.js backend.",
      project: "Create a full CRUD application (like a task manager) with user authentication.",
      portfolio: "Deploy a live SaaS-style web app with a database and clean UI."
    }
  },
  cloud_engineer: {
    title: "Cloud Computing Engineer",
    demand: "High",
    difficulty: "Medium",
    futureGrowth: "High - Digital transformation in enterprise",
    industryTrend: "Multi-cloud architectures and serverless computing",
    tools: ["AWS/Azure", "Terraform", "Serverless", "Linux"],
    description: "Design and maintain secure, scalable cloud infrastructure.",
    relatedCareers: ["Cloud Architect", "DevOps Engineer", "Backend Developer"],
    subjectRelevance: { logic: "High", math: "Low", cs: "High", problem_solving: "Medium" },
    roadmapStages: {
      foundation: "Understand virtualization, networking, and basic cloud concepts.",
      practice: "Deploy virtual machines and configure load balancers manually.",
      project: "Host a scalable website purely using Serverless functions (AWS Lambda).",
      portfolio: "Use Terraform to spawn an entire infrastructure environment consistently."
    }
  },
  ui_ux: {
    title: "UI/UX Designer",
    demand: "Medium",
    difficulty: "Medium",
    futureGrowth: "Medium - High demand for highly skilled accessible design",
    industryTrend: "Data-driven design decisions and micro-animations",
    tools: ["Figma", "User Research", "Wireframing", "CSS Basics"],
    description: "Design intuitive and beautiful user interfaces driven by user psychology.",
    relatedCareers: ["Product Designer", "Frontend Developer", "UX Researcher"],
    subjectRelevance: { logic: "Medium", math: "Low", cs: "Low", problem_solving: "High" },
    roadmapStages: {
      foundation: "Study color theory, typography, and basic user psychology.",
      practice: "Replicate 5 popular apps pixel-perfectly in Figma.",
      project: "Conduct user interviews and design a solution for a real-world annoyance.",
      portfolio: "Publish 3 comprehensive case studies showing the journey from problem to prototype."
    }
  },
  business_analyst: {
    title: "Business Analyst",
    demand: "Medium",
    difficulty: "Medium",
    futureGrowth: "Stable",
    industryTrend: "Bridging the gap between technical execution and business goals",
    tools: ["Excel", "SQL", "JIRA", "Agile", "Tableau"],
    description: "Analyze business processes and document technical requirements to improve efficiency.",
    relatedCareers: ["Product Manager", "Data Analyst", "Scrum Master"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "Low", problem_solving: "High" },
    roadmapStages: {
      foundation: "Understand Agile methodologies and basic business metrics.",
      practice: "Write detailed user stories and practice SQL querying.",
      project: "Analyze a public business dataset to find cost-saving opportunities.",
      portfolio: "Create a comprehensive requirement document for a theoretical app feature."
    }
  }
};
