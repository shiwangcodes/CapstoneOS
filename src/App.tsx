import { useEffect, useMemo, useState } from 'react';
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  Database,
  ExternalLink,
  Gauge,
  Globe2,
  Layers3,
  Lightbulb,
  Loader2,
  Menu,
  MessageSquare,
  Network,
  Orbit,
  Play,
  Plus,
  Rocket,
  Search,
  Send,
  Server,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  X,
  Zap,
} from 'lucide-react';
import { useProject } from './context/ProjectContext';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Architect', to: '/architect' },
  { label: 'Blueprint', to: '/blueprint' },
  { label: 'Architecture', to: '/architecture' },
  { label: 'Roast', to: '/roast' },
  { label: 'Judge', to: '/judge' },
];

const featureCards = [
  { icon: BrainCircuit, eyebrow: '01 / ideation engine', title: 'AI Architect', copy: 'Generate ideas that survive the first professor question.', color: 'cyan', to: '/architect' },
  { icon: Network, eyebrow: '02 / systems lab', title: 'Architecture Lab', copy: 'See the invisible systems behind your next big build.', color: 'blue', to: '/architecture' },
  { icon: MessageSquare, eyebrow: '03 / defense arena', title: 'Professor Arena', copy: 'Turn nervous answers into an unshakeable defense.', color: 'pink', to: '/roast' },
  { icon: Trophy, eyebrow: '04 / judge mode', title: 'Judge System', copy: 'Predict your hackathon score before the room does.', color: 'purple', to: '/judge' },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  UserRound, Code2, Server, BrainCircuit, Database, Globe2,
};

function App() {
  return (
    <div className="app-shell">
      <AnimatedBackground />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/architect" element={<ArchitectPage />} />
          <Route path="/blueprint" element={<BlueprintPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/roast" element={<RoastPage />} />
          <Route path="/judge" element={<JudgePage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </main>
      <AIAssistant />
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="background-layer" aria-hidden="true">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />
      <div className="grid-floor" />
      <div className="particle-field">
        {Array.from({ length: 24 }, (_, index) => <span key={index} style={{ '--i': index } as React.CSSProperties} />)}
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar-wrap">
      <nav className="topbar">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Orbit size={16} /></span>
          <span>CAPSTONE<span className="brand-accent">OS</span></span>
          <span className="brand-status" />
        </NavLink>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={20} /> : <Menu size={20} />}</button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)}>{item.label}</NavLink>)}
          <NavLink to="/journey" className="nav-more" onClick={() => setOpen(false)}>Journey</NavLink>
          <NavLink to="/insights" className="nav-more" onClick={() => setOpen(false)}>Insights</NavLink>
        </div>
        <NavLink to="/architect" className="topbar-cta">Get started <ArrowRight size={14} /></NavLink>
      </nav>
    </header>
  );
}

function PageIntro({ kicker, title, copy, action }: { kicker: string; title: React.ReactNode; copy: string; action?: React.ReactNode }) {
  return <div className="page-intro"><div><div className="eyebrow"><span className="eyebrow-dot" />{kicker}</div><h1>{title}</h1><p>{copy}</p></div>{action && <div className="page-intro-action">{action}</div>}</div>;
}

