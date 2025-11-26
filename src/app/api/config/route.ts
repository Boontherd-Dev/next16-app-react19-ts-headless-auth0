import { NextResponse } from 'next/server';

export async function GET() {
  // ส่ง environment variables ที่ต้องการให้ client-side ใช้งาน
  const config = {
    auth0: {
      app_key: process.env.APP_KEY || '',
      audience: process.env.AUTH0_AUDIENCE || '',
      domain: process.env.AUTH0_DOMAIN || '',
      clientId: process.env.AUTH0_CLIENT_ID || '',
      redirectUri: process.env.AUTH0_REDIRECT_URI || '',
    },
  };

  return NextResponse.json(config);
}
