import { useState } from 'react';
import {
  dateToTimestamp,
  timestampToDate,
  type TimestampUnit,
} from '../utils/timestamp';

export type TimestampMode = 'timestamp-to-date' | 'date-to-timestamp';

interface TimestampConverterState {
  mode: TimestampMode;
  unit: TimestampUnit;
  input: string;
  output: string;
  error: string;
  copied: boolean;
}

const initialState: TimestampConverterState = {
  mode: 'timestamp-to-date',
  unit: 'seconds',
  input: '',
  output: '',
  error: '',
  copied: false,
};

export function useTimestampConverter() {
  const [state, setState] = useState(initialState);
  const updateState = (updates: Partial<TimestampConverterState>) => {
    setState((previous) => ({ ...previous, ...updates }));
  };
  const updateInput = (input: string) => {
    updateState({ input, output: '', error: '', copied: false });
  };
  const changeMode = (mode: TimestampMode) => {
    setState({ ...initialState, mode });
  };
  const changeUnit = (unit: TimestampUnit) => {
    updateState({ unit, output: '', error: '', copied: false });
  };

  const convert = () => {
    try {
      if (!state.input.trim()) {
        throw new Error('Please enter a value to convert.');
      }

      let output: string;

      if (state.mode === 'timestamp-to-date') {
        const timestamp = Number(state.input);

        if (!Number.isFinite(timestamp)) {
          throw new Error('Enter a valid numeric timestamp.');
        }

        output = timestampToDate(timestamp, state.unit).toISOString();
      } else {
        output = String(dateToTimestamp(state.input, state.unit));
      }

      updateState({ output, error: '', copied: false });
    } catch (error) {
      updateState({
        output: '',
        error:
          error instanceof Error
            ? error.message
            : 'Unable to convert the provided value.',
      });
    }
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(state.output);
      updateState({ copied: true, error: '' });
    } catch {
      updateState({ error: 'Unable to copy output to clipboard.' });
    }
  };

  const clear = () => {
    updateState({
      input: '',
      output: '',
      error: '',
      copied: false,
    });
  };

  return {
    ...state,
    updateInput,
    changeMode,
    changeUnit,
    convert,
    copyOutput,
    clear,
  };
}
