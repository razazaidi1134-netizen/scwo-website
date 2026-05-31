'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

export default function MissionVision() {
  return (
    <section style={{ background: 'var(--paper)', padding: '120px 0' }}>
      <div className="container-custom">

        {/* Section header */}
        <AnimatedSection style={{ marginBottom: '64px' }}>
          <div className="eyebrow">Our Purpose</div>
          <h2 style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontSize: 'clamp(40px, 5vw, 54px)',
            fontWeight: 400,
            color: 'var(--g9)',
            margin: '20px 0 0',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            Mission &amp; <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>Vision</em>.
          </h2>
        </AnimatedSection>

        {/* Mission + Vision — stack on mobile, side-by-side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden', marginBottom: '1px' }}>

          {/* Mission */}
          <AnimatedSection delay={0.1} style={{ background: 'var(--g9)', padding: 'clamp(40px, 5vw, 56px) clamp(32px, 4vw, 48px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--a4)',
              marginBottom: '24px',
            }}>— 01 / MISSION</div>
            <h3 style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: '36px',
              fontWeight: 400,
              color: '#fff',
              marginBottom: '24px',
              lineHeight: 1.1,
            }}>
              What we <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>do</em>.
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.7)', lineHeight: 1.8, marginBottom: '16px' }}>
              Our mission is to serve humanity by providing healthcare support,
              educational opportunities, legal awareness, women empowerment
              initiatives, and social welfare services to deserving communities
              across Sindh.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.7)', lineHeight: 1.8 }}>
              We strive to create long-term social impact by supporting vulnerable
              families, empowering youth, and building stronger communities through
              compassion, awareness, and action.
            </p>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--a5)' }} />
          </AnimatedSection>

          {/* Vision */}
          <AnimatedSection delay={0.2} style={{ background: 'var(--cream)', padding: 'clamp(40px, 5vw, 56px) clamp(32px, 4vw, 48px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--a5)',
              marginBottom: '24px',
            }}>— 02 / VISION</div>
            <h3 style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: '36px',
              fontWeight: 400,
              color: 'var(--g9)',
              marginBottom: '24px',
              lineHeight: 1.1,
            }}>
              Where we&apos;re <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>going</em>.
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--soft)', lineHeight: 1.8, marginBottom: '16px' }}>
              Our vision is to empower the people of Sindh — especially the youth
              and underserved communities — to become builders of a better society
              guided by Faith, Unity, and Discipline.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--soft)', lineHeight: 1.8 }}>
              We envision a future where every individual has access to education,
              healthcare, legal support, and opportunities for personal and economic
              growth.
            </p>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--a5)' }} />
          </AnimatedSection>
        </div>

        {/* Core values — 1 col mobile, 3 col sm+ */}
        <AnimatedSection delay={0.3}>
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{
              gap: '1px',
              background: 'var(--line)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {[
              { num: '01', value: 'Faith',      sub: 'Unwavering belief in humanity' },
              { num: '02', value: 'Unity',      sub: 'Bringing communities together' },
              { num: '03', value: 'Discipline', sub: 'Accountability & transparency' },
            ].map(({ num, value, sub }) => (
              <div key={value} style={{
                background: 'var(--g9)',
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: 'var(--a4)',
                  textTransform: 'uppercase',
                }}>{num}</span>
                <span style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontSize: '32px',
                  fontWeight: 400,
                  color: '#fff',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}>{value}</span>
                <span style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,.5)',
                  lineHeight: 1.5,
                  marginTop: '4px',
                }}>{sub}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
