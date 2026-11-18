import { Copy, RotateCcw } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useTextCaseConverter } from './hooks/useTextCaseConverter';
import type { TextCase } from './utils/text-case';

const caseOptions: { value: TextCase; label: string }[] = [
  { value: 'uppercase', label: 'UPPERCASE' },
  { value: 'lowercase', label: 'lowercase' },
  { value: 'title', label: 'Title Case' },
  { value: 'sentence', label: 'Sentence case' },
  { value: 'camel', label: 'camelCase' },
  { value: 'pascal', label: 'PascalCase' },
  { value: 'snake', label: 'snake_case' },
  { value: 'kebab', label: 'kebab-case' },
];

function TextCaseConverter() {
  const { state, updateInput, updateCase, convert, copyOutput, clear } =
    useTextCaseConverter();

  return (
    <AppLayout>
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-semibold">Text Case Converter</h2>
          <p className="mt-1 text-xs text-text-secondary">
            Transform text into different casing formats.
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="text-input"
              className="mb-1 block text-xs font-medium"
            >
              Input text
            </label>
            <textarea
              id="text-input"
              value={state.input}
              onChange={(event) => updateInput(event.target.value)}
              placeholder="Enter text to convert..."
              rows={4}
              className="w-full resize-y rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
            />
          </div>

          <div>
            <label
              htmlFor="text-case"
              className="mb-1 block text-xs font-medium"
            >
              Conversion format
            </label>
            <select
              id="text-case"
              value={state.selectedCase}
              onChange={(event) => updateCase(event.target.value as TextCase)}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
            >
              {caseOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ActionButton className="block" variant="primary" onClick={convert}>
          Convert Text
        </ActionButton>

        {state.error && (
          <FeedbackMessage variant="error">{state.error}</FeedbackMessage>
        )}

        {state.output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">Result</label>
              <ActionButton
                variant="ghost"
                icon={<Copy size={14} />}
                onClick={copyOutput}
              >
                {state.copied ? 'Copied' : 'Copy'}
              </ActionButton>
            </div>

            <textarea
              value={state.output}
              readOnly
              rows={4}
              aria-label="Converted text"
              className="w-full resize-y rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none"
            />
          </div>
        )}

        <ActionButton
          className="w-full"
          icon={<RotateCcw size={14} />}
          onClick={clear}
        >
          Clear
        </ActionButton>
      </div>
    </AppLayout>
  );
}

export default TextCaseConverter;
