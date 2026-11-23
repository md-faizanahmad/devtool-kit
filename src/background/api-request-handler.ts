interface ApiRequestMessage {
  type: 'API_REQUEST';
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== 'API_REQUEST') return;

  const request = message as ApiRequestMessage;

  const executeRequest = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    const startTime = performance.now();

    try {
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: ['GET', 'HEAD'].includes(request.method)
          ? undefined
          : request.body || undefined,
        signal: controller.signal,
      });

      const responseBody = await response.text();
      const responseHeaders: Record<string, string> = {};

      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      sendResponse({
        response: {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: responseBody,
          duration: Math.round(performance.now() - startTime),
          size: new Blob([responseBody]).size,
        },
        error: null,
      });
    } catch (error) {
      sendResponse({
        response: null,
        error:
          error instanceof Error && error.name === 'AbortError'
            ? 'Request timed out after 30 seconds.'
            : error instanceof Error
              ? error.message
              : 'Failed to execute API request.',
      });
    } finally {
      clearTimeout(timeoutId);
    }
  };

  void executeRequest();

  return true;
});
