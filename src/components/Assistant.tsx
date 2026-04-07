import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { addXP } from '../lib/gamification';
import './Assistant.css';

type MessageInfo = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isAnalyzing?: boolean;
  isTyping?: boolean;
};

const SUGGESTIONS = [
  "Which career suits me?",
  "What should I learn next?",
  "Future of DevOps"
];

const INTENT_GROUPS = [
  {
    name: 'devops',
    triggers: ['devops', 'deployment', 'docker', 'kubernetes', 'automation', 'ci cd'],
    responses: [
      "DevOps requires Linux, networking, automation, and deployment thinking.",
      "A strong DevOps path begins with Linux and scripting before container tools.",
      "Docker and CI/CD usually become practical after Linux comfort improves.",
      "DevOps remains highly valuable because infrastructure automation demand continues growing.",
      "Cloud exposure strengthens DevOps career readiness significantly."
    ]
  },
  {
    name: 'data',
    triggers: ['data', 'analytics', 'machine learning', 'statistics', 'analysis'],
    responses: [
      "Data Science combines programming, statistics, and problem solving. Python and SQL are usually first priorities.",
      "If you enjoy patterns and decision-making, Data Science becomes highly valuable.",
      "Data careers usually become stronger through projects using real datasets.",
      "Statistics and visualization strengthen Data Science readiness.",
      "Data Science remains a strong high-growth field across industries."
    ]
  },
  {
    name: 'cybersecurity',
    triggers: ['security', 'cyber', 'hacking', 'network protection', 'penetration'],
    responses: [
      "Cybersecurity usually begins with networking fundamentals and Linux.",
      "Security careers reward strong curiosity about systems and vulnerabilities.",
      "Linux and networking are stronger starting points than advanced tools initially.",
      "Cybersecurity demand remains strong because digital infrastructure keeps expanding.",
      "Practical labs improve cybersecurity understanding faster than theory alone."
    ]
  },
  {
    name: 'cloud',
    triggers: ['cloud', 'aws', 'azure', 'gcp', 'server'],
    responses: [
      "Cloud learning usually begins after networking and Linux basics.",
      "AWS often becomes the easiest first cloud platform for beginners.",
      "Cloud careers benefit strongly from deployment practice.",
      "Understanding servers and networking makes cloud concepts easier.",
      "Cloud demand remains consistently high across modern companies."
    ]
  },
  {
    name: 'skill_confusion',
    triggers: ['what next', 'next step', 'how start', 'begin', 'where start'],
    responses: [
      "The best next step is strengthening one skill deeply before expanding.",
      "A small project usually gives more clarity than reading multiple topics.",
      "Begin with one practical foundation and build gradually.",
      "Skill growth becomes stronger when practice happens early.",
      "Your next step should reduce confusion, not increase topic count."
    ]
  },
  {
    name: 'motivation',
    triggers: ['confused', 'difficult', 'fear', 'not confident', 'motivation', 'doubt'],
    responses: [
      "Career clarity improves through repeated small experiments.",
      "Consistency usually matters more than speed.",
      "Most strong careers begin with uncertain early stages.",
      "Small practical progress reduces doubt faster than long planning.",
      "Confidence usually follows action, not waiting."
    ]
  },
  {
    name: 'roadmap',
    triggers: ['roadmap', 'plan', 'timeline', 'how long'],
    responses: [
      "Your roadmap is designed as fundamentals, practice, projects, and portfolio.",
      "Strong learning plans move from understanding to proof.",
      "Short practical milestones improve roadmap success.",
      "The timeline becomes effective when weekly goals stay realistic.",
      "Portfolio usually becomes the strongest proof after roadmap completion."
    ]
  },
  {
    name: 'project',
    triggers: ['project', 'portfolio', 'mini project'],
    responses: [
      "Projects convert skill into visible proof.",
      "Even small projects improve employability strongly.",
      "Portfolio quality matters more than project quantity.",
      "Practical implementation reveals real learning gaps.",
      "Projects should solve simple meaningful problems first."
    ]
  },
  {
    name: 'future',
    triggers: ['future', 'scope', 'growth', 'demand', 'salary'],
    responses: [
      "AI, Cloud, DevOps, and Cybersecurity currently show strong long-term growth.",
      "Future demand often follows automation and digital infrastructure growth.",
      "Technical careers with continuous learning usually remain strongest.",
      "High-growth fields reward adaptability more than fixed knowledge.",
      "Demand remains strongest where practical deployment skills exist."
    ]
  },
  {
    name: 'career_selection',
    triggers: ['career', 'field', 'domain', 'choose', 'option', 'suitable', 'best for me', 'future role'],
    responses: [
      "Based on your profile, technical domains like Software Development, Data Science, and DevOps appear strong options.",
      "Career choice becomes stronger when interests and practical strengths align. Your current inputs suggest technical growth paths.",
      "A suitable direction depends on both skill foundation and long-term interest. Software and data careers currently match many technical learners.",
      "You should focus on a path where learning remains sustainable. Technical domains currently show strong alignment.",
      "Career fit improves when small projects confirm your interest. Software and data-related fields are practical starting options."
    ]
  }
];

const FALLBACK_REPLIES = [
  "Tell me one skill you currently enjoy, and I can guide better.",
  "A clearer answer becomes possible if you mention your current learning focus.",
  "Your question becomes easier when linked to one career goal.",
  "Mention one domain you are exploring.",
  "I can suggest practical next steps if you share your current skill level."
];

