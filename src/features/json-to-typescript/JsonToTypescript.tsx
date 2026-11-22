import { Copy, Download, RotateCcw, Code2, FileCode } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import BackToTools from '@/shared/BackToTools';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useJsonToTypescript } from './hooks/useJsonToTypescript';
import type { TypeScriptOutputType } from './json-to-typescript.types';

function JsonToTypescript() {
  const {
    state,
    updateInput,
    updateRootName,
    updateOutputType,
    updateOption,
    convert,
    copyOutput,
    downloadOutput,
    clear,
  } = useJsonToTypescript();

  return (
    <AppLayout>
      <div className="space-y-5">
        <BackToTools />

        <div>
          <h2 className="text-base font-semibold">JSON to TypeScript</h2>
          <p className="mt-1 text-xs text-text-secondary">
            Convert JSON objects into TypeScript interfaces and types.
          </p>
        </div>

        <div>
          <label
            htmlFor="json-input"
            className="mb-1 block text-xs font-medium"
          >
            JSON input
          </label>

          <textarea
            id="json-input"
            value={state.input}
            onChange={(event) => updateInput(event.target.value)}
            placeholder="Paste your JSON data here..."
            rows={9}
            spellCheck={false}
            className="w-full resize-y rounded-md border border-border bg-input px-3 py-2 font-mono text-xs leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
          />
        </div>

        <div className="space-y-3 rounded-md border border-border p-3">
          <h3 className="text-xs font-semibold">Conversion Options</h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="root-name"
                className="mb-1 block text-xs font-medium"
              >
                Root type name
              </label>

              <input
                id="root-name"
                type="text"
                value={state.rootName}
                onChange={(event) => updateRootName(event.target.value)}
                placeholder="Root"
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
              />
            </div>

            <div>
              <label
                htmlFor="output-type"
                className="mb-1 block text-xs font-medium"
              >
                Output format
              </label>

              <select
                id="output-type"
                value={state.outputType}
                onChange={(event) =>
                  updateOutputType(event.target.value as TypeScriptOutputType)
                }
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
              >
                <option value="interface">Interface</option>
                <option value="type">Type</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={state.useExport}
                onChange={(event) =>
                  updateOption('useExport', event.target.checked)
                }
                className="accent-primary"
              />
              Export declarations
            </label>

            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={state.useSemicolons}
                onChange={(event) =>
                  updateOption('useSemicolons', event.target.checked)
                }
                className="accent-primary"
              />
              Use semicolons
            </label>
          </div>
        </div>

        <ActionButton
          className="w-full"
          icon={<Code2 size={14} />}
          onClick={convert}
          disabled={!state.input.trim() || state.isProcessing}
        >
          Convert to TypeScript
        </ActionButton>

        {state.isProcessing && (
          <p className="text-xs text-text-secondary">Converting JSON...</p>
        )}

        {state.error && (
          <FeedbackMessage variant="error">{state.error}</FeedbackMessage>
        )}

        {state.success && (
          <FeedbackMessage variant="success">{state.success}</FeedbackMessage>
        )}

        {state.output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="typescript-output"
                className="text-xs font-medium"
              >
                Generated TypeScript
              </label>

              <div className="flex gap-1">
                <ActionButton
                  variant="ghost"
                  icon={<Copy size={14} />}
                  onClick={copyOutput}
                >
                  {state.copied ? 'Copied' : 'Copy'}
                </ActionButton>

                <ActionButton
                  variant="ghost"
                  icon={<Download size={14} />}
                  onClick={downloadOutput}
                >
                  Download
                </ActionButton>
              </div>
            </div>

            <textarea
              id="typescript-output"
              value={state.output}
              readOnly
              rows={12}
              spellCheck={false}
              className="w-full resize-y rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs leading-6 outline-none"
            />
          </div>
        )}

        <ActionButton
          className="w-full"
          variant="secondary"
          icon={<RotateCcw size={14} />}
          onClick={clear}
        >
          Clear
        </ActionButton>

        <div className="flex items-start gap-2 rounded-md border border-border p-3">
          <FileCode size={15} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-xs text-text-secondary">
            Generated types are inferred from the provided JSON sample. Optional
            properties and possible values not present in the sample cannot be
            inferred automatically.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

export default JsonToTypescript;
