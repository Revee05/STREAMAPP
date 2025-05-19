import { AuthProvider } from '@/app/_lib/auth/context/AuthContext';
import './globals.css';
import React from 'react';
import AuthWrapper from './components/AuthWrapper';
import ErrorBoundary from './components/ErrorBoundary';

export const metadata = {
  title: 'Streamapp',
  description: 'Streaming Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <AuthWrapper>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
