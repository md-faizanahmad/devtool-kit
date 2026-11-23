import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import ActionButton from '@/shared/ActionButton';
import type { ApiResponseData } from './api-request.types';

interface ApiResponseProps {
  response: ApiResponseData | null;
}

const ApiResponse = ({ response }: ApiResponseProps) => {
  const [activeTab, setActiveTab] = useState<'body' | 'headers'>('body');
  const [copied, setCopied] = useState(false);

  if (!response) return null;

  const copyResponse = async () => {
    try {
      await navigator.clipboard.writeText(response.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-text-primary">Response</h2>

        <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
          <span>
            Status:{' '}
            <strong
              className={
                response.status >= 200 && response.status < 300
                  ? 'text-green-500'
                  : 'text-red-500'
              }
            >
              {response.status} {response.statusText}
            </strong>
          </span>
          <span>Time: {response.duration} ms</span>
          <span>Size: {formatSize(response.size)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-border">
        <div className="flex gap-4">
          {(['body', 'headers'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-1 py-2 text-sm capitalize ${
                activeTab === tab
                  ? 'border-primary text-text-primary'
                  : 'border-transparent text-text-secondary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'body' && (
          <ActionButton
            variant="ghost"
            icon={copied ? <Check size={15} /> : <Copy size={15} />}
            onClick={() => void copyResponse()}
          >
            {copied ? 'Copied' : 'Copy'}
          </ActionButton>
        )}
      </div>

      {activeTab === 'body' ? (
        <pre className="max-h-96 overflow-auto rounded-lg border border-border bg-input p-3 text-xs text-text-primary">
          <code>{formatResponseBody(response.body)}</code>
        </pre>
      ) : (
        <div className="max-h-96 overflow-auto rounded-lg border border-border">
          {Object.entries(response.headers).length ? (
            Object.entries(response.headers).map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-2 gap-3 border-b border-border p-3 text-xs last:border-b-0"
              >
                <span className="break-all font-medium text-text-primary">
                  {key}
                </span>
                <span className="break-all text-text-secondary">{value}</span>
              </div>
            ))
          ) : (
            <p className="p-3 text-sm text-text-secondary">
              No response headers available.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

const formatResponseBody = (body: string) => {
  try {
    return JSON.stringify(JSON.parse(body), null, 2);
  } catch {
    return body || 'Empty response body.';
  }
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export default ApiResponse;
