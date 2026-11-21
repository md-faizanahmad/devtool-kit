import { useCallback, useState } from 'react';
import { decodeJwt } from '../utils/jwt';
import type { JwtDecodeResult } from '../jwt.types';

interface UseJwtDecoderReturn {
  token: string;
  result: JwtDecodeResult | null;
  error: string | null;
  isLoading: boolean;
  setToken: (value: string) => void;
  decode: () => void;
  clear: () => void;
}

export const useJwtDecoder = (): UseJwtDecoderReturn => {
  const [token, setToken] = useState('');
  const [result, setResult] = useState<JwtDecodeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const decode = useCallback(() => {
    setError(null);
    setResult(null);

    if (!token.trim()) {
      setError('Enter a JWT token.');
      return;
    }

    setIsLoading(true);

    try {
      const decodedResult = decodeJwt(token);
      setResult(decodedResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to decode JWT token.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const clear = useCallback(() => {
    setToken('');
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    token,
    result,
    error,
    isLoading,
    setToken,
    decode,
    clear,
  };
};
