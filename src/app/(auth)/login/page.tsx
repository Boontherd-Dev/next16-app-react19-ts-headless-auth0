'use client';

import { LogIn, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createMockToken, setAccessTokenCookie } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a mock token (valid for 1 hour)
      // In a real application, you would call your authentication API here
      const token = createMockToken(
        {
          sub: 'user-123',
          email: 'demo@example.com',
          name: 'Demo User',
        },
        3600 // 1 hour
      );

      // Set the token in a cookie
      setAccessTokenCookie(token, 3600);

      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh(); // Refresh to trigger middleware
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoExpiredToken = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create an expired token (expired 1 hour ago)
      const expiredToken = createMockToken(
        {
          sub: 'user-123',
          email: 'demo@example.com',
          name: 'Demo User',
        },
        -3600 // Expired 1 hour ago
      );

      // Set the expired token
      setAccessTokenCookie(expiredToken, 3600);

      // Try to access dashboard - should redirect to access-denied
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('Failed to set expired token.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
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
        <CardContent className='space-y-4'>
          {error && (
            <Alert variant='destructive'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>
              This is a demo login page. Click the button below to generate a
              mock authentication token and access protected routes.
            </p>
          </div>

          <div className='border rounded-lg p-4 bg-muted/50 space-y-2'>
            <h4 className='font-semibold text-sm'>Demo Credentials</h4>
            <div className='text-xs text-muted-foreground space-y-1'>
              <p>Email: demo@example.com</p>
              <p>User ID: user-123</p>
              <p>Token Expiry: 1 hour</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <Button onClick={handleLogin} disabled={isLoading} className='w-full'>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className='mr-2 h-4 w-4' />
                Login with Mock Token
              </>
            )}
          </Button>

          <Button
            onClick={handleDemoExpiredToken}
            disabled={isLoading}
            variant='outline'
            className='w-full'
          >
            Test with Expired Token
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
