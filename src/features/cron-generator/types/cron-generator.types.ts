export type CronScheduleType =
  'minute' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

export interface CronGeneratorConfig {
  scheduleType: CronScheduleType;
  minute: number;
  hour: number;
  dayOfMonth: number;
  month: number;
  dayOfWeek: number;
}

export interface CronGeneratorResult {
  expression: string;
  description: string;
  nextExecutions: Date[];
  error: string | null;
}

export interface CronField {
  name: string;
  value: string;
  description: string;
}
