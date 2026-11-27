import { useState } from 'react';
import {
  ArrowRight,
  ArrowRightLeft,
  Check,
  Clipboard,
  Code2,
  Download,
  Trash2,
} from 'lucide-react';

import AppLayout from '@/components/layout/AppLayout';
import BackToTools from '@/shared/BackToTools';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useCssToScss } from './hooks/useCssToScss';

const CssToScssConverter = () => {
  const { input, output, error, setInput, convert, clearAll } = useCssToScss();

  const [feedback, setFeedback] = useState('');
  const [hasConverted, setHasConverted] = useState(false);

  const handleConvert = () => {
    setFeedback('');
    convert();
    setHasConverted(true);
  };

  const handleCopy = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setFeedback('SCSS copied to clipboard.');
    } catch {
      setFeedback('Failed to copy SCSS.');
    }
  };

  const handleDownload = () => {
    if (!output) return;

    const blob = new Blob([output], {
      type: 'text/x-scss;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'styles.scss';
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    clearAll();
    setFeedback('');
    setHasConverted(false);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setFeedback('');
    setHasConverted(false);
  };

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <BackToTools />

        <header className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <ArrowRightLeft size={24} />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              CSS to SCSS Converter
            </h1>
            <p className="text-sm text-text-secondary">
              Transform your CSS into clean, nested SCSS syntax.
            </p>
          </div>
        </header>

        <section className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Code2 size={17} className="text-primary" />
              <h2 className="text-sm font-semibold">CSS Editor</h2>
            </div>

            <span className="rounded-md bg-input px-2.5 py-1 text-xs text-text-secondary">
              CSS
            </span>
          </div>

          <div className="p-4">
            <textarea
              value={input}
              onChange={(event) => handleInputChange(event.target.value)}
              placeholder={`.container {
  padding: 20px;
}

.container .title {
  font-size: 24px;
}

.container:hover {
  background: #eee;
}`}
              spellCheck={false}
              aria-label="CSS input"
              className="min-h-72 w-full resize-y rounded-lg border border-border bg-input p-4 font-mono text-sm leading-7 outline-none transition-colors placeholder:text-text-secondary/60 focus:border-primary"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-text-secondary">
                {input.length} characters
              </span>

              <div className="flex flex-wrap gap-2">
                <ActionButton
                  variant="ghost"
                  onClick={handleClear}
                  disabled={!input && !output}
                  icon={<Trash2 size={15} />}
                >
                  Clear
                </ActionButton>

                <ActionButton
                  onClick={handleConvert}
                  disabled={!input.trim()}
                  icon={<ArrowRight size={16} />}
                >
                  Convert to SCSS
                </ActionButton>
              </div>
            </div>
          </div>
        </section>

        {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

        {hasConverted && !error && output && (
          <section className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <Code2 size={17} className="text-primary" />
                <h2 className="text-sm font-semibold">SCSS Output</h2>
                <span className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
                  Converted
                </span>
              </div>

              <span className="rounded-md bg-input px-2.5 py-1 text-xs text-text-secondary">
                SCSS
              </span>
            </div>

            <div className="p-4">
              <textarea
                value={output}
                readOnly
                spellCheck={false}
                aria-label="SCSS output"
                className="min-h-72 w-full resize-y rounded-lg border border-border bg-input p-4 font-mono text-sm leading-7 outline-none"
              />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-text-secondary">
                  {output.length} characters
                </span>

                <div className="flex flex-wrap gap-2">
                  <ActionButton
                    variant="secondary"
                    onClick={handleCopy}
                    icon={<Clipboard size={15} />}
                  >
                    Copy SCSS
                  </ActionButton>

                  <ActionButton
                    onClick={handleDownload}
                    icon={<Download size={15} />}
                  >
                    Download
                  </ActionButton>
                </div>
              </div>
            </div>
          </section>
        )}

        {feedback && (
          <FeedbackMessage
            variant={feedback.includes('Failed') ? 'error' : 'success'}
          >
            {feedback.includes('copied') && (
              <Check size={14} className="mr-1 inline" />
            )}
            {feedback}
          </FeedbackMessage>
        )}
      </div>
    </AppLayout>
  );
};

export default CssToScssConverter;