function LoadingOverlay({ step, messages }: { step: number; messages: string[] }) {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-orb"><Loader2 size={28} /></div>
        <div className="loading-text">
          {messages.map((msg, i) => (
            <div key={i} className={`loading-line ${i <= step ? 'visible' : ''}`}>{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const { loadDemoPreset, DEMO_PRESETS } = useProject();
  const [loadingPreset, setLoadingPreset] = useState<string | null>(null);

  const handleDemo = async (domain: string) => {
    setLoadingPreset(domain);
    await loadDemoPreset(domain);
    setLoadingPreset(null);
    navigate('/blueprint');
  };

  return <div className="home-page page-enter">
    <section className="hero-section">
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" />AI operating system / v1.0</div><h1>From idea<br /><span>to impact.</span></h1><p className="hero-description">The command center for building, defending, and perfecting your final year project.</p><div className="hero-actions"><button className="button button-primary" onClick={() => navigate('/architect')}>Start building <ArrowRight size={16} /></button><div className="demo-presets"><span className="demo-label">Try demo:</span>{DEMO_PRESETS.map((preset) => <button key={preset.id} className={`button button-ghost demo-btn ${loadingPreset === preset.id ? 'loading' : ''}`} onClick={() => handleDemo(preset.id)} disabled={loadingPreset !== null}>{loadingPreset === preset.id ? <Loader2 size={14} className="spin" /> : <Play size={12} />}{preset.label}</button>)}</div></div><div className="hero-meta"><span><span className="live-dot" /> Systems online</span><span>2,841 projects architected</span></div></div>
      <AIOrb />
    </section>
    <section className="feature-grid">{featureCards.map((card) => <NavLink to={card.to} className={`feature-card ${card.color}`} key={card.title}><div className="feature-icon"><card.icon size={19} /></div><div className="feature-eyebrow">{card.eyebrow}</div><h3>{card.title}</h3><p>{card.copy}</p><span className="feature-arrow"><ArrowRight size={15} /></span></NavLink>)}</section>
    <div className="home-footer"><span>Scroll to explore</span><div className="scroll-line"><i /></div><span>All systems designed for impact</span></div>
  </div>;
}

function AIOrb() {
  return <div className="orb-stage"><div className="orb-label"><span className="live-dot" />Capstone AI / core</div><div className="orb-rings"><div className="orb-ring ring-one" /><div className="orb-ring ring-two" /><div className="orb-ring ring-three" /><div className="orb-core"><div className="orb-core-glow" /><Bot size={30} /><span>CAPSTONE<br /><b>AI</b></span></div><div className="orb-node node-one" /><div className="orb-node node-two" /><div className="orb-node node-three" /></div><div className="orb-caption"><span>01</span><span>Autonomous project intelligence</span></div></div>;
}

function ArchitectPage() {
  const { config, toggleSkill, updateConfig, generateBlueprint, blueprint, loading, ALL_SKILLS, ALL_DOMAINS } = useProject();
  const navigate = useNavigate();
  const [domainOpen, setDomainOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(config.difficulty);

  const handleGenerate = async () => {
    const result = await generateBlueprint();
    if (result) {
      setTimeout(() => navigate('/blueprint'), 600);
    }
  };

  return <div className="page-shell page-enter"><PageIntro kicker="01 / ideation engine" title={<>AI Architect <span>Studio</span></>} copy="Give the engine your constraints. Leave with a project worth defending." action={<div className="system-pill"><span className="live-dot" /> Engine ready</div>} /><div className="architect-layout"><section className="terminal-panel glass-panel"><div className="panel-top"><div className="window-dots"><i /><i /><i /></div><span>CAPSTONE_AI_ENGINE / CONFIGURE</span><span>v1.0.4</span></div><div className="terminal-body"><TerminalSection number="01" title="Your skills"><div className="chip-row">{ALL_SKILLS.map((skill) => <button key={skill} className={`select-chip ${config.skills.includes(skill) ? 'selected' : ''}`} onClick={() => toggleSkill(skill)}>{config.skills.includes(skill) && <Check size={11} />}{skill}</button>)}<button className="select-chip add-chip"><Plus size={12} /> Add skill</button></div></TerminalSection><TerminalSection number="02" title="Project domain"><div className="domain-dropdown"><button className="select-box" onClick={() => setDomainOpen(!domainOpen)}><Activity size={14} /><span>{config.domain}</span><ChevronDown size={14} className={domainOpen ? 'rotate' : ''} /></button>{domainOpen && <div className="domain-options">{ALL_DOMAINS.map((d) => <button key={d.id} className={`domain-option ${config.domain === d.label ? 'active' : ''}`} onClick={() => { updateConfig({ domain: d.label }); setDomainOpen(false); }}>{d.label}</button>)}</div>}</div></TerminalSection><TerminalSection number="03" title="Project duration"><div className="range-row"><span>{config.duration}</span><span className="muted">Recommended</span></div><input className="neon-range" type="range" min="0" max="100" defaultValue="65" onChange={(e) => { const v = parseInt(e.target.value); const months = Math.max(1, Math.round((v / 100) * 12)); updateConfig({ duration: `${months} months` }); }} /></TerminalSection><TerminalSection number="04" title="Difficulty"><div className="difficulty-row">{['Starter', 'Advanced', 'Frontier'].map((level) => <button key={level} className={`difficulty ${difficulty === level ? 'active' : ''}`} onClick={() => { setDifficulty(level); updateConfig({ difficulty: level }); }}>{level}</button>)}</div></TerminalSection><button className="button button-primary generate-button" onClick={handleGenerate} disabled={loading === 'blueprint'}>{loading === 'blueprint' ? <><Loader2 size={16} className="spin" /> Analyzing...</> : <><Sparkles size={16} /> {blueprint ? 'Regenerate blueprint' : 'Generate blueprint'} <ArrowRight size={16} /></>}</button></div></section><section className="generation-panel"><div className="panel-label"><span className="live-dot" />{loading === 'blueprint' ? 'Capstone AI is analyzing' : blueprint ? 'Analysis complete' : 'Awaiting input'}</div>{loading === 'blueprint' ? <><div className="cube-scene"><div className="holo-cube"><span /><span /><span /><span /><span /><span /></div></div><div className="analysis-steps"><AnalysisStep icon={<Search size={13} />} label="Understanding" detail="Problem space" active /><AnalysisStep icon={<Lightbulb size={13} />} label="Finding" detail="Innovation vectors" active /><AnalysisStep icon={<Layers3 size={13} />} label="Designing" detail="Architecture" active /><AnalysisStep icon={<ShieldCheck size={13} />} label="Preparing" detail="Defense strategy" active /></div></> : blueprint ? <div className="generated-preview"><div className="success-icon"><Check size={20} /></div><span className="eyebrow">Blueprint ready / {blueprint.innovation_score}% innovation</span><h2>{blueprint.title}</h2><p>{blueprint.pitch}</p><div className="mini-stats"><span><b>{blueprint.innovation_score}%</b> innovation</span><span><b>{blueprint.approval_score}%</b> approval</span></div><NavLink to="/blueprint" className="text-link">Open project blueprint <ArrowRight size={14} /></NavLink></div> : <><div className="cube-scene"><div className="holo-cube"><span /><span /><span /><span /><span /><span /></div></div><div className="analysis-steps"><AnalysisStep icon={<Search size={13} />} label="Understanding" detail="Problem space" /><AnalysisStep icon={<Lightbulb size={13} />} label="Finding" detail="Innovation vectors" /><AnalysisStep icon={<Layers3 size={13} />} label="Designing" detail="Architecture" /><AnalysisStep icon={<ShieldCheck size={13} />} label="Preparing" detail="Defense strategy" /></div></>}</section></div></div>;
}

function TerminalSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) { return <div className="terminal-section"><div className="terminal-heading"><span>{number}</span><b>{title}</b></div>{children}</div>; }
function AnalysisStep({ icon, label, detail, active }: { icon: React.ReactNode; label: string; detail: string; active?: boolean }) { return <div className={`analysis-step ${active ? 'active' : ''}`}><span className="step-icon">{icon}</span><div><b>{label}</b><small>{detail}</small></div></div>; }

function BlueprintPage() {
  const { blueprint, generateBlueprint, loading } = useProject();
  const navigate = useNavigate();
  const loadingMessages = ['CAPSTONE AI ANALYZING...', 'Understanding problem...', 'Designing solution...', 'Preparing defense...'];
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!blueprint && loading !== 'blueprint') {
      generateBlueprint();
    }
  }, []);

  useEffect(() => {
    if (loading === 'blueprint') {
      setStep(0);
      const interval = setInterval(() => setStep((p) => (p < 3 ? p + 1 : p)), 700);
      return () => clearInterval(interval);
    }
  }, [loading]);

  if (loading === 'blueprint' || (!blueprint && loading === 'blueprint')) {
    return <div className="page-shell page-enter"><PageIntro kicker="02 / project dossier" title={<>Project <span>Blueprint</span></>} copy="The living document between a rough idea and a room full of yeses." /><LoadingOverlay step={step} messages={loadingMessages} /></div>;
  }

  if (!blueprint) {
    return <div className="page-shell page-enter"><PageIntro kicker="02 / project dossier" title={<>Project <span>Blueprint</span></>} copy="The living document between a rough idea and a room full of yeses." /><div className="empty-state glass-panel"><BrainCircuit size={32} /><h3>No blueprint yet.</h3><p>Generate one from the Architect Studio.</p><button className="button button-primary" onClick={() => navigate('/architect')}>Go to Architect <ArrowRight size={14} /></button></div></div>;
  }

  const sections = [
    ['Problem statement', blueprint.problem],
    ['Innovation factor', blueprint.novelty],
    ['Why professors approve', blueprint.approval_reason],
    ['Core features', blueprint.features.join(', ')],
    ['Future enhancements', blueprint.future_scope.join(', ')],
  ];

  return <div className="page-shell page-enter"><PageIntro kicker="02 / project dossier" title={<>Project <span>Blueprint</span></>} copy="The living document between a rough idea and a room full of yeses." action={<button className="button button-ghost" onClick={() => generateBlueprint()} disabled={loading === 'blueprint'}>{loading === 'blueprint' ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />} Regenerate</button>} /><div className="blueprint-layout"><aside className="blueprint-sidebar"><div className="project-token"><span className="token-mark"><BrainCircuit size={17} /></span><div><b>{blueprint.title}</b><small>CAP-024 / active</small></div></div>{['Overview', 'Problem', 'Innovation', 'Why approve', 'Features', 'Tech stack', 'Future scope'].map((item, index) => <div key={item} className={`side-nav-item ${index === 0 ? 'active' : ''}`}><span>0{index + 1}</span>{item}</div>)}</aside><section className="blueprint-main"><div className="blueprint-hero glass-panel"><div><span className="eyebrow">Project identity / 024</span><h2>{blueprint.title}</h2><p>{blueprint.tagline}</p></div><div className="score-pair"><ScoreRing score={blueprint.approval_score} label="Approval probability" small /><ScoreRing score={blueprint.innovation_score} label="Innovation score" small purple /></div></div><div className="blueprint-cards">{sections.map(([title, copy], index) => <article className={`blueprint-card glass-panel card-${index}`} key={title}><span className="card-number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="tech-strip glass-panel"><span className="eyebrow">Recommended stack</span><div>{blueprint.tech_stack.map((item) => <span key={item}><Code2 size={12} /> {item}</span>)}</div></div></section><aside className="approval-panel glass-panel"><span className="eyebrow">Professor approval prediction</span><div className="approval-ring" style={{ '--approval': `${blueprint.approval_score * 3.6}deg` } as React.CSSProperties}><div><b>{blueprint.approval_score}%</b><span>high chance</span></div></div><span className="approval-label"><span className="live-dot" /> HIGH APPROVAL POSSIBILITY</span><p>{blueprint.approval_reason}</p><div className="confidence"><span>Confidence</span><b>0.{blueprint.innovation_score}</b></div></aside></div></div>;
}

function ArchitecturePage() {
  const { blueprint, architecture, loadArchitecture, loading, config } = useProject();
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!architecture) {
      loadArchitecture();
    }
  }, []);

  const nodes = useMemo(() => {
    if (architecture) {
      return architecture.nodes.map((node) => ({
        ...node,
        Icon: iconMap[node.icon] || BrainCircuit,
      }));
    }
    return [
      { name: 'USER', sub: 'Human layer', icon: 'UserRound', Icon: UserRound, purpose: 'The human interaction layer.' },
      { name: 'FRONTEND', sub: 'React + Tailwind', icon: 'Code2', Icon: Code2, x: '19%', y: '34%', purpose: 'User interaction layer.' },
      { name: 'BACKEND', sub: 'FastAPI / Node', icon: 'Server', Icon: Server, x: '50%', y: '34%', purpose: 'Orchestrates requests.' },
      { name: 'AI ENGINE', sub: 'TensorFlow model', icon: 'BrainCircuit', Icon: BrainCircuit, x: '50%', y: '63%', purpose: 'AI processing core.' },
      { name: 'DATABASE', sub: 'PostgreSQL', icon: 'Database', Icon: Database, x: '50%', y: '88%', purpose: 'Data storage.' },
      { name: 'EXTERNAL API', sub: 'External data', icon: 'Globe2', Icon: Globe2, x: '81%', y: '34%', purpose: 'External integrations.' },
    ];
  }, [architecture]);

  const positions = [
    { x: '50%', y: '7%' }, { x: '19%', y: '34%' }, { x: '50%', y: '34%' },
    { x: '50%', y: '63%' }, { x: '50%', y: '88%' }, { x: '81%', y: '34%' },
  ];
  const nodesWithPos = nodes.map((node, i) => ({ ...node, ...positions[i] }));
  const detail = nodesWithPos[selected] ?? nodesWithPos[2];

  if (loading === 'architecture') {
    return <div className="page-shell page-enter"><PageIntro kicker="03 / systems lab" title={<>Architecture <span>Lab</span></>} copy="Trace every signal. Understand every decision." /><LoadingOverlay step={1} messages={['CAPSTONE AI ANALYZING...', 'Mapping system topology...', 'Connecting nodes...']} /></div>;
  }

  if (!blueprint && !architecture) {
    return <div className="page-shell page-enter"><PageIntro kicker="03 / systems lab" title={<>Architecture <span>Lab</span></>} copy="Trace every signal. Understand every decision." /><div className="empty-state glass-panel"><Network size={32} /><h3>No project loaded.</h3><p>Generate a blueprint first to visualize its architecture.</p><button className="button button-primary" onClick={() => navigate('/architect')}>Go to Architect <ArrowRight size={14} /></button></div></div>;
  }

  return <div className="page-shell page-enter"><PageIntro kicker="03 / systems lab" title={<>Architecture <span>Lab</span></>} copy="Trace every signal. Understand every decision. Design systems that hold under pressure." action={<button className="button button-ghost" onClick={() => loadArchitecture()} disabled={loading === 'architecture'}>{loading === 'architecture' ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />} Regenerate</button>} /><div className="architecture-layout"><section className="architecture-canvas glass-panel"><div className="canvas-top"><span className="eyebrow">Live system topology / {blueprint?.title || 'Demo'}</span><span className="canvas-status"><span className="live-dot" /> {nodes.length} nodes / connected</span></div><div className="topology"><svg className="connections" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M50 14 L50 32 M27 40 L46 40 M54 40 L73 40 M50 44 L50 60 M50 70 L50 86 M30 42 C30 63 38 75 46 87 M70 42 C70 62 62 75 54 87" /></svg>{nodesWithPos.map((node, i) => <button className={`architecture-node ${selected === i ? 'selected' : ''}`} style={{ left: node.x, top: node.y }} key={node.name} onClick={() => setSelected(i)}><span className="node-orbit"><node.Icon size={19} /></span><b>{node.name}</b><small>{node.sub}</small></button>)}<div className="core-label"><span className="core-pulse" />AI CORE</div></div></section><aside className="node-detail glass-panel"><div className="detail-header"><span className="eyebrow">Node intelligence</span><span className="detail-id">SYS / 0{selected + 1}</span></div><div className="detail-icon"><detail.Icon size={23} /></div><h2>{detail.name}</h2><p className="detail-sub">{detail.sub}</p><div className="detail-block"><span>Purpose</span><p>{detail.purpose}</p></div><div className="health-row"><span>Health score</span><b>92%</b></div><div className="health-bar"><i /></div><div className="detail-tags"><span>Online</span><span>Encrypted</span><span>Scalable</span></div></aside></div></div>;
}

