'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminPortal from '@/components/AdminPortal';

export default function AdminPortalPage() {
  return (
    <ProtectedRoute>
      <AdminPortal />
    </ProtectedRoute>
  );
}

