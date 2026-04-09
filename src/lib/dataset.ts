export type QuestionCategory = 'logic' | 'math' | 'cs' | 'problem_solving';

export interface Question {
  id: string;
  category: QuestionCategory;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const APTITUDE_QUESTIONS: Question[] = [
  { id: 'l1', category: 'logic', text: 'What number should come next in the pattern: 2, 4, 8, 16, ...?', options: ['24', '32', '64', '20'], correctAnswer: 1 },
  { id: 'l2', category: 'logic', text: 'If all Zorgs are Borks, and some Borks are Snargs, which must be true?', options: ['All Zorgs are Snargs', 'Some Zorgs might be Snargs', 'No Zorgs are Snargs', 'All Snargs are Borks'], correctAnswer: 1 },
  { id: 'm1', category: 'math', text: 'If a server reduces latency by 20%, and the original latency was 50ms, what is the new latency?', options: ['30ms', '40ms', '45ms', '20ms'], correctAnswer: 1 },
  { id: 'm2', category: 'math', text: 'What is the value of x if 3x + 12 = 27?', options: ['3', '5', '7', '4'], correctAnswer: 1 },
  { id: 'cs1', category: 'cs', text: 'Which data structure follows Last In, First Out (LIFO)?', options: ['Queue', 'Tree', 'Stack', 'Array'], correctAnswer: 2 },
  { id: 'cs2', category: 'cs', text: 'What is the primary purpose of an algorithm?', options: ['To store data', 'To solve a specific problem', 'To compile code', 'To design'], correctAnswer: 1 },
  { id: 'ps1', category: 'problem_solving', text: 'Your app crashes only when users upload large files. Where do you look first?', options: ['CSS', 'Memory/Backend', 'Passwords', 'Fields'], correctAnswer: 1 },
  { id: 'ps2', category: 'problem_solving', text: 'A project is behind schedule. What is the immediate step?', options: ['Add features', 'Work 24/7', 'Prioritize core features', 'Change languages'], correctAnswer: 2 }
];

export interface CareerContext {
  title: string;
  category: string;
  demand: string;
  difficulty: string;
  futureGrowth: string;
  industryTrend: string;
  tools: string[];
  subjectRelevance: { logic: string; math: string; cs: string; problem_solving: string };
  description: string;
  relatedCareers: string[];
  roadmapStages: { foundation: string; practice: string; project: string; portfolio: string };
}

export const CAREER_DATASET: Record<string, CareerContext> = {
  // SOFTWARE & ENGINEERING (9)
  software_developer: {
    title: "Software Developer", category: "Software / Engineering", demand: "High", difficulty: "Medium", futureGrowth: "High", industryTrend: "AI assisted coding", tools: ["JavaScript", "React", "Node.js", "Git"],
    description: "Build robust frontend and backend applications.", relatedCareers: ["Frontend Developer", "Backend Developer"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Learn core JS/HTML/CSS.", practice: "Build React components.", project: "CRUD app.", portfolio: "Live SaaS web app." }
  },
  backend_developer: {
    title: "Backend Developer", category: "Software / Engineering", demand: "High", difficulty: "High", futureGrowth: "High", industryTrend: "Microservices", tools: ["Python", "Java", "Node.js", "SQL"],
    description: "Build logic and databases powering applications.", relatedCareers: ["Software Developer", "Data Engineer"],
    subjectRelevance: { logic: "High", math: "High", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Learn a backend language.", practice: "Create REST APIs.", project: "Build an auth system.", portfolio: "Microservice architecture deployment." }
  },
  frontend_developer: {
    title: "Frontend Developer", category: "Software / Engineering", demand: "High", difficulty: "Medium", futureGrowth: "High", industryTrend: "Component driven UI", tools: ["React", "Vue", "CSS", "TypeScript"],
    description: "Create interactive user interfaces.", relatedCareers: ["UI Designer", "Full Stack Developer"],
    subjectRelevance: { logic: "Medium", math: "Low", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Master HTML/CSS/JS.", practice: "State management in React.", project: "Dashboard UI.", portfolio: "Complex responsive web app." }
  },
  full_stack: {
    title: "Full Stack Developer", category: "Software / Engineering", demand: "Very High", difficulty: "High", futureGrowth: "High", industryTrend: "End-to-end serverless", tools: ["MERN/PERN", "Next.js", "Docker"],
    description: "Handle both server and client side code.", relatedCareers: ["Software Developer", "DevOps Engineer"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Frontend & Backend basics.", practice: "Connect API to UI.", project: "Full platform clone.", portfolio: "Deployed enterprise app." }
  },
  mobile_dev: {
    title: "Mobile App Developer", category: "Software / Engineering", demand: "Medium", difficulty: "Medium", futureGrowth: "High", industryTrend: "Cross-platform development", tools: ["React Native", "Flutter", "Swift"],
    description: "Develop apps for iOS and Android.", relatedCareers: ["Frontend Developer", "UI Designer"],
    subjectRelevance: { logic: "High", math: "Low", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Learn mobile UI patterns.", practice: "Manage device state/APIs.", project: "Weather app.", portfolio: "Published app on store." }
  },
  embedded_engineer: {
    title: "Embedded Engineer", category: "Software / Engineering", demand: "Medium", difficulty: "Very High", futureGrowth: "High", industryTrend: "IoT integration", tools: ["C", "C++", "RTOS", "Hardware Debugging"],
    description: "Program logic for hardware devices.", relatedCareers: ["IoT Engineer", "Robotics Engineer"],
    subjectRelevance: { logic: "High", math: "High", cs: "Very High", problem_solving: "High" },
    roadmapStages: { foundation: "Learn C/C++ memory mechanics.", practice: "Arduino programming.", project: "Sensor integrations.", portfolio: "Custom board implementation." }
  },
  game_dev: {
    title: "Video Game Developer", category: "Software / Engineering", demand: "Medium", difficulty: "High", futureGrowth: "Medium", industryTrend: "Unreal/Unity platforms", tools: ["C#", "C++", "Unity", "Unreal"],
    description: "Develop interactive gaming experiences.", relatedCareers: ["Graphics Programmer", "Software Developer"],
    subjectRelevance: { logic: "High", math: "High", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Learn OOP concepts.", practice: "Build 2D mechanics.", project: "Platformer game.", portfolio: "Published indie project." }
  },
  qa_engineer: {
    title: "QA Automation Engineer", category: "Software / Engineering", demand: "Medium", difficulty: "Medium", futureGrowth: "High", industryTrend: "CI/CD automated testing", tools: ["Selenium", "Cypress", "Python"],
    description: "Write code to automatically test applications.", relatedCareers: ["Software Developer", "DevOps Engineer"],
    subjectRelevance: { logic: "High", math: "Low", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Manual testing concepts.", practice: "Write unit tests.", project: "UI automation script.", portfolio: "E2E testing pipeline." }
  },
  systems_programmer: {
    title: "Systems Programmer", category: "Software / Engineering", demand: "Medium", difficulty: "Very High", futureGrowth: "Stable", industryTrend: "Rust adoption", tools: ["Rust", "C", "Linux"],
    description: "Build operating systems and low-level tools.", relatedCareers: ["Embedded Engineer", "Backend Developer"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "Very High", problem_solving: "Very High" },
    roadmapStages: { foundation: "Memory management.", practice: "Linux kernel basics.", project: "Custom CLI tool.", portfolio: "Open source system contribution." }
  },

  // DATA & AI (9)
  data_scientist: {
    title: "Data Scientist", category: "Data / AI", demand: "Very High", difficulty: "Hard", futureGrowth: "Very High", industryTrend: "Predictive modeling", tools: ["Python", "SQL", "Pandas", "Scikit-Learn"],
    description: "Build predictive models and analyze complex data.", relatedCareers: ["AI Engineer", "ML Engineer"],
    subjectRelevance: { logic: "High", math: "Very High", cs: "Medium", problem_solving: "High" },
    roadmapStages: { foundation: "Stats & Python.", practice: "Data manipulation.", project: "Predictive model.", portfolio: "Live API for predictions." }
  },
  data_analyst: {
    title: "Data Analyst", category: "Data / AI", demand: "High", difficulty: "Medium", futureGrowth: "High", industryTrend: "Data visualization storytelling", tools: ["SQL", "Excel", "Tableau", "PowerBI"],
    description: "Turn raw data into actionable business insights.", relatedCareers: ["Business Analyst", "Data Scientist"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "Low", problem_solving: "High" },
    roadmapStages: { foundation: "SQL syntax.", practice: "Data cleaning.", project: "Dashboard creation.", portfolio: "Comprehensive data report." }
  },
  ml_engineer: {
    title: "ML Engineer", category: "Data / AI", demand: "Very High", difficulty: "Very High", futureGrowth: "Very High", industryTrend: "LLMs and Transformers", tools: ["PyTorch", "TensorFlow", "Python"],
    description: "Deploy and optimize machine learning models at scale.", relatedCareers: ["Data Scientist", "AI Engineer"],
    subjectRelevance: { logic: "High", math: "Very High", cs: "High", problem_solving: "Very High" },
    roadmapStages: { foundation: "Calculus & Algebra.", practice: "Train neural networks.", project: "Image classifier.", portfolio: "Model deployed on AWS." }
  },
  ai_engineer: {
    title: "AI Engineer", category: "Data / AI", demand: "Very High", difficulty: "High", futureGrowth: "Exponential", industryTrend: "Generative AI Agents", tools: ["OpenAI API", "Python", "LangChain"],
    description: "Build applications powered by cognitive AI technologies.", relatedCareers: ["ML Engineer", "Software Developer"],
    subjectRelevance: { logic: "High", math: "High", cs: "High", problem_solving: "Very High" },
    roadmapStages: { foundation: "Understand GenAI APIs.", practice: "Prompt engineering & RAG.", project: "Custom chatbot.", portfolio: "Multi-agent autonomous system." }
  },
  business_analyst: {
    title: "Business Analyst", category: "Data / AI", demand: "Medium", difficulty: "Medium", futureGrowth: "Stable", industryTrend: "Data-backed decision making", tools: ["Excel", "JIRA", "SQL"],
    description: "Extract requirements and connect tech with business.", relatedCareers: ["Product Manager", "Data Analyst"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "Low", problem_solving: "High" },
    roadmapStages: { foundation: "Agile methods.", practice: "Requirements gathering.", project: "Process optimization doc.", portfolio: "Full business case study." }
  },
  data_engineer: {
    title: "Data Engineer", category: "Data / AI", demand: "High", difficulty: "High", futureGrowth: "High", industryTrend: "Cloud data pipelines (Snowflake/dbt)", tools: ["SQL", "Spark", "Airflow", "Python"],
    description: "Build the infrastructure for data generation.", relatedCareers: ["Backend Developer", "Data Scientist"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Advanced SQL.", practice: "ETL pipelines.", project: "Scrape and clean data.", portfolio: "Automated daily cloud data pipeline." }
  },
  nlp_engineer: {
    title: "NLP Engineer", category: "Data / AI", demand: "High", difficulty: "Very High", futureGrowth: "High", industryTrend: "Large Language Models", tools: ["Python", "HuggingFace", "PyTorch"],
    description: "Process and understand human language using AI.", relatedCareers: ["ML Engineer", "AI Engineer"],
    subjectRelevance: { logic: "High", math: "High", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Text processing basics.", practice: "Sentiment analysis.", project: "Custom text summarizer.", portfolio: "Fine-tuned LLM deployment." }
  },
  cv_engineer: {
    title: "Computer Vision Engineer", category: "Data / AI", demand: "Medium", difficulty: "Very High", futureGrowth: "High", industryTrend: "Autonomous systems", tools: ["OpenCV", "Python", "C++"],
    description: "Enable computers to extract information from digital images.", relatedCareers: ["ML Engineer", "Robotics Engineer"],
    subjectRelevance: { logic: "High", math: "Very High", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Image matrix math.", practice: "Object detection API.", project: "Facial recognition.", portfolio: "Real-time edge device vision app." }
  },
  research_analyst: {
    title: "Research Analyst", category: "Data / AI", demand: "Low", difficulty: "Medium", futureGrowth: "Stable", industryTrend: "Automated data harvesting", tools: ["Excel", "Python script", "Statistics"],
    description: "Gather and evaluate data to find industry trends.", relatedCareers: ["Data Analyst", "Business Analyst"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "Low", problem_solving: "High" },
    roadmapStages: { foundation: "Research methodologies.", practice: "Data compilation.", project: "Market report.", portfolio: "Published industry analysis." }
  },

  // CLOUD & INFRASTRUCTURE (6)
  cloud_engineer: {
    title: "Cloud Engineer", category: "Cloud / Infrastructure", demand: "High", difficulty: "Medium", futureGrowth: "High", industryTrend: "Multi-cloud", tools: ["AWS/Azure", "Linux", "Networking"],
    description: "Design and maintain secure cloud infrastructure.", relatedCareers: ["DevOps Engineer", "Cloud Architect"],
    subjectRelevance: { logic: "High", math: "Low", cs: "High", problem_solving: "Medium" },
    roadmapStages: { foundation: "Cloud provider basics.", practice: "Deploy VMs.", project: "Serverless web app.", portfolio: "Auto-scaling infrastructure." }
  },
  devops: {
    title: "DevOps Engineer", category: "Cloud / Infrastructure", demand: "High", difficulty: "Hard", futureGrowth: "High", industryTrend: "Infrastructure as Code", tools: ["Docker", "Kubernetes", "Linux", "CI/CD"],
    description: "Automate and secure infrastructure implementations.", relatedCareers: ["Cloud Engineer", "SRE"],
    subjectRelevance: { logic: "High", math: "Low", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Linux fundamentals.", practice: "Dockerize apps.", project: "GitHub Actions CI.", portfolio: "Full K8s cluster automation." }
  },
  sre: {
    title: "Site Reliability Engineer", category: "Cloud / Infrastructure", demand: "High", difficulty: "Very High", futureGrowth: "High", industryTrend: "Observability", tools: ["Go/Python", "Grafana", "Prometheus"],
    description: "Apply software engineering to operations to ensure system reliability.", relatedCareers: ["DevOps Engineer", "Backend Developer"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "Very High", problem_solving: "Very High" },
    roadmapStages: { foundation: "System tracing.", practice: "Monitor setup.", project: "Chaos engineering test.", portfolio: "Production SLI/SLO dashboard." }
  },
  platform_engineer: {
    title: "Platform Engineer", category: "Cloud / Infrastructure", demand: "Medium", difficulty: "High", futureGrowth: "High", industryTrend: "Internal Developer Portals", tools: ["Kubernetes", "Terraform", "Go"],
    description: "Build internal tools to help developers deploy faster.", relatedCareers: ["DevOps Engineer", "Software Developer"],
    subjectRelevance: { logic: "High", math: "Low", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "IaC concepts.", practice: "Build deployment scripts.", project: "Internal CLI tool.", portfolio: "Automated environment provisioner." }
  },
  cloud_architect: {
    title: "Cloud Architect", category: "Cloud / Infrastructure", demand: "Medium", difficulty: "Very High", futureGrowth: "High", industryTrend: "Zero-trust networks", tools: ["AWS", "Enterprise Architecture", "Security"],
    description: "Design enterprise-scale cloud adoption strategies.", relatedCareers: ["Cloud Engineer", "Technical Consultant"],
    subjectRelevance: { logic: "Very High", math: "Low", cs: "High", problem_solving: "Very High" },
    roadmapStages: { foundation: "System design.", practice: "Cost optimization.", project: "Migration plan.", portfolio: "Complex enterprise architecture diagram." }
  },
  infra_specialist: {
    title: "Infrastructure Specialist", category: "Cloud / Infrastructure", demand: "Low", difficulty: "Medium", futureGrowth: "Declining", industryTrend: "Moving to cloud", tools: ["VMware", "Windows Server", "Cisco"],
    description: "Maintain physical and virtual private servers.", relatedCareers: ["System Administrator", "Cloud Engineer"],
    subjectRelevance: { logic: "Medium", math: "Low", cs: "Medium", problem_solving: "High" },
    roadmapStages: { foundation: "Hardware tracking.", practice: "Hypervisor setup.", project: "Local network DNS.", portfolio: "On-prem to cloud migration plan." }
  },

  // CYBERSECURITY (6)
  cyber_analyst: {
    title: "Cybersecurity Analyst", category: "Cybersecurity", demand: "High", difficulty: "Hard", futureGrowth: "Very High", industryTrend: "AI threat hunting", tools: ["Networks", "Linux", "SIEM"],
    description: "Protect systems from digital attacks.", relatedCareers: ["Security Engineer", "SOC Analyst"],
    subjectRelevance: { logic: "High", math: "Low", cs: "High", problem_solving: "Very High" },
    roadmapStages: { foundation: "OSI model.", practice: "Packet analysis.", project: "Port scanning script.", portfolio: "Vulnerability analysis report." }
  },
  security_engineer: {
    title: "Security Engineer", category: "Cybersecurity", demand: "High", difficulty: "Very High", futureGrowth: "High", industryTrend: "DevSecOps", tools: ["Python", "AWS Security", "AppSec"],
    description: "Implement secure network solutions and code.", relatedCareers: ["Cybersecurity Analyst", "DevOps Engineer"],
    subjectRelevance: { logic: "High", math: "Low", cs: "Very High", problem_solving: "High" },
    roadmapStages: { foundation: "Cryptography basics.", practice: "Secure code review.", project: "Automated scanner.", portfolio: "Implemented DevSecOps pipeline." }
  },
  soc_analyst: {
    title: "SOC Analyst", category: "Cybersecurity", demand: "High", difficulty: "Medium", futureGrowth: "High", industryTrend: "24/7 managed detection", tools: ["Splunk", "Crowdstrike", "Logs"],
    description: "First line of defense analyzing security alerts.", relatedCareers: ["Cybersecurity Analyst", "Network Engineer"],
    subjectRelevance: { logic: "High", math: "Low", cs: "Medium", problem_solving: "High" },
    roadmapStages: { foundation: "Log analysis.", practice: "Alert triage.", project: "SIEM setup.", portfolio: "Incident Response Playbook." }
  },
  ethical_hacker: {
    title: "Ethical Hacker", category: "Cybersecurity", demand: "Medium", difficulty: "Very High", futureGrowth: "High", industryTrend: "Bug bounties", tools: ["Burp Suite", "Metasploit", "Kali"],
    description: "Legally probe systems to find vulnerabilities.", relatedCareers: ["Cybersecurity Analyst", "Security Engineer"],
    subjectRelevance: { logic: "Very High", math: "Low", cs: "High", problem_solving: "Very High" },
    roadmapStages: { foundation: "Web protocols.", practice: "CTF challenges.", project: "Exploit dev.", portfolio: "Bug bounty write-ups." }
  },
  infosec_manager: {
    title: "InfoSec Manager", category: "Cybersecurity", demand: "Low", difficulty: "Medium", futureGrowth: "Stable", industryTrend: "Compliance requirements", tools: ["GRC", "Policies", "Risk Assessment"],
    description: "Manage security policies and compliance.", relatedCareers: ["Technical Consultant", "Project Manager"],
    subjectRelevance: { logic: "High", math: "Low", cs: "Low", problem_solving: "High" },
    roadmapStages: { foundation: "Security frameworks.", practice: "Risk matrix.", project: "Compliance audit.", portfolio: "Disaster Recovery Plan." }
  },
  cryptographer: {
    title: "Cryptographer", category: "Cybersecurity", demand: "Low", difficulty: "Very High", futureGrowth: "Medium", industryTrend: "Post-quantum encryption", tools: ["Math", "C++", "Python"],
    description: "Develop algorithms to hide data securely.", relatedCareers: ["Blockchain Developer", "Data Scientist"],
    subjectRelevance: { logic: "Very High", math: "Very High", cs: "High", problem_solving: "Very High" },
    roadmapStages: { foundation: "Number theory.", practice: "Implement AES.", project: "Custom cipher.", portfolio: "Cryptographic protocol review." }
  },

  // NETWORKING (4)
  network_engineer: {
    title: "Network Engineer", category: "Networking", demand: "Medium", difficulty: "Medium", futureGrowth: "Stable", industryTrend: "Software-defined networking", tools: ["Cisco", "BGP/OSPF", "Wireshark"],
    description: "Setup and maintain physical and wireless networks.", relatedCareers: ["System Administrator", "Cloud Engineer"],
    subjectRelevance: { logic: "High", math: "Low", cs: "Medium", problem_solving: "High" },
    roadmapStages: { foundation: "TCP/IP layers.", practice: "Subnetting.", project: "Router config.", portfolio: "Enterprise network topology." }
  },
  sys_admin: {
    title: "System Administrator", category: "Networking", demand: "High", difficulty: "Medium", futureGrowth: "Declining", industryTrend: "Automation scripts", tools: ["Linux", "Active Directory", "Powershell"],
    description: "Manage user accounts, servers, and daily IT operations.", relatedCareers: ["Network Engineer", "DevOps Engineer"],
    subjectRelevance: { logic: "Medium", math: "Low", cs: "Medium", problem_solving: "High" },
    roadmapStages: { foundation: "OS administration.", practice: "Shell scripting.", project: "Automated backups.", portfolio: "Server configuration management." }
  },
  network_architect: {
    title: "Network Architect", category: "Networking", demand: "Low", difficulty: "High", futureGrowth: "Stable", industryTrend: "Zero trust architecture", tools: ["Design", "Visio", "Routing"],
    description: "Design long-term networking strategies for enterprises.", relatedCareers: ["Network Engineer", "Cloud Architect"],
    subjectRelevance: { logic: "High", math: "Low", cs: "Medium", problem_solving: "Very High" },
    roadmapStages: { foundation: "Advanced routing.", practice: "Topology design.", project: "Scaling simulation.", portfolio: "Global network blueprint." }
  },
  telecom_specialist: {
    title: "Telecommunications Specialist", category: "Networking", demand: "Low", difficulty: "Medium", futureGrowth: "Declining", industryTrend: "5G integration", tools: ["VoIP", "Radio Freq", "Cabling"],
    description: "Maintain communication systems like phone and video networks.", relatedCareers: ["Network Engineer", "IoT Engineer"],
    subjectRelevance: { logic: "Medium", math: "Medium", cs: "Low", problem_solving: "Medium" },
    roadmapStages: { foundation: "Signal transmission.", practice: "VoIP setup.", project: "PBX configuration.", portfolio: "Communication systems audit." }
  },

  // PRODUCT & MANAGEMENT (5)
  product_manager: {
    title: "Product Manager", category: "Product / Management", demand: "High", difficulty: "Medium", futureGrowth: "High", industryTrend: "Product-led growth", tools: ["JIRA", "Figma", "Data Tools"],
    description: "Lead the vision, design, and roadmap of a software product.", relatedCareers: ["Product Analyst", "Business Analyst"],
    subjectRelevance: { logic: "High", math: "Low", cs: "Low", problem_solving: "Very High" },
    roadmapStages: { foundation: "Agile processes.", practice: "Write PRDs.", project: "User research.", portfolio: "Complete product strategy roadmap." }
  },
  product_analyst: {
    title: "Product Analyst", category: "Product / Management", demand: "Medium", difficulty: "Medium", futureGrowth: "High", industryTrend: "Behavioral analytics", tools: ["Mixpanel", "SQL", "Excel"],
    description: "Analyze user behaviors to suggest product improvements.", relatedCareers: ["Data Analyst", "Product Manager"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "Low", problem_solving: "High" },
    roadmapStages: { foundation: "Metrics tracking.", practice: "Funnel analysis.", project: "A/B testing.", portfolio: "Product conversion optimization report." }
  },
  tech_consultant: {
    title: "Technical Consultant", category: "Product / Management", demand: "High", difficulty: "High", futureGrowth: "High", industryTrend: "Digital transformation advising", tools: ["Presentations", "Business Logic"],
    description: "Advise companies on leveraging technology for business goals.", relatedCareers: ["Cloud Architect", "Product Manager"],
    subjectRelevance: { logic: "High", math: "Low", cs: "Medium", problem_solving: "Very High" },
    roadmapStages: { foundation: "Business systems.", practice: "Gap analysis.", project: "Pitch deck.", portfolio: "Client tech strategy recommendation." }
  },
  scrum_master: {
    title: "Scrum Master", category: "Product / Management", demand: "Medium", difficulty: "Low", futureGrowth: "Stable", industryTrend: "Agile at scale", tools: ["JIRA", "Confluence", "Soft Skills"],
    description: "Facilitate agile development processes for engineering teams.", relatedCareers: ["Project Manager", "Product Manager"],
    subjectRelevance: { logic: "High", math: "Low", cs: "Low", problem_solving: "Medium" },
    roadmapStages: { foundation: "Scrum framework.", practice: "Sprint planning.", project: "Velocity tracking.", portfolio: "Agile transformation guide." }
  },
  project_manager: {
    title: "Project Manager", category: "Product / Management", demand: "High", difficulty: "Medium", futureGrowth: "Stable", industryTrend: "Remote team coordination", tools: ["Asana", "Gantt", "Resource Management"],
    description: "Ensure projects are delivered on time and within budget.", relatedCareers: ["Scrum Master", "Business Analyst"],
    subjectRelevance: { logic: "High", math: "Low", cs: "Low", problem_solving: "High" },
    roadmapStages: { foundation: "Project lifecycles.", practice: "Budgeting.", project: "Risk management.", portfolio: "End-to-end project timeline." }
  },

  // DESIGN (4)
  ui_designer: {
    title: "UI Designer", category: "Design", demand: "High", difficulty: "Medium", futureGrowth: "Medium", industryTrend: "Design systems", tools: ["Figma", "Sketch", "Prototyping"],
    description: "Create visually stunning and intuitive interfaces.", relatedCareers: ["UX Designer", "Frontend Developer"],
    subjectRelevance: { logic: "Medium", math: "Low", cs: "Low", problem_solving: "Medium" },
    roadmapStages: { foundation: "Color/Typography.", practice: "Wireframes.", project: "App redesign.", portfolio: "High-fidelity prototype." }
  },
  ux_designer: {
    title: "UX Designer", category: "Design", demand: "High", difficulty: "Medium", futureGrowth: "High", industryTrend: "Accessibility first", tools: ["Figma", "User Testing", "Personas"],
    description: "Optimize the logical flow and experience of digital products.", relatedCareers: ["UI Designer", "Product Designer"],
    subjectRelevance: { logic: "High", math: "Low", cs: "Low", problem_solving: "High" },
    roadmapStages: { foundation: "User psychology.", practice: "Journey mapping.", project: "Usability study.", portfolio: "Research-backed UX case study." }
  },
  product_designer: {
    title: "Product Designer", category: "Design", demand: "High", difficulty: "High", futureGrowth: "High", industryTrend: "UX/UI mixed roles", tools: ["Figma", "Business Sense"],
    description: "Handle the entire design process from user research to final pixels.", relatedCareers: ["UX Designer", "Product Manager"],
    subjectRelevance: { logic: "High", math: "Low", cs: "Low", problem_solving: "Very High" },
    roadmapStages: { foundation: "Design thinking.", practice: "Rapid prototyping.", project: "New feature design.", portfolio: "End-to-end product design portfolio." }
  },
  graphics_programmer: {
    title: "Graphics Programmer", category: "Design", demand: "Low", difficulty: "Very High", futureGrowth: "High", industryTrend: "WebGPU / WebGL", tools: ["C++", "OpenGL", "Shaders"],
    description: "Write code that renders visual elements on screen optimally.", relatedCareers: ["Video Game Developer", "Software Developer"],
    subjectRelevance: { logic: "High", math: "Very High", cs: "Very High", problem_solving: "High" },
    roadmapStages: { foundation: "Linear Algebra.", practice: "Write Shaders.", project: "3D Rendering Engine.", portfolio: "Custom WebGL visualizer." }
  },

  // EMERGING FIELDS (4)
  blockchain_dev: {
    title: "Blockchain Developer", category: "Emerging Fields", demand: "Medium", difficulty: "High", futureGrowth: "Variable", industryTrend: "Smart Contracts / DeFi", tools: ["Solidity", "Rust", "Web3.js"],
    description: "Build decentralized applications and smart contracts.", relatedCareers: ["Software Developer", "Backend Developer"],
    subjectRelevance: { logic: "High", math: "High", cs: "Very High", problem_solving: "High" },
    roadmapStages: { foundation: "Cryptography basics.", practice: "Write smart contracts.", project: "NFT Minting.", portfolio: "DeFi dApp deployed on testnet." }
  },
  ar_vr_dev: {
    title: "AR/VR Developer", category: "Emerging Fields", demand: "Medium", difficulty: "High", futureGrowth: "High", industryTrend: "Spatial Computing (Apple/Meta)", tools: ["Unity", "C#", "3D Math"],
    description: "Develop immersive virtual and augmented reality experiences.", relatedCareers: ["Video Game Developer", "Software Developer"],
    subjectRelevance: { logic: "High", math: "High", cs: "High", problem_solving: "Medium" },
    roadmapStages: { foundation: "3D rendering basics.", practice: "Unity ARKit.", project: "Virtual showroom.", portfolio: "Published AR application." }
  },
  iot_engineer: {
    title: "IoT Engineer", category: "Emerging Fields", demand: "Medium", difficulty: "High", futureGrowth: "High", industryTrend: "Smart home / Industrial", tools: ["C", "Python", "MQTT", "Hardware"],
    description: "Connect physical devices to the digital cloud.", relatedCareers: ["Embedded Engineer", "Network Engineer"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "High", problem_solving: "High" },
    roadmapStages: { foundation: "Sensors & Circuits.", practice: "Send data via MQTT.", project: "Smart weather station.", portfolio: "End-to-end IoT cloud dashboard." }
  },
  robotics_engineer: {
    title: "Robotics Engineer", category: "Emerging Fields", demand: "Low", difficulty: "Very High", futureGrowth: "High", industryTrend: "AI powered autonomous robots", tools: ["ROS", "C++", "Python", "Simulations"],
    description: "Design software that controls robotic mechanisms.", relatedCareers: ["IoT Engineer", "AI Engineer"],
    subjectRelevance: { logic: "High", math: "Very High", cs: "High", problem_solving: "Very High" },
    roadmapStages: { foundation: "Kinematics math.", practice: "ROS node programming.", project: "Obstacle avoidance.", portfolio: "Simulated autonomous navigation." }
  },

  // BUSINESS + HYBRID (3)
  digital_analyst: {
    title: "Digital Analyst", category: "Business + Hybrid", demand: "High", difficulty: "Medium", futureGrowth: "Stable", industryTrend: "Marketing automation analytics", tools: ["Google Analytics", "SEO", "Excel"],
    description: "Analyze web traffic and digital marketing metrics.", relatedCareers: ["Data Analyst", "Product Analyst"],
    subjectRelevance: { logic: "Medium", math: "Medium", cs: "Low", problem_solving: "Medium" },
    roadmapStages: { foundation: "Digital marketing concepts.", practice: "Tag Management.", project: "Campaign ROI analysis.", portfolio: "Web traffic optimization report." }
  },
  operations_analyst: {
    title: "Operations Analyst", category: "Business + Hybrid", demand: "Medium", difficulty: "Medium", futureGrowth: "Stable", industryTrend: "Process mining", tools: ["Excel", "Tableau", "Process Mapping"],
    description: "Evaluate company operations to increase efficiency.", relatedCareers: ["Business Analyst", "Data Analyst"],
    subjectRelevance: { logic: "High", math: "Medium", cs: "Low", problem_solving: "High" },
    roadmapStages: { foundation: "Business operations.", practice: "Workflow mapping.", project: "Bottleneck identification.", portfolio: "Cost reduction strategy document." }
  },
  tech_sales: {
    title: "Tech Sales Engineer", category: "Business + Hybrid", demand: "High", difficulty: "Low", futureGrowth: "High", industryTrend: "Solution architecture selling", tools: ["CRM", "Product Demos", "Communication"],
    description: "Sell complex tech solutions by understanding client needs technically.", relatedCareers: ["Technical Consultant", "Business Analyst"],
    subjectRelevance: { logic: "Medium", math: "Low", cs: "Low", problem_solving: "High" },
    roadmapStages: { foundation: "Sales methodologies.", practice: "Tech product mastery.", project: "Mock pitch presentation.", portfolio: "Solution architecture proposal." }
  }
};
