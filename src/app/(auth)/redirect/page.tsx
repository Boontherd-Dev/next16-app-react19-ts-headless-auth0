'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Redirect() {
  const {
    isAuthenticated,
    isLoading,
    getIdTokenClaims,
    getAccessTokenSilently,
    user,
  } = useAuth0();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Wait for Auth0 to finish loading
        if (isLoading) {
          return;
        }

        // If not authenticated, redirect to login
        if (!isAuthenticated) {
          console.error('User is not authenticated');
          setError('Authentication failed. Please try again.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          return;
        }

        const accessToken = await getAccessTokenSilently();

        // Set the raw token to cookie
        setCookie('access_token', accessToken, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        console.log('Token set successfully for user:', user?.email);

        // Redirect to dashboard or the original destination
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('redirect') || '/';
        router.push(redirectTo);
      } catch (err) {
        console.error('Error during redirect:', err);
        setError('An error occurred during authentication.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    };

    handleRedirect();
  }, [isAuthenticated, isLoading, getIdTokenClaims, user, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div>
          <p className='text-lg'>Authenticating...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 text-red-500'>
            <svg
              className='mx-auto h-12 w-12'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <p className='text-lg text-red-600'>{error}</p>
          <p className='mt-2 text-sm text-gray-500'>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Success state (brief moment before redirect)
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <div className='mb-4 text-green-500'>
          <svg
            className='mx-auto h-12 w-12'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <p className='text-lg'>Authentication successful!</p>
        <p className='mt-2 text-sm text-gray-500'>Redirecting...</p>
      </div>
    </div>
  );
}
