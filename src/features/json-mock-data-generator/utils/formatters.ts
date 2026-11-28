import type { MockDataFormat } from '../mock-data.types';
import { stringify } from 'yaml';

type MockRecord = Record<string, unknown>;

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const escapeCsv = (value: unknown): string => {
  const text =
    value !== null && typeof value === 'object'
      ? JSON.stringify(value)
      : String(value ?? '');

  return `"${text.replace(/"/g, '""')}"`;
};

const escapeSql = (value: unknown): string => {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  const text =
    typeof value === 'object' ? JSON.stringify(value) : String(value);

  return `'${text.replace(/'/g, "''")}'`;
};

const formatJson = (data: MockRecord[]): string =>
  JSON.stringify(data, null, 2);

const formatCsv = (data: MockRecord[]): string => {
  if (!data.length) return '';

  const headers = Array.from(
    new Set(data.flatMap((record) => Object.keys(record))),
  );

  return [
    headers.map(escapeCsv).join(','),
    ...data.map((record) =>
      headers.map((header) => escapeCsv(record[header])).join(','),
    ),
  ].join('\n');
};

const formatXml = (data: MockRecord[]): string => {
  const records = data
    .map(
      (record) =>
        `  <record>\n${Object.entries(record)
          .map(
            ([key, value]) =>
              `    <${key.replace(/[^a-zA-Z0-9_.-]/g, '_')}>${escapeXml(
                typeof value === 'object' && value !== null
                  ? JSON.stringify(value)
                  : String(value ?? ''),
              )}</${key.replace(/[^a-zA-Z0-9_.-]/g, '_')}>`,
          )
          .join('\n')}\n  </record>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<records>\n${records}\n</records>`;
};

const formatYaml = (data: MockRecord[]): string => stringify(data);

const formatSql = (data: MockRecord[]): string => {
  if (!data.length) return '';

  const headers = Array.from(
    new Set(data.flatMap((record) => Object.keys(record))),
  );

  const columns = headers
    .map((header) => `"${header.replace(/"/g, '""')}"`)
    .join(', ');

  return data
    .map((record) => {
      const values = headers.map((header) => escapeSql(record[header]));

      return `INSERT INTO "mock_data" (${columns}) VALUES (${values.join(', ')});`;
    })
    .join('\n');
};

const formatHtml = (data: MockRecord[]): string => {
  if (!data.length) return '<table></table>';

  const headers = Array.from(
    new Set(data.flatMap((record) => Object.keys(record))),
  );

  const headerHtml = headers
    .map((header) => `<th>${escapeHtml(header)}</th>`)
    .join('');

  const rowsHtml = data
    .map(
      (record) =>
        `<tr>${headers
          .map((header) => {
            const value = record[header];
            const text =
              value !== null && typeof value === 'object'
                ? JSON.stringify(value)
                : String(value ?? '');

            return `<td>${escapeHtml(text)}</td>`;
          })
          .join('')}</tr>`,
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mock Data</title>
</head>
<body>
  <table>
    <thead><tr>${headerHtml}</tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table>
</body>
</html>`;
};

export const formatMockData = (
  data: MockRecord[],
  format: MockDataFormat,
): string => {
  const formatters: Record<MockDataFormat, (records: MockRecord[]) => string> =
    {
      json: formatJson,
      csv: formatCsv,
      xml: formatXml,
      yaml: formatYaml,
      sql: formatSql,
      html: formatHtml,
    };

  return formatters[format](data);
};
