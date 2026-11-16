import { Link } from 'react-router';
import { ArrowLeft, Copy, Dices, RotateCcw } from 'lucide-react';

import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useUuidGenerator } from './hooks/useUuidGenerator';

function UuidGenerator() {
  const {
    count,
    uuids,
    error,
    copiedUuid,
    copiedAll,
    updateCount,
    generate,
    copyUuid,
    copyAll,
    clear,
  } = useUuidGenerator();

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
              <Dices size={20} className="text-primary" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">UUID Generator</h2>
              <p className="mt-1 text-xs text-text-secondary">
                Generate unique UUID v4 identifiers.
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-2">
          <label
            htmlFor="uuid-count"
            className="text-xs font-semibold text-text-primary"
          >
            Number of UUIDs
          </label>

          <input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            step={1}
            value={count}
            onChange={(event) => updateCount(Number(event.target.value))}
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />

          <p className="text-xs text-text-muted">
            Generate between 1 and 100 UUIDs.
          </p>
        </section>

        <div className="flex flex-wrap gap-2">
          <ActionButton
            type="button"
            variant="primary"
            icon={<Dices size={14} />}
            onClick={generate}
          >
            Generate UUIDs
          </ActionButton>

          <ActionButton
            type="button"
            variant="ghost"
            icon={<RotateCcw size={14} />}
            onClick={clear}
            disabled={uuids.length === 0 && !error}
          >
            Clear
          </ActionButton>
        </div>

        {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

        {uuids.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-text-primary">
                Generated UUIDs ({uuids.length})
              </h3>

              <ActionButton
                type="button"
                variant="ghost"
                icon={<Copy size={14} />}
                onClick={() => void copyAll()}
              >
                {copiedAll ? 'Copied All' : 'Copy All'}
              </ActionButton>
            </div>

            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={uuid}
                  className="flex items-center justify-between gap-2 rounded-md border border-border bg-surface p-3"
                >
                  <code className="min-w-0 break-all text-xs text-text-primary">
                    {uuid}
                  </code>

                  <button
                    type="button"
                    onClick={() => void copyUuid(uuid)}
                    aria-label={`Copy UUID ${index + 1}`}
                    className="shrink-0 text-text-muted transition-colors hover:text-primary"
                  >
                    {copiedUuid === uuid ? (
                      <span className="text-xs font-medium text-primary">
                        Copied
                      </span>
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppLayout>
  );
}

export default UuidGenerator;
