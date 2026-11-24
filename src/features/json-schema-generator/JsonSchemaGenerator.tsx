import { Copy, Check, Trash2, WandSparkles, Download } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import BackToTools from '@/shared/BackToTools';
import FeedbackMessage from '@/shared/FeedbackMessage';
import type { JsonSchemaVersion } from './json-schema.types';
import { useJsonSchema } from './hooks/useJsonSchema';

const SCHEMA_VERSIONS: JsonSchemaVersion[] = ['draft-07', '2019-09', '2020-12'];

const JsonSchemaGenerator = () => {
  const {
    input,
    output,
    config,
    error,
    updateInput,
    updateConfig,
    generateSchema,
    clearAll,
  } = useJsonSchema();

  const [copied, setCopied] = useState(false);

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
    link.download = 'schema.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <BackToTools />

        <div>
          <h1 className="text-xl font-semibold text-text-primary">
            JSON Schema Generator
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Generate JSON Schema automatically from your JSON data.
          </p>
        </div>

        <section className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              JSON Schema Version
            </label>

            <select
              value={config.version}
              onChange={(event) =>
                updateConfig({
                  version: event.target.value as JsonSchemaVersion,
                })
              }
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
            >
              {SCHEMA_VERSIONS.map((version) => (
                <option key={version} value={version}>
                  {version.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Schema Title
              </label>

              <input
                value={config.title}
                onChange={(event) =>
                  updateConfig({ title: event.target.value })
                }
                placeholder="User Schema"
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Description
              </label>

              <input
                value={config.description}
                onChange={(event) =>
                  updateConfig({ description: event.target.value })
                }
                placeholder="Schema for user data"
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-text-primary">
              <input
                type="checkbox"
                checked={config.inferRequired}
                onChange={(event) =>
                  updateConfig({
                    inferRequired: event.target.checked,
                  })
                }
              />
              Infer required properties
            </label>

            <label className="flex items-center gap-2 text-sm text-text-primary">
              <input
                type="checkbox"
                checked={config.additionalProperties}
                onChange={(event) =>
                  updateConfig({
                    additionalProperties: event.target.checked,
                  })
                }
              />
              Allow additional properties
            </label>
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-primary">
              Input JSON
            </h2>

            <span className="text-xs text-text-secondary">
              {input.length} characters
            </span>
          </div>

          <textarea
            value={input}
            onChange={(event) => updateInput(event.target.value)}
            placeholder={
              '{\n  "name": "John Doe",\n  "email": "john@example.com",\n  "age": 25\n}'
            }
            rows={12}
            spellCheck={false}
            className="w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm text-text-primary"
          />
        </section>

        <div className="flex flex-wrap gap-2">
          <ActionButton
            icon={<WandSparkles size={16} />}
            onClick={generateSchema}
            disabled={!input.trim()}
          >
            Generate Schema
          </ActionButton>

          <ActionButton
            variant="secondary"
            icon={<Trash2 size={16} />}
            onClick={clearAll}
          >
            Clear
          </ActionButton>
        </div>

        {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

        {output && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text-primary">
                Generated JSON Schema
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
        )}
      </div>
    </AppLayout>
  );
};

export default JsonSchemaGenerator;
