import {
  Check,
  Copy,
  Download,
  Minimize2,
  RotateCcw,
  WandSparkles,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import BackToTools from '@/shared/BackToTools';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useCssFormatter } from './hooks/useCssFormatter';

function CssFormatter() {
  const {
    state,
    updateInput,
    format,
    minify,
    validate,
    copyOutput,
    downloadOutput,
    clear,
  } = useCssFormatter();

  const actions = [
    {
      label: 'Format',
      icon: WandSparkles,
      variant: 'primary' as const,
      onClick: format,
    },
    {
      label: 'Minify',
      icon: Minimize2,
      variant: 'secondary' as const,
      onClick: minify,
    },
    {
      label: 'Validate',
      icon: Check,
      variant: 'secondary' as const,
      onClick: validate,
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-5">
        <BackToTools />

        <div>
          <h2 className="text-base font-semibold">CSS Formatter</h2>
          <p className="mt-1 text-xs text-text-secondary">
            Format, minify, and validate CSS stylesheets.
          </p>
        </div>

        <div>
          <label htmlFor="css-input" className="mb-1 block text-xs font-medium">
            CSS input
          </label>

          <textarea
            id="css-input"
            value={state.input}
            onChange={(event) => updateInput(event.target.value)}
            placeholder="Paste your CSS code here..."
            rows={9}
            spellCheck={false}
            className="w-full resize-y rounded-md border border-border bg-input px-3 py-2 font-mono text-xs leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {actions.map(({ label, icon: Icon, variant, onClick }) => (
            <ActionButton
              key={label}
              variant={variant}
              icon={<Icon size={14} />}
              onClick={onClick}
              disabled={!state.hasInput || state.isProcessing}
            >
              {label}
            </ActionButton>
          ))}
        </div>

        {state.isProcessing && (
          <p className="text-xs text-text-secondary">Processing CSS...</p>
        )}

        {state.error && (
          <FeedbackMessage variant="error">{state.error}</FeedbackMessage>
        )}

        {state.success && (
          <FeedbackMessage variant="success">{state.success}</FeedbackMessage>
        )}

        {state.hasOutput && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="css-output" className="text-xs font-medium">
                Output
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
              id="css-output"
              value={state.output}
              readOnly
              rows={9}
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
      </div>
    </AppLayout>
  );
}

export default CssFormatter;
