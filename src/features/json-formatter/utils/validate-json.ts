export interface JsonValidationResult {
  isValid: boolean;
  error: string | null;
}

export function validateJson(input: string): JsonValidationResult {
  try {
    JSON.parse(input);

    return {
      isValid: true,
      error: null,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid JSON syntax.',
    };
  }
}
