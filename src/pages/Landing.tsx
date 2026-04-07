import { useNavigate } from 'react-router-dom';
import { Sparkles, Route, Target, Trophy, Bot } from 'lucide-react';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <nav className="navbar container animate-fade-in">
        <div className="logo">
          <Sparkles className="icon-accent" size={24} />
          <span>GuidanceAI</span>
        </div>
        <div className="nav-links">
          <button className="btn-secondary" onClick={() => navigate('/explorer')}>Career Explorer</button>
          <button className="btn-primary" onClick={() => navigate('/assessment')}>Get Started</button>
        </div>
      </nav>

      <main>
        <section className="hero container animate-fade-in delay-1">
          <div className="badge">
            <Sparkles size={16} /> Beta Access
          </div>
          <h1 className="hero-title">
            Smart Career Decisions Powered by <br className="hidden sm:block"/>
            <span className="text-gradient">Intelligent Guidance</span>
          </h1>
          <p className="hero-subtitle">
            Stop guessing your future. Our AI-driven platform helps students discover
            suitable careers with gamified learning roadmaps and precise skill gap analysis.
          </p>
          <div className="hero-cta">
            <button className="btn-primary btn-lg" onClick={() => navigate('/assessment')}>
              Start Assessment
            </button>
            <button className="btn-secondary btn-lg" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
              Explore Features
            </button>
          </div>
        </section>

        <section className="features-section container animate-fade-in delay-2">
          <div className="section-head">
            <h2>Why students love us</h2>
            <p>Navigating the transition from education to career has never been easier.</p>
          </div>
          <div className="features-grid">
            <FeatureCard 
              icon={<Target size={32} />} 
              title="Career Recommendation" 
              desc="Data-driven path matching based on your unique skills and interests." 
            />
            <FeatureCard 
              icon={<Route size={32} />} 
              title="Learning Roadmap" 
              desc="Step-by-step guides to acquiring the skills you're missing." 
            />
            <FeatureCard 
              icon={<Trophy size={32} />} 
              title="Gamified Progress" 
              desc="Earn badges and level up as you complete learning milestones." 
            />
            <FeatureCard 
              icon={<Bot size={32} />} 
              title="Intelligent Assistant" 
              desc="24/7 AI mentoring to unblock your learning journey." 
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="feature-card glass-panel">
      <div className="icon-wrapper">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
