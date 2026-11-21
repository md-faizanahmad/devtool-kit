import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useJwtDecoder } from './hooks/useJwtDecoder';

export const JwtDecoder = () => {
  const { token, result, error, setToken, decode, clear } = useJwtDecoder();

  const handleCopy = async (value: unknown) => {
    try {
      await navigator.clipboard.writeText(
        typeof value === 'string' ? value : JSON.stringify(value, null, 2),
      );
    } catch {
      // Clipboard errors can be handled by shared feedback later.
    }
  };

  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="jwt-input"
          className="text-sm font-medium text-gray-700"
        >
          JWT Token
        </label>

        <textarea
          id="jwt-input"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="Paste your JWT token here..."
          rows={5}
          spellCheck={false}
          className="w-full resize-y rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <ActionButton onClick={decode}>Decode JWT</ActionButton>

        <ActionButton variant="secondary" onClick={clear}>
          Clear
        </ActionButton>
      </div>

      {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-gray-900">
              Decoded JWT
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                result.isExpired === null
                  ? 'bg-gray-100 text-gray-600'
                  : result.isExpired
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
              }`}
            >
              {result.isExpired === null
                ? 'Expiration unknown'
                : result.isExpired
                  ? 'Expired'
                  : 'Not expired'}
            </span>
          </div>

          <ResultSection
            title="Header"
            value={result.header}
            onCopy={handleCopy}
          />

          <ResultSection
            title="Payload"
            value={result.payload}
            onCopy={handleCopy}
          />

          <ResultSection
            title="Signature"
            value={result.signature}
            onCopy={handleCopy}
          />

          <div className="rounded-lg border border-gray-200 p-4">
            <h4 className="mb-3 text-sm font-semibold text-gray-900">
              Timestamp Claims
            </h4>

            <div className="space-y-2 text-sm">
              <TimestampRow label="Issued At (iat)" value={result.issuedAt} />
              <TimestampRow label="Not Before (nbf)" value={result.notBefore} />
              <TimestampRow label="Expires At (exp)" value={result.expiresAt} />
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Decoding only reveals the token contents. The signature has not been
            verified.
          </p>
        </div>
      )}
    </section>
  );
};

interface ResultSectionProps {
  title: string;
  value: unknown;
  onCopy: (value: unknown) => void;
}

const ResultSection = ({ title, value, onCopy }: ResultSectionProps) => (
  <div className="overflow-hidden rounded-lg border border-gray-200">
    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>

      <button
        type="button"
        onClick={() => onCopy(value)}
        className="text-xs font-medium text-blue-600 hover:text-blue-700"
      >
        Copy
      </button>
    </div>

    <pre className="overflow-x-auto p-4 text-xs leading-6 text-gray-800">
      {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
    </pre>
  </div>
);

interface TimestampRowProps {
  label: string;
  value: Date | null;
}

const TimestampRow = ({ label, value }: TimestampRowProps) => (
  <div className="flex flex-wrap justify-between gap-2">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium text-gray-900">
      {value ? value.toLocaleString() : 'Not provided'}
    </span>
  </div>
);
