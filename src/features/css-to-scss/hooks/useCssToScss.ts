import { useState } from 'react';
import { convertCssToScss } from '../utils/css-to-scss';

export const useCssToScss = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    try {
      const result = convertCssToScss(input);

      setOutput(result);
      setError(null);
    } catch (err) {
      setOutput('');
      setError(
        err instanceof Error ? err.message : 'Failed to convert CSS to SCSS.',
      );
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return {
    input,
    output,
    error,
    setInput,
    convert,
    clearAll,
  };
};
