import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AccessDeniedPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10'>
            <ShieldAlert className='h-8 w-8 text-destructive' />
          </div>
          <CardTitle className='text-2xl font-bold'>Access Denied</CardTitle>
          <CardDescription>
            You don&apos;t have permission to access this resource
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Alert variant='destructive'>
            <ShieldAlert className='h-4 w-4' />
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>
              Your session has expired or you don&apos;t have a valid access
              token. Please log in to continue.
            </AlertDescription>
          </Alert>
          <div className='text-sm text-muted-foreground space-y-2'>
            <p>This could happen because:</p>
            <ul className='list-disc list-inside space-y-1 ml-2'>
              <li>You are not logged in</li>
              <li>Your session has expired</li>
              <li>Your access token is invalid</li>
              <li>You don&apos;t have the required permissions</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <Button asChild className='w-full'>
            <Link href='/login'>Go to Login</Link>
          </Button>
          <Button asChild variant='outline' className='w-full'>
            <Link href='/'>Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
