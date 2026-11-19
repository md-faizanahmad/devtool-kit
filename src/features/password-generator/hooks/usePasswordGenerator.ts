import { useCallback, useState } from 'react';
import { generatePassword, type PasswordOptions } from '../utils/password';

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
};

export const usePasswordGenerator = () => {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const updateOption = <K extends keyof PasswordOptions>(
    key: K,
    value: PasswordOptions[K],
  ) => {
    setOptions((current) => ({
      ...current,
      [key]: value,
    }));
    setError('');
  };

  const generate = useCallback(() => {
    try {
      const result = generatePassword(options);
      setPassword(result);
      setError('');
      setCopied(false);
    } catch (err) {
      setPassword('');
      setError(
        err instanceof Error ? err.message : 'Failed to generate password.',
      );
    }
  }, [options]);

  const copyPassword = useCallback(async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
    } catch {
      setError('Unable to copy password to clipboard.');
      setCopied(false);
    }
  }, [password]);

  const clear = () => {
    setPassword('');
    setError('');
    setCopied(false);
  };

  return {
    options,
    password,
    error,
    copied,
    updateOption,
    generate,
    copyPassword,
    clear,
  };
};