function RoastPage() {
  const { roast, startRoast, loading, blueprint } = useProject();
  const [professor, setProfessor] = useState('Strict Professor');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const loadingMessages = ['CAPSTONE AI ANALYZING...', 'Preparing defense...', 'Loading examiner profile...'];

  const handleStart = async () => {
    const result = await startRoast();
    if (result) {
      setChatHistory([{ role: 'professor', text: result.questions[0]?.question || 'Why should we approve this project?' }]);
      setQuestionIndex(0);
    }
  };

  const handleSend = () => {
    if (!message.trim() || !roast) return;
    const userMsg = { role: 'student', text: message };
    setChatHistory((prev) => [...prev, userMsg]);
    setMessage('');
    const nextIndex = questionIndex + 1;
    setTimeout(() => {
      if (roast.questions[nextIndex]) {
        setChatHistory((prev) => [...prev, { role: 'professor', text: roast.questions[nextIndex].question }]);
        setQuestionIndex(nextIndex);
      }
    }, 1200);
  };

  return <div className="page-shell roast-page page-enter"><PageIntro kicker="04 / defense arena" title={<>Enter the <span>Defense Room</span></>} copy="Your professor is waiting. The only question is whether you are." action={<div className="room-status"><span className="live-dot" /> {loading === 'roast' ? 'Loading examiner...' : roast ? 'Session active' : 'Recording session'}</div>} /><div className="roast-layout"><section className="professor-panel glass-panel"><div className="professor-scan"><div className="scan-ring" /><div className="professor-silhouette"><UserRound size={58} /></div></div><span className="eyebrow">Examiner profile</span><h2>Professor Vale</h2><p>Systems & Applied Intelligence</p><div className="professor-stats"><span><b>24</b><small>years teaching</small></span><span><b>8.9</b><small>strictness index</small></span></div><label className="input-label">Select difficulty</label><div className="professor-select">{['Normal Professor', 'Strict Professor', 'Research Examiner', 'IIT Level Examiner'].map((option) => <button key={option} className={professor === option ? 'active' : ''} onClick={() => setProfessor(option)}>{option}{professor === option && <Check size={13} />}</button>)}</div><button className="button button-danger" onClick={handleStart} disabled={loading === 'roast'}>{loading === 'roast' ? <><Loader2 size={16} className="spin" /> Loading...</> : <><Zap size={16} /> {roast ? 'Restart session' : 'Attack my project'}</>}</button></section><section className="chat-panel glass-panel"><div className="chat-header"><div><span className="eyebrow">Live viva simulation</span><h3>Defense session <span>#{roast ? '0024' : '----'}</span></h3></div><div className="chat-actions"><span className="status-pill">{roast ? 'In progress' : loading === 'roast' ? 'Loading' : 'Standby'}</span><Settings2 size={16} /></div></div>{loading === 'roast' ? <LoadingOverlay step={1} messages={loadingMessages} /> : roast ? <><div className="chat-messages">{chatHistory.map((msg, i) => <ChatBubble key={i} type={msg.role} label={msg.role === 'professor' ? 'Professor Vale' : 'Your defense'} time={i === 0 ? 'now' : 'just now'}>{msg.text}</ChatBubble>)}{questionIndex < roast.questions.length - 1 && chatHistory[chatHistory.length - 1]?.role === 'student' && <div className="thinking"><span /><span /><span /> Professor Vale is evaluating your answer</div>}</div><div className="chat-input"><input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your defense..." onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }} /><button onClick={handleSend}><Send size={16} /></button></div></> : <div className="chat-empty"><div className="empty-orb"><MessageSquare size={25} /></div><h3>Ready when you are.</h3><p>{!blueprint ? 'Generate a blueprint first, then face the examiner.' : 'Choose an examiner profile, then start the pressure test.'}</p>{!blueprint && <button className="button button-primary" onClick={() => navigate('/architect')}>Go to Architect <ArrowRight size={14} /></button>}</div>}</section><aside className="defense-notes"><NoteCard icon={<CircleHelp size={15} />} title="Critical questions" value={`${roast?.questions.length || 0} queued`} /><NoteCard icon={<Target size={15} />} title="Weaknesses detected" value={`${roast?.questions.length || 0} found`} /><NoteCard icon={<ShieldCheck size={15} />} title="Improvements" value={`${roast?.improvements.length || 0} suggested`} /></aside></div></div>;
}
function ChatBubble({ type, label, time, children }: { type: string; label: string; time: string; children: React.ReactNode }) { return <div className={`chat-bubble ${type}`}><div className="bubble-meta"><b>{label}</b><span>{time}</span></div><p>{children}</p></div>; }
function NoteCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) { return <div className="note-card"><span>{icon}</span><div><b>{title}</b><small>{value}</small></div><ArrowRight size={14} /></div>; }

