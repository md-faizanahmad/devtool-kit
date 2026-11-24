import { useState } from 'react';
import type { JsonSchemaConfig, JsonSchemaState } from '../json-schema.types';
import { generateJsonSchema } from '../utils/schema-generator';

const initialConfig: JsonSchemaConfig = {
  version: '2020-12',
  title: '',
  description: '',
  inferRequired: true,
  additionalProperties: false,
};

export const useJsonSchema = () => {
  const [state, setState] = useState<JsonSchemaState>({
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

  const updateConfig = (updates: Partial<JsonSchemaConfig>) => {
    setState((previous) => ({
      ...previous,
      config: {
        ...previous.config,
        ...updates,
      },
      error: null,
    }));
  };

  const generateSchema = () => {
    try {
      if (!state.input.trim()) {
        throw new Error('Enter JSON data to generate a schema.');
      }

      const schema = generateJsonSchema(state.input, {
        version: state.config.version,
        title: state.config.title.trim(),
        description: state.config.description.trim(),
        inferRequired: state.config.inferRequired,
        additionalProperties: state.config.additionalProperties,
      });

      setState((previous) => ({
        ...previous,
        output: JSON.stringify(schema, null, 2),
        error: null,
      }));
    } catch (error) {
      setState((previous) => ({
        ...previous,
        output: '',
        error:
          error instanceof Error
            ? error.message
            : 'Failed to generate JSON Schema.',
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
    generateSchema,
    clearAll,
  };
};
