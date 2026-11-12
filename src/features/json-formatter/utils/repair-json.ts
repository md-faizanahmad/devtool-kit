import { jsonrepair } from 'jsonrepair';

export function repairJson(input: string): string {
  return jsonrepair(input);
}
