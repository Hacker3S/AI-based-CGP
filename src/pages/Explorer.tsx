import { Link } from 'react-router-dom';
import { Sparkles, Database, Shield, Cloud, PenTool, Code, Server, Briefcase } from 'lucide-react';
import { CAREER_DATASET } from '../lib/dataset';
import './Explorer.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  data_science: <Database size={24} />,
  devops: <Server size={24} />,
  cybersecurity: <Shield size={24} />,
  cloud_engineer: <Cloud size={24} />,
  ui_ux: <PenTool size={24} />,
  software_dev: <Code size={24} />,
  business_analyst: <Briefcase size={24} />
};

export default function Explorer() {

  return (
    <div className="explorer-page animate-fade-in">
      <nav className="navbar">
        <Link to="/" className="logo cursor-pointer">
          <Sparkles className="icon-accent" size={24} />
          <span>GuidanceAI Explorer</span>
        </Link>
        <div className="nav-links">
          <Link to="/analyzer" className="btn-secondary">Resume Analyzer</Link>
          <Link to="/dashboard" className="btn-primary">Dashboard</Link>
        </div>
      </nav>

      <header className="explorer-header animate-fade-in delay-1">
        <h1>Career Explorer</h1>
        <p>Discover the highest-demand tech roles and map out the required tools, future growth, and subject expectations for each specialization.</p>
      </header>

      <main className="explorer-grid animate-fade-in delay-2">
        {Object.entries(CAREER_DATASET).map(([id, career]) => (
          <div key={id} className="explorer-card glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-title">
              <div className="card-icon">{ICON_MAP[id] || <Code size={24} />}</div>
              {career.title}
            </div>
            
            <p className="career-description" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {career.description}
            </p>
            
            <div className="card-stats" style={{ flexGrow: 1 }}>
              <div className="stat-row">
                <span className="stat-label">Market Demand</span>
                <span className={career.demand === 'High' ? 'badge-high' : 'badge-med'}>{career.demand}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Future Growth</span>
                <span className="text-gradient" style={{fontSize: '0.85rem', fontWeight: 600, textAlign: 'right'}}>{career.futureGrowth}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Industry Trend</span>
                <span style={{fontSize: '0.85rem', textAlign: 'right', color: 'var(--text-main)', maxWidth: '60%'}}>{career.industryTrend}</span>
              </div>
              
              <div className="stat-row" style={{ alignItems: 'flex-start', marginTop: '0.5rem' }}>
                <span className="stat-label">Subject Relevance</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', alignItems: 'flex-end', fontSize: '0.8rem' }}>
                   {Object.entries(career.subjectRelevance).map(([sub, req]) => (
                     <div key={sub} style={{display: 'flex', gap: '0.5rem'}}>
                       <span style={{color: 'var(--text-muted)'}}>{sub.replace('_', ' ')}:</span> 
                       <span style={{color: req === 'High' || req === 'Very High' ? '#10b981' : 'var(--text-main)'}}>{req}</span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="stat-row" style={{ alignItems: 'flex-start', marginTop: '0.5rem' }}>
                <span className="stat-label">Core Tools</span>
                <div className="tools-list">
                  {career.tools.map(t => <span key={t} className="tool-tag">{t}</span>)}
                </div>
              </div>
              <div className="stat-row" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                <span className="stat-label">Learning Curve</span>
                <span className={career.difficulty === 'Hard' ? 'badge-hard' : 'badge-med'}>{career.difficulty}</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
