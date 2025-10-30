'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

import { auth0Config } from './auth0';

export default function Auth0Wrapper({ children }: { children: ReactNode }) {
  const authorizationParams: any = {
    redirect_uri: auth0Config.redirectUri,
    scope: 'openid profile email',
    app_key: 'auth-system', // Custom parameter that will be available in Auth0 Action
    audience: 'https://api.myapp.local',
  };
  // Add organization parameter if it's configured
  if (auth0Config.organization) {
    authorizationParams.organization = auth0Config.organization;
  }

  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={authorizationParams}
      // useRefreshTokens
      // cacheLocation='localstorage'
    >
      {children}
    </Auth0Provider>
  );
}
