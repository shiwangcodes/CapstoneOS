// AI Engine service — generates unique project outputs from user input.
// Uses deterministic generation based on inputs so different inputs produce
// different outputs. Falls back to domain-specific demo data on any error.

import {
  DOMAINS,
  getFallbackBlueprint,
  getFallbackArchitecture,
  getFallbackRoast,
  getFallbackJudge,
} from '../data/fallbackResponses';

// Simple seeded pseudo-random for reproducible variation
function seededRandom(seed: string) {
  let h = 2166136261;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6D2B79F5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clampScore(val: number) {
  return Math.round(Math.max(60, Math.min(99, val)));
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function titleCase(str: string) {
  return str.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1));
}

const DOMAIN_TITLES = {
  healthcare: ['AI MediAssist', 'MediScan AI', 'HealthGuard AI', 'VitalSense AI'],
  agriculture: ['CropGuard AI', 'AgriVision', 'FarmSense AI', 'CropWatch AI'],
  career: ['PathFinder AI', 'CareerLens', 'SkillBridge AI', 'GrowthPath AI'],
  finance: ['FinShield AI', 'FraudGuard', 'TrustLedger AI', 'RiskSense AI'],
  education: ['LearnPath AI', 'TutorMind', 'EduSense AI', 'KnowledgeBridge'],
  environment: ['EcoWatch AI', 'ClimateLens', 'GreenSense AI', 'EarthGuard'],
};

const DOMAIN_PITCHES = {
  healthcare: 'An intelligent healthcare assistant that turns fragmented patient data into clear, actionable insight.',
  agriculture: 'A computer vision system that detects crop diseases early and recommends targeted interventions.',
  career: 'A personalized career intelligence platform that maps skill gaps to real job market demand.',
  finance: 'A real-time fraud detection engine that flags suspicious transactions with explainable AI.',
  education: 'An adaptive AI tutor that personalizes learning paths based on student performance.',
  environment: 'An environmental monitoring system that predicts pollution hotspots using sensor data.',
};

const DOMAIN_PROBLEMS = {
  healthcare: 'Patients face long wait times, fragmented medical records, and limited access to early-stage insights.',
  agriculture: 'Farmers lose up to 40% of yield to diseases detected too late for effective action.',
  career: 'Students graduate without knowing which skills actually matter for their target roles.',
  finance: 'Financial institutions struggle to detect emerging fraud patterns before significant losses occur.',
  education: 'One-size-fits-all education leaves students behind when pacing does not match their level.',
  environment: 'Pollution events are detected too late for communities to take preventive action.',
};

const DOMAIN_NOVELTIES = {
  healthcare: 'A multimodal assistant that combines clinical signals with a calm, explainable conversation layer.',
  agriculture: 'Edge-deployed vision model that works offline on low-cost cameras in remote fields.',
  career: 'Live job-market signal processing combined with individual skill profiling for gap analysis.',
  finance: 'Graph-based anomaly detection that explains its reasoning in human-readable rules.',
  education: 'Continuous difficulty adjustment driven by real-time engagement and mastery signals.',
  environment: 'Predictive sensor fusion that forecasts pollution events 48 hours before they peak.',
};

const DOMAIN_APPROVAL_REASONS = {
  healthcare: 'Real-world impact, technical depth, ethical framing, and a clear path from prototype to pilot.',
  agriculture: 'Direct farmer impact, offline-first design, and a practical path to field deployment.',
  career: 'Solves a universal student problem with a data-driven approach and clear monetization path.',
  finance: 'Addresses a high-value industry problem with a defensible technical moat.',
  education: 'Scalable impact with measurable learning outcomes and institutional adoption potential.',
  environment: 'Civic impact with open data potential and clear regulatory alignment.',
};

