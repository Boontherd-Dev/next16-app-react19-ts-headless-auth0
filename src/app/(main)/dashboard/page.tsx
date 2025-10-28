import { CheckCircle2, LayoutDashboard, Lock, User } from 'lucide-react';
import { cookies } from 'next/headers';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LogoutButton } from '@/components/logout-button';

export default async function DashboardPage() {
  // Get the access token from cookies (server component)
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8'>
      <div className='max-w-6xl mx-auto space-y-8'>
        {/* Header */}

        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3'>
              <LayoutDashboard className='h-10 w-10 text-primary' />
              Dashboard
            </h1>
            <p className='text-muted-foreground mt-2'>
              Welcome to your protected dashboard
            </p>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm'>
              <User className='h-4 w-4 mr-2' />
              Profile
            </Button>
            <LogoutButton />
          </div>
        </div>

        {/* Success Alert */}
        <Alert className='border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800'>
          <CheckCircle2 className='h-4 w-4 text-green-600 dark:text-green-400' />
          <AlertTitle className='text-green-800 dark:text-green-300'>
            Authentication Successful
          </AlertTitle>
          <AlertDescription className='text-green-700 dark:text-green-400'>
            You have successfully accessed this protected page. Your access
            token is valid.
          </AlertDescription>
        </Alert>

        {/* Info Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Lock className='h-5 w-5 text-primary' />
                Protected Route
              </CardTitle>
              <CardDescription>
                This page is protected by middleware
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Only authenticated users with a valid access token can view this
                page. The middleware checks for the token before allowing
                access.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <CheckCircle2 className='h-5 w-5 text-green-600' />
                Token Status
              </CardTitle>
              <CardDescription>Your authentication status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Status:</span>
                  <span className='font-medium text-green-600 dark:text-green-400'>
                    Authenticated
                  </span>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Token:</span>
                  <span className='font-mono text-xs'>
                    {accessToken?.value ? 'Valid' : 'Not Found'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-5 w-5 text-primary' />
                User Info
              </CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                This is a sample protected page. In a real application, you
                would display user-specific data and functionality here.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Example Protected Content</CardTitle>
            <CardDescription>
              This content is only visible to authenticated users
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='prose dark:prose-invert max-w-none'>
              <h3 className='text-lg font-semibold'>
                How the Authentication Works
              </h3>
              <ol className='list-decimal list-inside space-y-2 text-sm text-muted-foreground'>
                <li>
                  The middleware checks for an{' '}
                  <code className='text-xs bg-muted px-1 py-0.5 rounded'>
                    access_token
                  </code>{' '}
                  cookie on every request to protected routes
                </li>
                <li>
                  If the token is missing or expired, users are redirected to
                  the access-denied page
                </li>
                <li>
                  If the token is valid, users can access protected pages like
                  this dashboard
                </li>
                <li>The token is validated on the server side for security</li>
              </ol>
            </div>

            <div className='pt-4 border-t'>
              <h4 className='font-semibold mb-2'>Quick Actions</h4>
              <div className='flex gap-2'>
                <Button>View Reports</Button>
                <Button variant='outline'>Settings</Button>
                <Button variant='ghost'>Help</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
