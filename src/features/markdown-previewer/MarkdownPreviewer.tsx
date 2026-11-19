import { RotateCcw, Trash2 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import BackToTools from '@/shared/BackToTools';
import ActionButton from '@/shared/ActionButton';
import { useMarkdownPreviewer } from './hooks/useMarkdownPreviewer';

function MarkdownPreviewer() {
  const { state, updateMarkdown, clear, reset } = useMarkdownPreviewer();

  return (
    <AppLayout>
      <div className="space-y-5">
        <BackToTools />

        <div>
          <h2 className="text-base font-semibold">Markdown Previewer</h2>
          <p className="mt-1 text-xs text-text-secondary">
            Write Markdown and see the rendered preview instantly.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="markdown-input" className="text-xs font-medium">
            Markdown input
          </label>

          <textarea
            id="markdown-input"
            value={state.markdown}
            onChange={(event) => updateMarkdown(event.target.value)}
            placeholder="Write your Markdown here..."
            rows={12}
            spellCheck={false}
            className="w-full resize-y rounded-md border border-border bg-input px-3 py-2 font-mono text-xs leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
          />
        </div>

        <div className="flex gap-2">
          <ActionButton
            variant="secondary"
            icon={<Trash2 size={14} />}
            onClick={clear}
          >
            Clear
          </ActionButton>

          <ActionButton
            variant="secondary"
            icon={<RotateCcw size={14} />}
            onClick={reset}
          >
            Reset example
          </ActionButton>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold">Preview</h3>

          <div
            className="markdown-preview min-h-40 overflow-x-auto rounded-md border border-border bg-surface p-4 text-sm"
            aria-label="Rendered Markdown preview"
          >
            {state.isEmpty ? (
              <p className="text-xs text-text-muted">
                Your Markdown preview will appear here.
              </p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: state.preview }} />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default MarkdownPreviewer;
