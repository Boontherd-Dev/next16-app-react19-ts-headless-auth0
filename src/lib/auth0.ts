// Auth0 configuration
export const auth0Config: any = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN!,
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
  redirectUri:
    process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI || 'http://localhost:3000',
  // organization: process.env.NEXT_PUBLIC_AUTH0_ORGANIZATION
};

// Validate that required environment variables are set
if (!auth0Config.domain || !auth0Config.clientId) {
  throw new Error(
    'Missing required Auth0 environment variables. Please check your .env.local file.'
  );
}
