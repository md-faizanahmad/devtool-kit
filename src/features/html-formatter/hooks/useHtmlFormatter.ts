import { useState } from 'react';
import { formatHtml, minifyHtml, validateHtml } from '../utils/html';

type HtmlAction = 'format' | 'minify' | 'validate';

interface HtmlFormatterState {
  input: string;
  output: string;
  error: string;
  success: string;
  copied: boolean;
  isProcessing: boolean;
}

const initialState: HtmlFormatterState = {
  input: '',
  output: '',
  error: '',
  success: '',
  copied: false,
  isProcessing: false,
};

export const useHtmlFormatter = () => {
  const [state, setState] = useState<HtmlFormatterState>(initialState);

  const updateState = (updates: Partial<HtmlFormatterState>) => {
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

  const processHtml = async (action: HtmlAction) => {
    if (!state.input.trim()) {
      updateState({
        output: '',
        error: 'Enter HTML markup first.',
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
        const result = await validateHtml(state.input);

        updateState(
          result.isValid
            ? { success: 'HTML syntax parsed successfully.' }
            : { error: result.error ?? 'Invalid HTML markup.' },
        );
        return;
      }

      const result =
        action === 'format'
          ? await formatHtml({ html: state.input })
          : await minifyHtml(state.input);

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
            ? 'HTML formatted successfully.'
            : 'HTML minified successfully.',
      });
    } catch {
      updateState({
        output: '',
        error: 'Something went wrong while processing HTML.',
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
        error: 'Unable to copy HTML to clipboard.',
      });
    }
  };

  const downloadOutput = () => {
    if (!state.output) return;

    const blob = new Blob([state.output], {
      type: 'text/html;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = 'formatted.html';
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
    format: () => processHtml('format'),
    minify: () => processHtml('minify'),
    validate: () => processHtml('validate'),
    copyOutput,
    downloadOutput,
    clear,
  };
};
