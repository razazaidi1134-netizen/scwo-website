'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navItems = [
  { href: '/admin/dashboard',  label: 'Dashboard',  icon: '◈' },
  { href: '/admin/programs',   label: 'Programs',   icon: '📋' },
  { href: '/admin/gallery',    label: 'Gallery',    icon: '🖼' },
  { href: '/admin/team',       label: 'Team',       icon: '👥' },
  { href: '/admin/donations',  label: 'Donations',  icon: '💰' },
  { href: '/admin/messages',   label: 'Messages',   icon: '✉' },
  { href: '/admin/settings',   label: 'Settings',   icon: '⚙' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, width: '260px',
      background: 'var(--g9)', color: '#fff',
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid rgba(255,255,255,.06)',
      zIndex: 40,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--a5)', flexShrink: 0, background: '#fff' }}>
            <Image src="/logo.png" alt="SCWO" width={40} height={40} style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 600, color: '#fff' }}>SCWO</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.15em', color: 'var(--a4)', textTransform: 'uppercase' }}>Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {navItems.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '11px 16px', borderRadius: '2px',
              textDecoration: 'none',
              background: active ? 'var(--a5)' : 'transparent',
              color: active ? 'var(--g9)' : 'rgba(255,255,255,.65)',
              fontWeight: active ? 700 : 400,
              fontSize: '14px',
              transition: 'all .15s',
            }}>
              <span style={{ fontSize: '16px', lineHeight: 1 }}>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <Link href="/" target="_blank" style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px',
          borderRadius: '2px', textDecoration: 'none', color: 'rgba(255,255,255,.5)',
          fontSize: '13px', marginBottom: '4px',
        }}>
          <span>↗</span> View Website
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px',
          borderRadius: '2px', background: 'transparent', border: 'none',
          color: 'rgba(255,255,255,.5)', fontSize: '13px', cursor: 'pointer',
          width: '100%', textAlign: 'left',
        }}>
          <span>⎋</span> Sign Out
        </button>
      </div>
    </aside>
  );
}