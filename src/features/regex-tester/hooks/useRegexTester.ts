import { useMemo, useState } from 'react';
import { testRegex } from '../utils/regex';

const DEFAULT_FLAGS = 'g';

export const useRegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState(DEFAULT_FLAGS);
  const [input, setInput] = useState('');

  const result = useMemo(
    () =>
      testRegex({
        pattern,
        flags,
        input,
      }),
    [pattern, flags, input],
  );

  const updatePattern = (value: string) => {
    setPattern(value);
  };

  const updateFlags = (value: string) => {
    setFlags(value);
  };

  const updateInput = (value: string) => {
    setInput(value);
  };

  const clear = () => {
    setPattern('');
    setFlags(DEFAULT_FLAGS);
    setInput('');
  };

  return {
    state: {
      pattern,
      flags,
      input,
      matches: result.matches,
      error: result.error,
      matchCount: result.matches.length,
      isValid: result.error === null,
    },
    updatePattern,
    updateFlags,
    updateInput,
    clear,
  };
};
