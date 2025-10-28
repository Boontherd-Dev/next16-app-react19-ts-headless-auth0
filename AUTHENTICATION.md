# Authentication Setup Documentation

This Next.js 16 application includes a complete authentication system with middleware-based route protection, JWT token validation, and shadcn/ui components.

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/                    # Authentication layout group
│   │   ├── access-denied/         # Access denied page
│   │   │   └── page.tsx
│   │   └── login/                 # Login page
│   │       └── page.tsx
│   ├── (main)/                    # Protected routes layout group
│   │   └── dashboard/             # Example protected page
│   │       └── page.tsx
│   └── page.tsx                   # Public home page
├── components/
│   ├── ui/                        # shadcn/ui components
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── logout-button.tsx          # Logout functionality
├── lib/
│   ├── auth.ts                    # Authentication utilities
│   └── utils.ts                   # General utilities
└── proxy.ts                       # Authentication middleware (Next.js 16)

```

## 🔐 How Authentication Works

### 1. Middleware Protection (`src/proxy.ts`)

The proxy middleware (Next.js 16's middleware system) runs on every request and:
- Checks for an `access_token` cookie
- Validates the token (checks expiration, format, etc.)
- Redirects to `/access-denied` if the token is invalid or missing
- Allows access to protected routes if the token is valid

**Public Routes** (no authentication required):
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page (if implemented)
- `/access-denied` - Access denied page

**Protected Routes** (authentication required):
- `/dashboard` - Example dashboard page
- Any other route not in the public routes list

### 2. Token Management (`src/lib/auth.ts`)

The auth library provides utilities for:
- **Decoding JWT tokens**: Extract payload data without verification
- **Checking token expiration**: Validate if a token is still valid
- **Creating mock tokens**: For testing purposes (development only)
- **Cookie management**: Set, get, and remove access tokens

### 3. Authentication Flow

```
┌─────────────┐
│   User      │
│  Visits     │
│  /dashboard │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│   Middleware    │
│  Checks Token   │
└──────┬──────────┘
       │
       ├─── Token Valid ───────────────────┐
       │                                   │
       │                                   ▼
       │                          ┌────────────────┐
       │                          │   Dashboard    │
       │                          │   Page Loads   │
       │                          └────────────────┘
       │
       └─── Token Invalid/Missing ────────┐
                                          │
                                          ▼
                                 ┌─────────────────┐
                                 │  Access Denied  │
                                 │   Page Loads    │
                                 └─────────────────┘
```

## 🚀 Usage Guide

### Testing the Authentication

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Visit the home page**: `http://localhost:3000`
   - You'll see an overview of the authentication features

3. **Try accessing a protected route without authentication**:
   - Navigate to `http://localhost:3000/dashboard`
   - You'll be redirected to `/access-denied`

4. **Login to get an access token**:
   - Go to `http://localhost:3000/login`
   - Click "Login with Mock Token" to generate a test token
   - You'll be redirected to the dashboard

5. **Test token expiration**:
   - On the login page, click "Test with Expired Token"
   - Try to access the dashboard - you'll be redirected to access-denied

6. **Logout**:
   - On the dashboard, click the "Logout" button
   - Your token will be removed and you'll be redirected to login

## 🔧 Customization

### Adding More Protected Routes

Edit `src/proxy.ts` and add routes to the `publicRoutes` array:

```typescript
const publicRoutes = [
  '/login',
  '/register',
  '/access-denied',
  '/',
  '/about',        // Add your public routes here
  '/contact',
];
```

### Integrating with a Real Authentication API

Replace the mock token generation in `src/app/(auth)/login/page.tsx`:

```typescript
const handleLogin = async () => {
  setIsLoading(true);
  
  try {
    // Call your authentication API
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const { token } = await response.json();
    
    // Set the token in a cookie
    setAccessTokenCookie(token, 3600);
    
    // Redirect to dashboard
    router.push('/dashboard');
  } catch (error) {
    setError('Login failed');
  } finally {
    setIsLoading(false);
  }
};
```

### Implementing Real JWT Verification

For production, use a proper JWT library in `src/proxy.ts`:

```typescript
import { jwtVerify } from 'jose';

async function verifyAccessToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Additional validation logic here
    return true;
  } catch (error) {
    return false;
  }
}
```

**Note**: Install the `jose` package:
```bash
npm install jose
```

### Customizing the Access Denied Page

Edit `src/app/(auth)/access-denied/page.tsx` to customize the UI, messaging, or add additional functionality.

### Adding User Context

Create a context provider to share user data across components:

```typescript
// src/contexts/auth-context.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getAccessTokenFromCookie, decodeToken } from '@/lib/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = getAccessTokenFromCookie();
    if (token) {
      const payload = decodeToken(token);
      setUser(payload);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

## 🛡️ Security Considerations

### For Production Deployment

1. **Use HTTP-only cookies**: Prevent XSS attacks by setting cookies server-side
2. **Enable HTTPS**: Always use HTTPS in production
3. **Implement CSRF protection**: Add CSRF tokens for state-changing operations
4. **Use secure JWT secrets**: Store secrets in environment variables
5. **Implement token refresh**: Add refresh token logic for better UX
6. **Add rate limiting**: Prevent brute force attacks on login endpoints
7. **Validate tokens server-side**: Always verify tokens on the server
8. **Set appropriate cookie flags**: Use `Secure`, `HttpOnly`, and `SameSite` flags

### Environment Variables

Create a `.env.local` file:

```env
JWT_SECRET=your-super-secret-key-here
NEXT_PUBLIC_API_URL=https://your-api.com
```

## 📦 Dependencies

The authentication system uses:

- **Next.js 16**: App Router and middleware
- **React 19**: Latest React features
- **shadcn/ui**: UI components (Button, Card, Alert)
- **lucide-react**: Icons
- **TypeScript**: Type safety

## 🧪 Testing

### Manual Testing Checklist

- [ ] Access protected route without token → Redirects to access-denied
- [ ] Login with valid credentials → Redirects to dashboard
- [ ] Access protected route with valid token → Page loads successfully
- [ ] Access protected route with expired token → Redirects to access-denied
- [ ] Logout → Token removed, redirected to login
- [ ] Access public routes → Always accessible

### Automated Testing (Future Enhancement)

Consider adding:
- Unit tests for auth utilities
- Integration tests for middleware
- E2E tests for authentication flow

## 📚 Additional Resources

- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [JWT.io](https://jwt.io) - JWT debugger and documentation
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## 🤝 Contributing

When adding new features:
1. Update this documentation
2. Add appropriate TypeScript types
3. Test the authentication flow
4. Consider security implications

## 📝 License

This authentication setup is part of the Next.js 16 template and follows the same license.

