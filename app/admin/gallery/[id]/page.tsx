// ─── app/admin/gallery/[id]/page.tsx ────────────────────────────────────
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Gallery } from '@/models';
import GalleryForm from '@/components/admin/GalleryForm';

export async function GalleryEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  let item = null;
  if (!isNew) {
    await connectDB();
    const doc = await Gallery.findById(params.id).lean() as any;
    if (!doc) notFound();
    item = { ...doc, _id: doc._id.toString() };
  }
  return (
    <div>
      <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '8px' }}>— Admin / Gallery / {isNew ? 'New' : 'Edit'}</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '32px', fontWeight: 400, color: 'var(--g9)', letterSpacing: '-0.02em', margin: 0 }}>
            {isNew ? 'New Activity' : `Edit: ${item?.title}`}
          </h1>
        </div>
        <Link href="/admin/gallery" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--soft)', textDecoration: 'none' }}>← Back</Link>
      </div>
      <GalleryForm item={item} />
    </div>
  );
}

export default GalleryEditPage;