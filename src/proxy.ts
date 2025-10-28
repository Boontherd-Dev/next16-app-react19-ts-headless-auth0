import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Verify if the access token is valid
 * In a real application, you would:
 * 1. Decode the JWT token
 * 2. Verify the signature
 * 3. Check expiration time
 * 4. Validate against your auth service
 */
function verifyAccessToken(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  try {
    // Basic validation - check if token exists and is not empty
    if (token.trim().length === 0) {
      return false;
    }

    // For JWT tokens, you would typically decode and verify here
    // Example with a simple JWT structure check (not actual verification)
    // In production, use a library like 'jsonwebtoken' or 'jose'

    // Simple check: if token looks like a JWT (has 3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length === 3) {
      // Decode the payload (second part)
      try {
        const payload = JSON.parse(atob(parts[1]));

        // Check if token has expired
        if (payload.exp) {
          const expirationTime = payload.exp * 1000; // Convert to milliseconds
          const currentTime = Date.now();

          if (currentTime >= expirationTime) {
            console.log('Token has expired');
            return false;
          }
        }

        return true;
      } catch (e) {
        console.error('Error decoding token:', e);
        return false;
      }
    }

    // For development/testing: accept any non-empty token
    // Remove this in production!
    return true;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
}

/**
 * Proxy function for Next.js 16
 *
 * This function runs on the Edge Runtime before routes are rendered.
 * It's used for authentication, redirects, and request/response manipulation.
 *
 * Note: Proxy is deprecated in favor of more specific APIs.
 * Use this as a last resort when other options don't fit your needs.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the access token from cookies
  const accessToken = request.cookies.get('access_token')?.value;

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/login',
    '/register',
    '/access-denied',
    '/', // Home page
  ];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(
    route => pathname === route || pathname.startsWith(route + '/')
  );

  // If it's not a public route, it's protected - verify the token
  if (!isPublicRoute) {
    const isValidToken = verifyAccessToken(accessToken);

    if (!isValidToken) {
      // Redirect to access-denied page if token is invalid or missing
      const url = request.nextUrl.clone();
      url.pathname = '/access-denied';

      // Optionally, add the original URL as a query parameter for redirect after login
      url.searchParams.set('redirect', pathname);

      return NextResponse.redirect(url);
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

/**
 * Configure which routes the proxy should run on
 *
 * The matcher uses path-to-regexp syntax to match routes.
 * This configuration excludes:
 * - API routes (/api/*)
 * - Static files (_next/static/*)
 * - Image optimization files (_next/image/*)
 * - Common static assets (favicon.ico, images, etc.)
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