const FEATURE_POOLS = {
  healthcare: ['Document intelligence', 'Symptom triage', 'Explainable recommendations', 'Privacy-first patient timeline', 'Drug interaction alerts', 'Appointment scheduling'],
  agriculture: ['Real-time disease detection', 'Offline edge inference', 'Treatment recommendation engine', 'Yield forecasting', 'Soil health monitoring', 'Crop rotation planner'],
  career: ['Skill gap analysis', 'Live job market scanning', 'Personalized learning paths', 'Resume optimization', 'Interview prep', 'Salary benchmarking'],
  finance: ['Real-time transaction scoring', 'Graph anomaly detection', 'Explainable alert dashboard', 'Risk pattern visualization', 'Compliance audit trail', 'Alert suppression rules'],
  education: ['Adaptive question generation', 'Mastery tracking', 'Spaced repetition scheduler', 'Peer comparison', 'Progress dashboard', 'Concept dependency map'],
  environment: ['Sensor data fusion', 'Pollution forecasting', 'Hotspot mapping', 'Alert notifications', 'Trend analysis', 'Community reporting'],
};

const FUTURE_POOLS = {
  healthcare: ['Wearable integrations', 'Multilingual voice support', 'Hospital workflow simulations'],
  agriculture: ['Drone-based field scanning', 'Multi-language farmer SMS alerts', 'Market price integration'],
  career: ['Mock interview simulation', 'LinkedIn integration', 'Salary benchmarking'],
  finance: ['Real-time wire fraud detection', 'Cross-border pattern analysis', 'Regulatory reporting automation'],
  education: ['VR classroom integration', 'Teacher co-pilot mode', 'Curriculum auto-generation'],
  environment: ['Satellite data integration', 'Citizen science app', 'Policy recommendation engine'],
};

const STACK_BY_SKILL = {
  Python: 'Python', React: 'React', 'Machine Learning': 'TensorFlow', 'Node.js': 'Express',
  TensorFlow: 'TensorFlow', OpenCV: 'OpenCV', AWS: 'AWS', FastAPI: 'FastAPI',
};

const EXTRA_STACK = ['PostgreSQL', 'Docker', 'Redis', 'MongoDB', 'Firebase'];

const ROAST_QUESTIONS = {
  healthcare: [
    'Why should we approve this project over the 50 other healthcare assistants I have seen this year?',
    'How does your system handle false positives in diagnosis?',
    'What is your data privacy strategy for sensitive medical records?',
    'Can this scale beyond a prototype to real hospital deployment?',
  ],
  agriculture: [
    'How accurate is your disease detection model on real field images, not just clean datasets?',
    'What happens when a farmer has no internet connection for weeks?',
    'How do you handle a disease your model has never seen before?',
    'Is a Raspberry Pi realistic for rural farmers?',
  ],
  career: [
    'How is this different from LinkedIn Learning or any existing career platform?',
    'How fresh is your job market data?',
    'Can your NLP model accurately extract skills from unstructured job descriptions?',
    'What is your monetization strategy?',
  ],
  finance: [
    'How do you handle adversarial fraud that adapts to your detection rules?',
    'What is your false positive rate and how do you measure it?',
    'How do you explain a fraud alert to a non-technical compliance officer?',
    'Can this process transactions in real time without latency?',
  ],
  education: [
    'How do you measure learning outcomes versus just engagement?',
    'What happens when a student gaming the system figures out your difficulty algorithm?',
    'How do you handle students with learning disabilities?',
    'Is adaptive learning actually better than a good teacher?',
  ],
  environment: [
    'How accurate is your 48-hour pollution forecast?',
    'What happens when sensors fail or report bad data?',
    'How do you get communities to actually act on your alerts?',
    'Can this work with existing government monitoring infrastructure?',
  ],
};

const ROAST_WEAKNESSES = [
  'Lack of clear differentiation from existing solutions',
  'Safety when the AI is wrong',
  'Privacy compliance gap',
  'Scalability concerns',
  'Data quality and freshness',
  'Business model clarity',
  'Hardware accessibility',
  'Cold-start problem',
];

