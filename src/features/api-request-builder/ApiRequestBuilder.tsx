import { Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import BackToTools from '@/shared/BackToTools';
import FeedbackMessage from '@/shared/FeedbackMessage';
import type { HttpMethod } from './api-request.types';
import { useApiRequest } from './hooks/useApiRequest';

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const ApiRequestBuilder = () => {
  const { request, error, success, isLoading, updateRequest, sendRequest } =
    useApiRequest();

  const addHeader = () => {
    updateRequest({
      headers: [
        ...request.headers,
        {
          id: crypto.randomUUID(),
          key: '',
          value: '',
          enabled: true,
        },
      ],
    });
  };

  const updateHeader = (
    id: string,
    field: 'key' | 'value' | 'enabled',
    value: string | boolean,
  ) => {
    updateRequest({
      headers: request.headers.map((header) =>
        header.id === id ? { ...header, [field]: value } : header,
      ),
    });
  };

  const removeHeader = (id: string) => {
    updateRequest({
      headers: request.headers.filter((header) => header.id !== id),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendRequest();
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <BackToTools />

        <div>
          <h1 className="text-xl font-semibold text-text-primary">
            API Request Builder
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Send HTTP requests and inspect API responses.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={request.method}
              onChange={(event) =>
                updateRequest({
                  method: event.target.value as HttpMethod,
                })
              }
              className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
              aria-label="HTTP method"
            >
              {HTTP_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>

            <input
              type="url"
              value={request.url}
              onChange={(event) => updateRequest({ url: event.target.value })}
              placeholder="https://api.example.com/users"
              className="min-w-0 flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
              aria-label="Request URL"
              required
            />

            <ActionButton
              type="submit"
              disabled={isLoading}
              className="shrink-0"
            >
              {isLoading ? 'Sending...' : 'Send Request'}
            </ActionButton>
          </div>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text-primary">
                Headers
              </h2>

              <ActionButton
                variant="secondary"
                icon={<Plus size={16} />}
                onClick={addHeader}
              >
                Add Header
              </ActionButton>
            </div>

            {request.headers.length === 0 ? (
              <p className="text-sm text-text-secondary">No headers added.</p>
            ) : (
              <div className="space-y-2">
                {request.headers.map((header) => (
                  <div
                    key={header.id}
                    className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={header.enabled}
                      onChange={(event) =>
                        updateHeader(header.id, 'enabled', event.target.checked)
                      }
                      aria-label="Enable header"
                    />

                    <input
                      value={header.key}
                      onChange={(event) =>
                        updateHeader(header.id, 'key', event.target.value)
                      }
                      placeholder="Header name"
                      aria-label="Header name"
                      className="min-w-0 rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
                    />

                    <input
                      value={header.value}
                      onChange={(event) =>
                        updateHeader(header.id, 'value', event.target.value)
                      }
                      placeholder="Header value"
                      aria-label="Header value"
                      className="min-w-0 rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
                    />

                    <button
                      type="button"
                      onClick={() => removeHeader(header.id)}
                      className="rounded-lg p-2 text-text-secondary hover:text-red-500"
                      aria-label="Remove header"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {!['GET', 'DELETE'].includes(request.method) && (
            <section className="space-y-2">
              <h2 className="text-sm font-semibold text-text-primary">
                Request Body (JSON)
              </h2>

              <textarea
                value={request.body}
                onChange={(event) =>
                  updateRequest({ body: event.target.value })
                }
                placeholder={'{\n  "name": "John Doe"\n}'}
                rows={8}
                spellCheck={false}
                className="w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm text-text-primary"
                aria-label="Request body"
              />
            </section>
          )}
        </form>

        {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

        {success && (
          <FeedbackMessage variant="success">{success}</FeedbackMessage>
        )}
      </div>
    </AppLayout>
  );
};

export default ApiRequestBuilder;
