import Link from 'next/link';

const programs = [
  { num: '01', emoji: '🏥', slug: 'ambulance-health',    title: 'Healthcare Hub',             desc: 'Free medical camps, medicines, and specialist referrals for underprivileged families across Sindh.' },
  { num: '02', emoji: '🎓', slug: 'educational-centers', title: 'Education Hub',               desc: 'Scholarships, school supplies, tutoring, and computer literacy programs for disadvantaged youth.' },
  { num: '03', emoji: '🌾', slug: 'computer-training',   title: 'Food Relief Hub',             desc: 'Monthly ration distribution, Ramzan food packs, and emergency food aid for families in crisis.' },
  { num: '04', emoji: '👩', slug: 'industrial-homes',    title: 'Women Works Hub',             desc: 'Sewing, embroidery, and vocational skills training that leads to employment or entrepreneurship.' },
  { num: '05', emoji: '⚖️', slug: 'legal-aid-hub',       title: 'Legal Aid Hub',               desc: 'Free legal counseling, family law awareness, inheritance rights, and referrals with partner advocates.' },
  { num: '06', emoji: '🌊', slug: 'social-welfare',      title: 'Flood Relief',                desc: 'Emergency response, shelter support, and rehabilitation for flood-affected families across Sindh.' },
  { num: '07', emoji: '🤝', slug: 'women-works-hub',     title: 'Social Welfare',              desc: 'Community support, welfare assistance, and social development programs for vulnerable families.' },
];

export default function ProjectsPreview() {
  return (
    <section style={{ background: 'var(--g9)', color: '#fff', padding: '120px 64px' }}>
      <style>{`
        .prog-preview-card { background:var(--g9); display:flex; flex-direction:column; text-decoration:none; transition:background .3s; min-height:220px; padding:36px 28px 28px; }
        .prog-preview-card:hover { background:var(--g8); }
      `}</style>
      <div className="container-custom">

        {/* Section head */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>Our Programs</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 400, letterSpacing: '-0.03em', margin: '16px 0 0', lineHeight: 1.05 }}>
              Seven pillars of <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>impact</em>.
            </h2>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'rgba(255,255,255,.4)', letterSpacing: '0.1em' }}>07 ACTIVE PROGRAMS</div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,.08)', borderRadius: '2px', overflow: 'hidden', marginBottom: '1px' }}>
          {programs.map(({ num, emoji, slug, title, desc }) => (
            <Link key={slug} href={`/projects/${slug}`} className="prog-preview-card">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--a4)', letterSpacing: '0.15em', marginBottom: '16px' }}>{num}</span>
              <div style={{ width: '48px', height: '48px', background: 'var(--a5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '20px', border: '3px solid var(--g9)' }}>{emoji}</div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 500, color: '#fff', marginBottom: '10px', letterSpacing: '-0.01em', lineHeight: 1.25 }}>{title}</h3>
              <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '13px', lineHeight: 1.65, flex: 1 }}>{desc}</p>
              <span style={{ marginTop: '16px', fontSize: '15px', color: 'var(--a5)', alignSelf: 'flex-start' }}>Learn more →</span>
            </Link>
          ))}

          {/* Gold CTA */}
          <div style={{ background: 'var(--a5)', color: 'var(--g9)', padding: '36px 28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.15em', opacity: 0.6, textTransform: 'uppercase' as const }}>Support Us</div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 400, color: 'var(--g9)', lineHeight: 1.2, marginTop: '20px' }}>Support a program today</h3>
            </div>
            <Link href="/contact#donate" className="btn btn-dark" style={{ marginTop: '24px', alignSelf: 'flex-start' }}>Donate Now →</Link>
          </div>
        </div>

        {/* View All */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
          <Link href="/projects" className="btn btn-outline btn-lg">View All Programs →</Link>
        </div>
      </div>
    </section>
  );
}