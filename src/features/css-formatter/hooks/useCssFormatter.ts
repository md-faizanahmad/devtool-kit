import { useState } from 'react';
import { formatCss, minifyCss, validateCss } from '../utils/css';

type CssAction = 'format' | 'minify' | 'validate';

interface CssFormatterState {
  input: string;
  output: string;
  error: string;
  success: string;
  copied: boolean;
  isProcessing: boolean;
}

const initialState: CssFormatterState = {
  input: '',
  output: '',
  error: '',
  success: '',
  copied: false,
  isProcessing: false,
};

export const useCssFormatter = () => {
  const [state, setState] = useState<CssFormatterState>(initialState);

  const updateState = (updates: Partial<CssFormatterState>) => {
    setState((current) => ({
      ...current,
      ...updates,
    }));
  };

  const updateInput = (value: string) => {
    updateState({
      input: value,
      error: '',
      success: '',
      copied: false,
    });
  };

  const processCss = async (action: CssAction) => {
    if (!state.input.trim()) {
      updateState({
        output: '',
        error: 'Enter CSS code first.',
        success: '',
      });
      return;
    }

    updateState({
      isProcessing: true,
      error: '',
      success: '',
      copied: false,
    });

    try {
      if (action === 'validate') {
        const result = await validateCss(state.input);

        updateState(
          result.isValid
            ? { success: 'CSS syntax parsed successfully.' }
            : { error: result.error ?? 'Invalid CSS syntax.' },
        );
        return;
      }

      const result =
        action === 'format'
          ? await formatCss({ css: state.input })
          : await minifyCss(state.input);

      if (result.error) {
        updateState({
          output: '',
          error: result.error,
        });
        return;
      }

      updateState({
        output: result.output,
        success:
          action === 'format'
            ? 'CSS formatted successfully.'
            : 'CSS minified successfully.',
      });
    } catch {
      updateState({
        output: '',
        error: 'Something went wrong while processing CSS.',
      });
    } finally {
      updateState({ isProcessing: false });
    }
  };

  const copyOutput = async () => {
    if (!state.output) return;

    try {
      await navigator.clipboard.writeText(state.output);

      updateState({
        copied: true,
        error: '',
      });
    } catch {
      updateState({
        copied: false,
        error: 'Unable to copy CSS to clipboard.',
      });
    }
  };

  const downloadOutput = () => {
    if (!state.output) return;

    const blob = new Blob([state.output], {
      type: 'text/css;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = 'formatted.css';
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const clear = () => {
    setState(initialState);
  };

  return {
    state: {
      ...state,
      hasInput: Boolean(state.input.trim()),
      hasOutput: Boolean(state.output),
    },
    updateInput,
    format: () => processCss('format'),
    minify: () => processCss('minify'),
    validate: () => processCss('validate'),
    copyOutput,
    downloadOutput,
    clear,
  };
};
