import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getGalleryItems } from '@/actions';
import GalleryFilters from './GalleryFilters';

export const metadata: Metadata = {
  title: 'Our Activities | SCWO Gallery',
  description: 'Explore SCWO humanitarian activities — healthcare camps, education programs, women empowerment, food distribution, and community events across Sindh.',
  openGraph: {
    title: 'Our Activities | SCWO Gallery',
    description: 'Explore SCWO activities across Sindh — healthcare, education, women empowerment, and community welfare.',
    url: 'https://sindhcitizenwelfare.org/gallery',
  },
};

const categoryIcons: Record<string, string> = {
  'Healthcare Activities': '🏥',
  'Education Programs': '🎓',
  'Women Empowerment': '👩‍💼',
  'Volunteer Work': '🤝',
  'Food Distribution': '🍱',
  'Ambulance Services': '🚑',
  'Community Events': '🌍',
  'Legal Aid Camps': '⚖️',
};

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-PK', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const items = await getGalleryItems(category) as any[];

  return (
    <div>
      {/* ── HERO ── */}
      <div style={{ background: 'var(--g9)', color: '#fff', padding: '100px 0 120px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 30%, rgba(212,160,23,.12) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div className="container-custom" style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>Gallery</div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.03em', margin: '20px 0 24px' }}>
            Our <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>Activities</em>.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.7)', maxWidth: '520px', lineHeight: 1.65 }}>
            Moments from SCWO humanitarian activities, community events, and welfare programs across Sindh.
          </p>
          <div style={{ display: 'flex', gap: '48px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,.1)', flexWrap: 'wrap' }}>
            {[
              { label: 'Programs', value: '07 Active' },
              { label: 'Coverage', value: 'Sindh' },
              { label: 'Since',    value: '2024' },
            ].map(({ label, value }) => (
              <div key={label}>
                <small style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--a4)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
                  {label}
                </small>
                <strong style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '18px', fontWeight: 500 }}>
                  {value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section style={{ background: 'var(--cream)', padding: '80px 0 120px' }}>
        <div className="container-custom">

          {/* Category filter */}
          <GalleryFilters active={category} />

          {/* Empty state */}
          {items.length === 0 ? (
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '2px', padding: '80px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📷</div>
              <h2 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '28px', fontWeight: 400, color: 'var(--g9)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                No activities yet
              </h2>
              <p style={{ color: 'var(--soft)', fontSize: '15px', lineHeight: 1.7 }}>
                {category
                  ? `No published activities in "${category}" yet. Try another category.`
                  : 'No published activities yet. Check back soon.'}
              </p>
              {category && (
                <Link href="/gallery" style={{ display: 'inline-block', marginTop: '20px', color: 'var(--a5)', fontSize: '13px', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.1em' }}>
                  ← View all activities
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Result count */}
              <div style={{ marginBottom: '24px', fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: 'var(--soft)', letterSpacing: '0.1em' }}>
                {items.length} {items.length === 1 ? 'activity' : 'activities'}
                {category ? ` in "${category}"` : ''}
              </div>

              {/* Grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gap: '1px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}
              >
                {items.map((item) => (
                  <Link
                    key={item._id.toString()}
                    href={`/gallery/${item.slug}`}
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#fff', transition: 'background .2s' }}
                  >
                    {/* Featured image */}
                    <div style={{ height: '220px', background: 'var(--paper)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                      {item.featuredImage ? (
                        <Image
                          src={item.featuredImage}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '56px', opacity: 0.2 }}>
                          {categoryIcons[item.category] ?? '📷'}
                        </div>
                      )}
                      {/* Category badge */}
                      <span style={{
                        position: 'absolute', top: '12px', left: '12px', zIndex: 2,
                        fontFamily: 'var(--font-mono), monospace', fontSize: '9px',
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        background: 'var(--a5)', color: 'var(--g9)',
                        padding: '3px 10px', borderRadius: '2px',
                      }}>
                        {item.category}
                      </span>
                      {/* Photo count */}
                      {item.images?.length > 0 && (
                        <span style={{
                          position: 'absolute', top: '12px', right: '12px', zIndex: 2,
                          fontFamily: 'var(--font-mono), monospace', fontSize: '9px',
                          letterSpacing: '0.08em',
                          background: 'rgba(0,0,0,.55)', color: '#fff',
                          padding: '3px 8px', borderRadius: '2px',
                        }}>
                          {item.images.length} photos
                        </span>
                      )}
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: '18px', fontWeight: 500, color: 'var(--g9)',
                        marginBottom: '14px', lineHeight: 1.3, letterSpacing: '-0.01em',
                      }}>
                        {item.title}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto' }}>
                        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--soft)' }}>
                          📍 {item.location}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--soft)' }}>
                          📅 {formatDate(item.eventDate)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
