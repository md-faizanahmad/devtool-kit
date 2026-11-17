export type TimestampUnit = 'seconds' | 'milliseconds';

export function timestampToDate(timestamp: number, unit: TimestampUnit): Date {
  const milliseconds = unit === 'seconds' ? timestamp * 1000 : timestamp;
  const date = new Date(milliseconds);

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid timestamp.');
  }

  return date;
}

export function dateToTimestamp(date: string, unit: TimestampUnit): number {
  const milliseconds = new Date(date).getTime();

  if (Number.isNaN(milliseconds)) {
    throw new Error('Invalid date.');
  }

  return unit === 'seconds' ? Math.floor(milliseconds / 1000) : milliseconds;
}
