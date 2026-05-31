'use client';

import Link from 'next/link';
import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const presetAmounts = ['500', '1,000', '2,500', '5,000', '10,000', '25,000'];

export default function DonationCTA() {
  const [active, setActive] = useState('1,000');
  const [custom, setCustom] = useState('');

  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--a5)', padding: '80px 0' }}>
      {/* Watermark heart */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          right: -80,
          top: -160,
          fontSize: '500px',
          lineHeight: 1,
          color: 'var(--g9)',
          opacity: 0.06,
        }}
      >
        ♥
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">

          {/* LEFT — content */}
          <AnimatedSection>
            <div className="eyebrow" style={{ color: 'var(--g9)', opacity: 0.7 }}>Support Our Mission</div>
            <h2
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: 'clamp(40px, 5vw, 60px)',
                fontWeight: 400,
                color: 'var(--g9)',
                margin: '20px 0 24px',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Help us <em style={{ fontStyle: 'italic' }}>save lives</em>.
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--g8)', lineHeight: 1.75, marginBottom: '32px', maxWidth: '480px' }}>
              Your donation directly funds healthcare, education, women empowerment, legal aid,
              and social welfare programs for deserving communities across Sindh.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <Link href="/contact#donate" className="btn btn-dark btn-lg">
                Donate Now →
              </Link>
              <Link
                href="/contact"
                className="btn btn-outline btn-lg"
                style={{ borderColor: 'var(--g9)', color: 'var(--g9)' }}
              >
                Learn More
              </Link>
            </div>
          </AnimatedSection>

          {/* RIGHT — donation box */}
          <AnimatedSection delay={0.15}>
            <div style={{ background: 'var(--g9)', padding: '40px', borderRadius: '2px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--a4)',
                  marginBottom: '20px',
                }}
              >
                Choose an Amount (PKR)
              </div>

              {/* Amount pills — 3×2 grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setActive(amt); setCustom(''); }}
                    style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: '15px',
                      fontWeight: 500,
                      padding: '10px 8px',
                      border: '1px solid',
                      borderColor: active === amt && !custom ? 'var(--a5)' : 'rgba(255,255,255,.15)',
                      borderRadius: '2px',
                      background: active === amt && !custom ? 'var(--a5)' : 'rgba(255,255,255,.05)',
                      color: active === amt && !custom ? 'var(--g9)' : 'rgba(255,255,255,.75)',
                      cursor: 'pointer',
                      transition: 'all .2s',
                    }}
                  >
                    {amt}
                  </button>
                ))}
              </div>

              {/* Custom amount input */}
              <input
                type="text"
                placeholder="Or enter custom amount"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setActive(''); }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,.05)',
                  border: `1px solid ${custom ? 'var(--a5)' : 'rgba(255,255,255,.15)'}`,
                  borderRadius: '2px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  marginBottom: '20px',
                  fontFamily: 'var(--font-manrope), sans-serif',
                  boxSizing: 'border-box' as const,
                }}
              />

              {/* Donate button */}
              <Link
                href="/contact#donate"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', display: 'flex', fontSize: '15px', padding: '16px 24px' }}
              >
                Donate Now →
              </Link>

              {/* Footer note */}
              <p
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  color: 'rgba(255,255,255,.35)',
                  textAlign: 'center',
                  marginTop: '16px',
                  letterSpacing: '0.05em',
                }}
              >
                100% of your donation goes directly to programs
              </p>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
