'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    if (isAuthenticated()) {
      setIsAuthorized(true);
      setIsLoading(false);
    } else {
      // Redirect to login
      router.push('/admin-login');
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading || !isAuthorized) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f5f5f5',
        fontFamily: 'sans-serif'
      }}>
        <div>Yüklənir...</div>
      </div>
    );
  }

  return <>{children}</>;
}
