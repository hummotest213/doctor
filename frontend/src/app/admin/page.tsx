'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, redirect to admin-portal
    if (isAuthenticated()) {
      router.push('/admin-portal');
    } else {
      // Otherwise, redirect to admin-login
      router.push('/admin-login');
    }
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: 'sans-serif'
    }}>
      <div>Yönləndirilir...</div>
    </div>
  );
}
