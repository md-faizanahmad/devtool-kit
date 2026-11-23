import type { MockDataTemplate, MockField } from '../mock-data.types';

import {
  generateAddress,
  generateBoolean,
  generateDate,
  generateEmail,
  generateNumber,
  generateProduct,
  generateString,
  generateUUID,
  generateUser,
} from './generators';

type TemplateGenerator = () => Record<string, unknown>;

interface TemplateDefinition {
  label: string;
  description: string;
  generate: TemplateGenerator;
}

export const TEMPLATE_DEFINITIONS: Record<
  MockDataTemplate,
  TemplateDefinition
> = {
  users: {
    label: 'Users',
    description: 'Generate realistic user profiles with contact details.',
    generate: () => generateUser(),
  },

  products: {
    label: 'Products',
    description: 'Generate product information with pricing and inventory.',
    generate: () => generateProduct(),
  },

  addresses: {
    label: 'Addresses',
    description: 'Generate sample residential and business addresses.',
    generate: () => generateAddress(),
  },

  'api-responses': {
    label: 'API Responses',
    description: 'Generate mock API response objects with user data.',
    generate: () => ({
      success: true,
      status: 200,
      message: 'Data fetched successfully.',
      data: Array.from({ length: 3 }, () => generateUser()),
      timestamp: generateDate(),
    }),
  },
};

export const generateTemplateData = (
  template: MockDataTemplate,
  count: number,
): Record<string, unknown>[] => {
  const safeCount = Math.max(1, Math.min(1000, Math.floor(count)));

  return Array.from({ length: safeCount }, () =>
    TEMPLATE_DEFINITIONS[template].generate(),
  );
};

export const generateCustomData = (
  fields: MockField[],
  count: number,
): Record<string, unknown>[] => {
  const enabledFields = fields.filter(
    (field) => field.enabled && field.name.trim(),
  );

  const safeCount = Math.max(1, Math.min(1000, Math.floor(count)));

  const generators: Record<string, () => unknown> = {
    string: generateString,
    number: generateNumber,
    boolean: generateBoolean,
    email: generateEmail,
    uuid: generateUUID,
    date: generateDate,
  };

  return Array.from({ length: safeCount }, () =>
    Object.fromEntries(
      enabledFields.map((field) => [
        field.name.trim(),
        generators[field.type](),
      ]),
    ),
  );
};
