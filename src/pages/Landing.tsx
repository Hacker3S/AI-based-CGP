import { useNavigate } from 'react-router-dom';
import { Sparkles, Route, Target, Trophy, ArrowRight, Activity, TrendingUp, MonitorPlay, Zap, Users, ShieldCheck, Mail, LogIn } from 'lucide-react';
import { MockDB } from '../lib/db';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();
  const isLoggedIn = !!MockDB.getCurrentUser();

  const handleCtaClick = () => {
    if (isLoggedIn) navigate('/dashboard');
    else navigate('/auth');
  };

  return (
    <div className="landing-page">
      <nav className="navbar container animate-fade-in" style={{ gap: '2rem' }}>
        <div className="logo" style={{ marginRight: 'auto' }} onClick={() => navigate('/')}>
          <Sparkles className="icon-accent" size={24} />
          <span>GuidanceAI</span>
        </div>
        <div className="nav-links">
          <button onClick={() => navigate('/explorer')} className="btn-secondary">Career Explorer</button>
          {isLoggedIn ? (
            <button onClick={() => navigate('/dashboard')} className="btn-primary">Dashboard</button>
          ) : (
            <button onClick={() => navigate('/auth')} className="btn-secondary"><LogIn size={16} /> Login</button>
          )}
          {!isLoggedIn && (
            <button onClick={() => navigate('/auth', { state: { mode: 'signup' } })} className="btn-primary">Get Started</button>
          )}
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="hero container animate-fade-in delay-1">
          <div className="badge">
            <Sparkles size={16} /> Persistent Intelligent Platform v2.0
          </div>
          <h1 className="hero-title">
            Smart Career Decisions Powered by <br className="hidden sm:block"/>
            <span className="text-gradient">Intelligent Guidance</span>
          </h1>
          <p className="hero-subtitle">
            Assess your strengths, explore future careers, and build a personalized growth roadmap. A digital career growth companion that evolves with you over time.
          </p>
          <div className="hero-cta">
            <button className="btn-primary btn-lg flex-center" onClick={handleCtaClick}>
              {isLoggedIn ? 'Continue Journey' : 'Start Assessment'} <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* WHY THIS PLATFORM */}
        <section className="features-section container animate-fade-in delay-2">
          <div className="section-head">
            <h2>Why This Platform</h2>
            <p>A continuous, persistent system to ensure you're always on the optimal path.</p>
          </div>
          <div className="features-grid">
            <FeatureCard icon={<Target size={32} />} title="Intelligent Career Matching" desc="Data-driven path matching based on dynamic multi-variable heuristics." />
            <FeatureCard icon={<Activity size={32} />} title="Aptitude-Based Insights" desc="Assess logic, math, and problem solving to find intrinsic alignments." />
            <FeatureCard icon={<TrendingUp size={32} />} title="Skill Growth Tracking" desc="Update your skills dynamically and watch recommendations evolve." />
            <FeatureCard icon={<Trophy size={32} />} title="Gamified Learning Journey" desc="Earn XP, monitor progress, and unlock career clarity." />
          </div>
        </section>

        {/* INDUSTRY TRENDS SECTION */}
        <section className="trends-section container">
          <div className="section-head">
            <h2>Hottest Industry Trends</h2>
            <p>Real-time demand metrics for the most lucrative tech sectors.</p>
          </div>
          <div className="trends-grid">
            <TrendCard title="AI Engineer" demand="Exponential" icon={<Zap />} />
            <TrendCard title="Cloud Engineer" demand="Very High" icon={<MonitorPlay />} />
            <TrendCard title="DevOps" demand="Very High" icon={<Route />} />
            <TrendCard title="Cybersecurity" demand="High" icon={<ShieldCheck />} />
          </div>
        </section>

        {/* STUDENT GROWTH JOURNEY */}
        <section className="journey-section container">
           <div className="section-head">
            <h2>Your Growth Journey</h2>
            <p>From initial assessment to absolute career readiness.</p>
          </div>
          <div className="journey-timeline">
             <div className="j-node"><span>1</span><p>Assessment</p></div>
             <div className="j-line"></div>
             <div className="j-node"><span>2</span><p>Recommendation</p></div>
             <div className="j-line"></div>
             <div className="j-node"><span>3</span><p>Roadmap</p></div>
             <div className="j-line"></div>
             <div className="j-node"><span>4</span><p>Skill Growth</p></div>
             <div className="j-line"></div>
             <div className="j-node final"><span>5</span><p>Career Readiness</p></div>
          </div>
        </section>

        {/* CAREER CATEGORIES SECTION */}
        <section className="categories-section container">
          <div className="section-head">
            <h2>Explore Career Categories</h2>
            <p>50+ deeply analyzed career paths across multiple sectors.</p>
          </div>
          <div className="categories-grid">
            <div className="cat-card tech"><h3>Technology</h3></div>
            <div className="cat-card data"><h3>Analytics</h3></div>
            <div className="cat-card design"><h3>Design</h3></div>
            <div className="cat-card business"><h3>Business</h3></div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="testimonials-section container">
          <div className="testimonial-card glass-panel">
            <div className="stars">★★★★★</div>
            <blockquote>"This platform doesn't just give you a list of jobs. It helps students understand career fit practically and guides them step-by-step."</blockquote>
            <div className="t-author">- Educational Mentor & Career Coordinator</div>
          </div>
        </section>
      </main>

      {/* PROFESSIONAL STARTUP FOOTER */}
      <footer className="startup-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <Sparkles className="icon-accent" size={24} />
              <span>GuidanceAI</span>
            </div>
            <p>Your digital career growth companion.</p>
          </div>
          <div className="footer-links">
            <h4>Product</h4>
            <a href="#">Assessments</a>
            <a href="#">Roadmaps</a>
            <a href="#">AI Assistant</a>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-links">
            <h4>Connect</h4>
            <div className="social-icons">
               <Mail size={20} />
               <Users size={20} />
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>&copy; {new Date().getFullYear()} GuidanceAI Career Intelligence Platform. All rights reserved.</p>
        </div>
      </footer>
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

function TrendCard({ title, demand, icon }: { title: string, demand: string, icon: React.ReactNode }) {
  return (
    <div className="trend-card glass-panel">
       <div className="t-icon">{icon}</div>
       <div className="t-info">
         <h3>{title}</h3>
         <span className="demand-badge">Demand: {demand}</span>
       </div>
    </div>
  );
}
