export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRequestHeader {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface ApiRequestConfig {
  url: string;
  method: HttpMethod;
  headers: ApiRequestHeader[];
  body: string;
}

export interface ApiResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  duration: number;
  size: number;
}

export interface ApiRequestState {
  request: ApiRequestConfig;
  response: ApiResponseData | null;
  error: string | null;
  success: string | null;
  isLoading: boolean;
}

export interface ApiRequestResult {
  response: ApiResponseData | null;
  error: string | null;
}
