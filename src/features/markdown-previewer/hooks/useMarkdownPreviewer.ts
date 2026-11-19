import { useMemo, useState } from 'react';
import { parseMarkdown } from '../utils/markdown';

const DEFAULT_MARKDOWN = `# Welcome to Markdown Previewer

Write Markdown on the left and see the preview on the right.

## Formatting

- **Bold text**
- *Italic text*
- ~~Strikethrough text~~

## Code

\`\`\`typescript
const greeting = 'Hello, world!';
console.log(greeting);
\`\`\`

## Links

[Visit GitHub](https://github.com)

## Tables

| Feature | Supported |
| --- | --- |
| Headings | Yes |
| Lists | Yes |
| Code blocks | Yes |
| Tables | Yes |
`;

export const useMarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  const preview = useMemo(() => parseMarkdown(markdown), [markdown]);

  const updateMarkdown = (value: string) => {
    setMarkdown(value);
  };

  const clear = () => {
    setMarkdown('');
  };

  const reset = () => {
    setMarkdown(DEFAULT_MARKDOWN);
  };

  return {
    state: {
      markdown,
      preview,
      isEmpty: !markdown.trim(),
    },
    updateMarkdown,
    clear,
    reset,
  };
};
