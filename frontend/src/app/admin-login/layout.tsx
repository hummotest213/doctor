import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Admin Login',
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        footer {
          display: none !important;
        }
        .go-top {
          display: none !important;
        }
      `}</style>
      <div className="admin-login-layout" style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </>
  );
}
