import type {
  JsonToTypescriptOptions,
  JsonToTypescriptResult,
} from '../json-to-typescript.types';

type JsonObject = Record<string, unknown>;

interface GeneratorContext {
  declarations: string[];
  outputType: 'interface' | 'type';
  useExport: boolean;
  useSemicolons: boolean;
}

const formatName = (value: string): string => {
  const words = value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/);

  const name = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return /^[0-9]/.test(name) ? `Type${name}` : name || 'Root';
};

const isObject = (value: unknown): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const inferType = (
  value: unknown,
  propertyName: string,
  context: GeneratorContext,
): string => {
  if (value === null) return 'null';

  if (Array.isArray(value)) {
    if (value.length === 0) return 'unknown[]';

    const types = [
      ...new Set(value.map((item) => inferType(item, propertyName, context))),
    ];

    return `${types.join(' | ')}[]`;
  }

  if (isObject(value)) {
    const typeName = formatName(propertyName);

    generateDeclaration(value, typeName, context);

    return typeName;
  }

  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';

  return 'unknown';
};

const generateDeclaration = (
  object: JsonObject,
  name: string,
  context: GeneratorContext,
): void => {
  const { outputType, useExport, useSemicolons } = context;
  const properties = Object.entries(object);

  const exportKeyword = useExport ? 'export ' : '';
  const terminator = useSemicolons ? ';' : '';

  if (outputType === 'interface') {
    const lines = properties.map(([key, value]) => {
      const propertyType = inferType(value, key, context);
      const propertyName = /^[a-zA-Z_$][\w$]*$/.test(key)
        ? key
        : JSON.stringify(key);

      return `  ${propertyName}: ${propertyType}${terminator}`;
    });

    context.declarations.push(
      `${exportKeyword}interface ${name} {\n${lines.join('\n')}\n}`,
    );

    return;
  }

  const lines = properties.map(([key, value]) => {
    const propertyType = inferType(value, key, context);
    const propertyName = /^[a-zA-Z_$][\w$]*$/.test(key)
      ? key
      : JSON.stringify(key);

    return `  ${propertyName}: ${propertyType}${terminator}`;
  });

  context.declarations.push(
    `${exportKeyword}type ${name} = {\n${lines.join('\n')}\n}`,
  );
};

/**
 * Converts a JSON object into TypeScript declarations.
 */
export const convertJsonToTypescript = ({
  json,
  rootName,
  outputType,
  useExport,
  useSemicolons,
}: JsonToTypescriptOptions): JsonToTypescriptResult => {
  if (!json.trim()) {
    return {
      output: '',
      error: 'Enter JSON data to convert.',
    };
  }

  try {
    const parsed: unknown = JSON.parse(json);

    if (!isObject(parsed)) {
      return {
        output: '',
        error: 'Root JSON value must be an object.',
      };
    }

    const rootTypeName = formatName(rootName);

    const context: GeneratorContext = {
      declarations: [],
      outputType,
      useExport,
      useSemicolons,
    };

    generateDeclaration(parsed, rootTypeName, context);

    return {
      output: context.declarations.reverse().join('\n\n'),
      error: null,
    };
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Failed to convert JSON.',
    };
  }
};
