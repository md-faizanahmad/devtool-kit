import { useCallback, useState } from 'react';
import { decodeJwt } from '../utils/jwt';
import type { JwtDecodeResult } from '../jwt.types';

interface JwtDecoderState {
  token: string;
  result: JwtDecodeResult | null;
  error: string | null;
  isLoading: boolean;
}

interface UseJwtDecoderReturn extends JwtDecoderState {
  setToken: (value: string) => void;
  decode: () => void;
  clear: () => void;
}

const initialState: JwtDecoderState = {
  token: '',
  result: null,
  error: null,
  isLoading: false,
};

export const useJwtDecoder = (): UseJwtDecoderReturn => {
  const [state, setState] = useState<JwtDecoderState>(initialState);

  const setToken = useCallback((token: string) => {
    setState((prev) => ({
      ...prev,
      token,
      result: null,
      error: null,
    }));
  }, []);

  const decode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      result: null,
      error: null,
    }));

    if (!state.token.trim()) {
      setState((prev) => ({
        ...prev,
        error: 'Enter a JWT token.',
      }));
      return;
    }

    try {
      const result = decodeJwt(state.token);

      setState((prev) => ({
        ...prev,
        result,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        result: null,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to decode JWT token.',
      }));
    }
  }, [state.token]);

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    setToken,
    decode,
    clear,
  };
};
