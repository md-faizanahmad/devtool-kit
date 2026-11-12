import { useState } from 'react';
import { formatJson, type JsonFormatMode } from '../utils/format-json';
import { repairJson } from '../utils/repair-json';
import { validateJson } from '../utils/validate-json';

interface JsonFormatterState {
  input: string;
  output: string;
  error: string;
  validationMessage: string;
  isValid: boolean | null;
  copied: boolean;
}

const initialState: JsonFormatterState = {
  input: '',
  output: '',
  error: '',
  validationMessage: '',
  isValid: null,
  copied: false,
};

export function useJsonFormatter() {
  const [state, setState] = useState(initialState);

  const updateState = (updates: Partial<JsonFormatterState>) => {
    setState((previous) => ({ ...previous, ...updates }));
  };

  const setInput = (input: string) => {
    updateState({
      input,
      error: '',
      validationMessage: '',
      isValid: null,
      copied: false,
    });
  };

  const format = (mode: JsonFormatMode) => {
    try {
      const output = formatJson(state.input, mode);

      updateState({
        output,
        error: '',
        validationMessage: '',
        isValid: null,
        copied: false,
      });
    } catch {
      updateState({
        output: '',
        error: 'Invalid JSON. Please check your input syntax.',
        validationMessage: '',
        isValid: null,
      });
    }
  };

  const repair = () => {
    try {
      const output = formatJson(repairJson(state.input), 'pretty');

      updateState({
        output,
        error: '',
        validationMessage: '',
        isValid: null,
        copied: false,
      });
    } catch {
      updateState({
        output: '',
        error: 'Unable to repair this input.',
        validationMessage: '',
        isValid: null,
      });
    }
  };

  const validate = () => {
    const result = validateJson(state.input);

    updateState({
      validationMessage: result.error ?? 'Valid JSON. No syntax errors found.',
      isValid: result.isValid,
      error: '',
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(state.output);
      updateState({ copied: true, error: '' });
    } catch {
      updateState({ error: 'Unable to copy output to clipboard.' });
    }
  };

  const uploadFile = async (file: File) => {
    try {
      if (!file.name.toLowerCase().endsWith('.json')) {
        throw new Error('Please select a valid .json file.');
      }

      const content = await file.text();

      updateState({
        input: content,
        output: '',
        error: '',
        validationMessage: '',
        isValid: null,
        copied: false,
      });
    } catch (error) {
      updateState({
        error:
          error instanceof Error
            ? error.message
            : 'Unable to read the selected file.',
      });
    }
  };

  const clear = () => {
    setState(initialState);
  };

  return {
    ...state,
    setInput,
    format,
    repair,
    validate,
    copy,
    clear,
    uploadFile,
  };
}
