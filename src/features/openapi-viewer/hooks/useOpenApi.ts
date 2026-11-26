import { useMemo, useState } from 'react';
import type {
  OpenApiDocument,
  OpenApiFormat,
  OpenApiOperation,
} from '../openapi-viewer.types';
import {
  parseOpenApiDocument,
  extractOpenApiOperations,
} from '../utils/openapi-parser';
import { parseOpenApiYaml } from '../utils/openapi-yaml';

export const useOpenApi = () => {
  const [input, setInput] = useState('');
  const [format, setFormat] = useState<OpenApiFormat>('json');
  const [document, setDocument] = useState<OpenApiDocument | null>(null);
  const [error, setError] = useState<string | null>(null);

  const operations = useMemo<OpenApiOperation[]>(
    () => (document ? extractOpenApiOperations(document) : []),
    [document],
  );

  const parseDocument = () => {
    try {
      if (!input.trim()) {
        throw new Error('Paste an OpenAPI specification first.');
      }

      const parsed =
        format === 'json'
          ? parseOpenApiDocument(input)
          : parseOpenApiYaml(input);

      setDocument(parsed);
      setError(null);
    } catch (err) {
      setDocument(null);
      setError(
        err instanceof Error ? err.message : 'Failed to parse specification.',
      );
    }
  };

  const clearAll = () => {
    setInput('');
    setDocument(null);
    setError(null);
  };

  return {
    input,
    format,
    document,
    operations,
    error,
    setInput,
    setFormat,
    parseDocument,
    clearAll,
  };
};
