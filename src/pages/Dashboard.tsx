import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateDashboardData, type DashboardData } from '../lib/recommendation';
import { getGamificationState, addXP, type GamificationState } from '../lib/gamification';
import { Sparkles, Briefcase, BarChart, Flag, CheckCircle, AlertTriangle, Star, Zap, Brain, ShieldCheck } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [gamification, setGamification] = useState<GamificationState | null>(null);
  const [aptitude, setAptitude] = useState<{logic: number, math: number, cs: number, problem_solving: number} | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('careerAssessment');
    if (!savedData) {
      navigate('/assessment');
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const dashboardInfo = generateDashboardData(parsed);
      setData(dashboardInfo);
      setAptitude(parsed.aptitudeScores || { logic: 0, math: 0, cs: 0, problem_solving: 0 });
      
      const gState = addXP(20);
      setGamification(gState);
    } catch (e) {
      navigate('/assessment');
    }
    
    const handleXPUpdate = () => {
      setGamification(getGamificationState(parseInt(localStorage.getItem('userXP') || '0', 10)));
    };
    
    window.addEventListener('xp_updated', handleXPUpdate);
    return () => window.removeEventListener('xp_updated', handleXPUpdate);
  }, [navigate]);

  if (!data || !aptitude) return null;

  return (
    <div className="dashboard-page animate-fade-in">
      <nav className="navbar">
        <div className="logo cursor-pointer" onClick={() => navigate('/')}>
          <Sparkles className="icon-accent" size={24} />
          <span>GuidanceAI Dashboard</span>
        </div>
        <div className="nav-links">
          <button className="btn-secondary" onClick={() => navigate('/explorer')}>Explorer</button>
          <button className="btn-secondary" onClick={() => navigate('/analyzer')}>Analyzer</button>
          <button className="btn-secondary" onClick={() => {
            localStorage.removeItem('careerAssessment');
            navigate('/assessment');
          }}>Retake</button>
        </div>
      </nav>

      <header className="dashboard-header animate-fade-in delay-1">
        <h1>Your Career Intelligence Report</h1>
        <p>Based on your unique profile, here is your personalized path forward.</p>
      </header>

      <main className="dashboard-grid">
        {/* Gamification Premium Card */}
        {gamification && (
          <section className="gamification-card glass-panel animate-fade-in delay-2">
            <div className="gamification-header">
              <div className="gamification-role">
                <div className="icon-wrapper" style={{ marginBottom: 0 }}>
                  <Star size={24} />
                </div>
                <div>
                  <div className="role-label">Primary Path</div>
                  <div className="role-title">{data.careers[0].title}</div>
                </div>
              </div>
              <div className="gamification-stats">
                <div className="level-badge">
                  <span className="level-name text-gradient">Lvl: {gamification.level}</span>
                </div>
                <div className="xp-badge">
                  <Zap size={16} color="#fbbf24" style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> 
                  {gamification.xp} XP
                </div>
              </div>
            </div>
            
            <div className="badges-container" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
               <span className="achievement-badge"><ShieldCheck size={14} color="#10b981"/> Aptitude Explorer</span>
               {gamification.xp >= 100 && <span className="achievement-badge"><ShieldCheck size={14} color="#3b82f6"/> Skill Builder</span>}
               {gamification.xp >= 250 && <span className="achievement-badge"><ShieldCheck size={14} color="#8b5cf6"/> Career Analyst</span>}
            </div>

            <div className="gamification-progress-wrapper" style={{ marginTop: '1.5rem' }}>
              <div className="progress-header">
                <span>Progress to {gamification.nextLevelXp} XP</span>
                <span>{gamification.progressPercent}%</span>
              </div>
              <div className="progress-bar-container" style={{height: '8px'}}>
                <div className="progress-fill" style={{ width: `${gamification.progressPercent}%`, background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}></div>
              </div>
            </div>
          </section>
        )}

        {/* Aptitude Result Container */}
        <section className="section-container animate-fade-in delay-2">
           <h2 className="section-title">
            <Brain className="section-icon" /> Aptitude Profile
          </h2>
          <div className="aptitude-panel glass-panel">
            <div className="aptitude-grid">
               <AptitudeBar label="Logical Reasoning" score={aptitude.logic} color="#8b5cf6" />
               <AptitudeBar label="Mathematics" score={aptitude.math} color="#3b82f6" />
               <AptitudeBar label="Computer Science" score={aptitude.cs} color="#10b981" />
               <AptitudeBar label="Problem Solving" score={aptitude.problem_solving} color="#f59e0b" />
            </div>
          </div>
        </section>

        {/* Top 3 Careers */}
        <section className="section-container animate-fade-in delay-2">
          <h2 className="section-title">
            <Briefcase className="section-icon" /> Top Career Matches
          </h2>
          <div className="careers-grid">
            {data.careers.map((career, idx) => (
              <div key={idx} className="career-card glass-panel">
                <div className="career-header">
                  <span className="career-title">{career.title}</span>
                  <span className="match-badge">{career.matchPercentage}% Match</span>
                </div>
                <p className="career-desc">{career.description}</p>
                {career.relatedCareers && career.relatedCareers.length > 0 && (
                  <div className="related-careers">
                    <strong>Related:</strong>
                    <div className="related-tags">
                      {career.relatedCareers.map(rc => <span key={rc} className="related-tag">{rc}</span>)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skill Gap Analyzer */}
        <section className="section-container animate-fade-in delay-3">
          <h2 className="section-title">
            <BarChart className="section-icon" /> Skill Gap Analyzer
          </h2>
          <div className="skills-analyzer glass-panel">
            <div className="skill-list" style={{marginBottom: '1rem'}}>
              <h4><CheckCircle size={18} color="#10b981" /> Known Skills</h4>
              <div className="skill-tags">
                {data.skillGap.known.map(s => <span key={s} className="skill-tag known">{s}</span>)}
              </div>
            </div>
            
            <div className="skill-list" style={{marginBottom: '1.5rem'}}>
              <h4><AlertTriangle size={18} color="#ef4444" /> Missing Skills</h4>
              <div className="skill-tags">
                {data.skillGap.missing.map(s => <span key={s} className="skill-tag missing">{s}</span>)}
              </div>
            </div>

            <div className="progress-wrapper">
              <div className="progress-header">
                <span>Overall Readiness: {data.skillGap.progress}%</span>
                <span>Next Priority: <span className="priority-highlight">{data.skillGap.nextPriority}</span></span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-fill" style={{ width: `${data.skillGap.progress}%` }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Roadmap */}
        <section className="section-container animate-fade-in delay-3">
          <h2 className="section-title">
            <Flag className="section-icon" /> Your Smart Roadmap
          </h2>
          <div className="roadmap-container glass-panel">
            {data.roadmap.map((step, idx) => (
              <div key={idx} className="roadmap-step">
                <div className="step-marker">{step.step}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function AptitudeBar({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="aptitude-bar-wrapper">
      <div className="aptitude-bar-header">
        <span>{label}</span>
        <span>{score}%</span>
      </div>
      <div className="progress-bar-container" style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
         <div className="progress-fill" style={{ width: `${score}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );
}
