import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateDashboardData, type DashboardData } from '../lib/recommendation';
import { getGamificationState, type GamificationState } from '../lib/gamification';
import { MockDB, type UserProfile, type UserCareerState } from '../lib/db';
import Roadmap from '../components/Roadmap';
import { Sparkles, Briefcase, BarChart, Flag, CheckCircle, AlertTriangle, Star, Zap, Brain, ShieldCheck, LogOut, RefreshCw } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [state, setState] = useState<UserCareerState | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [gamification, setGamification] = useState<GamificationState | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const currentUser = MockDB.getCurrentUser();
      if (!currentUser) {
        navigate('/auth');
        return;
      }
      setUser(currentUser);

      const userState = await MockDB.getUserState(currentUser.id);
      if (!userState || userState.assessmentsCompleted === 0) {
        navigate('/assessment');
        return;
      }
      setState(userState);

      // We pass the user state as mapping to formData
      const pData = generateDashboardData({
        interests: userState.interests,
        strongSubjects: userState.strongSubjects,
        skills: userState.knownSkills,
        aptitudeScores: userState.aptitude
      });
      setData(pData);
      setGamification(getGamificationState(userState.xp));
    };

    loadData();
  }, [navigate]);

  const handleLogout = async () => {
    await MockDB.logoutUser();
    navigate('/auth');
  };

  const handleToggleRoadmapStep = async (stepId: number) => {
    if (!state || !user) return;
    const newProgress = { ...state.roadmapProgress };
    if (newProgress[stepId]) {
      delete newProgress[stepId];
    } else {
      newProgress[stepId] = true;
    }
    
    // Optimistic UI update
    setState({ ...state, roadmapProgress: newProgress });
    await MockDB.updateUserState(user.id, { roadmapProgress: newProgress });
  };

  if (!user || !state || !data || !gamification) {
    return <div className="loading-screen">Loading Intelligence Engine...</div>;
  }

  const { aptitude } = state;

  return (
    <div className="dashboard-page animate-fade-in">
      <nav className="navbar container">
        <div className="logo cursor-pointer" onClick={() => navigate('/')}>
          <Sparkles className="icon-accent" size={24} />
          <span>GuidanceAI Dashboard</span>
        </div>
        <div className="nav-links">
          <button className="btn-secondary" onClick={() => navigate('/explorer')}>Explorer</button>
          <button className="btn-secondary" onClick={() => navigate('/analyzer')}>Analyzer</button>
          <button className="btn-secondary logout-btn" onClick={handleLogout}><LogOut size={16}/> Logout</button>
        </div>
      </nav>

      <div className="container">
        <header className="dashboard-header animate-fade-in delay-1">
          <div className="header-flex">
            <div>
              <h1>Welcome back, <span className="text-gradient">{user.name}</span></h1>
              <p>Your intelligent career pathway based on your unique profile.</p>
            </div>
            <button className="btn-primary flex items-center gap-2" onClick={() => navigate('/assessment')}>
              <RefreshCw size={16} /> Update Skills & Re-analyze
            </button>
          </div>
        </header>

        <main className="dashboard-grid">
          {/* Main User Overview Panel */}
          <section className="gamification-card glass-panel animate-fade-in delay-2">
            <div className="gamification-header">
              <div className="gamification-role">
                <div className="icon-wrapper" style={{ marginBottom: 0 }}>
                  <Star size={24} />
                </div>
                <div>
                  <div className="role-label">Highest Match Pathway</div>
                  <div className="role-title">{data.careers[0].title}</div>
                </div>
              </div>
              <div className="gamification-stats">
                <div className="level-badge">
                  <span className="level-name text-gradient">Level {gamification.level}</span>
                </div>
                <div className="xp-badge">
                  <Zap size={16} color="#fbbf24" style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> 
                  {gamification.xp} XP
                </div>
              </div>
            </div>
            
            <div className="badges-container" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
               <span className="achievement-badge"><ShieldCheck size={14} color="#10b981"/> Active Learner</span>
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

          {/* Aptitude Panel */}
          <section className="section-container animate-fade-in delay-2">
             <h2 className="section-title">
              <Brain className="section-icon" /> Cognitive Profile
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

          {/* Career Recommendations row */}
          <section className="section-container full-width animate-fade-in delay-2">
            <h2 className="section-title">
              <Briefcase className="section-icon" /> AI-Recommended Roles
            </h2>
            <div className="careers-grid">
              {data.careers.map((career, idx) => (
                <div key={idx} className="career-card glass-panel" style={idx === 0 ? { border: '1px solid var(--border-focus)', transform: 'scale(1.02)' } : {}}>
                  <div className="career-header">
                    <span className="career-title">{career.title}</span>
                    <span className="match-badge" style={idx === 0 ? { background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' } : {}}>{career.matchPercentage}% Match</span>
                  </div>
                  <p className="career-desc">{career.description}</p>
                  {career.relatedCareers && career.relatedCareers.length > 0 && (
                    <div className="related-careers">
                      <strong>Explore Alternates:</strong>
                      <div className="related-tags">
                        {career.relatedCareers.map(rc => <span key={rc} className="related-tag">{rc}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skill Gap and Roadmap row */}
          <div className="dashboard-two-col animate-fade-in delay-3">
            <section className="section-container">
              <h2 className="section-title">
                <BarChart className="section-icon" /> Technical Skill Engine
              </h2>
              <div className="skills-analyzer glass-panel">
                <div className="skill-list" style={{marginBottom: '1rem'}}>
                  <h4><CheckCircle size={18} color="#10b981" /> Acquired Skills</h4>
                  <div className="skill-tags">
                    {data.skillGap.known.map(s => <span key={s} className="skill-tag known">{s}</span>)}
                  </div>
                </div>
                
                <div className="skill-list" style={{marginBottom: '1.5rem'}}>
                  <h4><AlertTriangle size={18} color="#ef4444" /> Required Skills</h4>
                  <div className="skill-tags">
                    {data.skillGap.missing.map(s => <span key={s} className="skill-tag missing">{s}</span>)}
                  </div>
                </div>

                <div className="progress-wrapper" style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div className="progress-header">
                    <span>Role Readiness</span>
                    <span><span className="priority-highlight">Priority: {data.skillGap.nextPriority}</span></span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-fill" style={{ width: `${data.skillGap.progress}%`, background: 'var(--gradient-btn)' }}></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-container">
              <h2 className="section-title">
                <Flag className="section-icon" /> Intelligent Learning Roadmap
              </h2>
              <div className="glass-panel" style={{ padding: '0 1.5rem' }}>
                <Roadmap 
                  roadmap={data.roadmap} 
                  progress={state.roadmapProgress} 
                  onToggleStep={handleToggleRoadmapStep} 
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function AptitudeBar({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="aptitude-bar-wrapper">
      <div className="aptitude-bar-header">
        <span>{label}</span>
        <span>{score < 10 ? 'Evaluating' : `${score}%`}</span>
      </div>
      <div className="progress-bar-container" style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
         <div className="progress-fill" style={{ width: `${score}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );
}
