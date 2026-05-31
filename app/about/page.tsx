import type { Metadata } from 'next';
import AnimatedSection, { AnimatedStagger, StaggerItem } from '@/components/ui/AnimatedSection';
import DonationCTA from '@/components/sections/DonationCTA';

export const metadata: Metadata = {
  title: 'About SCWO | Sindh Citizen Welfare Organization Pakistan',
  description: 'Learn about Sindh Citizen Welfare Organization (SCWO), a humanitarian NGO serving communities across Sindh through healthcare, education, welfare, and empowerment programs.',
  openGraph: {
    title: 'About SCWO | Sindh Citizen Welfare Organization Pakistan',
    description: 'Learn about Sindh Citizen Welfare Organization (SCWO), a humanitarian NGO serving communities across Sindh.',
    url: 'https://sindhcitizenwelfare.org/about',
  },
};

const values = [
  { num: '01', title: 'Faith',      desc: 'Unwavering belief in humanity and the power of compassion to transform lives and communities across Sindh.' },
  { num: '02', title: 'Unity',      desc: 'Bringing communities together, transcending barriers of class, ethnicity, and geography.' },
  { num: '03', title: 'Discipline', desc: 'Operating with accountability, transparency, and unwavering commitment to our humanitarian mission.' },
];

const whyChoose = [
  'Community-focused humanitarian mission',
  'Multiple welfare programs across Sindh',
  'Commitment to women empowerment and education',
  'Dedicated healthcare and emergency support initiatives',
  'Transparent and compassionate welfare approach',
  'Focus on sustainable social impact',
];

const orgFacts = [
  { label: 'Founded',           value: '2024' },
  { label: 'Headquarters',      value: 'Karachi, Pakistan' },
  { label: 'Welfare Programs',  value: '7 Active Programs' },
  { label: 'Coverage',          value: 'Sindh Province' },
  { label: 'Guiding Principle', value: 'Humanity Comes First' },
];

