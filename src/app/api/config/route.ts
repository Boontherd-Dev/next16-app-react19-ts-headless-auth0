import { NextResponse } from 'next/server';

export async function GET() {
  // ส่ง environment variables ที่ต้องการให้ client-side ใช้งาน
  const AppConfig = {
    apiEndpoint: process.env.API_ENDPOINT,
    auth0: {
      auth0Audience: process.env.AUTH0_AUDIENCE,
      auth0Domain: process.env.AUTH0_DOMAIN,
      auth0ClientId: process.env.AUTH0_CLIENT_ID,
      auth0RedirectUri: process.env.AUTH0_REDIRECT_URI,
    },
  };

  return NextResponse.json(AppConfig);
}
