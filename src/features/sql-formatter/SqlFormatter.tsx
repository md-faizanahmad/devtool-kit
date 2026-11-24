import { Copy, Check, Trash2, WandSparkles, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import BackToTools from '@/shared/BackToTools';
import FeedbackMessage from '@/shared/FeedbackMessage';
import type {
  SqlDialect,
  SqlIndentation,
  SqlKeywordCase,
} from './sql-formatter.types';
import { useSqlFormatter } from './hooks/useSqlFormatter';

const DIALECTS: SqlDialect[] = [
  'sql',
  'mysql',
  'postgresql',
  'sqlite',
  'transactsql',
  'plsql',
  'mariadb',
  'db2',
  'n1ql',
  'redshift',
  'spark',
  'trino',
];

const SqlFormatter = () => {
  const {
    input,
    output,
    config,
    error,
    updateInput,
    updateConfig,
    formatQuery,
    minifyQuery,
    clearAll,
  } = useSqlFormatter();

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

  return (
    <AppLayout>
      <div className="space-y-6">
        <BackToTools />

        <div>
          <h1 className="text-xl font-semibold text-text-primary">
            SQL Formatter
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Format, beautify, and minify SQL queries with customizable options.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              SQL Dialect
            </label>

            <select
              value={config.dialect}
              onChange={(event) =>
                updateConfig({
                  dialect: event.target.value as SqlDialect,
                })
              }
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
            >
              {DIALECTS.map((dialect) => (
                <option key={dialect} value={dialect}>
                  {dialect.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Keyword Case
            </label>

            <select
              value={config.keywordCase}
              onChange={(event) =>
                updateConfig({
                  keywordCase: event.target.value as SqlKeywordCase,
                })
              }
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
            >
              <option value="upper">UPPERCASE</option>
              <option value="lower">lowercase</option>
              <option value="preserve">Preserve</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Indentation
            </label>

            <select
              value={config.indentation}
              onChange={(event) =>
                updateConfig({
                  indentation: event.target.value as SqlIndentation,
                })
              }
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value="tab">Tab</option>
            </select>
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-primary">
              Input SQL
            </h2>

            <span className="text-xs text-text-secondary">
              {input.length} characters
            </span>
          </div>

          <textarea
            value={input}
            onChange={(event) => updateInput(event.target.value)}
            placeholder="SELECT id, name, email FROM users WHERE is_active = true;"
            rows={12}
            spellCheck={false}
            className="w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm text-text-primary"
          />
        </section>

        <div className="flex flex-wrap gap-2">
          <ActionButton
            icon={<WandSparkles size={16} />}
            onClick={formatQuery}
            disabled={!input.trim()}
          >
            Format SQL
          </ActionButton>

          <ActionButton
            variant="secondary"
            icon={<Minimize2 size={16} />}
            onClick={minifyQuery}
            disabled={!input.trim()}
          >
            Minify SQL
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
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text-primary">
                Formatted SQL
              </h2>

              <ActionButton
                variant="secondary"
                icon={copied ? <Check size={15} /> : <Copy size={15} />}
                onClick={() => void copyOutput()}
              >
                {copied ? 'Copied' : 'Copy'}
              </ActionButton>
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

export default SqlFormatter;
