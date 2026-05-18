import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getAllGalleryItems } from '@/actions';
import GalleryActions from '@/components/admin/GalleryActions';

export default async function GalleryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const items = await getAllGalleryItems() as any[];

  return (
    <div>
      <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '8px' }}>— Admin / Gallery</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 400, color: 'var(--g9)', letterSpacing: '-0.02em', margin: 0 }}>
            Gallery <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>Activities</em>
          </h1>
        </div>
        <Link href="/admin/gallery/new" className="btn btn-primary">＋ Add Activity</Link>
      </div>

      {items.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '2px', padding: '64px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', color: 'var(--g9)', marginBottom: '8px' }}>No gallery activities yet</div>
          <Link href="/admin/gallery/new" style={{ color: 'var(--a5)', textDecoration: 'none', fontSize: '13px' }}>Add your first activity →</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
          {items.map((item) => (
            <div key={item._id.toString()} style={{ background: '#fff', overflow: 'hidden' }}>
              <div style={{ height: '160px', background: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
                {item.featuredImage ? (
                  <Image src={item.featuredImage} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="400px" />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '32px', opacity: 0.3 }}>🖼</div>
                )}
                <span style={{
                  position: 'absolute', top: '10px', left: '10px', zIndex: 2,
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  background: item.published ? 'var(--a5)' : 'rgba(0,0,0,.5)',
                  color: item.published ? 'var(--g9)' : '#fff',
                  padding: '3px 8px', borderRadius: '2px',
                }}>{item.published ? 'Live' : 'Draft'}</span>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--g9)', marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--a5)', marginBottom: '4px' }}>{item.category}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--soft)' }}>
                  {item.location} · {item.images?.length || 0} images
                </div>
              </div>
              <div style={{ padding: '0 16px 16px', display: 'flex', gap: '6px' }}>
                <Link href={`/admin/gallery/${item._id}`} style={{ flex: 1, textAlign: 'center', padding: '8px', border: '1px solid var(--line)', borderRadius: '2px', fontSize: '12px', color: 'var(--a5)', textDecoration: 'none' }}>Edit</Link>
                <GalleryActions id={item._id.toString()} published={item.published} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}