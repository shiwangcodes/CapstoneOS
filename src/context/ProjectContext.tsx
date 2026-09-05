import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  generateProjectBlueprint,
  generateArchitecture,
  generateProfessorRoast,
  generateJudgeScore,
} from '../services/aiEngine';
import { DOMAINS, DEMO_PRESETS, ALL_SKILLS, ALL_DOMAINS } from '../data/fallbackResponses';

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [config, setConfig] = useState({
    skills: ['React', 'Machine Learning'],
    domain: 'Healthcare & wellbeing',
    duration: '6 months',
    difficulty: 'Frontier',
  });

  const [blueprint, setBlueprint] = useState(null);
  const [architecture, setArchitecture] = useState(null);
  const [roast, setRoast] = useState(null);
  const [judgeScore, setJudgeScore] = useState(null);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const updateConfig = useCallback((partial) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleSkill = useCallback((skill) => {
    setConfig((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  }, []);

  const runWithLoading = useCallback(async (key, fn) => {
    setLoading(key);
    setError(null);
    try {
      const result = await fn();
      return result;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setLoading(null);
    }
  }, []);

  const generateBlueprint = useCallback(async () => {
    return runWithLoading('blueprint', async () => {
      await new Promise((r) => setTimeout(r, 2500));
      const result = generateProjectBlueprint(config);
      setBlueprint(result);
      return result;
    });
  }, [config, runWithLoading]);

  const loadArchitecture = useCallback(async () => {
    return runWithLoading('architecture', async () => {
      await new Promise((r) => setTimeout(r, 1800));
      const source = blueprint || config;
      const result = generateArchitecture(source);
      setArchitecture(result);
      return result;
    });
  }, [blueprint, config, runWithLoading]);

  const startRoast = useCallback(async () => {
    return runWithLoading('roast', async () => {
      await new Promise((r) => setTimeout(r, 2200));
      const source = blueprint || config;
      const result = generateProfessorRoast(source);
      setRoast(result);
      return result;
    });
  }, [blueprint, config, runWithLoading]);

  const runJudge = useCallback(async () => {
    return runWithLoading('judge', async () => {
      await new Promise((r) => setTimeout(r, 2000));
      const source = blueprint || config;
      const result = generateJudgeScore(source);
      setJudgeScore(result);
      return result;
    });
  }, [blueprint, config, runWithLoading]);

  const loadDemoPreset = useCallback(async (domainKey) => {
    const preset = DEMO_PRESETS.find((p) => p.id === domainKey || p.domain === domainKey);
    if (!preset) return;
    const domainData = DOMAINS[preset.domain];
    if (!domainData) return;
    setConfig({
      skills: domainData.skills,
      domain: domainData.label,
      duration: domainData.duration,
      difficulty: domainData.difficulty,
    });
    setLoading('blueprint');
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 2500));
      const bp = generateProjectBlueprint({
        skills: domainData.skills,
        domain: domainData.label,
        duration: domainData.duration,
        difficulty: domainData.difficulty,
      });
      setBlueprint(bp);
      const arch = generateArchitecture(bp);
      setArchitecture(arch);
      const roastResult = generateProfessorRoast(bp);
      setRoast(roastResult);
      const judgeResult = generateJudgeScore(bp);
      setJudgeScore(judgeResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(null);
    }
  }, []);

  const value = useMemo(() => ({
    config,
    updateConfig,
    toggleSkill,
    blueprint,
    generateBlueprint,
    architecture,
    loadArchitecture,
    roast,
    startRoast,
    judgeScore,
    runJudge,
    loading,
    error,
    loadDemoPreset,
    DEMO_PRESETS,
    ALL_SKILLS,
    ALL_DOMAINS,
  }), [config, updateConfig, toggleSkill, blueprint, generateBlueprint, architecture, loadArchitecture, roast, startRoast, judgeScore, runJudge, loading, error, loadDemoPreset]);

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within ProjectProvider');
  return ctx;
}
