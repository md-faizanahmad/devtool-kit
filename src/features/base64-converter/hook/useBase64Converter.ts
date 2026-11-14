import { useState } from 'react';
import { encodeBase64, decodeBase64 } from '../utils/base64';

export type ConversionMode = 'encode' | 'decode';

export function useBase64Converter() {
  const [mode, setMode] = useState<ConversionMode>('encode');
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

  const changeMode = (nextMode: ConversionMode) => {
    setMode(nextMode);
    setOutput('');
    setError('');
    setCopied(false);
  };

  const convert = () => {
    try {
      const result =
        mode === 'encode' ? encodeBase64(input) : decodeBase64(input);

      setOutput(result);
      setError('');
      setCopied(false);
    } catch {
      setOutput('');
      setError(
        mode === 'encode'
          ? 'Unable to encode the provided text.'
          : 'Invalid Base64 input or unsupported UTF-8 data.',
      );
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
