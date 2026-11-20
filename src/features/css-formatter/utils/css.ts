import * as prettier from 'prettier';

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

    return {
      output,
      error: null,
    };
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Failed to format CSS.',
    };
  }
};

/**
 * Minifies CSS by removing unnecessary whitespace and comments.
 */
export const minifyCss = async (css: string): Promise<CssFormatResult> => {
  if (!css.trim()) {
    return {
      output: '',
      error: 'Enter CSS code to minify.',
    };
  }

  try {
    const formatted = await prettier.format(css, {
      parser: 'css',
    });

    const output = formatted
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      .replace(/;}/g, '}')
      .trim();

    return {
      output,
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
