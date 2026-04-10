import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, CheckCircle, ArrowRight, BookOpen, BrainCircuit, Rocket, Activity, Code, Target, Sparkles } from 'lucide-react';
import { MockDB, type UserProfile, type UserCareerState } from '../lib/db';
import { APTITUDE_QUESTIONS } from '../lib/dataset';
import './Assessment.css';

const INTERESTS = ['Programming', 'Design', 'Data Science', 'Marketing', 'Writing', 'Finance', 'Engineering'];
const SKILLS = ['Python', 'JavaScript', 'Communication', 'Problem Solving', 'Leadership', 'Mathematics', 'UI/UX', 'SQL', 'Docker', 'AWS', 'TensorFlow', 'React', 'Linux'];
const STRONG_SUBJECTS = ['Mathematics', 'Computer Science', 'Logical Reasoning', 'Communication', 'Creativity', 'Problem Solving'];

export default function Assessment() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [state, setState] = useState<UserCareerState | null>(null);

  const [step, setStep] = useState(1); // 1: Profile/Skills update, 2: Aptitude Test, 3: Completed
  const [isUpdating, setIsUpdating] = useState(false);

  // Step 1 State
  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  // Step 2 State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [scores, setScores] = useState({ logic: 0, math: 0, cs: 0, problem_solving: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gainedXp, setGainedXp] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const u = MockDB.getCurrentUser();
      if (!u) {
        navigate('/auth');
        return;
      }
      setUser(u);
      const s = await MockDB.getUserState(u.id);
      if (s) {
        setState(s);
        if (s.assessmentsCompleted > 0) {
          setIsUpdating(true);
          setSkills(s.knownSkills || []);
        }
      }
    };
    fetchUser();
  }, [navigate]);

  const toggleChip = (category: string, item: string) => {
    if (category === 'strongSubjects') {
      setStrongSubjects(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    } else if (category === 'interests') {
      setInterests(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    } else if (category === 'skills') {
      setSkills(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdating) {
      // Re-analysis path: Just update skills and skip aptitude if they already did it
      if (user && state) {
        await MockDB.updateUserState(user.id, {
          knownSkills: skills,
          interests,
          strongSubjects,
          assessmentsCompleted: state.assessmentsCompleted + 1
        });
        setStep(3); // Go directly to completion
      }
    } else {
      setStep(2); // New user: proceed to aptitude test
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;

    const q = APTITUDE_QUESTIONS[currentQIndex];
    const correct = selectedOption === q.correctAnswer;
    
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setGainedXp(prev => prev + 10);
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
    }, 1500); 
  };

  const finishAssessment = async () => {
    if (!user || !state) return;
    
    const maxPerCat = 2; // Assuming 2 questions per category in the test dataset
    const aptitudeScores = {
      logic: Math.round((scores.logic / maxPerCat) * 100),
      math: Math.round((scores.math / maxPerCat) * 100),
      cs: Math.round((scores.cs / maxPerCat) * 100),
      problem_solving: Math.round((scores.problem_solving / maxPerCat) * 100)
    };

    const newXp = state.xp + gainedXp + 100; // 100 completion bonus

    await MockDB.updateUserState(user.id, {
      knownSkills: skills,
      interests,
      strongSubjects,
      aptitude: aptitudeScores,
      xp: newXp,
      assessmentsCompleted: state.assessmentsCompleted + 1
    });
    
    setStep(3);
  };

  if (!user || !state) return null;

  return (
    <div className="assessment-page">
      <nav className="navbar container">
        <div className="logo cursor-pointer" onClick={() => navigate('/')}>
          <Sparkles className="icon-accent" size={24} />
          <span>GuidanceAI</span>
        </div>
      </nav>

      <div className={`assessment-panel glass-panel animate-fade-in ${step === 2 ? 'test-mode' : ''}`}>
        
        {step === 1 && (
          <>
            <div className="assessment-header">
              <h1>{isUpdating ? 'Update Skills & Re-analyze' : 'Career Profile Setup'}</h1>
              <p>{isUpdating ? 'Acquired new skills? Update them here to receive refined career recommendations.' : 'Select your initial strengths to guide the intelligent assessment.'}</p>
            </div>

            <form onSubmit={handleProfileSubmit}>
              {!isUpdating && (
                <>
                  <div className="form-group animate-fade-in delay-1">
                    <label><BookOpen size={18} className="icon-label" /> Strong Subjects</label>
                    <div className="chips-container">
                      {STRONG_SUBJECTS.map(sub => (
                        <button type="button" key={sub} className={`chip ${strongSubjects.includes(sub) ? 'active' : ''}`} onClick={() => toggleChip('strongSubjects', sub)}>
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group animate-fade-in delay-2">
                    <label><Target size={18} className="icon-label" /> Core Interests</label>
                    <div className="chips-container">
                      {INTERESTS.map(interest => (
                        <button type="button" key={interest} className={`chip ${interests.includes(interest) ? 'active' : ''}`} onClick={() => toggleChip('interests', interest)}>
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="form-group animate-fade-in delay-3">
                <label><Briefcase size={18} className="icon-label" /> {isUpdating ? 'Your Current Skills' : 'Existing Skills'}</label>
                <div className="chips-container">
                  {SKILLS.map(skill => (
                    <button type="button" key={skill} className={`chip ${skills.includes(skill) ? 'active' : ''}`} onClick={() => toggleChip('skills', skill)}>
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-actions animate-fade-in delay-3" style={{ marginTop: '2rem'}}>
                <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {isUpdating ? 'Generate New Roadmap' : 'Start Gamified Assessment'} <Rocket size={18} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </button>
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
            {!isUpdating && (
              <div className="level-up-badge animate-scale-in">
                <Rocket size={24} /> Aptitude Completed! +100 XP
              </div>
            )}
            <h2>Analysis Complete!</h2>
            <p className="text-muted">
              {isUpdating 
                ? 'Your skills have been updated. The engine has recalculated your optimal paths.' 
                : 'Your profile and strengths have been mapped. The Intelligence Engine is generating your roadmap.'}
            </p>
            <button className="btn-primary dashboard-btn" style={{marginTop: '2rem'}} onClick={() => navigate('/dashboard')}>
              Go to Your Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
