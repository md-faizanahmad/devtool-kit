import type { ApiRequestConfig, ApiRequestResult } from '../api-request.types';

/**
 * Executes an API request through the background service worker.
 */
export const executeApiRequest = async (
  request: ApiRequestConfig,
): Promise<ApiRequestResult> => {
  const { url, method, headers, body } = request;

  if (!url.trim()) {
    return {
      response: null,
      error: 'Enter an API URL.',
    };
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url.trim());

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Only HTTP and HTTPS URLs are supported.');
    }
  } catch (error) {
    return {
      response: null,
      error:
        error instanceof Error && error.message.includes('Only HTTP')
          ? error.message
          : 'Enter a valid API URL.',
    };
  }

  if (!['GET', 'DELETE'].includes(method) && body.trim()) {
    try {
      JSON.parse(body);
    } catch {
      return {
        response: null,
        error: 'Request body contains invalid JSON.',
      };
    }
  }

  const requestHeaders: Record<string, string> = {};

  try {
    headers
      .filter((header) => header.enabled && header.key.trim())
      .forEach((header) => {
        requestHeaders[header.key.trim()] = header.value;
      });
  } catch {
    return {
      response: null,
      error: 'One or more request headers are invalid.',
    };
  }

  try {
    return (await chrome.runtime.sendMessage({
      type: 'API_REQUEST',
      url: parsedUrl.toString(),
      method,
      headers: requestHeaders,
      body: body || undefined,
    })) as ApiRequestResult;
  } catch {
    return {
      response: null,
      error: 'Unable to communicate with the background service worker.',
    };
  }
};
