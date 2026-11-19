import { CalendarClock, Copy, RotateCcw } from 'lucide-react';

import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useTimestampConverter } from './hooks/useTimestampConverter';
import BackToTools from '@/shared/BackToTools';

function TimestampConverter() {
  const {
    mode,
    unit,
    input,
    output,
    error,
    copied,
    updateInput,
    changeMode,
    changeUnit,
    convert,
    copyOutput,
    clear,
  } = useTimestampConverter();

  return (
    <AppLayout>
      <div className="space-y-6">
        <header className="space-y-4">
          <BackToTools />
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
              <CalendarClock size={20} className="text-primary" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Timestamp Converter</h2>
              <p className="mt-1 text-xs text-text-secondary">
                Convert Unix timestamps and dates.
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-2">
          <label className="text-xs font-semibold text-text-primary">
            Conversion
          </label>

          <div className="flex flex-wrap gap-2">
            <ActionButton
              type="button"
              variant={mode === 'timestamp-to-date' ? 'primary' : 'secondary'}
              onClick={() => changeMode('timestamp-to-date')}
            >
              Timestamp to Date
            </ActionButton>

            <ActionButton
              type="button"
              variant={mode === 'date-to-timestamp' ? 'primary' : 'secondary'}
              onClick={() => changeMode('date-to-timestamp')}
            >
              Date to Timestamp
            </ActionButton>
          </div>
        </section>

        <section className="space-y-2">
          <label className="text-xs font-semibold text-text-primary">
            Timestamp unit
          </label>

          <div className="flex gap-2">
            <ActionButton
              type="button"
              variant={unit === 'seconds' ? 'primary' : 'secondary'}
              onClick={() => changeUnit('seconds')}
            >
              Seconds
            </ActionButton>

            <ActionButton
              type="button"
              variant={unit === 'milliseconds' ? 'primary' : 'secondary'}
              onClick={() => changeUnit('milliseconds')}
            >
              Milliseconds
            </ActionButton>
          </div>
        </section>

        <section className="space-y-2">
          <label
            htmlFor="timestamp-input"
            className="text-xs font-semibold text-text-primary"
          >
            {mode === 'timestamp-to-date' ? 'Unix Timestamp' : 'Date and Time'}
          </label>

          <input
            id="timestamp-input"
            type={mode === 'timestamp-to-date' ? 'number' : 'datetime-local'}
            value={input}
            onChange={(event) => updateInput(event.target.value)}
            placeholder={
              mode === 'timestamp-to-date' ? 'e.g. 1735689600' : undefined
            }
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </section>

        <div className="flex gap-2">
          <ActionButton
            type="button"
            variant="primary"
            onClick={convert}
            disabled={!input.trim()}
          >
            Convert
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
                htmlFor="timestamp-output"
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
              id="timestamp-output"
              value={output}
              readOnly
              spellCheck={false}
              className="min-h-20 w-full resize-y rounded-md border border-border bg-surface p-3 font-mono text-xs leading-6 outline-none"
            />
          </section>
        )}
      </div>
    </AppLayout>
  );
}

export default TimestampConverter;
