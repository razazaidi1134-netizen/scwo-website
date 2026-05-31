import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getGalleryItemBySlug } from '@/actions';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = await getGalleryItemBySlug(params.slug) as any;
  if (!item) return {};
  return {
    title: `${item.title} | SCWO Activities`,
    description: item.description || `${item.category} activity by SCWO in ${item.location}.`,
    openGraph: {
      title: `${item.title} | SCWO Activities`,
      description: item.description || `${item.category} activity by SCWO in ${item.location}.`,
      url: `https://sindhcitizenwelfare.org/gallery/${item.slug}`,
      images: item.featuredImage ? [{ url: item.featuredImage, width: 1200, height: 630 }] : undefined,
    },
  };
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-PK', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default async function GalleryDetailPage({ params }: { params: { slug: string } }) {
  const item = await getGalleryItemBySlug(params.slug) as any;
  if (!item) notFound();

  // featuredImage first, then remaining images (deduplicated)
  const allImages: string[] = [
    ...(item.featuredImage ? [item.featuredImage] : []),
    ...(item.images ?? []).filter((img: string) => img !== item.featuredImage),
  ];

  return (
    <div>
      {/* ── HERO ── */}
      <div style={{ background: 'var(--g9)', color: '#fff', padding: '100px 0 120px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 30%, rgba(212,160,23,.12) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div className="container-custom" style={{ position: 'relative' }}>
          <Link href="/gallery" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-mono), monospace', fontSize: '11px',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.45)', textDecoration: 'none',
            marginBottom: '40px',
          }}>
            ← All Activities
          </Link>

          {/* Category badge */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{
              fontFamily: 'var(--font-mono), monospace', fontSize: '9px',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: 'var(--a5)', color: 'var(--g9)',
              padding: '4px 12px', borderRadius: '2px',
            }}>
              {item.category}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-0.03em', margin: '0 0 24px',
          }}>
            {item.title}
          </h1>

          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: 'rgba(255,255,255,.5)', letterSpacing: '0.1em' }}>
              📍 {item.location}
            </span>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: 'rgba(255,255,255,.5)', letterSpacing: '0.1em' }}>
              📅 {formatDate(item.eventDate)}
            </span>
            {allImages.length > 0 && (
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: 'rgba(255,255,255,.5)', letterSpacing: '0.1em' }}>
                🖼 {allImages.length} {allImages.length === 1 ? 'photo' : 'photos'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section style={{ background: 'var(--cream)', padding: '80px 0 120px' }}>
        <div className="container-custom">

          {/* Description block */}
          {item.description && (
            <div style={{
              background: '#fff', border: '1px solid var(--line)', borderRadius: '2px',
              padding: 'clamp(24px, 4vw, 40px) clamp(24px, 4vw, 44px)',
              marginBottom: '48px', position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--a5)', borderRadius: '2px 0 0 2px' }} />
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '12px' }}>
                About This Activity
              </div>
              <p style={{ fontSize: '16px', color: 'var(--soft)', lineHeight: 1.8, margin: 0 }}>
                {item.description}
              </p>
            </div>
          )}

          {/* Details sidebar strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden', marginBottom: '48px' }}>
            {[
              { label: 'Category', value: item.category },
              { label: 'Location', value: item.location },
              { label: 'Date',     value: formatDate(item.eventDate) },
              { label: 'Photos',   value: `${allImages.length} images` },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: '#fff', padding: '16px 24px', flex: '1 1 160px' }}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '4px' }}>
                  {label}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--g9)' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Image grid */}
          {allImages.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: '4px' }}
            >
              {allImages.map((src: string, i: number) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    paddingBottom: '66%',
                    overflow: 'hidden',
                    background: 'var(--paper)',
                    borderRadius: '2px',
                  }}
                >
                  <Image
                    src={src}
                    alt={`${item.title} — photo ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '2px', padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.25 }}>🖼</div>
              <p style={{ color: 'var(--soft)', fontSize: '14px' }}>No photos available for this activity.</p>
            </div>
          )}

          {/* Back link */}
          <div style={{ marginTop: '64px', paddingTop: '40px', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <Link href="/gallery" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'var(--font-mono), monospace', fontSize: '11px',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--a5)', textDecoration: 'none',
            }}>
              ← Back to All Activities
            </Link>
            <Link href="/contact#donate" className="btn btn-primary">
              Support SCWO →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
