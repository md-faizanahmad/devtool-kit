import { useState } from 'react';
import type {
  SqlFormatterConfig,
  SqlFormatterState,
} from '../sql-formatter.types';
import { formatSql, minifySql } from '../utils/formatter';

const initialConfig: SqlFormatterConfig = {
  dialect: 'sql',
  keywordCase: 'upper',
  indentation: 2,
};

export const useSqlFormatter = () => {
  const [state, setState] = useState<SqlFormatterState>({
    input: '',
    output: '',
    config: initialConfig,
    error: null,
  });

  const updateInput = (input: string) => {
    setState((previous) => ({
      ...previous,
      input,
      error: null,
    }));
  };

  const updateConfig = (updates: Partial<SqlFormatterConfig>) => {
    setState((previous) => ({
      ...previous,
      config: {
        ...previous.config,
        ...updates,
      },
      error: null,
    }));
  };

  const formatQuery = () => {
    try {
      const output = formatSql(state.input, state.config);

      setState((previous) => ({
        ...previous,
        output,
        error: null,
      }));
    } catch (error) {
      setState((previous) => ({
        ...previous,
        output: '',
        error:
          error instanceof Error
            ? error.message
            : 'Failed to format SQL query.',
      }));
    }
  };

  const minifyQuery = () => {
    try {
      const output = minifySql(state.input);

      setState((previous) => ({
        ...previous,
        output,
        error: null,
      }));
    } catch {
      setState((previous) => ({
        ...previous,
        output: '',
        error: 'Failed to minify SQL query.',
      }));
    }
  };

  const clearAll = () => {
    setState((previous) => ({
      ...previous,
      input: '',
      output: '',
      error: null,
    }));
  };

  return {
    ...state,
    updateInput,
    updateConfig,
    formatQuery,
    minifyQuery,
    clearAll,
  };
};
