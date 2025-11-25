'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

import { useConfig } from '@/contexts/config-context';

export default function Auth0Wrapper({ children }: { children: ReactNode }) {
  const config = useConfig();

  const authorizationParams: any = {
    redirect_uri: config?.auth0.auth0RedirectUri || '',
    scope: 'openid profile email',
    app_key: 'auth-system', // Custom parameter that will be available in Auth0 Action
    audience: config?.auth0.auth0Audience || '',
  };
  // Add organization parameter if it's configured
  // if (config?.auth0.auth0Organization) {
  //   authorizationParams.organization = config.auth0.auth0Organization;
  // }

  return (
    <Auth0Provider
      domain={config?.auth0.auth0Domain || ''}
      clientId={config?.auth0.auth0ClientId || ''}
      authorizationParams={authorizationParams}
      // useRefreshTokens
      // cacheLocation='localstorage'
    >
      {children}
    </Auth0Provider>
  );
}
