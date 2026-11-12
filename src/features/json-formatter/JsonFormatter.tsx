import { useState } from 'react';
import { formatJson, type JsonFormatMode } from './utils/format-json';

function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = (mode: JsonFormatMode) => {
    try {
      setOutput(formatJson(input, mode));
      setError('');
    } catch {
      setOutput('');
      setError('Invalid JSON. Please check your input.');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="json-input" className="mb-2 block text-sm font-medium">
          Input JSON
        </label>

        <textarea
          id="json-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='{"name":"DevTool-Kit"}'
          spellCheck={false}
          className="min-h-40 w-full resize-y rounded-md border border-border bg-input p-3 font-mono text-xs outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleFormat('pretty')}
          className="rounded-md bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary-hover"
        >
          Format
        </button>

        <button
          type="button"
          onClick={() => handleFormat('minify')}
          className="rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-surface"
        >
          Minify
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-surface"
        >
          Clear
        </button>
      </div>

      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}

      {output && (
        <div>
          <label
            htmlFor="json-output"
            className="mb-2 block text-sm font-medium"
          >
            Output
          </label>

          <textarea
            id="json-output"
            value={output}
            readOnly
            spellCheck={false}
            className="min-h-40 w-full resize-y rounded-md border border-border bg-surface p-3 font-mono text-xs outline-none"
          />
        </div>
      )}
    </div>
  );
}

export default JsonFormatter;
