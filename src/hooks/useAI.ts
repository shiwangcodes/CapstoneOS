import { useCallback, useState } from 'react';
import { useProject } from '../context/ProjectContext';

export function useAI() {
  const project = useProject();
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    'CAPSTONE AI ANALYZING...',
    'Understanding problem...',
    'Designing solution...',
    'Preparing defense...',
  ];

  const runGeneration = useCallback(async (action) => {
    setLoadingStep(1);
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 700);
    try {
      const result = await action();
      clearInterval(stepInterval);
      setLoadingStep(0);
      return result;
    } catch (err) {
      clearInterval(stepInterval);
      setLoadingStep(0);
      throw err;
    }
  }, []);

  return {
    ...project,
    loadingStep,
    loadingMessages,
    runGeneration,
  };
}
