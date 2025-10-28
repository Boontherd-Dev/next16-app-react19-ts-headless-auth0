import './globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import { lineSeedSans } from '@/fonts/LineSeedSans';
import StyledComponentsRegistry from '@/lib/registry';

export const metadata: Metadata = {
  title: 'Next 16 App Starter',
  description: 'Next 16 app router react 19 typescript headless',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${lineSeedSans.className} antialiased`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
