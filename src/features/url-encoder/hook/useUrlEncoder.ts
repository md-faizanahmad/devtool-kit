import { useState } from 'react';
import { decodeUrl, encodeUrl } from '../utils/url-encoder';

export type UrlMode = 'encode' | 'decode';

export function useUrlEncoder() {
  const [mode, setMode] = useState<UrlMode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const updateInput = (value: string) => {
    setInput(value);
    setOutput('');
    setError('');
    setCopied(false);
  };

  const changeMode = (nextMode: UrlMode) => {
    setMode(nextMode);
    setOutput('');
    setError('');
    setCopied(false);
  };

  const convert = () => {
    try {
      const result = mode === 'encode' ? encodeUrl(input) : decodeUrl(input);

      setOutput(result);
      setError('');
      setCopied(false);
    } catch {
      setOutput('');
      setError('Invalid URL-encoded input. Check the percent-encoding.');
    }
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setError('');
    } catch {
      setError('Unable to copy output to clipboard.');
    }
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  return {
    mode,
    input,
    output,
    error,
    copied,
    updateInput,
    changeMode,
    convert,
    copyOutput,
    clear,
  };
}
