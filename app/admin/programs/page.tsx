import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getPrograms } from '@/actions/programs';
import ProgramActions from '@/components/admin/ProgramActions';

export default async function ProgramsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const programs = await getPrograms() as any[];

  return (
    <div>
      <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '8px' }}>— Admin / Programs</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 400, color: 'var(--g9)', letterSpacing: '-0.02em', margin: 0 }}>
            Programs <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>CMS</em>
          </h1>
        </div>
        <Link href="/admin/programs/new" className="btn btn-primary">＋ Add Program</Link>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 140px 100px 120px', background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
          {['Order', 'Program', 'Category', 'Status', 'Actions'].map((col, i) => (
            <div key={col} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', padding: '12px 16px', textAlign: i === 4 ? 'right' : 'left' as const }}>{col}</div>
          ))}
        </div>

        {programs.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--soft)' }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', marginBottom: '8px' }}>No programs yet</div>
            <Link href="/admin/programs/new" style={{ color: 'var(--a5)', textDecoration: 'none', fontSize: '13px' }}>Add your first program →</Link>
          </div>
        ) : (
          programs.map((prog) => (
            <div key={prog._id.toString()} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 140px 100px 120px', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
              <div style={{ padding: '16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--soft)' }}>{prog.displayOrder}</div>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{prog.icon}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--g9)' }}>{prog.title}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--soft)', marginTop: '2px' }}>/{prog.slug}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '16px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--paper)', color: 'var(--soft)', padding: '3px 8px', borderRadius: '2px' }}>Program</span>
              </div>
              <div style={{ padding: '16px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', background: prog.published ? 'var(--g9)' : 'var(--paper)', color: prog.published ? 'var(--a4)' : 'var(--soft)', padding: '3px 8px', borderRadius: '2px' }}>
                  {prog.published ? 'Live' : 'Draft'}
                </span>
              </div>
              <div style={{ padding: '16px', display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                <Link href={`/admin/programs/${prog._id}`} style={{ fontSize: '12px', color: 'var(--a5)', textDecoration: 'none', padding: '6px 12px', border: '1px solid var(--line)', borderRadius: '2px' }}>Edit</Link>
                <ProgramActions id={prog._id.toString()} published={prog.published} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}