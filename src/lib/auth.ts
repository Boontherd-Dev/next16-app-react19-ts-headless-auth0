/**
 * Authentication utility functions
 * This file contains helper functions for managing authentication tokens
 */

export interface TokenPayload {
  sub?: string; // Subject (user ID)
  email?: string;
  name?: string;
  exp?: number; // Expiration time (Unix timestamp)
  iat?: number; // Issued at (Unix timestamp)
  [key: string]: any; // Allow additional claims
}

/**
 * Decode a JWT token without verification
 * Note: This only decodes the token, it does NOT verify the signature
 * Use this for reading token data, not for authentication decisions
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part of JWT)
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

/**
 * Check if a token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return true; // Consider invalid tokens as expired
  }

  const expirationTime = payload.exp * 1000; // Convert to milliseconds
  const currentTime = Date.now();

  return currentTime >= expirationTime;
}

/**
 * Get the time remaining until token expiration (in seconds)
 */
export function getTokenTimeRemaining(token: string): number {
  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return 0;
  }

  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  const remaining = Math.max(
    0,
    Math.floor((expirationTime - currentTime) / 1000)
  );

  return remaining;
}

/**
 * Create a mock JWT token for testing purposes
 * DO NOT use this in production!
 */
export function createMockToken(
  payload: Partial<TokenPayload> = {},
  expiresInSeconds: number = 3600
): string {
  const now = Math.floor(Date.now() / 1000);

  const defaultPayload: TokenPayload = {
    sub: '12345',
    email: 'user@example.com',
    name: 'Test User',
    iat: now,
    exp: now + expiresInSeconds,
    ...payload,
  };

  // Create a mock JWT structure (header.payload.signature)
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payloadStr = btoa(JSON.stringify(defaultPayload));
  const signature = btoa('mock-signature'); // Not a real signature!

  return `${header}.${payloadStr}.${signature}`;
}

/**
 * Set access token in cookie (client-side)
 * This is a helper function for setting the token from the client
 */
export function setAccessTokenCookie(token: string, maxAge: number = 3600) {
  if (typeof document !== 'undefined') {
    document.cookie = `access_token=${token}; path=/; max-age=${maxAge}; SameSite=Strict; Secure`;
  }
}

/**
 * Remove access token from cookie (client-side)
 */
export function removeAccessTokenCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = 'access_token=; path=/; max-age=0';
  }
}

/**
 * Get access token from cookie (client-side)
 */
export function getAccessTokenFromCookie(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'access_token') {
      return value;
    }
  }

  return null;
}
