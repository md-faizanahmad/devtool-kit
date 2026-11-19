import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * Configure the Markdown parser.
 */
marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Converts Markdown into sanitized HTML.
 */
export const parseMarkdown = (markdown: string): string => {
  if (!markdown.trim()) {
    return '';
  }

  const html = marked.parse(markdown, {
    async: false,
  });

  if (typeof html !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
};
