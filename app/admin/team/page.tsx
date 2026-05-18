import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getAllTeamMembers } from '@/actions';
import { TeamActions } from '@/components/admin/GalleryActions';

export default async function TeamPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const members = await getAllTeamMembers() as any[];

  return (
    <div>
      <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '8px' }}>— Admin / Team</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 400, color: 'var(--g9)', letterSpacing: '-0.02em', margin: 0 }}>
            Team <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>Members</em>
          </h1>
        </div>
        <Link href="/admin/team/new" className="btn btn-primary">＋ Add Member</Link>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 180px 80px 160px', background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
          {['Photo', 'Member', 'Order', 'Status', 'Actions'].map((col, i) => (
            <div key={col} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', padding: '12px 16px', textAlign: i === 4 ? 'right' : 'left' as const }}>{col}</div>
          ))}
        </div>

        {members.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--soft)' }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', marginBottom: '8px' }}>No team members yet</div>
            <Link href="/admin/team/new" style={{ color: 'var(--a5)', textDecoration: 'none', fontSize: '13px' }}>Add first member →</Link>
          </div>
        ) : members.map((m) => (
          <div key={m._id.toString()} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 180px 80px 160px', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
            <div style={{ padding: '16px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--line)', background: 'var(--paper)' }}>
                {m.image
                  ? <Image src={m.image} alt={m.name} width={40} height={40} style={{ objectFit: 'cover' }} />
                  : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '18px' }}>👤</div>
                }
              </div>
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--g9)' }}>{m.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--soft)', marginTop: '2px' }}>{m.designation}</div>
            </div>
            <div style={{ padding: '16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--soft)' }}>
              Order: {m.displayOrder}
            </div>
            <div style={{ padding: '16px' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', background: m.published ? 'var(--g9)' : 'var(--paper)', color: m.published ? 'var(--a4)' : 'var(--soft)', padding: '3px 8px', borderRadius: '2px' }}>
                {m.published ? 'Live' : 'Draft'}
              </span>
            </div>
            <div style={{ padding: '16px', display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
              <Link href={`/admin/team/${m._id}`} style={{ fontSize: '12px', color: 'var(--a5)', textDecoration: 'none', padding: '6px 12px', border: '1px solid var(--line)', borderRadius: '2px' }}>Edit</Link>
              <TeamActions id={m._id.toString()} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}