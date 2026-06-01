'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) return <>{children}</>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--cream)' }}>
      <AdminSidebar />
      <main className="admin-main" style={{ flex: 1, marginLeft: 260, padding: '40px', minWidth: 0 }}>
        {children}
      </main>
      <style>{`
        @media (max-width: 1023px) {
          .admin-main { margin-left: 0 !important; padding: 20px !important; }
        }
      `}</style>
    </div>
  );
}
