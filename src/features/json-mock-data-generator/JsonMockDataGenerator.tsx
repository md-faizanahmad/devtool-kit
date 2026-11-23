import { Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import BackToTools from '@/shared/BackToTools';
import FeedbackMessage from '@/shared/FeedbackMessage';
import MockDataPreview from './MockDataPreview';
import { useMockData } from './hooks/useMockData';
import type {
  MockDataTemplate,
  MockField,
  MockFieldType,
} from './mock-data.types';
import { TEMPLATE_DEFINITIONS } from './utils/templates';

const FIELD_TYPES: MockFieldType[] = [
  'string',
  'number',
  'boolean',
  'email',
  'uuid',
  'date',
];

const JsonMockDataGenerator = () => {
  const {
    config,
    output,
    error,
    setTemplate,
    setCount,
    addField,
    updateField,
    removeField,
    generateData,
    clearData,
  } = useMockData();

  const handleAddField = () => {
    const field: MockField = {
      id: crypto.randomUUID(),
      name: '',
      type: 'string',
      enabled: true,
    };

    addField(field);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <BackToTools />

        <div>
          <h1 className="text-xl font-semibold text-text-primary">
            JSON Mock Data Generator
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Generate realistic mock users, products, addresses, and API
            responses.
          </p>
        </div>

        <section className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Data Template
            </label>

            <select
              value={config.template}
              onChange={(event) =>
                setTemplate(event.target.value as MockDataTemplate)
              }
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
            >
              {Object.entries(TEMPLATE_DEFINITIONS).map(([key, template]) => (
                <option key={key} value={key}>
                  {template.label}
                </option>
              ))}
            </select>

            <p className="text-xs text-text-secondary">
              {TEMPLATE_DEFINITIONS[config.template].description}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Number of Records
            </label>

            <input
              type="number"
              min={1}
              max={1000}
              value={config.count}
              onChange={(event) => setCount(Number(event.target.value))}
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
            />
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-primary">
              Custom Fields
            </h2>

            <ActionButton
              variant="secondary"
              icon={<Plus size={16} />}
              onClick={handleAddField}
            >
              Add Field
            </ActionButton>
          </div>

          {config.fields.length === 0 ? (
            <p className="text-sm text-text-secondary">
              No custom fields. The selected template will be used.
            </p>
          ) : (
            <div className="space-y-2">
              {config.fields.map((field) => (
                <div
                  key={field.id}
                  className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={field.enabled}
                    onChange={(event) =>
                      updateField(field.id, {
                        enabled: event.target.checked,
                      })
                    }
                    aria-label="Enable field"
                  />

                  <input
                    value={field.name}
                    onChange={(event) =>
                      updateField(field.id, {
                        name: event.target.value,
                      })
                    }
                    placeholder="Field name"
                    aria-label="Field name"
                    className="min-w-0 rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
                  />

                  <select
                    value={field.type}
                    onChange={(event) =>
                      updateField(field.id, {
                        type: event.target.value as MockFieldType,
                      })
                    }
                    aria-label="Field type"
                    className="min-w-0 rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary"
                  >
                    {FIELD_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => removeField(field.id)}
                    className="rounded-lg p-2 text-text-secondary hover:text-red-500"
                    aria-label="Remove field"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {error && <FeedbackMessage variant="error">{error}</FeedbackMessage>}

        <div className="flex flex-wrap gap-2">
          <ActionButton onClick={generateData}>Generate JSON</ActionButton>

          <ActionButton variant="secondary" onClick={clearData}>
            Clear
          </ActionButton>
        </div>

        <MockDataPreview output={output} />
      </div>
    </AppLayout>
  );
};

export default JsonMockDataGenerator;
