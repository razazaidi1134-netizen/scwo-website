'use client';

import Link from 'next/link';
import AnimatedSection, { AnimatedStagger, StaggerItem } from '@/components/ui/AnimatedSection';

const roles = [
  {
    num: '01',
    emoji: '🤝',
    title: 'Welfare Activities',
    desc: 'Join our field teams in food drives, healthcare camps, and community support programs across Sindh.',
  },
  {
    num: '02',
    emoji: '📢',
    title: 'Awareness Campaigns',
    desc: 'Help spread awareness about SCWO programs and humanitarian initiatives through outreach and events.',
  },
  {
    num: '03',
    emoji: '🌱',
    title: 'Community Development',
    desc: 'Contribute to long-term development programs that uplift underprivileged communities and create lasting change.',
  },
];

export default function VolunteerSection() {
  return (
    <section style={{ background: 'var(--cream)', padding: '120px 64px' }}>
      <div className="container-custom">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '80px', alignItems: 'start' }}>

          {/* Left — sticky headline + CTA */}
          <AnimatedSection style={{ position: 'sticky', top: '100px' }}>
            <div className="eyebrow">Get Involved</div>
            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 'clamp(40px, 4.5vw, 52px)',
              fontWeight: 400,
              color: 'var(--g9)',
              margin: '20px 0 24px',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              Become a <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>Volunteer</em>.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--soft)', lineHeight: 1.8, marginBottom: '16px', maxWidth: '420px' }}>
              Join SCWO in making a meaningful impact across Sindh. Volunteers play an
              important role in supporting humanitarian activities, awareness campaigns,
              welfare initiatives, and community development programs.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--soft)', lineHeight: 1.75, marginBottom: '40px', maxWidth: '420px' }}>
              Together, we can bring hope, support, and opportunity to deserving communities.
            </p>

            {/* Stat pills */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', paddingTop: '32px', borderTop: '1px solid var(--line)' }}>
              {[
                { num: '7', label: 'Active Programs' },
                { num: '2024', label: 'Est.' },
                { num: 'Sindh', label: 'Coverage' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: '28px', color: 'var(--a5)', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--g8)', marginTop: '4px' }}>{label}</div>
                </div>
              ))}
            </div>

            <Link href="/contact" className="btn btn-primary btn-lg">
              Join as Volunteer →
            </Link>
          </AnimatedSection>

          {/* Right — role cards */}
          <AnimatedStagger style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
            {roles.map(({ num, emoji, title, desc }) => (
              <StaggerItem key={title}>
                <div style={{
                  background: '#fff',
                  padding: '36px 40px',
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                  transition: 'background .2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--paper)')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                >
                  {/* Number + emoji */}
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      color: 'var(--a5)',
                    }}>{num}</span>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      background: 'var(--a1)',
                      borderRadius: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                    }}>{emoji}</div>
                  </div>

                  {/* Text */}
                  <div>
                    <h4 style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: '20px',
                      fontWeight: 500,
                      color: 'var(--g9)',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                    }}>{title}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--soft)', lineHeight: 1.7 }}>{desc}</p>
                  </div>

                  {/* Arrow */}
                  <div style={{ marginLeft: 'auto', color: 'var(--a5)', fontSize: '18px', flexShrink: 0, marginTop: '4px' }}>→</div>
                </div>
              </StaggerItem>
            ))}

            {/* CTA row */}
            <div style={{
              background: 'var(--g9)',
              padding: '28px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <span style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic',
                fontSize: '18px',
                color: 'rgba(255,255,255,.8)',
              }}>Ready to make a difference?</span>
              <Link href="/contact" className="btn btn-primary">
                Apply Now →
              </Link>
            </div>
          </AnimatedStagger>

        </div>
      </div>
    </section>
  );
}