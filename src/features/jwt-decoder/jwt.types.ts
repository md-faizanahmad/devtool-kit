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