const ROAST_ANSWERS = [
  'Our differentiator is explainability: every recommendation comes with auditable context.',
  'We include a confidence threshold and mandatory human review for low-certainty cases.',
  'All data is encrypted at rest and in transit, with role-based access and full audit logging.',
  'The backend is stateless and containerized, ready for horizontal scaling.',
  'We refresh data daily and cache only the top results per category for speed.',
  'Freemium for students, with premium analytics as paid tiers.',
  'We target sub-$50 hardware and provide loaner kits through NGO partnerships.',
  'Unknown cases trigger a referral flow that flags for expert review.',
];

const IMPROVEMENT_POOLS = {
  healthcare: ['Add a measurable patient outcome metric to the opening pitch', 'Demonstrate a failure case in the demo to build trust', 'Clarify the regulatory pathway before technical details'],
  agriculture: ['Show a before/after yield comparison in the demo', 'Add a cost-savings calculation per farmer', 'Address the cold-start problem for new crop types'],
  career: ['Show a live skill-trend chart in the demo', 'Add a before/after resume score comparison', 'Clarify the data pipeline for job posting ingestion'],
  finance: ['Show a live fraud detection demo with synthetic data', 'Add a compliance officer dashboard view', 'Quantify the false positive cost savings'],
  education: ['Show a student learning curve in the demo', 'Add a teacher-facing analytics view', 'Address the gaming-the-system scenario'],
  environment: ['Show a live sensor map in the demo', 'Add a community alert flow', 'Address sensor failure gracefully'],
};

const JUDGE_FEEDBACK = {
  healthcare: 'Strong finalist potential. Clear story with serious technical depth.',
  agriculture: 'High-impact project with strong real-world applicability and clear offline strategy.',
  career: 'Practical and well-scoped. Strong feasibility with a clear user acquisition path.',
  finance: 'Technically ambitious with a clear industry value proposition.',
  education: 'Scalable impact with measurable outcomes and institutional adoption potential.',
  environment: 'Civic impact with open data potential and clear regulatory alignment.',
};

function buildSeed(input: ProjectInput) {
  return `${input.domain || 'default'}-${(input.skills || []).join(',')}-${input.difficulty || ''}-${input.duration || ''}`;
}

function normalizeDomain(domain?: string): string {
  if (!domain) return 'healthcare';
  const key = domain.toLowerCase().split(' ')[0];
  if (DOMAINS[key]) return key;
  if (key.includes('health')) return 'healthcare';
  if (key.includes('agri') || key.includes('farm')) return 'agriculture';
  if (key.includes('career') || key.includes('profess')) return 'career';
  if (key.includes('finance') || key.includes('bank')) return 'finance';
  if (key.includes('edu')) return 'education';
  if (key.includes('env') || key.includes('green') || key.includes('climate')) return 'environment';
  return 'healthcare';
}

