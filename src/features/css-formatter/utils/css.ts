import * as prettier from 'prettier';
import { minify } from 'csso';

export interface CssFormatOptions {
  css: string;
  tabWidth?: number;
  useTabs?: boolean;
}

export interface CssFormatResult {
  output: string;
  error: string | null;
}

/**
 * Formats CSS using Prettier.
 */
export const formatCss = async ({
  css,
  tabWidth = 2,
  useTabs = false,
}: CssFormatOptions): Promise<CssFormatResult> => {
  if (!css.trim()) {
    return {
      output: '',
      error: 'Enter CSS code to format.',
    };
  }

  try {
    const output = await prettier.format(css, {
      parser: 'css',
      tabWidth,
      useTabs,
    });

    return { output, error: null };
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Failed to format CSS.',
    };
  }
};

/**
 * Minifies CSS using CSso.
 */
export const minifyCss = async (css: string): Promise<CssFormatResult> => {
  if (!css.trim()) {
    return {
      output: '',
      error: 'Enter CSS code to minify.',
    };
  }

  try {
    const result = minify(css);

    return {
      output: result.css,
      error: null,
    };
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Failed to minify CSS.',
    };
  }
};

/**
 * Checks whether CSS can be parsed by Prettier.
 */
export const validateCss = async (
  css: string,
): Promise<{ isValid: boolean; error: string | null }> => {
  if (!css.trim()) {
    return {
      isValid: false,
      error: 'Enter CSS code to validate.',
    };
  }

  try {
    await prettier.format(css, {
      parser: 'css',
    });

    return {
      isValid: true,
      error: null,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid CSS syntax.',
    };
  }
};
