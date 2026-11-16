import { useState } from 'react';
import { generateUuids } from '../utils/uuid';

const DEFAULT_COUNT = 5;
const MAX_COUNT = 100;

export function useUuidGenerator() {
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [uuids, setUuids] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [copiedUuid, setCopiedUuid] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const updateCount = (value: number) => {
    setCount(value);
    setError('');
  };

  const generate = () => {
    if (!Number.isInteger(count) || count < 1 || count > MAX_COUNT) {
      setError(`Enter a count between 1 and ${MAX_COUNT}.`);
      return;
    }

    setUuids(generateUuids(count));
    setError('');
    setCopiedUuid(null);
    setCopiedAll(false);
  };

  const copyUuid = async (uuid: string) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedUuid(uuid);
      setCopiedAll(false);
      setError('');
    } catch {
      setError('Unable to copy UUID to clipboard.');
    }
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
      setCopiedAll(true);
      setCopiedUuid(null);
      setError('');
    } catch {
      setError('Unable to copy UUIDs to clipboard.');
    }
  };

  const clear = () => {
    setUuids([]);
    setError('');
    setCopiedUuid(null);
    setCopiedAll(false);
  };

  return {
    count,
    uuids,
    error,
    copiedUuid,
    copiedAll,
    updateCount,
    generate,
    copyUuid,
    copyAll,
    clear,
  };
}
