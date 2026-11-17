import { useState } from 'react';
import {
  dateToTimestamp,
  timestampToDate,
  type TimestampUnit,
} from '../utils/timestamp';

export type TimestampMode = 'timestamp-to-date' | 'date-to-timestamp';

export function useTimestampConverter() {
  const [mode, setMode] = useState<TimestampMode>('timestamp-to-date');
  const [unit, setUnit] = useState<TimestampUnit>('seconds');
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

  const changeMode = (nextMode: TimestampMode) => {
    setMode(nextMode);
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  const changeUnit = (nextUnit: TimestampUnit) => {
    setUnit(nextUnit);
    setOutput('');
    setError('');
    setCopied(false);
  };

  const convert = () => {
    try {
      if (!input.trim()) {
        throw new Error('Please enter a value to convert.');
      }

      let result: string;

      if (mode === 'timestamp-to-date') {
        const timestamp = Number(input);

        if (!Number.isFinite(timestamp)) {
          throw new Error('Enter a valid numeric timestamp.');
        }

        result = timestampToDate(timestamp, unit).toISOString();
      } else {
        result = String(dateToTimestamp(input, unit));
      }

      setOutput(result);
      setError('');
      setCopied(false);
    } catch (error) {
      setOutput('');
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to convert the provided value.',
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
    unit,
    input,
    output,
    error,
    copied,
    updateInput,
    changeMode,
    changeUnit,
    convert,
    copyOutput,
    clear,
  };
}
