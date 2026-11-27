import { useState } from 'react';
import { ArrowRightLeft, Clipboard, Download, Trash2 } from 'lucide-react';

import AppLayout from '@/components/layout/AppLayout';
import BackToTools from '@/shared/BackToTools';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useCssToScss } from './hooks/useCssToScss';

const CssToScssConverter = () => {
  const { input, output, error, setInput, convert, clearAll } = useCssToScss();

  const [feedback, setFeedback] = useState('');

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
  };

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <BackToTools />

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <ArrowRightLeft size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">CSS to SCSS Converter</h1>
              <p className="text-sm text-text-secondary">
                Convert CSS selectors into nested SCSS syntax.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className="space-y-3 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">CSS Input</h2>
              <span className="text-xs text-text-secondary">CSS</span>
            </div>

            <textarea
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setFeedback('');
              }}
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
              className="min-h-87.5 w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm outline-none focus:border-primary"
            />

            <ActionButton onClick={convert} className="block">
              Convert to SCSS
            </ActionButton>
          </section>

          <section className="space-y-3 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">SCSS Output</h2>
              <span className="text-xs text-text-secondary">SCSS</span>
            </div>

            <textarea
              value={output}
              readOnly
              placeholder="Your converted SCSS will appear here..."
              spellCheck={false}
              className="min-h-87.5 w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm outline-none"
            />

            <div className="flex flex-wrap gap-2">
              <ActionButton
                variant="secondary"
                onClick={handleCopy}
                disabled={!output}
                icon={<Clipboard size={16} />}
              >
                Copy
              </ActionButton>

              <ActionButton
                variant="secondary"
                onClick={handleDownload}
                disabled={!output}
                icon={<Download size={16} />}
              >
                Download
              </ActionButton>

              <ActionButton
                variant="ghost"
                onClick={handleClear}
                icon={<Trash2 size={16} />}
              >
                Clear
              </ActionButton>
            </div>
          </section>
        </div>

        {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

        {feedback && (
          <FeedbackMessage variant="success">{feedback}</FeedbackMessage>
        )}
      </div>
    </AppLayout>
  );
};

export default CssToScssConverter;