export function generateProjectBlueprint(input: ProjectInput): Blueprint {
  try {
    const domain = normalizeDomain(input.domain);
    const rng = seededRandom(buildSeed(input));
    const titles = DOMAIN_TITLES[domain] || DOMAIN_TITLES.healthcare;
    const title = pick(titles, rng);
    const skills = input.skills && input.skills.length > 0 ? input.skills : ['Python', 'Machine Learning'];
    const techStack = skills.map((s) => STACK_BY_SKILL[s] || s);
    const extra1 = pick(EXTRA_STACK, rng);
    const extra2 = pick(EXTRA_STACK.filter((s) => s !== extra1), rng);
    if (!techStack.includes(extra1)) techStack.push(extra1);
    if (!techStack.includes(extra2)) techStack.push(extra2);

    const featurePool = FEATURE_POOLS[domain] || FEATURE_POOLS.healthcare;
    const features = [];
    const featureCount = Math.min(4, featurePool.length);
    const shuffled = [...featurePool].sort(() => rng() - 0.5);
    for (let i = 0; i < featureCount; i++) features.push(shuffled[i]);

    const futurePool = FUTURE_POOLS[domain] || FUTURE_POOLS.healthcare;
    const futureScope = [...futurePool].sort(() => rng() - 0.5).slice(0, 3);

    const difficultyBoost = input.difficulty === 'Frontier' ? 6 : input.difficulty === 'Advanced' ? 3 : 0;
    const skillBonus = Math.min(skills.length, 5) * 1.5;
    const innovationScore = clampScore(80 + difficultyBoost + skillBonus + Math.floor(rng() * 8));
    const approvalScore = clampScore(innovationScore - 5 - Math.floor(rng() * 5));

    return {
      title,
      tagline: DOMAIN_PITCHES[domain] ? titleCase(domain) + ' AI Solution' : 'AI Solution',
      pitch: DOMAIN_PITCHES[domain] || DOMAIN_PITCHES.healthcare,
      problem: DOMAIN_PROBLEMS[domain] || DOMAIN_PROBLEMS.healthcare,
      novelty: DOMAIN_NOVELTIES[domain] || DOMAIN_NOVELTIES.healthcare,
      approval_reason: DOMAIN_APPROVAL_REASONS[domain] || DOMAIN_APPROVAL_REASONS.healthcare,
      features,
      future_scope: futureScope,
      tech_stack: techStack,
      innovation_score: innovationScore,
      approval_score: approvalScore,
      domain,
    };
  } catch (err) {
    console.error('Blueprint generation failed, using fallback:', err);
    return getFallbackBlueprint(normalizeDomain(input.domain));
  }
}

export function generateArchitecture(project: { domain?: string }): Architecture {
  try {
    const domain = normalizeDomain(project.domain);
    return getFallbackArchitecture(domain);
  } catch (err) {
    console.error('Architecture generation failed, using fallback:', err);
    return getFallbackArchitecture('healthcare');
  }
}

export function generateProfessorRoast(project: { domain?: string; title?: string }): Roast {
  try {
    const domain = normalizeDomain(project.domain);
    const rng = seededRandom(`${domain}-roast-${project.title || ''}`);
    const questionPool = ROAST_QUESTIONS[domain] || ROAST_QUESTIONS.healthcare;
    const questions = questionPool.map((q, i) => ({
      question: q,
      weakness: ROAST_WEAKNESSES[i % ROAST_WEAKNESSES.length],
      answer: ROAST_ANSWERS[i % ROAST_ANSWERS.length],
    }));
    const improvementPool = IMPROVEMENT_POOLS[domain] || IMPROVEMENT_POOLS.healthcare;
    const improvements = [...improvementPool].sort(() => rng() - 0.5);
    return { questions, improvements };
  } catch (err) {
    console.error('Roast generation failed, using fallback:', err);
    return getFallbackRoast(normalizeDomain(project.domain));
  }
}

export function generateJudgeScore(project: { domain?: string; title?: string; innovation_score?: number }): JudgeScore {
  try {
    const domain = normalizeDomain(project.domain);
    const rng = seededRandom(`${domain}-judge-${project.title || ''}`);
    const base = project.innovation_score || 85;
    const variance = () => Math.floor(rng() * 8 - 4);
    const innovation = clampScore(base + variance());
    const complexity = clampScore(base - 4 + variance());
    const impact = clampScore(base + 2 + variance());
    const feasibility = clampScore(base - 2 + variance());
    return {
      innovation: +(innovation / 10).toFixed(1),
      complexity: +(complexity / 10).toFixed(1),
      impact: +(impact / 10).toFixed(1),
      feasibility: +(feasibility / 10).toFixed(1),
      feedback: JUDGE_FEEDBACK[domain] || JUDGE_FEEDBACK.healthcare,
    };
  } catch (err) {
    console.error('Judge generation failed, using fallback:', err);
    return getFallbackJudge(normalizeDomain(project.domain));
  }
}
