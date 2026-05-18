import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProgramBySlug } from '@/actions/programs';
import ProgramForm from '@/components/admin/ProgramForm';
import { connectDB } from '@/lib/mongodb';
import { Program } from '@/models';

interface Props { params: { id: string } }

export default async function ProgramEditPage({ params }: Props) {
  const isNew = params.id === 'new';
  let program = null;

  if (!isNew) {
    await connectDB();
    const doc = await Program.findById(params.id).lean() as any;
    if (!doc) notFound();
    program = { ...doc, _id: doc._id.toString() };
  }

  return (
    <div>
      <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '8px' }}>
            — Admin / Programs / {isNew ? 'New' : 'Edit'}
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '32px', fontWeight: 400, color: 'var(--g9)', letterSpacing: '-0.02em', margin: 0 }}>
            {isNew ? 'New Program' : `Edit: ${program?.title}`}
          </h1>
        </div>
        <Link href="/admin/programs" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--soft)', textDecoration: 'none' }}>
          ← Back
        </Link>
      </div>
      <ProgramForm program={program} />
    </div>
  );
}