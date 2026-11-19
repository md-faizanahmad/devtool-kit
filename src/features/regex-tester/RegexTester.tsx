import { RotateCcw } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import BackToTools from '@/shared/BackToTools';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useRegexTester } from './hooks/useRegexTester';

const flagOptions = [
  { value: 'g', label: 'Global (g)' },
  { value: 'i', label: 'Case insensitive (i)' },
  { value: 'm', label: 'Multiline (m)' },
  { value: 's', label: 'Dot all (s)' },
  { value: 'u', label: 'Unicode (u)' },
  { value: 'y', label: 'Sticky (y)' },
];

function RegexTester() {
  const { state, updatePattern, updateFlags, updateInput, clear } =
    useRegexTester();

  const toggleFlag = (flag: string) => {
    const nextFlags = state.flags.includes(flag)
      ? state.flags.replace(flag, '')
      : state.flags + flag;

    updateFlags(nextFlags);
  };

  return (
    <AppLayout>
      <div className="space-y-5">
        <BackToTools />

        <div>
          <h2 className="text-base font-semibold">Regex Tester</h2>
          <p className="mt-1 text-xs text-text-secondary">
            Test regular expressions against text and inspect matches.
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="regex-pattern"
              className="mb-1 block text-xs font-medium"
            >
              Regular expression
            </label>

            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">/</span>
              <input
                id="regex-pattern"
                type="text"
                value={state.pattern}
                onChange={(event) => updatePattern(event.target.value)}
                placeholder="Enter pattern, e.g. \d+"
                className="min-w-0 flex-1 rounded-md border border-border bg-input px-3 py-2 font-mono text-sm outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
              />
              <span className="text-sm text-text-muted">/</span>
              <span className="text-sm font-mono text-primary">
                {state.flags}
              </span>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium">Flags</p>

            <div className="grid grid-cols-2 gap-3">
              {flagOptions.map(({ value, label }) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2 text-xs"
                >
                  <input
                    type="checkbox"
                    checked={state.flags.includes(value)}
                    onChange={() => toggleFlag(value)}
                    className="accent-primary"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="regex-input"
              className="mb-1 block text-xs font-medium"
            >
              Test text
            </label>

            <textarea
              id="regex-input"
              value={state.input}
              onChange={(event) => updateInput(event.target.value)}
              placeholder="Enter text to test against your pattern..."
              rows={6}
              className="w-full resize-y rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
            />
          </div>
        </div>

        {state.error && (
          <FeedbackMessage variant="error">{state.error}</FeedbackMessage>
        )}

        {state.pattern && !state.error && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold">Results</h3>
              <span className="text-xs text-text-secondary">
                {state.matchCount}{' '}
                {state.matchCount === 1 ? 'match' : 'matches'}
              </span>
            </div>

            {state.matches.length > 0 ? (
              <div className="space-y-2">
                {state.matches.map((match, index) => (
                  <div
                    key={`${match.index}-${index}`}
                    className="space-y-2 rounded-md border border-border bg-surface p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">
                        Match {index + 1}
                      </span>
                      <span className="text-xs text-text-muted">
                        Index: {match.index}–{match.endIndex}
                      </span>
                    </div>

                    <p className="break-all font-mono text-sm">
                      {match.value || '(empty match)'}
                    </p>

                    {match.groups.length > 0 && (
                      <div className="border-t border-border pt-2">
                        <p className="mb-1 text-xs font-medium">
                          Capture groups
                        </p>

                        {match.groups.map((group, groupIndex) => (
                          <p
                            key={groupIndex}
                            className="break-all text-xs text-text-secondary"
                          >
                            Group {groupIndex + 1}:{' '}
                            <span className="font-mono">
                              {group ?? '(undefined)'}
                            </span>
                          </p>
                        ))}
                      </div>
                    )}

                    {match.namedGroups &&
                      Object.keys(match.namedGroups).length > 0 && (
                        <div className="border-t border-border pt-2">
                          <p className="mb-1 text-xs font-medium">
                            Named groups
                          </p>

                          {Object.entries(match.namedGroups).map(
                            ([name, value]) => (
                              <p
                                key={name}
                                className="break-all text-xs text-text-secondary"
                              >
                                {name}:{' '}
                                <span className="font-mono">{value}</span>
                              </p>
                            ),
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            ) : (
              state.input && (
                <p className="rounded-md border border-border bg-surface p-3 text-xs text-text-secondary">
                  No matches found.
                </p>
              )
            )}
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

export default RegexTester;
