export type JsonFormatMode = 'pretty' | 'minify';

export function formatJson(
  input: string,
  mode: JsonFormatMode = 'pretty',
): string {
  const parsed = JSON.parse(input);

  return mode === 'pretty'
    ? JSON.stringify(parsed, null, 2)
    : JSON.stringify(parsed);
}
