import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getDashboardStats, getMessages } from '@/actions';

export default async function DashboardPage() {
  // ── Auth check ──────────────────────────────────────────────────────────
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  // ── Data ─────────────────────────────────────────────────────────────────
  const [stats, recentMessages] = await Promise.all([
    getDashboardStats(),
    getMessages(),
  ]);

  const recent = (recentMessages as any[]).slice(0, 5);

  const statCards = [
    { label: 'Programs',          value: stats.programs, icon: '📋', href: '/admin/programs', color: 'var(--g9)',  textColor: '#fff' },
    { label: 'Gallery Activities', value: stats.gallery,  icon: '🖼',  href: '/admin/gallery',  color: 'var(--g8)', textColor: '#fff' },
    { label: 'Team Members',      value: stats.team,     icon: '👥',  href: '/admin/team',     color: 'var(--g7)', textColor: '#fff' },
    { label: 'Messages',          value: stats.messages, icon: '✉',   href: '/admin/messages', color: 'var(--a5)', textColor: 'var(--g9)' },
    { label: 'Unread',            value: stats.unread,   icon: '🔔',  href: '/admin/messages',
      color:     stats.unread > 0 ? '#c0392b' : 'var(--paper)',
      textColor: stats.unread > 0 ? '#fff'    : 'var(--soft)',
    },
  ];

  const quickActions = [
    { label: 'Add Program',       href: '/admin/programs/new', icon: '＋' },
    { label: 'Upload to Gallery', href: '/admin/gallery/new',  icon: '↑' },
    { label: 'Add Team Member',   href: '/admin/team/new',     icon: '＋' },
    { label: 'View Messages',     href: '/admin/messages',     icon: '→' },
  ];

  return (
    <div>
      {/* ── Page header ── */}
      <div style={{ marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '8px' }}>
          — Admin / Dashboard
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 400, color: 'var(--g9)', letterSpacing: '-0.02em', margin: 0 }}>
          Welcome back<em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>.</em>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--soft)', marginTop: '6px' }}>
          SCWO Admin — Sindh Citizen Welfare Organization
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1px', background: 'var(--line)', borderRadius: '2px',
        overflow: 'hidden', marginBottom: '32px',
      }}>
        {statCards.map(({ label, value, icon, href, color, textColor }) => (
          <Link key={label} href={href} style={{
            background: color, padding: '28px 24px',
            textDecoration: 'none', display: 'block',
          }}>
            <div style={{ fontSize: '22px', marginBottom: '12px' }}>{icon}</div>
            <div style={{
              fontFamily: "'Fraunces', serif", fontSize: '40px',
              color: textColor, lineHeight: 1,
            }}>{value}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: textColor === '#fff' ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.45)',
              marginTop: '8px',
            }}>{label}</div>
          </Link>
        ))}
      </div>

      {/* ── Bottom grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Quick Actions */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)' }}>
              Quick Actions
            </span>
          </div>
          <style>{`
            .qa-link { background:#fff; padding:24px; display:flex; flex-direction:column; gap:8px; text-decoration:none; transition:background .15s; }
            .qa-link:hover { background:var(--paper); }
          `}</style>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--line)' }}>
            {quickActions.map(({ label, href, icon }) => (
              <Link key={label} href={href} className="qa-link">
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', color: 'var(--a5)' }}>{icon}</span>
                <span style={{ fontSize: '14px', color: 'var(--g9)', fontWeight: 600 }}>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            padding: '16px 24px', borderBottom: '1px solid var(--line)',
            background: 'var(--paper)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)' }}>
              Recent Messages
            </span>
            {stats.unread > 0 && (
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', background: '#c0392b', color: '#fff', padding: '2px 8px', borderRadius: '2px' }}>
                {stats.unread} unread
              </span>
            )}
          </div>

          {recent.length === 0 ? (
            <div style={{ padding: '32px 24px', textAlign: 'center', color: 'var(--soft)', fontSize: '13px' }}>
              No messages yet
            </div>
          ) : (
            recent.map((msg: any) => (
              <Link key={msg._id.toString()} href="/admin/messages" style={{
                display: 'flex', gap: '12px', padding: '14px 24px',
                borderBottom: '1px solid var(--line)', textDecoration: 'none',
                background: !msg.isRead ? 'rgba(212,160,23,.04)' : '#fff',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--g9)' }}>{msg.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--soft)', marginTop: '2px' }}>{msg.subject}</div>
                </div>
                {!msg.isRead && (
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--a5)', flexShrink: 0, marginTop: '4px' }} />
                )}
              </Link>
            ))
          )}

          <div style={{ padding: '12px 24px', borderTop: '1px solid var(--line)' }}>
            <Link href="/admin/messages" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--a5)', textDecoration: 'none',
            }}>
              View All Messages →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}