function JudgePage() {
  const { judgeScore, runJudge, loading, blueprint } = useProject();
  const navigate = useNavigate();
  const loadingMessages = ['CAPSTONE AI ANALYZING...', 'Scoring innovation...', 'Evaluating impact...', 'Finalizing verdict...'];
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!judgeScore && blueprint) {
      runJudge();
    }
  }, []);

  useEffect(() => {
    if (loading === 'judge') {
      setStep(0);
      const interval = setInterval(() => setStep((p) => (p < 3 ? p + 1 : p)), 600);
      return () => clearInterval(interval);
    }
  }, [loading]);

  if (loading === 'judge' || (!judgeScore && loading === 'judge')) {
    return <div className="page-shell page-enter"><PageIntro kicker="05 / evaluation engine" title={<>Hackathon <span>Judge System</span></>} copy="A brutally honest read on how your project lands in the room." /><LoadingOverlay step={step} messages={loadingMessages} /></div>;
  }

  if (!judgeScore) {
    return <div className="page-shell page-enter"><PageIntro kicker="05 / evaluation engine" title={<>Hackathon <span>Judge System</span></>} copy="A brutally honest read on how your project lands in the room." /><div className="empty-state glass-panel"><Trophy size={32} /><h3>No project to evaluate.</h3><p>Generate a blueprint first to get scored.</p><button className="button button-primary" onClick={() => navigate('/architect')}>Go to Architect <ArrowRight size={14} /></button></div></div>;
  }

  const scores = [
    { label: 'Innovation', score: judgeScore.innovation, color: 'cyan' },
    { label: 'Technical complexity', score: judgeScore.complexity, color: 'blue' },
    { label: 'Impact', score: judgeScore.impact, color: 'green' },
    { label: 'Feasibility', score: judgeScore.feasibility, color: 'purple' },
  ];
  const overall = ((judgeScore.innovation + judgeScore.complexity + judgeScore.impact + judgeScore.feasibility) / 4).toFixed(1);

  return <div className="page-shell page-enter"><PageIntro kicker="05 / evaluation engine" title={<>Hackathon <span>Judge System</span></>} copy="A brutally honest read on how your project lands in the room." action={<button className="button button-ghost" onClick={() => runJudge()} disabled={loading === 'judge'}>{loading === 'judge' ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />} Re-evaluate</button>} /><div className="judge-layout"><section className="judge-scores glass-panel"><div className="panel-top"><span className="eyebrow">Evaluation report / {blueprint?.title || 'Demo'}</span><span>02:41:08</span></div><div className="score-rings">{scores.map((item) => <ScoreRing key={item.label} score={item.score * 10} label={item.label} color={item.color} />)}</div><div className="judge-verdict"><div><span className="eyebrow">Overall score</span><h2>{overall}<span>/10</span></h2><b>{judgeScore.feedback}</b><p>Your project has the rare combination of a clear story and serious technical depth.</p></div><div className="trophy-holo"><Trophy size={58} /></div></div></section><aside className="judge-side"><div className="verdict-card glass-panel"><div className="verdict-icon"><Trophy size={19} /></div><span className="eyebrow">Final verdict</span><h3>Strong finalist<br /><span>potential.</span></h3><div className="verdict-bar"><i /></div><div className="verdict-meta"><span>Top 8%</span><span>of submissions</span></div></div><div className="judge-criteria glass-panel"><span className="eyebrow">What moved the score</span>{['Memorable problem framing', 'Defensible AI approach', 'Visible real-world impact'].map((item) => <div key={item}><Check size={13} /><span>{item}</span></div>)}</div></aside></div></div>;
}

