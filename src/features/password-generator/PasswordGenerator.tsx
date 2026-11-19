import FeedbackMessage from '@/shared/FeedbackMessage';
import { usePasswordGenerator } from './hooks/usePasswordGenerator';
import { Copy, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react';
import ActionButton from '@/shared/ActionButton';

const PasswordGenerator = () => {
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
    <section className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-700" />
          <h2 className="text-lg font-semibold text-gray-900">
            Password Generator
          </h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Generate secure random passwords with customizable options.
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password-length"
            className="text-sm font-medium text-gray-700"
          >
            Password Length
          </label>
          <span className="text-sm font-semibold text-gray-900">
            {options.length}
          </span>
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
          className="w-full accent-emerald-700"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {characterOptions.map(({ key, label }) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={options[key]}
                onChange={(event) => updateOption(key, event.target.checked)}
                className="h-4 w-4 accent-emerald-700"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
        <label className="text-sm font-medium text-gray-700">
          Generated Password
        </label>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={password}
            placeholder="Your password will appear here"
            className="min-w-0 flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-900 outline-none"
          />

          <button
            type="button"
            onClick={copyPassword}
            disabled={!password}
            aria-label="Copy password"
            className="rounded-md border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>

        {copied && (
          <FeedbackMessage variant="success" children="Password copied." />
        )}

        {error && <FeedbackMessage variant="error" children={error} />}

        <div className="flex flex-wrap gap-2">
          <ActionButton onClick={generate}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate Password
          </ActionButton>

          <ActionButton variant="secondary" onClick={clear}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default PasswordGenerator;
