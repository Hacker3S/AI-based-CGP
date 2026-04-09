import { CheckCircle, Clock } from 'lucide-react';
import './Roadmap.css';
import type { RoadmapStep } from '../lib/recommendation';

interface Props {
  roadmap: RoadmapStep[];
  progress: Record<string, boolean>;
  onToggleStep: (stepId: number) => void;
}

export default function Roadmap({ roadmap, progress, onToggleStep }: Props) {
  return (
    <div className="roadmap-container">
      <div className="roadmap-timeline">
        {roadmap.map((step, idx) => {
          const isCompleted = !!progress[step.step];
          const isNext = !isCompleted && (idx === 0 || !!progress[roadmap[idx - 1].step]);

          return (
            <div key={idx} className={`roadmap-node ${isCompleted ? 'completed' : ''} ${isNext ? 'next-action' : ''}`}>
              <div className="node-marker" onClick={() => onToggleStep(step.step)}>
                {isCompleted ? <CheckCircle size={24} className="text-emerald-500" /> : <div className="marker-circle">{step.step}</div>}
              </div>
              <div className="node-content glass-panel">
                <div className="node-header">
                  <h3>{step.title}</h3>
                  {isNext && <span className="next-badge"><Clock size={14}/> Up Next</span>}
                </div>
                <p>{step.description}</p>
                <div className="course-recommendation">
                  <strong>Recommended Courses:</strong>
                  <ul>
                    {idx === 0 && <li>Core Fundamentals on Coursera / YouTube</li>}
                    {idx === 1 && <li>Applied Practice Bootcamp (Udemy/edX)</li>}
                    {idx === 2 && <li>Advanced Project Building (Zero To Mastery)</li>}
                    {idx === 3 && <li>Portfolio & Interview Prep (Frontend Masters / LeetCode)</li>}
                  </ul>
                </div>
                <button 
                  className={`btn-secondary mt-3 ${isCompleted ? 'completed-btn' : ''}`}
                  onClick={() => onToggleStep(step.step)}
                >
                  {isCompleted ? "Mark Unfinished" : "Mark as Completed"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
