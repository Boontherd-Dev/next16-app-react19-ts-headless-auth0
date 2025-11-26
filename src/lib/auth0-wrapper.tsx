'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

import { useConfig } from '@/contexts/config-context';

export default function Auth0Wrapper({ children }: { children: ReactNode }) {
  const config = useConfig();

  const authorizationParams: any = {
    redirect_uri: config.auth0.redirectUri,
    scope: 'openid profile email',
    app_key: config.auth0.app_key, // Custom parameter that will be available in Auth0 Action
    audience: config.auth0.audience,
  };

  return (
    <Auth0Provider
      domain={config.auth0.domain}
      clientId={config.auth0.clientId}
      authorizationParams={authorizationParams}
      // useRefreshTokens
      // cacheLocation='localstorage'
    >
      {children}
    </Auth0Provider>
  );
}
