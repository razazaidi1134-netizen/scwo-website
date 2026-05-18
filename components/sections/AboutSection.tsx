'use client';

import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

const pillars = [
  { num: '7',      label: 'Active Programs' },
  { num: '2024',   label: 'Established' },
  { num: 'Sindh',  label: 'Coverage Area' },
];

export default function AboutSection() {
  return (
    <section style={{ background: 'var(--cream)', padding: '120px 0' }}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-24 items-start">

          {/* ── Left: sticky headline ── */}
          <AnimatedSection>
            <div className="lg:sticky lg:top-28">
              <div className="eyebrow">Who We Are</div>
              <h2
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: 'clamp(36px, 4.5vw, 54px)',
                  fontWeight: 400,
                  margin: '24px 0 32px',
                  color: 'var(--g9)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                A mission rooted in <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>compassion</em>.
              </h2>

              {/* Blockquote */}
              <p
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontStyle: 'italic',
                  fontSize: 21,
                  lineHeight: 1.55,
                  color: 'var(--g8)',
                  borderLeft: '3px solid var(--a5)',
                  paddingLeft: 24,
                  marginBottom: 32,
                }}
              >
                "Every citizen of Sindh deserves to live with dignity, opportunity, and hope."
              </p>

              <Link href="/about" className="btn btn-green">
                Learn More About SCWO →
              </Link>

              {/* Pillars */}
              <div
                className="grid grid-cols-3 gap-5 mt-12 pt-10"
                style={{ borderTop: '1px solid var(--line)' }}
              >
                {pillars.map((p) => (
                  <div key={p.label}>
                    <div
                      style={{
                        fontFamily: 'Fraunces, serif',
                        fontSize: 48,
                        color: 'var(--a5)',
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      {p.num}
                    </div>
                    <div
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--g8)',
                        fontWeight: 600,
                      }}
                    >
                      {p.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* ── Right: body copy ── */}
          <AnimatedSection delay={0.15}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--soft)', marginBottom: 24 }}>
              Sindh Citizen Welfare Organization (SCWO) is a non-profit humanitarian organization
              established in 2024 with a clear mission: to serve humanity and uplift underprivileged
              communities across Sindh, Pakistan. From Karachi's urban neighborhoods to rural corners
              of the province, SCWO brings essential services directly to those who need them most.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--soft)', marginBottom: 24 }}>
              Led by President Nadia Bano, the organization runs seven structured welfare programs
              covering healthcare, education, food relief, women empowerment, legal aid, flood response,
              and social welfare. Each program is designed not just to address immediate needs, but to
              create lasting, sustainable change in the communities it serves.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--soft)', marginBottom: 48 }}>
              SCWO operates under the guiding principles of Faith, Unity, and Discipline — believing
              that sustainable community development begins with compassion, opportunity, and equal
              access to essential services. Under Nadia Bano's stewardship, SCWO has become one of
              Karachi's most trusted community welfare organizations.
            </p>

            {/* Fact rows */}
            <div
              style={{
                border: '1px solid var(--line)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              {[
                { label: 'Established',      value: '2024' },
                { label: 'Headquarters',     value: 'Karachi, Pakistan' },
                { label: 'Active Programs',  value: '7 Welfare Programs' },
                { label: 'Led By',           value: 'President Nadia Bano' },
                { label: 'Coverage',         value: 'Sindh Province' },
                { label: 'Core Principles',  value: 'Faith · Unity · Discipline' },
              ].map((fact, i, arr) => (
                <div
                  key={fact.label}
                  className="flex justify-between items-center px-6 py-4"
                  style={{
                    borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
                    background: i % 2 === 0 ? '#fff' : 'var(--paper)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--soft)',
                    }}
                  >
                    {fact.label}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
                    {fact.value}
                  </span>
                </div>
              ))}

              {/* Guiding principle footer */}
              <div
                className="px-6 py-5 text-center"
                style={{ background: 'var(--g9)' }}
              >
                <p
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    color: 'var(--a4)',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  Guiding Principle
                </p>
                <p
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontStyle: 'italic',
                    fontSize: 18,
                    color: '#fff',
                    fontWeight: 400,
                  }}
                >
                  "Humanity Comes First"
                </p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}