function ScoreRing({ score, label, color = 'cyan', small = false, purple = false }: { score: number; label: string; color?: string; small?: boolean; purple?: boolean }) { const safeScore = Math.round(score); return <div className={`score-ring-wrap ${small ? 'small' : ''}`}><div className={`score-ring ${color} ${purple ? 'purple' : ''}`} style={{ '--score': `${safeScore * 3.6}deg` } as React.CSSProperties}><div><b>{(score / 10).toFixed(1)}</b>{!small && <span>/10</span>}</div></div><span className="score-label">{label}</span></div>; }

function JourneyPage() {
  const { blueprint, judgeScore } = useProject();
  const navigate = useNavigate();
  const projectName = blueprint?.title || 'AI MediAssist';
  const stages = [
    { label: 'Idea', detail: 'Captured', icon: Lightbulb, done: true },
    { label: 'Validation', detail: 'Confirmed', icon: Target, done: true },
    { label: 'Architecture', detail: 'Designed', icon: Network, done: true },
    { label: 'Implementation', detail: 'In progress', icon: Code2, active: true },
    { label: 'Testing', detail: 'Queued', icon: Gauge },
    { label: 'Viva ready', detail: 'Locked', icon: ShieldCheck },
  ];

  return <div className="page-shell page-enter"><PageIntro kicker="06 / project trajectory" title={<>Your Project <span>Journey</span></>} copy="Every ambitious project is a sequence of small, visible wins." action={<div className="progress-label"><b>58%</b><span>overall progress</span></div>} /><section className="journey-panel glass-panel"><div className="journey-top"><div><span className="eyebrow">CAP-024 / live trajectory</span><h2>{projectName}</h2></div><div className="journey-actions"><button className="icon-button" onClick={() => navigate('/architect')}><Plus size={16} /></button><button className="button button-ghost" onClick={() => navigate('/blueprint')}>View blueprint <ArrowRight size={14} /></button></div></div><div className="timeline-track"><div className="track-line"><i /></div>{stages.map((stage, index) => <div className={`timeline-stage ${stage.done ? 'done' : ''} ${stage.active ? 'active' : ''}`} key={stage.label}><div className="milestone"><stage.icon size={17} /></div><span>{stage.label}</span><small>{stage.detail}</small><b>0{index + 1}</b></div>)}</div><div className="journey-footer"><span><span className="live-dot" /> Currently in implementation</span><span>Next checkpoint: demo walkthrough</span></div></section><div className="journey-stats"><div className="glass-panel"><span className="eyebrow">Time invested</span><b>42h <small>/ 72h</small></b><div className="thin-progress"><i style={{ width: '58%' }} /></div></div><div className="glass-panel"><span className="eyebrow">Milestones</span><b>03 <small>/ 06 complete</small></b><div className="milestone-dots"><i /><i /><i /><i /><i /><i /></div></div><div className="glass-panel"><span className="eyebrow">Defense readiness</span><b>{judgeScore ? Math.round((judgeScore.innovation + judgeScore.feasibility) * 5) : 74}%</b><div className="thin-progress purple"><i style={{ width: judgeScore ? `${Math.round((judgeScore.innovation + judgeScore.feasibility) * 5)}%` : '74%' }} /></div></div></div></div>;
}

