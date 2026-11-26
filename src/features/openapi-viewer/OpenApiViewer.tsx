import { useMemo, useState } from 'react';
import { BookOpen, Clipboard, FileJson, Trash2 } from 'lucide-react';

import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import BackToTools from '@/shared/BackToTools';

import OperationDetails from './OperationDetails';
import { useOpenApi } from './hooks/useOpenApi';
import { groupOperationsByTag } from './utils/group-operations';

const OpenApiViewer = () => {
  const {
    input,
    format,
    document,
    operations,
    error,
    setInput,
    setFormat,
    parseDocument,
    clearAll,
  } = useOpenApi();

  const [copied, setCopied] = useState(false);

  const groupedOperations = useMemo(
    () => groupOperationsByTag(operations),
    [operations],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(document, null, 2));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <BackToTools />

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <BookOpen size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">OpenAPI Viewer</h1>
              <p className="text-sm text-text-secondary">
                Explore API endpoints and their specification details.
              </p>
            </div>
          </div>
        </div>

        <section className="space-y-4 rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold">OpenAPI Specification</h2>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFormat('json')}
                className={`rounded-md px-3 py-1.5 text-sm ${
                  format === 'json'
                    ? 'bg-primary text-white'
                    : 'bg-input text-text-secondary'
                }`}
              >
                JSON
              </button>

              <button
                type="button"
                onClick={() => setFormat('yaml')}
                className={`rounded-md px-3 py-1.5 text-sm ${
                  format === 'yaml'
                    ? 'bg-primary text-white'
                    : 'bg-input text-text-secondary'
                }`}
              >
                YAML
              </button>
            </div>
          </div>

          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={
              format === 'json'
                ? 'Paste your OpenAPI JSON specification here...'
                : 'Paste your OpenAPI YAML specification here...'
            }
            spellCheck={false}
            className="min-h-64 w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm outline-none focus:border-primary"
          />

          <div className="flex flex-wrap gap-2">
            <ActionButton onClick={parseDocument} icon={<FileJson size={16} />}>
              Parse Specification
            </ActionButton>

            <ActionButton
              variant="secondary"
              onClick={clearAll}
              icon={<Trash2 size={16} />}
            >
              Clear
            </ActionButton>
          </div>

          {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}
        </section>

        {document && (
          <>
            <section className="space-y-3 rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">
                    {document.info?.title || 'Untitled API'}
                  </h2>

                  <p className="text-sm text-text-secondary">
                    OpenAPI {document.openapi} · Version{' '}
                    {document.info?.version || 'Not specified'}
                  </p>
                </div>

                <ActionButton
                  variant="secondary"
                  onClick={handleCopy}
                  icon={<Clipboard size={16} />}
                >
                  {copied ? 'Copied' : 'Copy JSON'}
                </ActionButton>
              </div>

              {document.info?.description && (
                <p className="text-sm text-text-secondary">
                  {document.info.description}
                </p>
              )}

              <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-md bg-input px-3 py-1.5">
                  {operations.length} endpoints
                </span>

                <span className="rounded-md bg-input px-3 py-1.5">
                  {groupedOperations.length} tags
                </span>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-lg font-semibold">API Endpoints</h2>

              {operations.length === 0 ? (
                <FeedbackMessage variant="info">
                  No API operations were found in this specification.
                </FeedbackMessage>
              ) : (
                groupedOperations.map((group) => (
                  <div key={group.tag} className="space-y-3">
                    <h3 className="border-b border-border pb-2 font-semibold">
                      {group.tag}
                      <span className="ml-2 text-xs font-normal text-text-secondary">
                        {group.operations.length} operations
                      </span>
                    </h3>

                    <div className="space-y-3">
                      {group.operations.map((operation, index) => (
                        <OperationDetails
                          key={`${operation.method}-${operation.path}-${index}`}
                          operation={operation}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </section>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default OpenApiViewer;
