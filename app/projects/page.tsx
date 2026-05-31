import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimatedStagger, StaggerItem } from '@/components/ui/AnimatedSection';
import AnimatedSection from '@/components/ui/AnimatedSection';
import DonationCTA from '@/components/sections/DonationCTA';

export const metadata: Metadata = {
  title: 'Our Programs | SCWO Welfare Programs Across Sindh',
  description: 'Explore SCWO humanitarian programs including ambulance services, education, women empowerment, legal aid, and social welfare initiatives across Sindh.',
  openGraph: {
    title: 'Our Programs | SCWO Welfare Programs Across Sindh',
    description: 'Explore SCWO humanitarian programs — healthcare, education, women empowerment, legal aid, and welfare across Sindh.',
    url: 'https://sindhcitizenwelfare.org/projects',
  },
};

const programs = [
  { num: '01', emoji: '🏥', slug: 'ambulance-health',    title: 'Ambulance & Health Services', category: 'Healthcare',         desc: 'Emergency healthcare support and ambulance services for underprivileged communities across Sindh.',        keywords: 'ambulance services Karachi · healthcare NGO Pakistan · emergency welfare Sindh' },
  { num: '02', emoji: '🎓', slug: 'educational-centers', title: 'Educational Centers',          category: 'Education',          desc: 'Educational support programs for deserving students and underprivileged communities across Sindh.',        keywords: 'education NGO Karachi · student support Sindh · welfare education Pakistan' },
  { num: '03', emoji: '💻', slug: 'computer-training',   title: 'Computer Training Centers',    category: 'Digital Skills',     desc: 'Digital skills and computer education programs for students and youth seeking modern employment.',         keywords: 'computer training Karachi · digital skills Pakistan · youth empowerment NGO' },
  { num: '04', emoji: '✂️', slug: 'industrial-homes',    title: 'Industrial Homes for Women',   category: 'Women Empowerment',  desc: 'Vocational training programs helping women achieve financial independence through sewing and handicrafts.',  keywords: 'women empowerment NGO Pakistan · vocational training Karachi · sewing training Sindh' },
  { num: '05', emoji: '👩‍💼',slug: 'women-works-hub',    title: 'Women Works Hub',              category: 'Women Empowerment',  desc: 'Practical skill-building programs for women seeking employment or entrepreneurship opportunities.',         keywords: 'women employment Pakistan · women skills training Karachi · NGO for women' },
  { num: '06', emoji: '⚖️', slug: 'legal-aid-hub',       title: 'Legal Aid Hub',                category: 'Legal Aid',          desc: 'Legal awareness and free advisory support for underprivileged communities across Sindh.',                 keywords: 'legal aid NGO Pakistan · legal awareness Karachi · welfare legal services Sindh' },
  { num: '07', emoji: '🤝', slug: 'social-welfare',      title: 'Social Welfare Services',      category: 'Social Welfare',     desc: 'Support services for widows, orphans, students, elderly citizens, and deserving families.',               keywords: 'social welfare organization Karachi · charity support Sindh · humanitarian NGO Pakistan' },
];

export default function ProjectsPage() {
  return (
    <div>
      <style>{`
        .prog-card-link { background:var(--g9); display:flex; flex-direction:column; text-decoration:none; padding:36px 28px 28px; min-height:280px; transition:background .3s; height:100%; }
        .prog-card-link:hover { background:var(--g8); }
      `}</style>

      {/* ── HERO ── */}
      <div style={{ background: 'var(--g9)', color: '#fff', padding: '100px 0 120px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 30%, rgba(212,160,23,.12) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div className="container-custom" style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>What We Do</div>
          <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.03em', margin: '20px 0 24px' }}>
            Seven pillars of <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>impact</em>.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.7)', maxWidth: '520px', lineHeight: 1.65 }}>
            SCWO operates seven humanitarian programs designed to support communities across Sindh through
            healthcare, education, women empowerment, legal aid, and social welfare services.
          </p>
          <div style={{ display: 'flex', gap: '48px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,.1)', flexWrap: 'wrap' }}>
            {[{ label: 'Programs', value: '07 Active' }, { label: 'Coverage', value: 'Sindh' }, { label: 'Since', value: '2024' }].map(({ label, value }) => (
              <div key={label}>
                <small style={{ fontFamily: "var(--font-mono), monospace", fontSize: '11px', letterSpacing: '0.15em', color: 'var(--a4)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>{label}</small>
                <strong style={{ fontFamily: "var(--font-fraunces), serif", fontSize: '18px', fontWeight: 500 }}>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROGRAMS GRID ── */}
      <section style={{ background: 'var(--g9)', padding: '0 0 120px' }}>
        <div className="container-custom">
          <AnimatedSection>
            <div style={{ padding: '32px 0', borderBottom: '1px solid rgba(255,255,255,.08)', marginBottom: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.6)', maxWidth: '600px', lineHeight: 1.7 }}>
                Seven focused programs addressing the most critical needs of underprivileged communities across Sindh.
              </p>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '11px', color: 'rgba(255,255,255,.3)', letterSpacing: '0.1em' }}>07 ACTIVE PROGRAMS</span>
            </div>
          </AnimatedSection>

          <AnimatedStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', background: 'rgba(255,255,255,.08)', borderRadius: '2px', overflow: 'hidden' }}>
            {programs.map(({ num, emoji, slug, title, category, desc, keywords }) => (
              <StaggerItem key={slug}>
                <Link href={`/projects/${slug}`} className="prog-card-link">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '11px', color: 'var(--a4)', letterSpacing: '0.15em' }}>{num}</span>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--g9)', background: 'var(--a5)', padding: '3px 10px', borderRadius: '2px' }}>{category}</span>
                  </div>
                  <div style={{ width: '52px', height: '52px', background: 'var(--a5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '20px', border: '3px solid var(--g9)' }}>{emoji}</div>
                  <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: '20px', fontWeight: 500, color: '#fff', marginBottom: '10px', letterSpacing: '-0.01em', lineHeight: 1.25 }}>{title}</h3>
                  <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '13px', lineHeight: 1.65, flex: 1, marginBottom: '12px' }}>{desc}</p>
                  <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', color: 'rgba(255,255,255,.25)', lineHeight: 1.6, marginBottom: '16px', letterSpacing: '0.02em' }}>{keywords}</p>
                  <span style={{ fontSize: '14px', color: 'var(--a5)', alignSelf: 'flex-start' }}>Learn more →</span>
                </Link>
              </StaggerItem>
            ))}

            {/* Gold CTA cell */}
            <StaggerItem>
              <div style={{ background: 'var(--a5)', padding: '36px 28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--g8)', marginBottom: '20px', opacity: 0.7 }}>Support Us</div>
                  <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: '28px', fontWeight: 400, color: 'var(--g9)', lineHeight: 1.2 }}>Support a program today.</h3>
                </div>
                <Link href="/contact#donate" className="btn btn-dark" style={{ alignSelf: 'flex-start', marginTop: '24px' }}>Donate Now →</Link>
              </div>
            </StaggerItem>
          </AnimatedStagger>
        </div>
      </section>

      <DonationCTA />
    </div>
  );
}
