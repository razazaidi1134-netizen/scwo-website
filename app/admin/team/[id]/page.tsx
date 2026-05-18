import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { TeamMember } from '@/models';
import TeamForm from '@/components/admin/TeamForm';

export default async function TeamEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  let member = null;
  if (!isNew) {
    await connectDB();
    const doc = await TeamMember.findById(params.id).lean() as any;
    if (!doc) notFound();
    member = { ...doc, _id: doc._id.toString() };
  }
  return (
    <div>
      <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '8px' }}>— Admin / Team / {isNew ? 'New' : 'Edit'}</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '32px', fontWeight: 400, color: 'var(--g9)', letterSpacing: '-0.02em', margin: 0 }}>
            {isNew ? 'Add Team Member' : `Edit: ${member?.name}`}
          </h1>
        </div>
        <Link href="/admin/team" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--soft)', textDecoration: 'none' }}>← Back</Link>
      </div>
      <TeamForm member={member} />
    </div>
  );
}