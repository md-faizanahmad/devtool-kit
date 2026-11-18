import { useState } from 'react';
import { convertTextCase, type TextCase } from '../utils/text-case';

interface TextCaseConverterState {
  input: string;
  output: string;
  selectedCase: TextCase;
  error: string;
  copied: boolean;
}

const initialState: TextCaseConverterState = {
  input: '',
  output: '',
  selectedCase: 'camel',
  error: '',
  copied: false,
};

export function useTextCaseConverter() {
  const [state, setState] = useState(initialState);

  const updateState = (updates: Partial<TextCaseConverterState>) => {
    setState((previous) => ({ ...previous, ...updates }));
  };

  const updateInput = (input: string) => {
    updateState({ input, output: '', error: '', copied: false });
  };

  const updateCase = (selectedCase: TextCase) => {
    updateState({ selectedCase, output: '', error: '', copied: false });
  };

  const convert = () => {
    if (!state.input.trim()) {
      updateState({ error: 'Enter some text to convert.', output: '' });
      return;
    }

    try {
      const output = convertTextCase(state.input, state.selectedCase);
      updateState({ output, error: '', copied: false });
    } catch {
      updateState({ error: 'Failed to convert text.', output: '' });
    }
  };

  const copyOutput = async () => {
    if (!state.output) return;

    try {
      await navigator.clipboard.writeText(state.output);
      updateState({ copied: true, error: '' });
    } catch {
      updateState({ error: 'Failed to copy to clipboard.', copied: false });
    }
  };

  const clear = () => setState(initialState);

  return {
    state,
    updateInput,
    updateCase,
    convert,
    copyOutput,
    clear,
  };
}
