import { useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft,
  Braces,
  Check,
  Copy,
  Minimize2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { formatJson, type JsonFormatMode } from './utils/format-json';
import { repairJson } from '@/features/json-formatter/utils/repair-json';

function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = (mode: JsonFormatMode) => {
    try {
      const result = formatJson(input, mode);
      setOutput(result);
      setError('');
      setCopied(false);
    } catch {
      setOutput('');
      setError('Invalid JSON. Please check your input syntax.');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      setError('Unable to copy output to clipboard.');
    }
  };
  const handleRepair = () => {
    try {
      const repaired = repairJson(input);

      // Validate and pretty-print the repaired JSON.
      const formatted = formatJson(repaired, 'pretty');

      setOutput(formatted);
      setError('');
      setCopied(false);
    } catch {
      setOutput('');
      setError('Unable to repair this input. Please check the content.');
    }
  };
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
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
                Format, validate and minify JSON.
              </p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="json-input"
              className="text-xs font-semibold text-text-primary"
            >
              Input JSON
            </label>

            <span className="text-[11px] text-text-muted">
              Paste your JSON below
            </span>
          </div>

          <textarea
            id="json-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setError('');
            }}
            placeholder={'{\n  "name": "DevTool-Kit"\n}'}
            spellCheck={false}
            className="min-h-40 w-full resize-y rounded-md border border-border bg-input p-3 font-mono text-xs leading-6 text-foreground outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleFormat('pretty')}
            disabled={!input.trim()}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={14} />
            Format
          </button>

          <button
            type="button"
            onClick={() => handleFormat('minify')}
            disabled={!input.trim()}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Minimize2 size={14} />
            Minify
          </button>
          <button
            type="button"
            onClick={handleRepair}
            disabled={!input.trim()}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={14} />
            Fix JSON
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!input && !output && !error}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw size={14} />
            Clear
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
          >
            {error}
          </div>
        )}

        {/* Output Section */}
        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="json-output"
                className="text-xs font-semibold text-text-primary"
              >
                Output
              </label>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary-hover"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <textarea
              id="json-output"
              value={output}
              readOnly
              spellCheck={false}
              className="min-h-40 w-full resize-y rounded-md border border-border bg-surface p-3 font-mono text-xs leading-6 text-foreground outline-none"
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default JsonFormatter;