export default function AboutPage() {
  return (
    <div>

      {/* ── HERO ── */}
      <div style={{ background: 'var(--g9)', color: '#fff', padding: '100px 0 120px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 30%, rgba(212,160,23,.13) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div className="container-custom" style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>About SCWO</div>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            margin: '20px 0 24px',
          }}>
            Serving humanity<br />
            across <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>Sindh</em>.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.7)', maxWidth: '520px', lineHeight: 1.65 }}>
            A non-profit humanitarian organization committed to serving underprivileged communities through
            healthcare, education, women empowerment, legal aid, and social welfare.
          </p>
          {/* Meta strip */}
          <div style={{ display: 'flex', gap: '48px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,.1)', flexWrap: 'wrap' }}>
            {[{ label: 'Est.', value: '2024' }, { label: 'Programs', value: '7 Active' }, { label: 'Province', value: 'Sindh' }].map(({ label, value }) => (
              <div key={label}>
                <small style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.15em', color: 'var(--a4)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>{label}</small>
                <strong style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 500 }}>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHO WE ARE ── */}
      <section style={{ background: 'var(--cream)', padding: '120px 0' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 items-start">
            <AnimatedSection className="lg:sticky lg:top-[100px]">
              <div className="eyebrow">Who We Are</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 400, color: 'var(--g9)', margin: '20px 0 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                A mission rooted in <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>compassion</em>.
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p style={{ fontSize: '16px', color: 'var(--soft)', lineHeight: 1.85, marginBottom: '24px' }}>
                Sindh Citizen Welfare Organization (SCWO) is a non-profit humanitarian organization established
                in 2024 with a mission to serve humanity and uplift underprivileged communities across Sindh,
                Pakistan.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--soft)', lineHeight: 1.85, marginBottom: '24px' }}>
                Led by President Nadia Bano, SCWO works across multiple welfare sectors including healthcare,
                education, women empowerment, legal awareness, and social welfare support. The organization
                believes that sustainable community development begins with compassion, opportunity, and access
                to essential services.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--soft)', lineHeight: 1.85 }}>
                SCWO operates under the guiding principles of Faith, Unity, and Discipline — empowering
                communities to build a stronger and more responsible society.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section style={{ background: 'var(--paper)', padding: '120px 0' }}>
        <div className="container-custom">
          <AnimatedSection style={{ marginBottom: '64px' }}>
            <div className="eyebrow">Our Purpose</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(36px, 4vw, 54px)', fontWeight: 400, color: 'var(--g9)', margin: '20px 0 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Mission &amp; <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>Vision</em>.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden', marginBottom: '1px' }}>
            {/* Mission */}
            <AnimatedSection delay={0.1} style={{ background: 'var(--g9)', padding: 'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--a5)' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a4)', marginBottom: '24px' }}>— 01 / MISSION</div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '34px', fontWeight: 400, color: '#fff', marginBottom: '24px', lineHeight: 1.1 }}>
                What we <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>do</em>.
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.7)', lineHeight: 1.8, marginBottom: '16px' }}>
                To serve humanity by providing healthcare support, educational opportunities, legal awareness,
                women empowerment initiatives, and social welfare services to deserving communities across Sindh.
              </p>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.7)', lineHeight: 1.8 }}>
                We strive to create long-term social impact by supporting vulnerable families, empowering youth,
                and building stronger communities through compassion, awareness, and action.
              </p>
            </AnimatedSection>
            {/* Vision */}
            <AnimatedSection delay={0.2} style={{ background: 'var(--cream)', padding: 'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--a5)' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '24px' }}>— 02 / VISION</div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '34px', fontWeight: 400, color: 'var(--g9)', marginBottom: '24px', lineHeight: 1.1 }}>
                Where we&apos;re <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>going</em>.
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--soft)', lineHeight: 1.8, marginBottom: '16px' }}>
                To empower the people of Sindh — especially the youth and underserved communities — to become
                builders of a better society guided by Faith, Unity, and Discipline.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--soft)', lineHeight: 1.8 }}>
                We envision a future where every individual has access to education, healthcare, legal support,
                and opportunities for personal and economic growth.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section style={{ background: 'var(--cream)', padding: '120px 0' }}>
        <div className="container-custom">
          <AnimatedSection style={{ marginBottom: '64px' }}>
            <div className="eyebrow">Guiding Principles</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(36px, 4vw, 54px)', fontWeight: 400, color: 'var(--g9)', margin: '20px 0 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Our core <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>values</em>.
            </h2>
          </AnimatedSection>
          <AnimatedStagger className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '1px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
            {values.map(({ num, title, desc }) => (
              <StaggerItem key={title}>
                <div style={{ background: 'var(--g9)', padding: '48px 36px', height: '100%' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.15em', color: 'var(--a4)', textTransform: 'uppercase' }}>{num}</span>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 400, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em', margin: '12px 0 16px' }}>{title}</div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </AnimatedStagger>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section style={{ background: 'var(--g9)', padding: '120px 0', color: '#fff' }}>
        <div className="container-custom">
          <AnimatedSection style={{ marginBottom: '64px' }}>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>Leadership</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(36px, 4vw, 54px)', fontWeight: 400, margin: '20px 0 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              A leader driven by <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>purpose</em>.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20 items-start">
              {/* Fact table */}
              <div style={{ border: '1px solid rgba(212,160,23,.2)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--a5)', padding: '20px 24px' }}>
                  <strong style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', color: 'var(--g9)' }}>Nadia Bano</strong>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', color: 'var(--g8)', textTransform: 'uppercase', marginTop: '4px' }}>President &amp; Co-Founder · SCWO</div>
                </div>
                {orgFacts.map(({ label, value }, i) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 24px', background: i % 2 === 0 ? 'rgba(255,255,255,.03)' : 'rgba(255,255,255,.06)', borderBottom: i < orgFacts.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,.4)', textTransform: 'uppercase' }}>{label}</span>
                    <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
                <div style={{ background: 'var(--g8)', padding: '14px 24px', textAlign: 'center' }}>
                  <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '14px', color: 'var(--a4)' }}>Humanity Comes First</span>
                </div>
              </div>
              {/* Bio */}
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', letterSpacing: '0.12em', color: 'var(--a4)', marginBottom: '28px', textTransform: 'uppercase' }}>
                  President &amp; Co-Founder — Sindh Citizen Welfare Organization
                </div>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.75)', lineHeight: 1.8, marginBottom: '20px' }}>
                  Nadia Bano is the visionary President and Co-Founder of Sindh Citizen Welfare Organization.
                  With deep roots in Karachi&apos;s communities, she has dedicated herself to transforming the
                  lives of Sindh&apos;s most vulnerable citizens through organized, transparent, and sustainable
                  welfare programs.
                </p>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.75)', lineHeight: 1.8, marginBottom: '20px' }}>
                  Her leadership has guided SCWO from its founding vision to a fully operational organization
                  running seven active programs across Sindh — touching thousands of lives through healthcare,
                  education, food relief, women empowerment, legal aid, flood response, and social welfare.
                </p>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.75)', lineHeight: 1.8 }}>
                  Nadia Bano&apos;s philosophy is rooted in the belief that compassion must be paired with action,
                  and that every citizen of Sindh deserves to live with dignity, opportunity, and hope.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHY SCWO ── */}
      <section style={{ background: 'var(--paper)', padding: '120px 0' }}>
        <div className="container-custom">
          <AnimatedSection style={{ marginBottom: '64px' }}>
            <div className="eyebrow">Why Choose SCWO</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(36px, 4vw, 54px)', fontWeight: 400, color: 'var(--g9)', margin: '20px 0 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Our commitment <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>to you</em>.
            </h2>
          </AnimatedSection>
          <AnimatedStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
            {whyChoose.map((item, i) => (
              <StaggerItem key={item}>
                <div style={{ background: '#fff', padding: '32px 28px', display: 'flex', gap: '16px', alignItems: 'flex-start', height: '100%' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--a5)', flexShrink: 0, marginTop: '2px' }}>0{i + 1}</span>
                  <span style={{ fontSize: '15px', color: 'var(--g8)', lineHeight: 1.65, fontWeight: 500 }}>{item}</span>
                </div>
              </StaggerItem>
            ))}
          </AnimatedStagger>
        </div>
      </section>

      <DonationCTA />
    </div>
  );
}
