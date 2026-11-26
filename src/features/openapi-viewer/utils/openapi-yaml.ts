import { parse } from 'yaml';
import type { OpenApiDocument } from '../openapi-viewer.types';

export const parseOpenApiYaml = (input: string): OpenApiDocument => {
  try {
    const parsed: unknown = parse(input);

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('The OpenAPI document must be a YAML object.');
    }

    const document = parsed as OpenApiDocument;

    if (
      typeof document.openapi !== 'string' ||
      !document.openapi.startsWith('3.')
    ) {
      throw new Error('A valid OpenAPI 3.x document is required.');
    }

    if (!document.paths || typeof document.paths !== 'object') {
      throw new Error('The OpenAPI document must contain a paths object.');
    }

    return document;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to parse OpenAPI YAML.',
      { cause: error },
    );
  }
};
