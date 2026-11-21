export interface JwtHeader {
  alg?: string;
  typ?: string;
  [key: string]: unknown;
}

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  [key: string]: unknown;
}

export interface JwtDecodeResult {
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
  isExpired: boolean | null;
  expiresAt: Date | null;
  issuedAt: Date | null;
  notBefore: Date | null;
}

const decodeBase64Url = (value: string): string => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    '=',
  );

  const binary = atob(padded);

  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
};

const parseJsonSegment = <T>(segment: string, name: string): T => {
  try {
    return JSON.parse(decodeBase64Url(segment)) as T;
  } catch {
    throw new Error(`Invalid JWT ${name}.`);
  }
};

const getClaimDate = (value: unknown): Date | null => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }

  const date = new Date(value * 1000);

  return Number.isNaN(date.getTime()) ? null : date;
};

/**
 * Decodes a JWT without verifying its signature.
 */
export const decodeJwt = (token: string): JwtDecodeResult => {
  const trimmedToken = token.trim();

  if (!trimmedToken) {
    throw new Error('Enter a JWT token.');
  }

  const parts = trimmedToken.split('.');

  if (parts.length !== 3 || parts.some((part) => !part)) {
    throw new Error('Invalid JWT structure. Expected three segments.');
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  const header = parseJsonSegment<JwtHeader>(encodedHeader, 'header');
  const payload = parseJsonSegment<JwtPayload>(encodedPayload, 'payload');

  if (typeof header !== 'object' || header === null || Array.isArray(header)) {
    throw new Error('Invalid JWT header. Expected a JSON object.');
  }

  if (
    typeof payload !== 'object' ||
    payload === null ||
    Array.isArray(payload)
  ) {
    throw new Error('Invalid JWT payload. Expected a JSON object.');
  }

  const expiresAt = getClaimDate(payload.exp);
  const issuedAt = getClaimDate(payload.iat);
  const notBefore = getClaimDate(payload.nbf);

  return {
    header,
    payload,
    signature,
    isExpired:
      typeof payload.exp === 'number' && Number.isFinite(payload.exp)
        ? payload.exp <= Date.now() / 1000
        : null,
    expiresAt,
    issuedAt,
    notBefore,
  };
};
