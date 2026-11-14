import { Link } from 'react-router';
import { ArrowLeft, Copy, Link as LinkIcon, RotateCcw } from 'lucide-react';

import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useUrlEncoder } from './hook/useUrlEncoder';

function UrlEncoder() {
  const {
    mode,
    input,
    output,
    error,
    copied,
    updateInput,
    changeMode,
    convert,
    copyOutput,
    clear,
  } = useUrlEncoder();

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
              <LinkIcon size={20} className="text-primary" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">URL Encoder</h2>
              <p className="mt-1 text-xs text-text-secondary">
                Encode and decode URL components.
              </p>
            </div>
          </div>
        </header>

        <div className="flex gap-2">
          <ActionButton
            type="button"
            variant={mode === 'encode' ? 'primary' : 'secondary'}
            onClick={() => changeMode('encode')}
          >
            Encode
          </ActionButton>

          <ActionButton
            type="button"
            variant={mode === 'decode' ? 'primary' : 'secondary'}
            onClick={() => changeMode('decode')}
          >
            Decode
          </ActionButton>
        </div>

        <section className="space-y-2">
          <label
            htmlFor="url-input"
            className="text-xs font-semibold text-text-primary"
          >
            {mode === 'encode' ? 'Plain Text' : 'Encoded URL Component'}
          </label>

          <textarea
            id="url-input"
            value={input}
            onChange={(event) => updateInput(event.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Enter text or URL component to encode...'
                : 'Enter encoded URL component to decode...'
            }
            spellCheck={false}
            className="min-h-40 w-full resize-y rounded-md border border-border bg-input p-3 font-mono text-xs leading-6 outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </section>

        <div className="flex gap-2">
          <ActionButton
            type="button"
            variant="primary"
            onClick={convert}
            disabled={!input.trim()}
          >
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </ActionButton>

          <ActionButton
            type="button"
            variant="ghost"
            icon={<RotateCcw size={14} />}
            onClick={clear}
            disabled={!input && !output && !error}
          >
            Clear
          </ActionButton>
        </div>

        {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

        {output && (
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="url-output"
                className="text-xs font-semibold text-text-primary"
              >
                Output
              </label>

              <ActionButton
                type="button"
                variant="ghost"
                icon={<Copy size={14} />}
                onClick={() => void copyOutput()}
              >
                {copied ? 'Copied' : 'Copy'}
              </ActionButton>
            </div>

            <textarea
              id="url-output"
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

export default UrlEncoder;
