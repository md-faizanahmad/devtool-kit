import type {
  OpenApiDocument,
  OpenApiOperation,
} from '../openapi-viewer.types';

const HTTP_METHODS = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'options',
  'head',
  'trace',
];

export const parseOpenApiDocument = (input: string): OpenApiDocument => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error(
      'Invalid JSON. Please provide a valid OpenAPI JSON document.',
    );
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('The OpenAPI document must be a JSON object.');
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
};

export const extractOpenApiOperations = (
  document: OpenApiDocument,
): OpenApiOperation[] => {
  const operations: OpenApiOperation[] = [];

  Object.entries(document.paths ?? {}).forEach(([path, pathItem]) => {
    if (!pathItem || typeof pathItem !== 'object') return;

    Object.entries(pathItem).forEach(([method, operation]) => {
      if (!HTTP_METHODS.includes(method.toLowerCase())) return;

      if (!operation || typeof operation !== 'object') return;

      const details = operation as Record<string, unknown>;

      operations.push({
        method: method.toUpperCase(),
        path,
        summary:
          typeof details.summary === 'string' ? details.summary : undefined,
        description:
          typeof details.description === 'string'
            ? details.description
            : undefined,
        tags: Array.isArray(details.tags)
          ? details.tags.filter((tag): tag is string => typeof tag === 'string')
          : undefined,
        parameters: Array.isArray(details.parameters)
          ? details.parameters.filter(
              (
                parameter,
              ): parameter is {
                name: string;
                in: string;
                required?: boolean;
                description?: string;
              } =>
                typeof parameter === 'object' &&
                parameter !== null &&
                'name' in parameter &&
                'in' in parameter &&
                typeof parameter.name === 'string' &&
                typeof parameter.in === 'string',
            )
          : undefined,
        requestBody: details.requestBody,
        responses:
          typeof details.responses === 'object' && details.responses !== null
            ? (details.responses as Record<string, unknown>)
            : undefined,
        security: Array.isArray(details.security)
          ? details.security
          : undefined,
      });
    });
  });

  return operations;
};
