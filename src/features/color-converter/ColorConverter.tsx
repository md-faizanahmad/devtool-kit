import { Copy, RotateCcw } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useColorConverter } from './hooks/useColorConverter';

function ColorConverter() {
  const { state, updateHex, convert, copyValue, clear } = useColorConverter();

  return (
    <AppLayout>
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-semibold">Color Converter</h2>
          <p className="mt-1 text-xs text-text-secondary">
            Convert HEX colors into RGB and HSL formats.
          </p>
        </div>

        <div className="space-y-3">
          <label htmlFor="hex-color" className="block text-xs font-medium">
            HEX Color
          </label>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={
                /^#[0-9a-fA-F]{6}$/.test(state.hex) ? state.hex : '#166534'
              }
              onChange={(event) => updateHex(event.target.value)}
              className="h-10 w-12 cursor-pointer rounded-md border border-border bg-input p-1"
              aria-label="Choose color"
            />

            <input
              id="hex-color"
              value={state.hex}
              onChange={(event) => updateHex(event.target.value)}
              placeholder="#166534"
              className="min-w-0 flex-1 rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
            />
          </div>
        </div>

        <ActionButton
          className="block"
          onClick={() => convert()}
          variant="primary"
        >
          Convert Color
        </ActionButton>

        {state.error && (
          <FeedbackMessage variant="error">{state.error}</FeedbackMessage>
        )}

        {state.rgb && state.hsl && (
          <div className="space-y-3">
            <div
              className="h-20 rounded-md border border-border"
              style={{ backgroundColor: state.hex }}
              aria-label={`Color preview: ${state.hex}`}
            />

            {[
              { label: 'HEX', value: state.hex },
              { label: 'RGB', value: state.rgb },
              { label: 'HSL', value: state.hsl },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="text-xs text-text-secondary">{label}</p>
                  <p className="mt-1 break-all text-sm font-medium">{value}</p>
                </div>

                <ActionButton
                  variant="ghost"
                  icon={<Copy size={14} />}
                  onClick={() => copyValue(value, label)}
                  aria-label={`Copy ${label}`}
                >
                  {state.copied === label ? 'Copied' : 'Copy'}
                </ActionButton>
              </div>
            ))}
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

export default ColorConverter;
