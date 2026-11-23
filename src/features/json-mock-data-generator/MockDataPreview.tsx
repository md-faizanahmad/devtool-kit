import { Check, Copy, Download } from 'lucide-react';
import { useState } from 'react';
import ActionButton from '@/shared/ActionButton';

interface MockDataPreviewProps {
  output: string;
}

const MockDataPreview = ({ output }: MockDataPreviewProps) => {
  const [copied, setCopied] = useState(false);

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
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'mock-data.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-text-primary">
          Generated JSON
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
