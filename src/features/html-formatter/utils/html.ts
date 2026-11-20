import * as prettier from 'prettier';

export interface HtmlFormatOptions {
  html: string;
  tabWidth?: number;
  useTabs?: boolean;
}

export interface HtmlFormatResult {
  output: string;
  error: string | null;
}

/**
 * Formats HTML using Prettier.
 */
export const formatHtml = async ({
  html,
  tabWidth = 2,
  useTabs = false,
}: HtmlFormatOptions): Promise<HtmlFormatResult> => {
  if (!html.trim()) {
    return {
      output: '',
      error: 'Enter HTML markup to format.',
    };
  }

  try {
    const output = await prettier.format(html, {
      parser: 'html',
      tabWidth,
      useTabs,
      htmlWhitespaceSensitivity: 'css',
    });

    return {
      output,
      error: null,
    };
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Failed to format HTML.',
    };
  }
};

/**
 * Minifies HTML by removing unnecessary whitespace and comments.
 */
export const minifyHtml = async (html: string): Promise<HtmlFormatResult> => {
  if (!html.trim()) {
    return {
      output: '',
      error: 'Enter HTML markup to minify.',
    };
  }

  try {
    const formatted = await prettier.format(html, {
      parser: 'html',
      htmlWhitespaceSensitivity: 'ignore',
    });

    const output = formatted
      .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')
      .replace(/>\s+</g, '><')
      .replace(/\s{2,}/g, ' ')
      .trim();

    return {
      output,
      error: null,
    };
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Failed to minify HTML.',
    };
  }
};

/**
 * Checks whether HTML can be parsed by Prettier.
 */
export const validateHtml = async (
  html: string,
): Promise<{ isValid: boolean; error: string | null }> => {
  if (!html.trim()) {
    return {
      isValid: false,
      error: 'Enter HTML markup to validate.',
    };
  }

  try {
    await prettier.format(html, { parser: 'html' });

    return {
      isValid: true,
      error: null,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid HTML markup.',
    };
  }
};