function InsightsPage() {
  const { blueprint, judgeScore, roast } = useProject();
  const navigate = useNavigate();

  if (!blueprint) {
    return <div className="page-shell page-enter"><PageIntro kicker="07 / intelligence brief" title={<>AI <span>Insights</span></>} copy="Signals from your project, translated into decisions you can actually use." /><div className="empty-state glass-panel"><Sparkles size={32} /><h3>No insights yet.</h3><p>Generate a blueprint to unlock AI-driven insights.</p><button className="button button-primary" onClick={() => navigate('/architect')}>Go to Architect <ArrowRight size={14} /></button></div></div>;
  }

  const innovationBase = judgeScore?.innovation || 8.5;
  const impactBase = judgeScore?.impact || 8.8;
  const feasibilityBase = judgeScore?.feasibility || 8.5;
  const improvements = roast?.improvements || ['Add a measurable outcome to the opening pitch', 'Show a failure state in the demo to make trust tangible', 'Name the privacy boundary before the first technical detail'];

  return <div className="page-shell page-enter"><PageIntro kicker="07 / intelligence brief" title={<>AI <span>Insights</span></>} copy="Signals from your project, translated into decisions you can actually use." action={<div className="date-pill">Updated just now <Activity size={13} /></div>} /><div className="insights-grid"><InsightCard icon={<Rocket size={18} />} label="Resume value" value="High" score={innovationBase.toFixed(1)} accent="cyan" copy="This project tells a strong story about ownership, applied AI, and shipping." /><InsightCard icon={<Network size={18} />} label="Research potential" value="Very high" score={(innovationBase + 0.3).toFixed(1)} accent="purple" copy="The explainability layer opens a credible path toward a publishable study." /><InsightCard icon={<Globe2 size={18} />} label="Startup potential" value="Strong" score={impactBase.toFixed(1)} accent="green" copy="Clear user pain and a narrow first market create a compelling wedge." /><section className="recommendations glass-panel"><div className="recommendation-heading"><div className="insight-icon"><Sparkles size={17} /></div><div><span className="eyebrow">AI recommendations</span><h2>Make the next move count.</h2></div></div><div className="recommendation-list">{improvements.map((item, index) => <div key={index}><span>0{index + 1}</span><p>{item}</p><ArrowRight size={15} /></div>)}</div></section></div></div>;
}
function InsightCard({ icon, label, value, score, accent, copy }: { icon: React.ReactNode; label: string; value: string; score: string; accent: string; copy: string }) { return <div className={`insight-card glass-panel ${accent}`}><div className="insight-icon">{icon}</div><span className="eyebrow">{label}</span><h2>{value}</h2><div className="insight-score"><b>{score}</b><span>/10 confidence</span></div><p>{copy}</p><div className="insight-line"><i /></div></div>; }

function AIAssistant() {
  const location = useLocation();
  const { loading, blueprint } = useProject();
  const [expanded, setExpanded] = useState(false);
  const context = useMemo(() => {
    if (loading) return 'Thinking...';
    if (location.pathname === '/roast') return 'Preparing questions...';
    if (location.pathname === '/architect') return 'Ready to architect';
    if (location.pathname === '/judge') return 'Scoring mode';
    if (blueprint) return 'Blueprint loaded';
    return 'Ready to build';
  }, [location.pathname, loading, blueprint]);
  return <div className={`ai-assistant ${expanded ? 'expanded' : ''}`}><button className="assistant-toggle" onClick={() => setExpanded(!expanded)}><span className="assistant-pulse"><Bot size={18} /></span><span className="assistant-copy"><b>Capstone AI</b><small>{context}</small></span><ChevronDown size={14} /></button>{expanded && <div className="assistant-popover"><span className="eyebrow">Command center</span><p>Need a sharper problem statement or a harder question? I'm online.</p><div className="assistant-input"><Search size={14} /><span>Ask the engine...</span></div></div>}</div>;
}

export default App;
