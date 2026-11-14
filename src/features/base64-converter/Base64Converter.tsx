import { useState } from 'react';
import { ArrowLeft, Binary, Copy, RotateCcw } from 'lucide-react';
import { Link } from 'react-router';

import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { encodeBase64, decodeBase64 } from './utils/base64';

type ConversionMode = 'encode' | 'decode';

function Base64Converter() {
  const [mode, setMode] = useState<ConversionMode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      const result =
        mode === 'encode' ? encodeBase64(input) : decodeBase64(input);

      setOutput(result);
      setError('');
      setCopied(false);
    } catch {
      setOutput('');
      setError(
        mode === 'encode'
          ? 'Unable to encode the provided text.'
          : 'Invalid Base64 input or unsupported UTF-8 data.',
      );
    }
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setError('');
    } catch {
      setError('Unable to copy output to clipboard.');
    }
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  const changeMode = (nextMode: ConversionMode) => {
    setMode(nextMode);
    setOutput('');
    setError('');
    setCopied(false);
  };

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
              <Binary size={20} className="text-primary" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Base64 Converter</h2>
              <p className="mt-1 text-xs text-text-secondary">
                Encode and decode Base64 text.
              </p>
            </div>
          </div>
        </header>

        <div className="flex gap-2">
          <ActionButton
            type="button"
            variant={mode === 'encode' ? 'primary' : 'secondary'}
            onClick={() => changeMode('encode')}
          >
            Encode
          </ActionButton>

          <ActionButton
            type="button"
            variant={mode === 'decode' ? 'primary' : 'secondary'}
            onClick={() => changeMode('decode')}
          >
            Decode
          </ActionButton>
        </div>

        <section className="space-y-2">
          <label
            htmlFor="base64-input"
            className="text-xs font-semibold text-text-primary"
          >
            {mode === 'encode' ? 'Plain Text' : 'Base64 Input'}
          </label>

          <textarea
            id="base64-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setError('');
              setOutput('');
              setCopied(false);
            }}
            placeholder={
              mode === 'encode'
                ? 'Enter text to encode...'
                : 'Enter Base64 text to decode...'
            }
            spellCheck={false}
            className="min-h-40 w-full resize-y rounded-md border border-border bg-input p-3 font-mono text-xs leading-6 outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </section>

        <div className="flex gap-2">
          <ActionButton
            type="button"
            variant="primary"
            onClick={convert}
            disabled={!input.trim()}
          >
            {mode === 'encode' ? 'Encode' : 'Decode'}
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
                htmlFor="base64-output"
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
              id="base64-output"
              value={output}
              readOnly
              spellCheck={false}
              className="min-h-40 w-full resize-y rounded-md border border-border bg-surface p-3 font-mono text-xs leading-6 outline-none"
            />
          </section>
        )}
      </div>
    </AppLayout>
  );
}

export default Base64Converter;
