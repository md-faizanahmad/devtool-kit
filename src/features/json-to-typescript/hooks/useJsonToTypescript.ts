import { useCallback, useState } from 'react';
import { convertJsonToTypescript } from '../utils/json-to-typescript';
import type {
  JsonToTypescriptOptions,
  JsonToTypescriptState,
  TypeScriptOutputType,
} from '../json-to-typescript.types';

const initialState: JsonToTypescriptState = {
  input: '',
  output: '',
  rootName: 'Root',
  outputType: 'interface',
  useExport: true,
  useSemicolons: true,
  error: null,
  success: null,
  copied: false,
  isProcessing: false,
};

export const useJsonToTypescript = () => {
  const [state, setState] = useState<JsonToTypescriptState>(initialState);

  const updateInput = useCallback((input: string) => {
    setState((prev) => ({
      ...prev,
      input,
      output: '',
      error: null,
      success: null,
      copied: false,
    }));
  }, []);

  const updateRootName = useCallback((rootName: string) => {
    setState((prev) => ({
      ...prev,
      rootName,
      output: '',
      error: null,
      success: null,
      copied: false,
    }));
  }, []);

  const updateOutputType = useCallback((outputType: TypeScriptOutputType) => {
    setState((prev) => ({
      ...prev,
      outputType,
      output: '',
      error: null,
      success: null,
      copied: false,
    }));
  }, []);

  const updateOption = useCallback(
    (key: 'useExport' | 'useSemicolons', value: boolean) => {
      setState((prev) => ({
        ...prev,
        [key]: value,
        output: '',
        error: null,
        success: null,
        copied: false,
      }));
    },
    [],
  );

  const convert = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isProcessing: true,
      error: null,
      success: null,
      copied: false,
    }));

    const options: JsonToTypescriptOptions = {
      json: state.input,
      rootName: state.rootName,
      outputType: state.outputType,
      useExport: state.useExport,
      useSemicolons: state.useSemicolons,
    };

    const result = convertJsonToTypescript(options);

    setState((prev) => ({
      ...prev,
      output: result.output,
      error: result.error,
      success: result.error ? null : 'JSON converted successfully.',
      isProcessing: false,
    }));
  }, [state]);

  const copyOutput = useCallback(async () => {
    if (!state.output) return;

    try {
      await navigator.clipboard.writeText(state.output);

      setState((prev) => ({
        ...prev,
        copied: true,
        success: 'TypeScript code copied successfully.',
        error: null,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        copied: false,
        error: 'Failed to copy TypeScript code.',
        success: null,
      }));
    }
  }, [state.output]);

  const downloadOutput = useCallback(() => {
    if (!state.output) return;

    const blob = new Blob([state.output], {
      type: 'text/typescript;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${state.rootName || 'types'}.ts`;
    link.click();

    URL.revokeObjectURL(url);

    setState((prev) => ({
      ...prev,
      success: 'TypeScript file downloaded successfully.',
      error: null,
    }));
  }, [state.output, state.rootName]);

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    updateInput,
    updateRootName,
    updateOutputType,
    updateOption,
    convert,
    copyOutput,
    downloadOutput,
    clear,
  };
};
