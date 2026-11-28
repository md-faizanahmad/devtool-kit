import { Check, Copy, Download } from 'lucide-react';
import { useState } from 'react';
import ActionButton from '@/shared/ActionButton';
import type { MockDataFormat } from './mock-data.types';

interface MockDataPreviewProps {
  output: string;
  format: MockDataFormat;
}

const FORMAT_CONFIG: Record<
  MockDataFormat,
  { label: string; extension: string; mimeType: string }
> = {
  json: {
    label: 'JSON',
    extension: 'json',
    mimeType: 'application/json',
  },
  csv: {
    label: 'CSV',
    extension: 'csv',
    mimeType: 'text/csv',
  },
  xml: {
    label: 'XML',
    extension: 'xml',
    mimeType: 'application/xml',
  },
  yaml: {
    label: 'YAML',
    extension: 'yaml',
    mimeType: 'application/yaml',
  },
  sql: {
    label: 'SQL',
    extension: 'sql',
    mimeType: 'application/sql',
  },
  html: {
    label: 'HTML',
    extension: 'html',
    mimeType: 'text/html',
  },
};

const MockDataPreview = ({ output, format }: MockDataPreviewProps) => {
  const [copied, setCopied] = useState(false);
  const formatConfig = FORMAT_CONFIG[format];

  if (!output) return null;

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const downloadOutput = () => {
    const blob = new Blob([output], {
      type: `${formatConfig.mimeType};charset=utf-8`,
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `mock-data.${formatConfig.extension}`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-text-primary">
          Generated {formatConfig.label}
        </h2>

        <div className="flex gap-2">
          <ActionButton
            variant="secondary"
            icon={copied ? <Check size={15} /> : <Copy size={15} />}
            onClick={() => void copyOutput()}
          >
            {copied ? 'Copied' : 'Copy'}
          </ActionButton>

          <ActionButton
            variant="secondary"
            icon={<Download size={15} />}
            onClick={downloadOutput}
          >
            Download
          </ActionButton>
        </div>
      </div>

      <pre className="max-h-125 overflow-auto rounded-lg border border-border bg-input p-4 text-xs text-text-primary">
        <code>{output}</code>
      </pre>
    </section>
  );
};

export default MockDataPreview;