function TypewriterText({ text, onComplete }: { text: string, onComplete: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, 25); // fast typing effect
      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [index, text, onComplete]);

  return <span>{displayed}</span>;
}

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [messages, setMessages] = useState<MessageInfo[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: 'Hi, I am CareerMate AI 👋\nAsk me about careers, skills, or roadmap.',
      isTyping: false
    }
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic needs to run on every state update
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const generateAIResponse = (userText: string) => {
    const text = userText.toLowerCase();

    // 1. Context Engine Read
    let contextData = null;
    let strengths = [];
    let weaknesses = [];
    let strongSubjects = [];

    try {
      const savedContent = localStorage.getItem('careerAssessment');
      if (savedContent) {
        contextData = JSON.parse(savedContent);
        strongSubjects = contextData.strongSubjects || [];
        if (contextData.aptitudeScores) {
          const { logic, math, cs, problem_solving } = contextData.aptitudeScores;
          if (logic >= 70) strengths.push('logical reasoning'); else if (logic < 50) weaknesses.push('logic');
          if (math >= 70) strengths.push('mathematics'); else if (math < 50) weaknesses.push('mathematics');
          if (cs >= 70) strengths.push('computer science'); else if (cs < 50) weaknesses.push('computer science');
          if (problem_solving >= 70) strengths.push('problem solving'); else if (problem_solving < 50) weaknesses.push('problem solving');
        }
      }
    } catch(e) {}

    // 2. Dynamic Rules based on Context
    if (contextData) {
      if (text.includes('improve') || text.includes('weak') || text.includes('gap')) {
        if (weaknesses.includes('mathematics') && strengths.includes('logical reasoning')) {
           return "Since your analytical profile is strong but mathematics is moderate, strengthening statistics will improve your targeted career readiness.";
        }
        if (weaknesses.length > 0) {
           return `I noticed your score in ${weaknesses[0]} was moderate. Focusing some time there will yield the biggest improvement.`;
        }
      }

      if (text.includes('math')) {
        if (strongSubjects.includes('Mathematics') || strengths.includes('mathematics')) {
          return "Since your math is strong, I highly recommend AI, Data Science, or Quantitative fields. They will leverage your natural strength beautifully.";
        } else {
          return "Since math isn't your primary strength, a practical project-first path like Frontend Development or Product Management is perfectly suitable.";
        }
      }

      if (text.includes('software') || text.includes('cloud') || text.includes('cs')) {
        if (strongSubjects.includes('Computer Science') || strengths.includes('computer science')) {
          return "Your Computer Science fundamentals are solid. You should aim for Software Development, Cloud Architecture, or DevOps.";
        }
      }

      if (text.includes('communication') || text.includes('product')) {
        if (strongSubjects.includes('Communication')) {
          return "Your communication skills are highly valuable. Consider Product Management, Consulting, or Business Analytics where this is a core requirement.";
        }
      }
    }

    // 3. Static Intent Groups Match
    for (const group of INTENT_GROUPS) {
      if (group.triggers.some(trigger => text.includes(trigger))) {
        const randIndex = Math.floor(Math.random() * group.responses.length);
        return group.responses[randIndex];
      }
    }

    const reply = FALLBACK_REPLIES[fallbackIndex];
    setFallbackIndex((prev) => (prev + 1) % FALLBACK_REPLIES.length);
    return reply;
  };

  const handleSend = (providedText?: string) => {
    const textToSend = providedText || input;
    if (!textToSend.trim()) return;

    addXP(10);
    const analyzingId = 'ai-analyzing-' + Date.now();

    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: textToSend },
      { id: analyzingId, sender: 'ai', text: 'Analyzing...', isAnalyzing: true } // mandatory state
    ]);
    
    setInput('');

    // Exact 1 second mandatory delay
    setTimeout(() => {
      const responseText = generateAIResponse(textToSend);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === analyzingId 
            ? { ...msg, text: responseText, isAnalyzing: false, isTyping: true }
            : msg
        )
      );
    }, 1000);
  };

  const markTypingComplete = (id: string) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, isTyping: false } : msg));
  };

  return (
    <div className="assistant-wrapper">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="avatar">
                <Bot size={20} />
              </div>
              <div>
                <div className="chat-title">CareerMate AI</div>
                <div className="chat-status"><div className="status-dot"></div> Online</div>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chat-body">
            {messages.map((m) => (
              m.sender === 'ai' ? (
                <div key={m.id} className="message msg-ai">
                  {m.isAnalyzing ? (
                    <span className="analyzing-text">Analyzing...</span>
                  ) : m.isTyping ? (
                    <TypewriterText text={m.text} onComplete={() => markTypingComplete(m.id)} />
                  ) : (
                    <span style={{ whiteSpace: 'pre-wrap' }}>{m.text}</span>
                  )}

                  {m.id === 'msg-0' && (
                    <div className="quick-suggestions">
                      {SUGGESTIONS.map((s, idx) => (
                        <button key={idx} className="suggestion-btn" onClick={() => handleSend(s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div key={m.id} className="message msg-user">
                  {m.text}
                </div>
              )
            ))}
            <div ref={endRef} />
          </div>

          <div className="chat-footer">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                const isAnalyzingMsg = messages[messages.length - 1]?.isAnalyzing;
                if (e.key === 'Enter' && !isAnalyzingMsg) handleSend();
              }}
              disabled={messages.length > 0 && messages[messages.length - 1].isAnalyzing}
            />
            <button 
              className="send-btn" 
              onClick={() => handleSend()} 
              disabled={!input.trim() || (messages.length > 0 && messages[messages.length - 1].isAnalyzing)}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button className="assistant-fab" onClick={() => setIsOpen(true)}>
          <Bot size={28} />
        </button>
      )}
    </div>
  );
}
