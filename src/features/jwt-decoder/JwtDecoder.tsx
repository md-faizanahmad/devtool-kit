import { Copy, RotateCcw, ScanSearch } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import BackToTools from '@/shared/BackToTools';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useJwtDecoder } from './hooks/useJwtDecoder';

function JwtDecoder() {
  const { token, result, error, setToken, decode, clear } = useJwtDecoder();

  const copyContent = async (value: unknown) => {
    try {
      await navigator.clipboard.writeText(
        typeof value === 'string' ? value : JSON.stringify(value, null, 2),
      );
    } catch {
      // Clipboard error handling can be added to the hook.
    }
  };

  const resultSections = result
    ? [
        { label: 'Header', value: result.header },
        { label: 'Payload', value: result.payload },
        { label: 'Signature', value: result.signature },
      ]
    : [];

  return (
    <AppLayout>
      <div className="space-y-5">
        <BackToTools />

        <div>
          <h2 className="text-base font-semibold">JWT Decoder</h2>
          <p className="mt-1 text-xs text-text-secondary">
            Decode JWT headers, payloads, and inspect token claims.
          </p>
        </div>

        <div>
          <label htmlFor="jwt-input" className="mb-1 block text-xs font-medium">
            JWT token
          </label>

          <textarea
            id="jwt-input"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Paste your JWT token here..."
            rows={6}
            spellCheck={false}
            className="w-full resize-y rounded-md border border-border bg-input px-3 py-2 font-mono text-xs leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <ActionButton
            icon={<ScanSearch size={14} />}
            onClick={decode}
            disabled={!token.trim()}
          >
            Decode JWT
          </ActionButton>
        </div>

        {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

        {result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Decoded Result</h3>

              <span
                className={`rounded-md px-2 py-1 text-xs font-medium ${
                  result.isExpired === null
                    ? 'bg-surface text-text-secondary'
                    : result.isExpired
                      ? 'bg-red-50 text-red-600'
                      : 'bg-green-50 text-green-600'
                }`}
              >
                {result.isExpired === null
                  ? 'Expiration unknown'
                  : result.isExpired
                    ? 'Expired'
                    : 'Not expired'}
              </span>
            </div>

            {resultSections.map(({ label, value }) => (
              <div key={label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium">{label}</label>

                  <ActionButton
                    variant="ghost"
                    icon={<Copy size={14} />}
                    onClick={() => copyContent(value)}
                  >
                    Copy
                  </ActionButton>
                </div>

                <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs leading-6">
                  {typeof value === 'string'
                    ? value
                    : JSON.stringify(value, null, 2)}
                </pre>
              </div>
            ))}

            <div className="space-y-3 rounded-md border border-border p-3">
              <h3 className="text-xs font-semibold">Timestamp Claims</h3>

              {[
                { label: 'Issued At (iat)', value: result.issuedAt },
                { label: 'Not Before (nbf)', value: result.notBefore },
                { label: 'Expires At (exp)', value: result.expiresAt },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col justify-between gap-1 text-xs sm:flex-row"
                >
                  <span className="text-text-secondary">{label}</span>
                  <span className="font-medium">
                    {value ? value.toLocaleString() : 'Not provided'}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-secondary">
              Decoding does not verify the JWT signature or authenticate the
              token.
            </p>
          </div>
        )}

        <ActionButton
          className="w-full"
          variant="secondary"
          icon={<RotateCcw size={14} />}
          onClick={clear}
        >
          Clear
        </ActionButton>
      </div>
    </AppLayout>
  );
}

export default JwtDecoder;
