import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Briefcase, Heart, CheckCircle, ArrowRight, BookOpen, BrainCircuit, Rocket, Activity, Code, Target } from 'lucide-react';
import { addXP } from '../lib/gamification';
import { APTITUDE_QUESTIONS } from '../lib/dataset';
import './Assessment.css';

const INTERESTS = ['Programming', 'Design', 'Data Science', 'Marketing', 'Writing', 'Finance', 'Engineering'];
const SKILLS = ['Python', 'JavaScript', 'Communication', 'Problem Solving', 'Leadership', 'Mathematics', 'UI/UX'];
const STRONG_SUBJECTS = ['Mathematics', 'Computer Science', 'Logical Reasoning', 'Communication', 'Creativity', 'Problem Solving'];

export default function Assessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Profile, 2: Aptitude Test, 3: Completed

  // Step 1 State
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    domain: '',
    strongSubjects: [] as string[],
    interests: [] as string[],
    skills: [] as string[]
  });

  // Step 2 State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [scores, setScores] = useState({ logic: 0, math: 0, cs: 0, problem_solving: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const toggleChip = (category: 'interests' | 'skills' | 'strongSubjects', item: string) => {
    setFormData(prev => {
      const current = prev[category];
      return {
        ...prev,
        [category]: current.includes(item)
          ? current.filter(i => i !== item)
          : [...current, item]
      };
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Move to Aptitude test
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;

    const q = APTITUDE_QUESTIONS[currentQIndex];
    const correct = selectedOption === q.correctAnswer;
    
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      addXP(10); // Reward XP per correct answer
      setScores(prev => ({
        ...prev,
        [q.category]: prev[q.category as keyof typeof prev] + 1
      }));
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      if (currentQIndex < APTITUDE_QUESTIONS.length - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        finishAssessment();
      }
    }, 1500); // 1.5s delay for feedback
  };

  const finishAssessment = () => {
    // Calculate final aptitude percentages based on max possible score per category (2 questions each in dataset)
    const maxPerCat = 2;
    const finalScores = {
      logic: Math.round((scores.logic / maxPerCat) * 100),
      math: Math.round((scores.math / maxPerCat) * 100),
      cs: Math.round((scores.cs / maxPerCat) * 100),
      problem_solving: Math.round((scores.problem_solving / maxPerCat) * 100)
    };

    const finalData = { ...formData, aptitudeScores: finalScores };
    localStorage.setItem('careerAssessment', JSON.stringify(finalData));
    
    addXP(100); // Completion bonus
    setStep(3);
  };

  return (
    <div className="assessment-page">
      <div className={`assessment-panel glass-panel animate-fade-in ${step === 2 ? 'test-mode' : ''}`}>
        
        {step === 1 && (
          <>
            <div className="assessment-header">
              <h1>Career Profile Setup</h1>
              <p>Tell us about yourself before we jump into the gamified aptitude explorer.</p>
            </div>

            <form onSubmit={handleProfileSubmit}>
              <div className="form-group animate-fade-in delay-1">
                <label><User size={18} className="icon-label" /> Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group animate-fade-in delay-1">
                <label><GraduationCap size={18} className="icon-label" /> Education Level</label>
                <select
                  className="form-select"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  required
                >
                  <option value="" disabled>Select your highest education</option>
                  <option value="high_school">High School</option>
                  <option value="undergraduate">Undergraduate Degree</option>
                  <option value="graduate">Graduate Degree</option>
                  <option value="self_taught">Self-Taught</option>
                </select>
              </div>

              <div className="form-group animate-fade-in delay-2">
                <label><BookOpen size={18} className="icon-label" /> Strong Subjects</label>
                <div className="chips-container">
                  {STRONG_SUBJECTS.map(sub => (
                    <button
                      type="button"
                      key={sub}
                      className={`chip ${formData.strongSubjects.includes(sub) ? 'active' : ''}`}
                      onClick={() => toggleChip('strongSubjects', sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group animate-fade-in delay-2">
                <label><Heart size={18} className="icon-label" /> Core Interests</label>
                <div className="chips-container">
                  {INTERESTS.map(interest => (
                    <button
                      type="button"
                      key={interest}
                      className={`chip ${formData.interests.includes(interest) ? 'active' : ''}`}
                      onClick={() => toggleChip('interests', interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group animate-fade-in delay-3">
                <label><Briefcase size={18} className="icon-label" /> Existing Skills</label>
                <div className="chips-container">
                  {SKILLS.map(skill => (
                    <button
                      type="button"
                      key={skill}
                      className={`chip ${formData.skills.includes(skill) ? 'active' : ''}`}
                      onClick={() => toggleChip('skills', skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group animate-fade-in delay-3">
                <label><Target size={18} className="icon-label"/> Preferred Domain</label>
                <select
                  className="form-select"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  required
                >
                  <option value="" disabled>Where do you see yourself?</option>
                  <option value="tech">Technology & Software</option>
                  <option value="business">Business & Management</option>
                  <option value="creative">Design & Creative</option>
                  <option value="science">Research & Science</option>
                </select>
              </div>

              <div className="form-actions animate-fade-in delay-3">
                <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Cancel</button>
                <button type="submit" className="btn-primary">Start Aptitude Engine <Rocket size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /></button>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <div className="aptitude-test-container animate-fade-in">
            <div className="test-header">
              <div className="test-title">
                {APTITUDE_QUESTIONS[currentQIndex].category === 'logic' && <><BrainCircuit size={24} className="icon-accent" /> Logical Reasoning</>}
                {APTITUDE_QUESTIONS[currentQIndex].category === 'math' && <><Activity size={24} className="icon-accent" /> Mathematics Readiness</>}
                {APTITUDE_QUESTIONS[currentQIndex].category === 'cs' && <><Code size={24} className="icon-accent" /> Computer Science</>}
                {APTITUDE_QUESTIONS[currentQIndex].category === 'problem_solving' && <><Target size={24} className="icon-accent" /> Problem Solving</>}
              </div>
              <div className="progress-indicator">
                Question {currentQIndex + 1} of {APTITUDE_QUESTIONS.length}
              </div>
            </div>
            
            <div className="test-progress-bar-container">
               <div className="progress-fill" style={{ width: `${((currentQIndex) / APTITUDE_QUESTIONS.length) * 100}%` }}></div>
            </div>

            <div className="question-card">
              <h2 className="question-text">{APTITUDE_QUESTIONS[currentQIndex].text}</h2>
              <div className="options-grid">
                {APTITUDE_QUESTIONS[currentQIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`option-btn ${selectedOption === idx ? 'selected' : ''} ${showFeedback && idx === APTITUDE_QUESTIONS[currentQIndex].correctAnswer ? 'correct' : ''} ${showFeedback && selectedOption === idx && !isCorrect ? 'wrong' : ''}`}
                    onClick={() => !showFeedback && setSelectedOption(idx)}
                    disabled={showFeedback}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="option-text">{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="test-footer">
               <button 
                 className={`btn-primary btn-lg ${selectedOption === null || showFeedback ? 'disabled' : ''}`} 
                 onClick={handleAnswerSubmit}
                 disabled={selectedOption === null || showFeedback}
               >
                 Submit Answer <ArrowRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '8px' }} />
               </button>
            </div>
            
            {showFeedback && (
              <div className={`feedback-toast animate-fade-in-up ${isCorrect ? 'toast-success' : 'toast-error'}`}>
                {isCorrect ? '+10 XP Gained!' : 'No XP gained. Next time!'}
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="success-state animate-fade-in">
            <div className="success-icon animate-bounce">
              <CheckCircle size={64} />
            </div>
            <div className="level-up-badge animate-scale-in">
              <Rocket size={24} /> Aptitude Completed! +100 XP
            </div>
            <h2>Analysis Complete!</h2>
            <p className="text-muted">Your profile and strengths have been mapped. The Intelligence Engine is generating your roadmap.</p>
            <button className="btn-primary dashboard-btn" style={{marginTop: '2rem'}} onClick={() => navigate('/dashboard')}>
              View Career Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
