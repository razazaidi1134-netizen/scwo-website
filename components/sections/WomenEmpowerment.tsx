'use client';

import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Users } from 'lucide-react';

const highlights = [
  'Sewing, embroidery & handicrafts vocational training',
  'Women Works Hub — beauty services, computer skills & entrepreneurship',
  'Support networks for financial independence',
  'Awareness programs to build confidence & capability',
];

const programs = [
  { num: '01', title: 'Industrial Homes', sub: 'Vocational Training', href: '/projects/industrial-homes' },
  { num: '02', title: 'Women Works Hub', sub: 'Skills & Careers',     href: '/projects/women-works-hub' },
];

export default function WomenEmpowerment() {
  return (
    <section style={{ background: 'var(--g9)', padding: '120px 0', color: '#fff', overflow: 'hidden' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">

          {/* Left — visual panel */}
          <AnimatedSection>
            <div style={{
              background: 'var(--g8)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '480px',
              border: '1px solid rgba(212,160,23,.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(10,46,30,.2) 0%, rgba(10,46,30,.9) 100%)',
                zIndex: 1,
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -60%)',
                opacity: 0.08,
                zIndex: 0,
              }}>
                <Users style={{ width: 120, height: 120, color: 'var(--a4)' }} />
              </div>
              <div style={{ position: 'relative', zIndex: 2, padding: '32px' }}>
                <div style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: 'var(--a4)',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>SCWO Women Programs</div>
                <div style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontStyle: 'italic',
                  fontSize: '18px',
                  color: 'rgba(255,255,255,.9)',
                  borderLeft: '2px solid var(--a5)',
                  paddingLeft: '14px',
                  lineHeight: 1.5,
                }}>
                  Empowering women — strengthening families and communities.
                </div>
              </div>
            </div>

            {/* Program chips */}
            <div className="grid grid-cols-2" style={{ gap: '1px', background: 'rgba(255,255,255,.08)', marginTop: '1px' }}>
              {programs.map(({ num, title, sub, href }) => (
                <Link key={title} href={href} style={{
                  background: 'var(--g8)',
                  padding: '24px 28px',
                  display: 'block',
                  textDecoration: 'none',
                  transition: 'background .2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--g7)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--g8)')}
                >
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--a4)', marginBottom: '6px' }}>{num}</div>
                  <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '16px', color: '#fff', marginBottom: '4px' }}>{title}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)' }}>{sub}</div>
                </Link>
              ))}
            </div>
          </AnimatedSection>

          {/* Right — content */}
          <AnimatedSection delay={0.15}>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>Women Empowerment</div>
            <h2 style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: 'clamp(36px, 4vw, 52px)',
              fontWeight: 400,
              color: '#fff',
              margin: '20px 0 24px',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              Building <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>independence</em> for women.
            </h2>

            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.7)', lineHeight: 1.8, marginBottom: '16px' }}>
              Through vocational training, practical skills development, and
              entrepreneurship opportunities, SCWO supports women in achieving
              financial independence and sustainable growth.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.6)', lineHeight: 1.75, marginBottom: '40px' }}>
              Our women-focused initiatives help deserving women gain confidence,
              develop valuable skills, and create better futures for themselves
              and their families.
            </p>

            {/* Highlights list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '40px' }}>
              {highlights.map((item, i) => (
                <div key={item} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,.04)',
                  borderLeft: '2px solid var(--a5)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '11px',
                    color: 'var(--a5)',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>0{i + 1}</span>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,.75)', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-3" style={{
              gap: '24px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,.1)',
              marginBottom: '40px',
            }}>
              {[
                { num: '2',       label: 'Women Programs' },
                { num: '100%',    label: 'Free Training' },
                { num: 'Karachi', label: 'Based In' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '28px', color: 'var(--a4)', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginTop: '6px' }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/projects/industrial-homes" className="btn btn-primary btn-lg">
                Industrial Homes →
              </Link>
              <Link href="/projects/women-works-hub" className="btn btn-outline btn-lg">
                Women Works Hub
              </Link>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
