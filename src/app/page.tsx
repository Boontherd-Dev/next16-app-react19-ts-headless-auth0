'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { deleteCookie } from 'cookies-next';
import { ShieldCheck, Lock, LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Profile from '@/components/profile';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  const { logout } = useAuth0();

  const onLogout = () => {
    logout();
    deleteCookie('access_token');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans p-4'>
      <main className='flex w-full max-w-4xl flex-col items-center gap-12 py-16 px-4'>
        <div className='text-center space-y-4'>
          <Image
            className='dark:invert mx-auto'
            src='/next.svg'
            alt='Next.js logo'
            width={150}
            height={30}
            priority
          />
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
            Next.js 16 with Authentication
          </h1>
          <p className='text-lg text-muted-foreground max-w-2xl'>
            A complete authentication setup with middleware, protected routes,
            and shadcn/ui components
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <ShieldCheck className='h-5 w-5 text-green-600' />
                Authentication
              </CardTitle>
              <CardDescription>JWT-based token authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Secure authentication with access tokens stored in HTTP-only
                cookies.
              </p>
              <Button asChild className='w-full'>
                <Link href='/login'>
                  <LogIn className='h-4 w-4 mr-2' />
                  Go to Login
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Lock className='h-5 w-5 text-blue-600' />
                Protected Routes
              </CardTitle>
              <CardDescription>
                Middleware-based route protection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Try accessing the dashboard without authentication to see the
                middleware in action.
              </p>
              <Button asChild variant='outline' className='w-full'>
                <Link href='/dashboard'>View Dashboard</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <ShieldCheck className='h-5 w-5 text-purple-600' />
                shadcn/ui
              </CardTitle>
              <CardDescription>Beautiful UI components</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Pre-configured with shadcn/ui components for a modern,
                accessible interface.
              </p>
              <Button
                asChild
                variant='secondary'
                className='w-full'
                onClick={() => onLogout()}
              >
                <a target='_blank' rel='noopener noreferrer'>
                  Logout
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-4'>
          <Profile />
        </div>
      </main>
    </div>
  );
}
