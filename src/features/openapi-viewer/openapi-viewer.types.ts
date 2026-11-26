export type OpenApiFormat = 'json' | 'yaml';

export interface OpenApiState {
  input: string;
  format: OpenApiFormat;
  error: string | null;
}

export interface OpenApiParameter {
  name: string;
  in: string;
  required?: boolean;
  description?: string;
}

export interface OpenApiOperation {
  method: string;
  path: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: OpenApiParameter[];
  requestBody?: unknown;
  responses?: Record<string, unknown>;
  security?: unknown[];
}

export interface OpenApiDocument {
  openapi?: string;
  info?: {
    title?: string;
    version?: string;
    description?: string;
  };
  paths?: Record<string, Record<string, unknown>>;
  components?: Record<string, unknown>;
  security?: unknown[];
}
