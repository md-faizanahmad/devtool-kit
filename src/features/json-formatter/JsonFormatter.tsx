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
import { useJsonFormatter } from './hooks/useJsonFormatter';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';

function JsonFormatter() {
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
  } = useJsonFormatter();

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

        {/* Input */}
        <section className="space-y-2">
          <label
            htmlFor="json-input"
            className="text-xs font-semibold text-text-primary"
          >
            Input JSON
          </label>

          <textarea
            id="json-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={'{\n  "name": "DevTool-Kit"\n}'}
            spellCheck={false}
            className="min-h-40 w-full resize-y rounded-md border border-border bg-input p-3 font-mono text-xs leading-6 outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </section>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <ActionButton
            variant="primary"
            icon={<Sparkles size={14} />}
            onClick={() => format('pretty')}
            disabled={!input.trim()}
          >
            Format
          </ActionButton>

          <ActionButton
            icon={<Minimize2 size={14} />}
            onClick={() => format('minify')}
            disabled={!input.trim()}
          >
            Minify
          </ActionButton>

          <ActionButton
            icon={<Sparkles size={14} />}
            onClick={repair}
            disabled={!input.trim()}
          >
            Fix JSON
          </ActionButton>

          <ActionButton onClick={validate} disabled={!input.trim()}>
            Validate
          </ActionButton>

          <ActionButton
            variant="ghost"
            icon={<RotateCcw size={14} />}
            onClick={clear}
            disabled={!input && !output && !error && !validationMessage}
          >
            Clear
          </ActionButton>
        </div>

        {/* Feedback */}
        {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

        {validationMessage && (
          <FeedbackMessage variant={isValid ? 'success' : 'error'}>
            {validationMessage}
          </FeedbackMessage>
        )}

        {/* Output */}
        {output && (
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="json-output"
                className="text-xs font-semibold text-text-primary"
              >
                Output
              </label>

              <ActionButton
                variant="ghost"
                icon={copied ? <Check size={14} /> : <Copy size={14} />}
                onClick={() => void copy()}
              >
                {copied ? 'Copied' : 'Copy'}
              </ActionButton>
            </div>

            <textarea
              id="json-output"
              value={output}
              readOnly
              spellCheck={false}
              className="min-h-40 w-full resize-y rounded-md border border-border bg-surface p-3 font-mono text-xs leading-6 outline-none"
            />
          </section>
        )}
      </div>
    </AppLayout>
  );
}

export default JsonFormatter;
