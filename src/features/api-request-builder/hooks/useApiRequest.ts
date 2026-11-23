import { useState } from 'react';
import type { ApiRequestConfig, ApiRequestState } from '../api-request.types';
import { executeApiRequest } from '../utils/api';

const initialRequest: ApiRequestConfig = {
  url: '',
  method: 'GET',
  headers: [],
  body: '',
};

export const useApiRequest = () => {
  const [state, setState] = useState<ApiRequestState>({
    request: initialRequest,
    response: null,
    error: null,
    success: null,
    isLoading: false,
  });

  const updateRequest = (updates: Partial<ApiRequestConfig>) => {
    setState((previous) => ({
      ...previous,
      request: {
        ...previous.request,
        ...updates,
      },
      error: null,
      success: null,
    }));
  };

  const sendRequest = async () => {
    setState((previous) => ({
      ...previous,
      isLoading: true,
      response: null,
      error: null,
      success: null,
    }));

    try {
      const result = await executeApiRequest(state.request);

      setState((previous) => ({
        ...previous,
        response: result.response,
        error: result.error,
        success: result.response ? 'Request completed successfully.' : null,
        isLoading: false,
      }));
    } catch {
      setState((previous) => ({
        ...previous,
        error: 'An unexpected error occurred while sending the request.',
        isLoading: false,
      }));
    }
  };

  const clearResponse = () => {
    setState((previous) => ({
      ...previous,
      response: null,
      error: null,
      success: null,
    }));
  };

  return {
    ...state,
    updateRequest,
    sendRequest,
    clearResponse,
  };
};
