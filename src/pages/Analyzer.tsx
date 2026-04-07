import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';
import './Analyzer.css';

const CORE_TECH_KEYWORDS = [
  'python', 'javascript', 'react', 'node', 'docker', 'kubernetes', 'aws',
  'linux', 'sql', 'git', 'agile', 'figma', 'typescript', 'java', 'c++'
];

export default function Analyzer() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{ missing: string[], suggestion: string } | null>(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setResults(null);
    
    // Simulate AI parsing delay
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      
      // Determine what's explicitly missing from our simple known keywords
      const found = CORE_TECH_KEYWORDS.filter(k => lowerText.includes(k));
      const missing = CORE_TECH_KEYWORDS.filter(k => !lowerText.includes(k));
      
      // Keep missing visually limited to max 5 to prevent overload in MVP
      const topMissing = missing.slice(0, 5);
      
      let suggestion = "Consider adding missing core traits to stand out.";
      if (found.includes('python') && !found.includes('sql')) {
        suggestion = "You have Python logic mapping. Adding SQL ensures you align perfectly for Data Science or Backend roles.";
      } else if (found.includes('javascript') && !found.includes('react')) {
        suggestion = "Strengthen your Frontend pipeline by learning React alongside Vanilla JS.";
      } else if (found.includes('react') || found.includes('node')) {
        suggestion = "You have strong application skills! Consider learning Docker or AWS to deploy these effectively.";
      } else if (found.length === 0) {
        suggestion = "Your resume lacks recognizable technical keywords. Ensure you are explicitly naming the languages and tools you've worked with!";
      }

      setResults({ missing: topMissing, suggestion });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="analyzer-page animate-fade-in">
      <nav className="navbar">
        <div className="logo cursor-pointer" onClick={() => navigate('/')}>
          <Sparkles className="icon-accent" size={24} />
          <span>GuidanceAI Analyzer</span>
        </div>
        <div className="nav-links">
          <button className="btn-secondary" onClick={() => navigate('/explorer')}>Career Explorer</button>
          <button className="btn-primary" onClick={() => navigate('/dashboard')}>Dashboard</button>
        </div>
      </nav>

      <header className="analyzer-header animate-fade-in delay-1">
        <h1>Simple Resume Analyzer</h1>
        <p>Paste your resume text below. Our localized AI engine will intelligently extract keywords to find your missing skill gaps.</p>
      </header>

      <main>
        <div className="analyzer-panel glass-panel animate-fade-in delay-2">
          <textarea 
            className="textarea-input"
            placeholder="Paste your plain text resume content here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="action-row">
            <button 
              className="btn-primary btn-lg" 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !text.trim()}
            >
              {isAnalyzing ? "Analyzing Text Scanner..." : "Extract Keywords"}
            </button>
          </div>
        </div>

        {results && (
          <div className="results-card glass-panel animate-fade-in">
            <h2><CheckCircle color="#10b981" /> Keyword Scan Complete</h2>
            
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <AlertTriangle color="#ef4444" size={18}/> Missing High-Value Core Skills:
            </h3>
            <div className="gap-list">
              {results.missing.map(m => (
                <span key={m} className="gap-tag">{m.charAt(0).toUpperCase() + m.slice(1)}</span>
              ))}
            </div>

            <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-light)'}}>Strategic Suggestion</h3>
            <div className="suggestion-box">
              {results.suggestion}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
