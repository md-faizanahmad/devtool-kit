export function generateUuid(): string {
  return crypto.randomUUID();
}

export function generateUuids(count: number): string[] {
  if (!Number.isInteger(count) || count < 1) {
    throw new Error('Count must be a positive integer.');
  }

  return Array.from({ length: count }, generateUuid);
}
