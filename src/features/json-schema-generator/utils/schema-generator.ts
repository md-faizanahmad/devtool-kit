import type {
  JsonSchema,
  JsonSchemaObject,
  JsonSchemaGeneratorOptions,
  JsonSchemaValue,
} from '../json-schema.types';

const SCHEMA_URLS = {
  'draft-07': 'http://json-schema.org/draft-07/schema#',
  '2019-09': 'https://json-schema.org/draft/2019-09/schema',
  '2020-12': 'https://json-schema.org/draft/2020-12/schema',
};

const inferType = (value: JsonSchemaValue): string => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';

  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'integer' : 'number';
  }

  return typeof value;
};

const generateValueSchema = (
  value: JsonSchemaValue,
  options: JsonSchemaGeneratorOptions,
): Record<string, unknown> => {
  if (Array.isArray(value)) {
    return {
      type: 'array',
      items: value.length > 0 ? generateValueSchema(value[0], options) : {},
    };
  }

  if (value !== null && typeof value === 'object') {
    return { ...generateObjectSchema(value, options) };
  }

  return {
    type: inferType(value),
  };
};

const generateObjectSchema = (
  value: Record<string, JsonSchemaValue>,
  options: JsonSchemaGeneratorOptions,
): JsonSchemaObject => {
  const properties: Record<string, unknown> = {};

  Object.entries(value).forEach(([key, item]) => {
    properties[key] = generateValueSchema(item, options);
  });

  return {
    type: 'object',
    properties,
    ...(options.inferRequired ? { required: Object.keys(value) } : {}),
    additionalProperties: options.additionalProperties,
  };
};

export const generateJsonSchema = (
  input: string,
  options: JsonSchemaGeneratorOptions,
): JsonSchema => {
  const parsed: JsonSchemaValue = JSON.parse(input);

  if (parsed === null || Array.isArray(parsed) || typeof parsed !== 'object') {
    throw new Error('JSON input must be a root object.');
  }

  const schema = generateObjectSchema(parsed, options);

  return {
    $schema: SCHEMA_URLS[options.version],
    ...(options.title ? { title: options.title } : {}),
    ...(options.description ? { description: options.description } : {}),
    type: schema.type,
    properties: schema.properties,
    ...(schema.required ? { required: schema.required } : {}),
    additionalProperties: schema.additionalProperties,
  };
};
