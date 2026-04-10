import { CAREER_DATASET, type CareerContext } from './dataset';

export interface CareerRecommendation {
  id: string;
  title: string;
  matchPercentage: number;
  description: string;
  relatedCareers: string[];
}

export interface SkillGap {
  known: string[];
  missing: string[];
  nextPriority: string;
  progress: number; // 0 to 100
}

export interface RoadmapStep {
  step: number;
  title: string;
  description: string;
}

export interface DashboardData {
  careers: CareerRecommendation[];
  skillGap: SkillGap;
  roadmap: RoadmapStep[];
}

export interface UserFormData {
  interests: string[];
  skills: string[];
  strongSubjects: string[];
  aptitudeScores: { logic: number; math: number; cs: number; problem_solving: number };
}

export function generateDashboardData(formData: UserFormData): DashboardData {
  const interests: string[] = formData?.interests || [];
  const skills: string[] = formData?.skills || [];
  const strongSubjects: string[] = formData?.strongSubjects || [];
  const aptitude = formData?.aptitudeScores || { logic: 0, math: 0, cs: 0, problem_solving: 0 };

  // Calculate scores for all careers
  const careerMatches: { id: string, data: CareerContext, score: number }[] = [];

  for (const [id, data] of Object.entries(CAREER_DATASET)) {
    let score = 0;

    // Base match from aptitude (translating High/Medium/Low relevance to score weights)
    const weights: Record<string, number> = { High: 3, VeryHigh: 3, Medium: 2, Low: 1 };
    
    score += (aptitude.logic / 100) * (weights[data.subjectRelevance.logic] || 1) * 10;
    score += (aptitude.math / 100) * (weights[data.subjectRelevance.math] || 1) * 10;
    score += (aptitude.cs / 100) * (weights[data.subjectRelevance.cs] || 1) * 10;
    score += (aptitude.problem_solving / 100) * (weights[data.subjectRelevance.problem_solving] || 1) * 10;

    // Bonus for strong subjects
    if (strongSubjects.includes('Mathematics') && data.subjectRelevance.math === 'High') score += 15;
    if (strongSubjects.includes('Computer Science') && data.subjectRelevance.cs === 'High') score += 15;
    if (strongSubjects.includes('Logical Reasoning') && data.subjectRelevance.logic === 'High') score += 15;
    
    // Bonus for exact domain/interest match (heuristic)
    if (id === 'data_science' && interests.includes('Data Science')) score += 20;
    if (id === 'ui_ux' && interests.includes('Design')) score += 20;
    if (id === 'software_dev' && interests.includes('Programming')) score += 20;

    careerMatches.push({ id, data, score });
  }

  // Sort and pick top 3
  careerMatches.sort((a, b) => b.score - a.score);
  const topMatches = careerMatches.slice(0, 3);

  // Normalize match percentages
  const maxScore = topMatches[0]?.score || 100;
  const recommendedCareers: CareerRecommendation[] = topMatches.map((match, idx) => {
    // 1st is always highest, normalize it to 90-98%
    const normalizedScore = idx === 0 ? 95 : Math.round((match.score / maxScore) * 90);
    return {
      id: match.id,
      title: match.data.title,
      matchPercentage: normalizedScore,
      description: match.data.description,
      relatedCareers: match.data.relatedCareers
    };
  });

  const primaryCareerData = topMatches[0].data;

  // Gap Analysis against top career's required tools
  const requiredTools = primaryCareerData.tools;
  const known = requiredTools.filter(t => skills.some(s => t.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(t.toLowerCase())));
  const missing = requiredTools.filter(t => !known.includes(t));
  
  if (known.length === 0 && skills.length > 0) {
    known.push(skills[0]); // fallback so it doesnt look fully empty
  }

  const nextPriority = missing.length > 0 ? missing[0] : "Advanced Projects";
  let progress = Math.round((known.length / requiredTools.length) * 100);
  if (progress < 15) progress = 15;
  if (progress > 90) progress = 90;

  // Dynamic Roadmap generated from dataset explicitly
  const roadmap: RoadmapStep[] = [
    { step: 1, title: "Foundation", description: primaryCareerData.roadmapStages.foundation },
    { step: 2, title: "Practice", description: primaryCareerData.roadmapStages.practice },
    { step: 3, title: "Project", description: primaryCareerData.roadmapStages.project },
    { step: 4, title: "Portfolio", description: primaryCareerData.roadmapStages.portfolio }
  ];

  return {
    careers: recommendedCareers,
    skillGap: {
      known: known.length > 0 ? known : ["Basic Computer Literacy"],
      missing,
      nextPriority,
      progress
    },
    roadmap
  };
}
