import { useState } from 'react';
import type {
  MockDataConfig,
  MockDataState,
  MockField,
  MockDataTemplate,
} from '../mock-data.types';
import { generateCustomData, generateTemplateData } from '../utils/templates';

const initialConfig: MockDataConfig = {
  template: 'users',
  count: 10,
  fields: [],
  format: 'json',
};

export const useMockData = () => {
  const [state, setState] = useState<MockDataState>({
    config: initialConfig,
    output: '',
    error: null,
  });

  const updateConfig = (updates: Partial<MockDataConfig>) => {
    setState((previous) => ({
      ...previous,
      config: {
        ...previous.config,
        ...updates,
      },
      error: null,
    }));
  };

  const setTemplate = (template: MockDataTemplate) => {
    updateConfig({ template });
  };

  const setCount = (count: number) => {
    updateConfig({ count });
  };

  const addField = (field: MockField) => {
    updateConfig({
      fields: [...state.config.fields, field],
    });
  };

  const updateField = (id: string, updates: Partial<MockField>) => {
    updateConfig({
      fields: state.config.fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    });
  };

  const removeField = (id: string) => {
    updateConfig({
      fields: state.config.fields.filter((field) => field.id !== id),
    });
  };

  const generateData = () => {
    try {
      const data = state.config.fields.length
        ? generateCustomData(state.config.fields, state.config.count)
        : generateTemplateData(state.config.template, state.config.count);

      setState((previous) => ({
        ...previous,
        output: JSON.stringify(data, null, 2),
        error: null,
      }));
    } catch {
      setState((previous) => ({
        ...previous,
        error: 'Failed to generate mock data.',
      }));
    }
  };

  const clearData = () => {
    setState((previous) => ({
      ...previous,
      output: '',
      error: null,
    }));
  };

  return {
    ...state,
    updateConfig,
    setTemplate,
    setCount,
    addField,
    updateField,
    removeField,
    generateData,
    clearData,
  };
};
