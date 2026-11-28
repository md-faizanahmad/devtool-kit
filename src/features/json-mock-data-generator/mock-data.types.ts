export type MockDataTemplate =
  'users' | 'products' | 'addresses' | 'api-responses';

export type MockFieldType =
  'string' | 'number' | 'boolean' | 'email' | 'uuid' | 'date';

export type MockDataFormat = 'json' | 'csv' | 'xml' | 'yaml' | 'sql' | 'html';

export interface MockField {
  id: string;
  name: string;
  type: MockFieldType;
  enabled: boolean;
}

export interface MockDataConfig {
  template: MockDataTemplate;
  count: number;
  fields: MockField[];
  format: MockDataFormat;
}

export interface MockDataState {
  config: MockDataConfig;
  output: string;
  error: string | null;
}
