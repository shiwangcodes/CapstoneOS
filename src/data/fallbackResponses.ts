// Domain-specific fallback data for demo presets and error recovery.
// Each domain produces a distinct blueprint, architecture, roast, and judge score.

export const DOMAINS = {
  healthcare: {
    label: 'Healthcare & wellbeing',
    skills: ['Python', 'Machine Learning', 'TensorFlow'],
    duration: '6 months',
    difficulty: 'Frontier',
    blueprint: {
      title: 'AI MediAssist',
      tagline: 'AI Healthcare Assistant',
      pitch: 'An intelligent healthcare assistant that turns fragmented patient data into clear, actionable insight.',
      problem: 'Patients face long wait times, fragmented medical records, and limited access to early-stage insights.',
      novelty: 'A multimodal assistant that combines clinical signals with a calm, explainable conversation layer.',
      approval_reason: 'Real-world impact, technical depth, ethical framing, and a clear path from prototype to pilot.',
      features: ['Document intelligence', 'Symptom triage', 'Explainable recommendations', 'Privacy-first patient timeline'],
      future_scope: ['Wearable integrations', 'Multilingual voice support', 'Hospital workflow simulations'],
      tech_stack: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'FastAPI', 'AWS'],
      innovation_score: 92,
      approval_score: 87,
    },
    architecture: {
      nodes: [
        { name: 'USER', sub: 'Patient & clinician', icon: 'UserRound', purpose: 'The human interaction layer where patients and clinicians interact with the system.' },
        { name: 'FRONTEND', sub: 'React + Tailwind', icon: 'Code2', purpose: 'Responsive interface for symptom intake, timeline visualization, and recommendation display.' },
        { name: 'BACKEND', sub: 'FastAPI', icon: 'Server', purpose: 'Orchestrates requests, enforces privacy policies, and routes data between services.' },
        { name: 'AI ENGINE', sub: 'TensorFlow model', icon: 'BrainCircuit', purpose: 'Processes clinical signals and returns explainable diagnostic suggestions.' },
        { name: 'DATABASE', sub: 'PostgreSQL', icon: 'Database', purpose: 'Stores encrypted patient records, timelines, and audit logs.' },
        { name: 'EXTERNAL API', sub: 'Health data', icon: 'Globe2', purpose: 'Integrates with hospital systems and lab result APIs for real-time data.' },
      ],
    },
    roast: {
      questions: [
        { question: 'Why should we approve this project over the 50 other healthcare assistants I have seen this year?', weakness: 'Lack of clear differentiation from existing solutions', answer: 'Our differentiator is explainability: every recommendation comes with auditable context a patient and professor can verify.' },
        { question: 'How does your system handle false positives in diagnosis?', weakness: 'Safety when the AI is wrong', answer: 'We include a confidence threshold and mandatory human review for any recommendation below 85% certainty.' },
        { question: 'What is your data privacy strategy for sensitive medical records?', weakness: 'Privacy compliance gap', answer: 'All data is encrypted at rest and in transit, with role-based access and full audit logging.' },
        { question: 'Can this scale beyond a prototype to real hospital deployment?', weakness: 'Scalability concerns', answer: 'The FastAPI backend is stateless and containerized, ready for horizontal scaling on AWS.' },
      ],
      improvements: ['Add a measurable patient outcome metric to the opening pitch', 'Demonstrate a failure case in the demo to build trust', 'Clarify the regulatory pathway before technical details'],
    },
    judge: { innovation: 9.2, complexity: 8.6, impact: 9.0, feasibility: 8.8, feedback: 'Strong finalist potential. Clear story with serious technical depth.' },
  },

  agriculture: {
    label: 'Agriculture & farming',
    skills: ['Python', 'OpenCV', 'Machine Learning'],
    duration: '5 months',
    difficulty: 'Advanced',
    blueprint: {
      title: 'CropGuard AI',
      tagline: 'Smart Crop Monitoring System',
      pitch: 'A computer vision system that detects crop diseases early and recommends targeted interventions.',
      problem: 'Farmers lose up to 40% of yield to diseases detected too late for effective action.',
      novelty: 'Edge-deployed vision model that works offline on low-cost cameras in remote fields.',
      approval_reason: 'Direct farmer impact, offline-first design, and a practical path to field deployment.',
      features: ['Real-time disease detection', 'Offline edge inference', 'Treatment recommendation engine', 'Yield forecasting'],
      future_scope: ['Drone-based field scanning', 'Multi-language farmer SMS alerts', 'Market price integration'],
      tech_stack: ['React Native', 'Python', 'OpenCV', 'TensorFlow Lite', 'Firebase', 'Raspberry Pi'],
      innovation_score: 88,
      approval_score: 84,
    },
    architecture: {
      nodes: [
        { name: 'USER', sub: 'Farmer / field agent', icon: 'UserRound', purpose: 'Farmers capture crop images and receive actionable treatment guidance.' },
        { name: 'FRONTEND', sub: 'React Native', icon: 'Code2', purpose: 'Mobile app for image capture, disease browsing, and offline treatment guides.' },
        { name: 'BACKEND', sub: 'Firebase', icon: 'Server', purpose: 'Handles authentication, cloud sync when online, and stores treatment history.' },
        { name: 'AI ENGINE', sub: 'TF Lite model', icon: 'BrainCircuit', purpose: 'On-device vision model classifying crop diseases from leaf images.' },
        { name: 'DATABASE', sub: 'Firestore', icon: 'Database', purpose: 'Stores disease catalogs, treatment records, and farmer profiles.' },
        { name: 'EXTERNAL API', sub: 'Weather data', icon: 'Globe2', purpose: 'Fetches local weather to contextualize disease risk and spray timing.' },
      ],
    },
    roast: {
      questions: [
        { question: 'How accurate is your disease detection model on real field images, not just clean datasets?', weakness: 'Model accuracy in uncontrolled environments', answer: 'We trained on augmented field images with variable lighting and achieved 89% precision on holdout field data.' },
        { question: 'What happens when a farmer has no internet connection for weeks?', weakness: 'Offline reliability', answer: 'The TF Lite model runs entirely on-device. Sync happens opportunistically when connectivity returns.' },
        { question: 'How do you handle a disease your model has never seen before?', weakness: 'Unknown disease handling', answer: 'Unknown classifications trigger a referral flow that flags the image for expert review.' },
        { question: 'Is a Raspberry Pi realistic for rural farmers?', weakness: 'Hardware accessibility', answer: 'We target sub-$50 camera modules and provide a loaner hardware kit through NGO partnerships.' },
      ],
      improvements: ['Show a before/after yield comparison in the demo', 'Add a cost-savings calculation per farmer', 'Address the cold-start problem for new crop types'],
    },
    judge: { innovation: 8.8, complexity: 8.2, impact: 9.4, feasibility: 8.4, feedback: 'High-impact project with strong real-world applicability and clear offline strategy.' },
  },

  career: {
    label: 'Career & professional growth',
    skills: ['React', 'Node.js', 'Machine Learning'],
    duration: '4 months',
    difficulty: 'Advanced',
    blueprint: {
      title: 'PathFinder AI',
      tagline: 'AI Career Coach',
      pitch: 'A personalized career intelligence platform that maps skill gaps to real job market demand.',
      problem: 'Students graduate without knowing which skills actually matter for their target roles.',
      novelty: 'Live job-market signal processing combined with individual skill profiling for gap analysis.',
      approval_reason: 'Solves a universal student problem with a data-driven approach and clear monetization path.',
      features: ['Skill gap analysis', 'Live job market scanning', 'Personalized learning paths', 'Resume optimization'],
      future_scope: ['Mock interview simulation', 'LinkedIn integration', 'Salary benchmarking'],
      tech_stack: ['React', 'Node.js', 'Python', 'MongoDB', 'Express', 'OpenAI API'],
      innovation_score: 85,
      approval_score: 82,
    },
    architecture: {
      nodes: [
        { name: 'USER', sub: 'Student / job seeker', icon: 'UserRound', purpose: 'Users input their current skills and target roles to receive gap analysis.' },
        { name: 'FRONTEND', sub: 'React + Tailwind', icon: 'Code2', purpose: 'Dashboard for skill profiles, learning paths, and job market visualizations.' },
        { name: 'BACKEND', sub: 'Node + Express', icon: 'Server', purpose: 'Handles user accounts, skill assessments, and coordinates AI analysis jobs.' },
        { name: 'AI ENGINE', sub: 'NLP model', icon: 'BrainCircuit', purpose: 'Analyzes job postings to extract demanded skills and compares against user profiles.' },
        { name: 'DATABASE', sub: 'MongoDB', icon: 'Database', purpose: 'Stores user profiles, skill assessments, learning resources, and job postings.' },
        { name: 'EXTERNAL API', sub: 'Job listings', icon: 'Globe2', purpose: 'Fetches real-time job postings from LinkedIn and Indeed for market analysis.' },
      ],
    },
    roast: {
      questions: [
        { question: 'How is this different from LinkedIn Learning or any existing career platform?', weakness: 'Lack of differentiation', answer: 'We focus on real-time gap analysis against live job postings, not static course recommendations.' },
        { question: 'How fresh is your job market data?', weakness: 'Data staleness', answer: 'We refresh job postings daily and cache only the top 100 per role category for speed.' },
        { question: 'Can your NLP model accurately extract skills from unstructured job descriptions?', weakness: 'NLP accuracy', answer: 'We fine-tuned a BERT-based extractor on 50K labeled job descriptions with 91% F1 score.' },
        { question: 'What is your monetization strategy?', weakness: 'Business model clarity', answer: 'Freemium for students, with premium analytics and recruiter-facing tools as paid tiers.' },
      ],
      improvements: ['Show a live skill-trend chart in the demo', 'Add a before/after resume score comparison', 'Clarify the data pipeline for job posting ingestion'],
    },
    judge: { innovation: 8.5, complexity: 8.0, impact: 8.8, feasibility: 9.0, feedback: 'Practical and well-scoped. Strong feasibility with a clear user acquisition path.' },
  },
};

export const DEMO_PRESETS = [
  { id: 'healthcare', label: 'Healthcare', domain: 'healthcare' },
  { id: 'agriculture', label: 'Agriculture', domain: 'agriculture' },
  { id: 'career', label: 'Career', domain: 'career' },
];

export const ALL_SKILLS = ['Python', 'React', 'Machine Learning', 'Node.js', 'TensorFlow', 'OpenCV', 'AWS', 'FastAPI'];

export const ALL_DOMAINS = Object.entries(DOMAINS).map(([key, value]) => ({ id: key, label: value.label }));

export function getFallback(domain) {
  return DOMAINS[domain] || DOMAINS.healthcare;
}

export function getFallbackBlueprint(domain) {
  return getFallback(domain).blueprint;
}

export function getFallbackArchitecture(domain) {
  return getFallback(domain).architecture;
}

export function getFallbackRoast(domain) {
  return getFallback(domain).roast;
}

export function getFallbackJudge(domain) {
  return getFallback(domain).judge;
}
