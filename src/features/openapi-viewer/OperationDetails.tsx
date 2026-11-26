import type { OpenApiOperation } from './openapi-viewer.types';

interface OperationDetailsProps {
  operation: OpenApiOperation;
}

const methodStyles: Record<string, string> = {
  GET: 'bg-green-500/10 text-green-500',
  POST: 'bg-blue-500/10 text-blue-500',
  PUT: 'bg-orange-500/10 text-orange-500',
  PATCH: 'bg-yellow-500/10 text-yellow-500',
  DELETE: 'bg-red-500/10 text-red-500',
  OPTIONS: 'bg-purple-500/10 text-purple-500',
  HEAD: 'bg-cyan-500/10 text-cyan-500',
  TRACE: 'bg-pink-500/10 text-pink-500',
};

const OperationDetails = ({ operation }: OperationDetailsProps) => {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
            methodStyles[operation.method] ?? 'bg-input text-text-secondary'
          }`}
        >
          {operation.method}
        </span>

        <code className="text-sm font-medium break-all">{operation.path}</code>
      </div>

      {operation.summary && (
        <h3 className="text-sm font-semibold">{operation.summary}</h3>
      )}

      {operation.description && (
        <p className="text-sm text-text-secondary">{operation.description}</p>
      )}

      {operation.parameters && operation.parameters.length > 0 && (
        <section className="space-y-2">
          <h4 className="text-sm font-semibold">Parameters</h4>

          <div className="space-y-2">
            {operation.parameters.map((parameter) => (
              <div
                key={`${parameter.in}-${parameter.name}`}
                className="rounded-md bg-input p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <code className="text-sm">{parameter.name}</code>
                  <span className="text-xs text-text-secondary">
                    {parameter.in}
                  </span>
                  {parameter.required && (
                    <span className="text-xs text-red-500">Required</span>
                  )}
                </div>

                {parameter.description && (
                  <p className="mt-1 text-xs text-text-secondary">
                    {parameter.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {operation.requestBody !== undefined && (
        <section className="space-y-2">
          <h4 className="text-sm font-semibold">Request Body</h4>
          <pre className="overflow-x-auto rounded-md bg-input p-3 text-xs">
            {JSON.stringify(operation.requestBody, null, 2)}
          </pre>
        </section>
      )}

      {operation.responses && (
        <section className="space-y-2">
          <h4 className="text-sm font-semibold">Responses</h4>
          <pre className="overflow-x-auto rounded-md bg-input p-3 text-xs">
            {JSON.stringify(operation.responses, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
};

export default OperationDetails;
