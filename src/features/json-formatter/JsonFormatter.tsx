import { useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft,
  Braces,
  Check,
  Copy,
  Download,
  Minimize2,
  RotateCcw,
  Sparkles,
  Upload,
} from 'lucide-react';

import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import JsonTreeViewer from '@/features/json-tree-viewer/JsonTreeViewer';
import { useJsonFormatter } from './hooks/useJsonFormatter';

type OutputTab = 'formatted' | 'tree';

function JsonFormatter() {
  const [activeTab, setActiveTab] = useState<OutputTab>('formatted');

  const {
    input,
    output,
    error,
    validationMessage,
    isValid,
    copied,
    setInput,
    format,
    repair,
    validate,
    copy,
    clear,
    uploadFile,
    downloadFile,
  } = useJsonFormatter();

  const treeInput = output || input;

  return (
    <AppLayout>
      <div className="space-y-6">
        <header className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} />
            Back to tools
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
              <Braces size={20} className="text-primary" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">JSON Formatter</h2>
              <p className="mt-1 text-xs text-text-secondary">
                Format, validate and repair JSON.
              </p>
            </div>
          </div>
        </header>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="space-y-4"
        >
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="json-input"
                className="text-xs font-semibold text-text-primary"
              >
                Input JSON
              </label>

              <label
                htmlFor="json-file"
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-primary"
              >
                <Upload size={14} />
                Upload file
              </label>

              <input
                id="json-file"
                type="file"
                accept=".json,application/json"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file) {
                    void uploadFile(file);
                  }

                  event.target.value = '';
                }}
              />
            </div>

            <textarea
              id="json-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={'{\n  "name": "DevTool-Kit"\n}'}
              spellCheck={false}
              className="min-h-40 w-full resize-y rounded-md border border-border bg-input p-3 font-mono text-xs leading-6 outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </section>

          <div className="flex flex-wrap gap-2">
            <ActionButton
              type="button"
              variant="primary"
              icon={<Sparkles size={14} />}
              onClick={() => format('pretty')}
              disabled={!input.trim()}
            >
              Format
            </ActionButton>

            <ActionButton
              type="button"
              icon={<Minimize2 size={14} />}
              onClick={() => format('minify')}
              disabled={!input.trim()}
            >
              Minify
            </ActionButton>

            <ActionButton
              type="button"
              icon={<Sparkles size={14} />}
              onClick={repair}
              disabled={!input.trim()}
            >
              Fix JSON
            </ActionButton>

            <ActionButton
              type="button"
              onClick={validate}
              disabled={!input.trim()}
            >
              Validate
            </ActionButton>

            <ActionButton
              type="button"
              variant="ghost"
              icon={<RotateCcw size={14} />}
              onClick={clear}
              disabled={!input && !output && !error && !validationMessage}
            >
              Clear
            </ActionButton>
          </div>
        </form>

        {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

        {validationMessage && (
          <FeedbackMessage variant={isValid ? 'success' : 'error'}>
            {validationMessage}
          </FeedbackMessage>
        )}

        {(output || input.trim()) && (
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('formatted')}
                  aria-pressed={activeTab === 'formatted'}
                  className={`border-b-2 px-1 pb-2 text-xs font-medium transition-colors ${
                    activeTab === 'formatted'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-secondary hover:text-foreground'
                  }`}
                >
                  Formatted JSON
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('tree')}
                  aria-pressed={activeTab === 'tree'}
                  className={`border-b-2 px-1 pb-2 text-xs font-medium transition-colors ${
                    activeTab === 'tree'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-secondary hover:text-foreground'
                  }`}
                >
                  Tree View
                </button>
              </div>

              {activeTab === 'formatted' && output && (
                <div className="flex items-center gap-3 pb-2">
                  <ActionButton
                    type="button"
                    variant="ghost"
                    icon={<Download size={14} />}
                    onClick={downloadFile}
                  >
                    Download
                  </ActionButton>

                  <ActionButton
                    type="button"
                    variant="ghost"
                    icon={copied ? <Check size={14} /> : <Copy size={14} />}
                    onClick={() => void copy()}
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </ActionButton>
                </div>
              )}
            </div>

            {activeTab === 'formatted' &&
              (output ? (
                <textarea
                  id="json-output"
                  value={output}
                  readOnly
                  spellCheck={false}
                  className="min-h-40 w-full resize-y rounded-md border border-border bg-surface p-3 font-mono text-xs leading-6 outline-none"
                />
              ) : (
                <p className="text-xs text-text-muted">
                  Format or minify JSON to generate output.
                </p>
              ))}

            {activeTab === 'tree' && <JsonTreeViewer input={treeInput} />}
          </section>
        )}
      </div>
    </AppLayout>
  );
}

export default JsonFormatter;
