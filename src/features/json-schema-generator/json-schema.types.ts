export type JsonSchemaVersion = 'draft-07' | '2019-09' | '2020-12';

export interface JsonSchemaConfig {
  version: JsonSchemaVersion;
  title: string;
  description: string;
  inferRequired: boolean;
  additionalProperties: boolean;
}

export interface JsonSchemaState {
  input: string;
  output: string;
  config: JsonSchemaConfig;
  error: string | null;
}

export interface JsonSchemaGeneratorOptions {
  version: JsonSchemaVersion;
  title?: string;
  description?: string;
  inferRequired: boolean;
  additionalProperties: boolean;
}

export type JsonSchemaValue =
  | string
  | number
  | boolean
  | null
  | JsonSchemaValue[]
  | { [key: string]: JsonSchemaValue };

export interface JsonSchema {
  $schema: string;
  title?: string;
  description?: string;
  type: string;
  properties?: Record<string, unknown>;
  required?: string[];
  items?: unknown;
  additionalProperties?: boolean;
  [key: string]: unknown;
}
