import { useCallback, useMemo, useState } from 'react';
import { describeCronExpression, generateCronExpression } from '../utils/cron';
import type {
  CronGeneratorConfig,
  CronScheduleType,
} from '../types/cron-generator.types';

interface CronGeneratorState {
  config: CronGeneratorConfig;
  error: string | null;
  success: string | null;
  copied: boolean;
}

const initialConfig: CronGeneratorConfig = {
  scheduleType: 'daily',
  minute: 0,
  hour: 9,
  dayOfMonth: 1,
  month: 1,
  dayOfWeek: 1,
};

const initialState: CronGeneratorState = {
  config: initialConfig,
  error: null,
  success: null,
  copied: false,
};

export const useCronGenerator = () => {
  const [state, setState] = useState<CronGeneratorState>(initialState);

  const expression = useMemo(() => {
    try {
      return generateCronExpression(state.config);
    } catch {
      return '';
    }
  }, [state.config]);

  const description = useMemo(() => {
    try {
      return describeCronExpression(state.config);
    } catch {
      return '';
    }
  }, [state.config]);

  const updateConfig = useCallback(
    <K extends keyof CronGeneratorConfig>(
      key: K,
      value: CronGeneratorConfig[K],
    ) => {
      setState((prev) => ({
        ...prev,
        config: {
          ...prev.config,
          [key]: value,
        },
        error: null,
        success: null,
        copied: false,
      }));
    },
    [],
  );

  const updateScheduleType = useCallback((scheduleType: CronScheduleType) => {
    setState((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        scheduleType,
      },
      error: null,
      success: null,
      copied: false,
    }));
  }, []);

  const copyExpression = useCallback(async () => {
    if (!expression) {
      setState((prev) => ({
        ...prev,
        error: 'Generate a valid cron expression first.',
        success: null,
      }));
      return;
    }

    try {
      await navigator.clipboard.writeText(expression);

      setState((prev) => ({
        ...prev,
        copied: true,
        success: 'Cron expression copied successfully.',
        error: null,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        copied: false,
        error: 'Failed to copy cron expression.',
        success: null,
      }));
    }
  }, [expression]);

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    expression,
    description,
    updateConfig,
    updateScheduleType,
    copyExpression,
    clear,
  };
};
