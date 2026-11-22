import type {
  CronGeneratorConfig,
  CronScheduleType,
} from '../types/cron-generator.types';

const validateConfig = (config: CronGeneratorConfig): string | null => {
  const { scheduleType, minute, hour, dayOfMonth, month, dayOfWeek } = config;

  if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
    return 'Minute must be between 0 and 59.';
  }

  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    return 'Hour must be between 0 and 23.';
  }

  if (!Number.isInteger(dayOfMonth) || dayOfMonth < 1 || dayOfMonth > 31) {
    return 'Day of month must be between 1 and 31.';
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return 'Month must be between 1 and 12.';
  }

  if (!Number.isInteger(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
    return 'Day of week must be between 0 and 6.';
  }

  const validTypes: CronScheduleType[] = [
    'minute',
    'hourly',
    'daily',
    'weekly',
    'monthly',
    'yearly',
    'custom',
  ];

  if (!validTypes.includes(scheduleType)) {
    return 'Invalid schedule type.';
  }

  return null;
};

/**
 * Generates a five-field cron expression.
 * Day of week: 0 = Sunday, 6 = Saturday.
 */
export const generateCronExpression = (config: CronGeneratorConfig): string => {
  const error = validateConfig(config);

  if (error) {
    throw new Error(error);
  }

  const { scheduleType, minute, hour, dayOfMonth, month, dayOfWeek } = config;

  switch (scheduleType) {
    case 'minute':
      return '* * * * *';

    case 'hourly':
      return `${minute} * * * *`;

    case 'daily':
      return `${minute} ${hour} * * *`;

    case 'weekly':
      return `${minute} ${hour} * * ${dayOfWeek}`;

    case 'monthly':
      return `${minute} ${hour} ${dayOfMonth} * *`;

    case 'yearly':
      return `${minute} ${hour} ${dayOfMonth} ${month} *`;

    case 'custom':
      return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

    default:
      throw new Error('Unsupported schedule type.');
  }
};

/**
 * Returns a human-readable description of a cron configuration.
 */
export const describeCronExpression = (config: CronGeneratorConfig): string => {
  const error = validateConfig(config);

  if (error) {
    throw new Error(error);
  }

  const { scheduleType, minute, hour, dayOfMonth, month, dayOfWeek } = config;

  const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  switch (scheduleType) {
    case 'minute':
      return 'Every minute';

    case 'hourly':
      return `Every hour at minute ${minute}`;

    case 'daily':
      return `Every day at ${time}`;

    case 'weekly':
      return `Every ${weekdays[dayOfWeek]} at ${time}`;

    case 'monthly':
      return `On day ${dayOfMonth} of every month at ${time}`;

    case 'yearly':
      return `Every ${months[month - 1]} ${dayOfMonth} at ${time}`;

    case 'custom':
      return `At ${time}, on day ${dayOfMonth} of every month, in ${months[month - 1]}, and on ${weekdays[dayOfWeek]}`;
  }
};
