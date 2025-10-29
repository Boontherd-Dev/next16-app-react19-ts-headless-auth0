'use client';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto'>
      <div className='flex items-center space-x-4 mb-6'>
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name || 'User'}
            className='w-20 h-20 rounded-full border-2 border-gray-200'
          />
        )}
        <div>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {user.name || 'Unknown User'}
          </h2>
          <p className='text-gray-600 text-lg'>{user.email}</p>
          {user.nickname && (
            <p className='text-gray-500 text-sm'>@{user.nickname}</p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-3'>
          <h3 className='text-lg font-medium text-gray-800 border-b pb-2'>
            Personal Information
          </h3>

          {user.given_name && (
            <div className='text-sm'>
              <strong className='text-gray-700'>Given Name:</strong>
              <span className='ml-2 text-gray-600'>{user.given_name}</span>
            </div>
          )}

          {user.family_name && (
            <div className='text-sm'>
              <strong className='text-gray-700'>Family Name:</strong>
              <span className='ml-2 text-gray-600'>{user.family_name}</span>
            </div>
          )}

          {user.nickname && (
            <div className='text-sm'>
              <strong className='text-gray-700'>Nickname:</strong>
              <span className='ml-2 text-gray-600'>{user.nickname}</span>
            </div>
          )}

          <div className='text-sm'>
            <strong className='text-gray-700'>Full Name:</strong>
            <span className='ml-2 text-gray-600'>{user.name || 'N/A'}</span>
          </div>

          <div className='text-sm'>
            <strong className='text-gray-700'>Email:</strong>
            <span className='ml-2 text-gray-600'>{user.email}</span>
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='text-lg font-medium text-gray-800 border-b pb-2'>
            Account Details
          </h3>

          <div className='text-sm'>
            <strong className='text-gray-700'>User ID:</strong>
            <span className='ml-2 text-gray-600 font-mono text-xs'>
              {user.sub}
            </span>
          </div>

          {user.email_verified !== undefined && (
            <div className='text-sm'>
              <strong className='text-gray-700'>Email Verified:</strong>
              <span
                className={`ml-2 font-medium ${
                  user.email_verified ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {user.email_verified ? '✓ Verified' : '✗ Not Verified'}
              </span>
            </div>
          )}

          {(user as any).org_id && (
            <div className='text-sm'>
              <strong className='text-gray-700'>Organization ID:</strong>
              <span className='ml-2 text-gray-600 font-mono text-xs'>
                {(user as any).org_id}
              </span>
            </div>
          )}

          {user.updated_at && (
            <div className='text-sm'>
              <strong className='text-gray-700'>Last Updated:</strong>
              <span className='ml-2 text-gray-600'>
                {new Date(user.updated_at).toLocaleString()}
              </span>
            </div>
          )}

          {user.picture && (
            <div className='text-sm'>
              <strong className='text-gray-700'>Profile Picture:</strong>
              <a
                href={user.picture}
                target='_blank'
                rel='noopener noreferrer'
                className='ml-2 text-blue-600 hover:text-blue-800 underline text-xs'
              >
                View Image
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Raw User Data Section */}
      <div className='mt-6 pt-4 border-t'>
        <details className='group'>
          <summary className='cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900'>
            <span className='ml-2'>View Raw User Data</span>
          </summary>
          <div className='mt-3 p-3 bg-gray-50 rounded-md'>
            <pre className='text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap'>
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
};

export default Profile;
