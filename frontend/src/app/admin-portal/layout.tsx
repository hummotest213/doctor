import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal',
  description: 'Admin Portal',
};


export default function AdminPortalLayout({
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
      <div className="admin-portal-layout" style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </>
  );
}
