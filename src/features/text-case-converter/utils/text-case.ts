export type TextCase =
  | 'uppercase'
  | 'lowercase'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab';

function getWords(text: string): string[] {
  return (
    text.replace(/([a-z])([A-Z])/g, '$1 $2').match(/[\p{L}\p{N}]+/gu) ?? []
  );
}

export function convertTextCase(text: string, type: TextCase): string {
  const words = getWords(text);

  switch (type) {
    case 'uppercase':
      return text.toUpperCase();

    case 'lowercase':
      return text.toLowerCase();

    case 'title':
      return words
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' ');

    case 'sentence': {
      const lower = text.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    case 'camel':
      return words
        .map((word, index) =>
          index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join('');

    case 'pascal':
      return words
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join('');

    case 'snake':
      return words.map((word) => word.toLowerCase()).join('_');

    case 'kebab':
      return words.map((word) => word.toLowerCase()).join('-');

    default:
      return text;
  }
}
