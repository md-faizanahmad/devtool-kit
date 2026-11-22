import { Copy, RotateCcw, Clock, CalendarDays, Check } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import BackToTools from '@/shared/BackToTools';
import ActionButton from '@/shared/ActionButton';
import FeedbackMessage from '@/shared/FeedbackMessage';
import { useCronGenerator } from './hooks/useCronGenerator';
import type { CronScheduleType } from './types/cron-generator.types';

function CronGenerator() {
  const {
    state,
    expression,
    description,
    updateConfig,
    updateScheduleType,
    copyExpression,
    clear,
  } = useCronGenerator();

  const scheduleOptions: {
    label: string;
    value: CronScheduleType;
  }[] = [
    { label: 'Every minute', value: 'minute' },
    { label: 'Hourly', value: 'hourly' },
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
    { label: 'Custom', value: 'custom' },
  ];

  const showMinute = state.config.scheduleType !== 'minute';
  const showHour = ['daily', 'weekly', 'monthly', 'yearly', 'custom'].includes(
    state.config.scheduleType,
  );
  const showDayOfMonth = ['monthly', 'yearly', 'custom'].includes(
    state.config.scheduleType,
  );
  const showMonth = ['yearly', 'custom'].includes(state.config.scheduleType);
  const showDayOfWeek = ['weekly', 'custom'].includes(
    state.config.scheduleType,
  );

  return (
    <AppLayout>
      <div className="space-y-5">
        <BackToTools />

        <div>
          <h2 className="text-base font-semibold">Cron Generator</h2>
          <p className="mt-1 text-xs text-text-secondary">
            Generate and understand cron expressions for scheduled tasks.
          </p>
        </div>

        <div>
          <label
            htmlFor="cron-schedule"
            className="mb-1 block text-xs font-medium"
          >
            Schedule frequency
          </label>

          <select
            id="cron-schedule"
            value={state.config.scheduleType}
            onChange={(event) =>
              updateScheduleType(event.target.value as CronScheduleType)
            }
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
          >
            {scheduleOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {state.config.scheduleType !== 'minute' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {showMinute && (
              <NumberField
                label="Minute"
                value={state.config.minute}
                min={0}
                max={59}
                onChange={(value) => updateConfig('minute', value)}
              />
            )}

            {showHour && (
              <NumberField
                label="Hour"
                value={state.config.hour}
                min={0}
                max={23}
                onChange={(value) => updateConfig('hour', value)}
              />
            )}

            {showDayOfMonth && (
              <NumberField
                label="Day of month"
                value={state.config.dayOfMonth}
                min={1}
                max={31}
                onChange={(value) => updateConfig('dayOfMonth', value)}
              />
            )}

            {showMonth && (
              <NumberField
                label="Month"
                value={state.config.month}
                min={1}
                max={12}
                onChange={(value) => updateConfig('month', value)}
              />
            )}

            {showDayOfWeek && (
              <div>
                <label
                  htmlFor="cron-day-of-week"
                  className="mb-1 block text-xs font-medium"
                >
                  Day of week
                </label>

                <select
                  id="cron-day-of-week"
                  value={state.config.dayOfWeek}
                  onChange={(event) =>
                    updateConfig('dayOfWeek', Number(event.target.value))
                  }
                  className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
                >
                  {[
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ].map((day, index) => (
                    <option key={day} value={index}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3 rounded-md border border-border bg-surface p-4">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-primary" />
            <h3 className="text-xs font-semibold">Cron Expression</h3>
          </div>

          <div className="flex items-center justify-between gap-2">
            <code className="min-w-0 break-all font-mono text-base font-semibold tracking-wide">
              {expression || 'Invalid expression'}
            </code>

            <ActionButton
              variant="ghost"
              icon={<Copy size={14} />}
              onClick={copyExpression}
              disabled={!expression}
            >
              Copy
            </ActionButton>
          </div>

          <div className="border-t border-border pt-3">
            <p className="text-xs text-text-secondary">{description}</p>
          </div>
        </div>

        <div className="rounded-md border border-border p-4">
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays size={15} className="text-primary" />
            <h3 className="text-xs font-semibold">Cron Field Reference</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-5">
            {[
              { symbol: '*', label: 'Minute', range: '0–59' },
              { symbol: '*', label: 'Hour', range: '0–23' },
              { symbol: '*', label: 'Day', range: '1–31' },
              { symbol: '*', label: 'Month', range: '1–12' },
              { symbol: '*', label: 'Weekday', range: '0–6' },
            ].map((field) => (
              <div key={field.label} className="space-y-1">
                <p className="font-mono font-semibold">{field.symbol}</p>
                <p className="text-text-secondary">{field.label}</p>
                <p className="text-text-secondary">{field.range}</p>
              </div>
            ))}
          </div>
        </div>

        {state.error && (
          <FeedbackMessage variant="error">{state.error}</FeedbackMessage>
        )}

        {state.success && (
          <FeedbackMessage variant="success">{state.success}</FeedbackMessage>
        )}

        {state.copied && (
          <div className="flex items-center gap-2 text-xs text-green-600">
            <Check size={14} />
            Expression copied successfully.
          </div>
        )}

        <ActionButton
          className="w-full"
          variant="secondary"
          icon={<RotateCcw size={14} />}
          onClick={clear}
        >
          Reset
        </ActionButton>

        <p className="text-xs text-text-secondary">
          Cron expressions use the standard five-field format. Execution times
          depend on the scheduler's configured timezone.
        </p>
      </div>
    </AppLayout>
  );
}

interface NumberFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

function NumberField({ label, value, min, max, onChange }: NumberFieldProps) {
  return (
    <div>
      <label
        htmlFor={`cron-${label.toLowerCase().replaceAll(' ', '-')}`}
        className="mb-1 block text-xs font-medium"
      >
        {label}
      </label>

      <input
        id={`cron-${label.toLowerCase().replaceAll(' ', '-')}`}
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-focus-ring"
      />
    </div>
  );
}

export default CronGenerator;
