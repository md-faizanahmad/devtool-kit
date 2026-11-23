import type {
  ApiRequestConfig,
  ApiRequestResult,
  ApiResponseData,
} from '../api-request.types';

/**
 * Executes an HTTP request and returns its response.
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

  if (method !== 'GET' && method !== 'DELETE' && body.trim()) {
    try {
      JSON.parse(body);
    } catch {
      return {
        response: null,
        error: 'Request body contains invalid JSON.',
      };
    }
  }

  const requestHeaders = new Headers();

  try {
    headers
      .filter((header) => header.enabled && header.key.trim())
      .forEach((header) => {
        requestHeaders.set(header.key.trim(), header.value);
      });
  } catch {
    return {
      response: null,
      error: 'One or more request headers are invalid.',
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  const startTime = performance.now();

  try {
    const fetchResponse = await fetch(parsedUrl.toString(), {
      method,
      headers: requestHeaders,
      body: ['GET', 'DELETE'].includes(method) ? undefined : body || undefined,
      signal: controller.signal,
    });

    const responseBody = await fetchResponse.text();
    const duration = Math.round(performance.now() - startTime);

    const responseHeaders: Record<string, string> = {};

    fetchResponse.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    const response: ApiResponseData = {
      status: fetchResponse.status,
      statusText: fetchResponse.statusText,
      headers: responseHeaders,
      body: responseBody,
      duration,
      size: new Blob([responseBody]).size,
    };

    return {
      response,
      error: null,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        response: null,
        error: 'Request timed out after 30 seconds.',
      };
    }

    return {
      response: null,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to execute API request. Check the URL and network connection.',
    };
  } finally {
    clearTimeout(timeoutId);
  }
};
