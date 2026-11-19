import { Copy, RotateCcw, RefreshCw } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { usePasswordGenerator } from './hooks/usePasswordGenerator';
import BackToTools from '@/shared/BackToTools';

function PasswordGenerator() {
  const {
    options,
    password,
    error,
    copied,
    updateOption,
    generate,
    copyPassword,
    clear,
  } = usePasswordGenerator();

  const characterOptions = [
    { key: 'includeUppercase', label: 'Uppercase (A-Z)' },
    { key: 'includeLowercase', label: 'Lowercase (a-z)' },
    { key: 'includeNumbers', label: 'Numbers (0-9)' },
    { key: 'includeSymbols', label: 'Symbols (!@#$)' },
  ] as const;

  return (
    <AppLayout>
      <div className="space-y-5">
        <BackToTools />
        <div>
          <h2 className="text-base font-semibold">Password Generator</h2>
          <p className="mt-1 text-xs text-text-secondary">
            Generate secure passwords with customizable options.
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="password-length" className="text-xs font-medium">
                Password length
              </label>
              <span className="text-xs font-medium">{options.length}</span>
            </div>

            <input
              id="password-length"
              type="range"
              min={1}
              max={128}
              value={options.length}
              onChange={(event) =>
                updateOption('length', Number(event.target.value))
              }
              className="w-full accent-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {characterOptions.map(({ key, label }) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-2 text-xs"
              >
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={(event) => updateOption(key, event.target.checked)}
                  className="accent-primary"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <ActionButton
          className="block"
          variant="primary"
          icon={<RefreshCw size={14} />}
          onClick={generate}
        >
          Generate Password
        </ActionButton>

        {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

        {password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="generated-password"
                className="text-xs font-medium"
              >
                Generated password
              </label>

              <ActionButton
                variant="ghost"
                icon={<Copy size={14} />}
                onClick={copyPassword}
              >
                {copied ? 'Copied' : 'Copy'}
              </ActionButton>
            </div>

            <textarea
              id="generated-password"
              value={password}
              readOnly
              rows={3}
              aria-label="Generated password"
              className="w-full resize-none rounded-md border border-border bg-surface px-3 py-2 font-mono text-sm outline-none"
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

export default PasswordGenerator;
