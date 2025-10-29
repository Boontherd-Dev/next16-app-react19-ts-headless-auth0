'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { LogIn, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function LoginPage() {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleLogin = () => {
    // const state = {
    //   app_key: 'auth-system',
    // };
    // const encodedState = btoa(JSON.stringify(state));
    loginWithRedirect();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
            <LogIn className='h-8 w-8 text-primary' />
          </div>
          <CardTitle className='text-2xl font-bold'>Welcome Back</CardTitle>
          <CardDescription>
            Demo login page for testing authentication
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex flex-col gap-2'>
          <Button
            onClick={() => handleLogin()}
            disabled={isLoading}
            className='w-full'
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className='mr-2 h-4 w-4' />
                Login with Auth0
              </>
            )}
          </Button>
          <div className='text-center text-sm text-muted-foreground mt-4'>
            <Link
              href='/'
              className='hover:text-primary underline-offset-4 hover:underline'
            >
              Return to Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
