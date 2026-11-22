export type TypeScriptOutputType = 'interface' | 'type';

export interface JsonToTypescriptOptions {
  json: string;
  rootName: string;
  outputType: TypeScriptOutputType;
  useExport: boolean;
  useSemicolons: boolean;
}

export interface JsonToTypescriptResult {
  output: string;
  error: string | null;
}

export interface JsonToTypescriptState {
  input: string;
  output: string;
  rootName: string;
  outputType: TypeScriptOutputType;
  useExport: boolean;
  useSemicolons: boolean;
  error: string | null;
  success: string | null;
  copied: boolean;
  isProcessing: boolean;
}
