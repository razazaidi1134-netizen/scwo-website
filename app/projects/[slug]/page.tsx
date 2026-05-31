import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import AnimatedSection from '@/components/ui/AnimatedSection';

const programs: Record<string, {
  num: string; emoji: string; title: string; category: string;
  description: string; about: string; whatWeDo: string[]; seoKeywords: string;
}> = {
  'ambulance-health': {
    num: '01', emoji: '🏥', title: 'Ambulance & Health Services', category: 'Healthcare',
    description: 'Emergency healthcare support and ambulance services for underprivileged communities across Sindh.',
    about: 'Thousands of deserving patients face medical emergencies without access to immediate transportation or healthcare support. SCWO aims to bridge this gap by providing ambulance services, emergency response assistance, and healthcare support for vulnerable individuals and families.',
    whatWeDo: ['Ambulance services for deserving communities', 'Emergency response assistance', 'Healthcare support for vulnerable families', 'Medical assistance for individuals in need'],
    seoKeywords: 'ambulance services Karachi · healthcare NGO Pakistan · emergency welfare services Sindh',
  },
  'educational-centers': {
    num: '02', emoji: '🎓', title: 'Educational Centers', category: 'Education',
    description: 'Educational support programs for deserving students and underprivileged communities.',
    about: 'SCWO promotes quality education through model schools, coaching centers, mentorship programs, and academic support initiatives designed to help students achieve their educational goals.',
    whatWeDo: ['Model schools and coaching centers', 'Mentorship programs for students', 'Academic support initiatives', 'Educational resources for underprivileged youth'],
    seoKeywords: 'education NGO Karachi · student support Sindh · welfare education programs Pakistan',
  },
  'computer-training': {
    num: '03', emoji: '💻', title: 'Computer Training Centers', category: 'Digital Skills',
    description: 'Digital skills and computer education programs for students and youth.',
    about: 'SCWO provides computer training and digital literacy programs including typing, internet usage, MS Office, and communication skills to help students build better career opportunities.',
    whatWeDo: ['Computer literacy and typing training', 'Internet usage and MS Office programs', 'Communication skills development', 'Career-oriented digital skills for youth'],
    seoKeywords: 'computer training Karachi · digital skills Pakistan · youth empowerment NGO',
  },
  'industrial-homes': {
    num: '04', emoji: '✂️', title: 'Industrial Homes for Women', category: 'Women Empowerment',
    description: 'Vocational training programs helping women achieve financial independence.',
    about: 'SCWO empowers women through sewing, embroidery, handicrafts, and vocational training programs designed to help women build sustainable sources of income.',
    whatWeDo: ['Sewing and embroidery training', 'Handicrafts skill development', 'Vocational training programs', 'Building sustainable income sources for women'],
    seoKeywords: 'women empowerment NGO Pakistan · vocational training Karachi · sewing training Sindh',
  },
  'women-works-hub': {
    num: '05', emoji: '👩‍💼', title: 'Women Works Hub', category: 'Women Empowerment',
    description: 'Practical skill-building programs for women seeking employment or entrepreneurship opportunities.',
    about: 'The Women Works Hub focuses on providing practical career-oriented skills including beauty services, handicrafts, computer skills, and entrepreneurship training.',
    whatWeDo: ['Beauty services and cosmetology training', 'Handicrafts and creative skills', 'Computer skills for women', 'Entrepreneurship training and support'],
    seoKeywords: 'women employment programs Pakistan · women skills training Karachi · NGO for women empowerment',
  },
  'legal-aid-hub': {
    num: '06', emoji: '⚖️', title: 'Legal Aid Hub', category: 'Legal Aid',
    description: 'Legal awareness and advisory support for underprivileged communities.',
    about: 'SCWO promotes legal awareness through counseling, advisory services, awareness campaigns, and partnerships with volunteers and legal professionals.',
    whatWeDo: ['Free legal counseling and advisory services', 'Legal awareness campaigns', 'Partnerships with legal professionals', 'Legal support for vulnerable individuals'],
    seoKeywords: 'legal aid NGO Pakistan · legal awareness Karachi · welfare legal services Sindh',
  },
  'social-welfare': {
    num: '07', emoji: '🤝', title: 'Social Welfare Services', category: 'Social Welfare',
    description: 'Support services for widows, orphans, students, elderly citizens, and deserving families.',
    about: 'SCWO provides welfare support including food assistance, educational help, healthcare support, and essential services for vulnerable individuals and families facing hardship.',
    whatWeDo: ['Food assistance for deserving families', 'Educational help for students in need', 'Healthcare support for vulnerable communities', 'Essential services for widows, orphans, and elderly citizens'],
    seoKeywords: 'social welfare organization Karachi · charity support Sindh · humanitarian NGO Pakistan',
  },
};

export function generateStaticParams() {
  return Object.keys(programs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const program = programs[params.slug];
  if (!program) return {};
  return {
    title: `${program.title} | SCWO Welfare Programs`,
    description: program.description,
    openGraph: {
      title: `${program.title} | SCWO Welfare Programs`,
      description: program.description,
      url: `https://sindhcitizenwelfare.org/projects/${params.slug}`,
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const program = programs[params.slug];
  if (!program) notFound();
  const slugList = Object.keys(programs);

  return (
    <div>
      {/* ── HERO ── */}
      <div style={{ background: 'var(--g9)', color: '#fff', padding: '100px 0 120px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 30%, rgba(212,160,23,.12) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div className="container-custom" style={{ position: 'relative' }}>
          <Link href="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: "var(--font-mono), monospace", fontSize: '11px',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.45)', textDecoration: 'none',
            marginBottom: '40px',
          }}>← All Programs</Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '12px', letterSpacing: '0.15em', color: 'var(--a4)' }}>{program.num}</span>
            <div style={{ width: '56px', height: '56px', background: 'var(--a5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '3px solid rgba(212,160,23,.3)' }}>
              {program.emoji}
            </div>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>{program.category}</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
            {program.title}
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.7)', maxWidth: '520px', lineHeight: 1.65 }}>{program.description}</p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section style={{ background: 'var(--cream)', padding: '100px 0' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-start">

            {/* Main content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <AnimatedSection>
                <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '40px 44px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--a5)' }} />
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '16px' }}>About This Program</div>
                  <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: '32px', fontWeight: 400, color: 'var(--g9)', marginBottom: '20px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    What we <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>do</em>.
                  </h2>
                  <p style={{ fontSize: '16px', color: 'var(--soft)', lineHeight: 1.85 }}>{program.about}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '40px 44px' }}>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '24px' }}>What We Provide</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {program.whatWeDo.map((item, i) => (
                      <div key={item} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px 0', borderBottom: i < program.whatWeDo.length - 1 ? '1px solid var(--line)' : 'none' }}>
                        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '11px', color: 'var(--a5)', flexShrink: 0, marginTop: '2px' }}>0{i + 1}</span>
                        <span style={{ fontSize: '15px', color: 'var(--g8)', lineHeight: 1.65 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '20px 44px' }}>
                  <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', color: 'var(--soft)', opacity: 0.6, letterSpacing: '0.05em' }}>{program.seoKeywords}</span>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-[100px]" style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <AnimatedSection delay={0.1}>
                <div style={{ border: '1px solid var(--line)', borderBottom: 'none', borderRadius: '2px 2px 0 0', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--g9)', padding: '16px 24px' }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--a4)' }}>Program Details</span>
                  </div>
                  {[
                    { label: 'Organization', value: 'SCWO' },
                    { label: 'Category',     value: program.category },
                    { label: 'Location',     value: 'Sindh, Pakistan' },
                    { label: 'Status',       value: '● Active' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', background: '#fff', borderBottom: '1px solid var(--line)' }}>
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--soft)' }}>{label}</span>
                      <span style={{ fontSize: '13px', color: value === '● Active' ? 'var(--g7)' : 'var(--g9)', fontWeight: 600 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div style={{ background: 'var(--a5)', padding: '28px 24px' }}>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--g8)', marginBottom: '12px', opacity: 0.7 }}>Support This Program</div>
                  <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: '22px', fontWeight: 400, color: 'var(--g9)', marginBottom: '10px', lineHeight: 1.2 }}>
                    Help us <em style={{ fontStyle: 'italic' }}>make an impact</em>.
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--g8)', lineHeight: 1.7, marginBottom: '20px' }}>
                    Your donation directly funds this initiative and helps serve deserving communities across Sindh.
                  </p>
                  <Link href="/contact#donate" className="btn btn-dark" style={{ width: '100%', justifyContent: 'center', marginBottom: '8px', display: 'flex' }}>
                    Donate Now →
                  </Link>
                  <Link href="/contact" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--g9)', color: 'var(--g9)', display: 'flex' }}>
                    Contact Us
                  </Link>
                </div>
              </AnimatedSection>

              {/* Programs nav */}
              <AnimatedSection delay={0.2}>
                <div style={{ border: '1px solid var(--line)', borderTop: 'none', borderRadius: '0 0 2px 2px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--paper)', padding: '14px 24px', borderBottom: '1px solid var(--line)' }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)' }}>All Programs</span>
                  </div>
                  <style>{`
                    .prog-nav-link { display:flex;align-items:center;gap:10px;padding:12px 24px;background:#fff;border-bottom:1px solid var(--line);text-decoration:none;transition:background .2s; }
                    .prog-nav-link:hover { background:var(--paper); }
                    .prog-nav-link.active { background:var(--g9); }
                  `}</style>
                  {slugList.map((slug) => {
                    const p = programs[slug];
                    const isActive = slug === params.slug;
                    return (
                      <Link key={slug} href={`/projects/${slug}`}
                        className={`prog-nav-link${isActive ? ' active' : ''}`}>
                        <span style={{ fontSize: '14px' }}>{p.emoji}</span>
                        <span style={{ fontSize: '13px', color: isActive ? '#fff' : 'var(--soft)', fontWeight: isActive ? 600 : 400, lineHeight: 1.4 }}>{p.title}</span>
                        {isActive && <span style={{ marginLeft: 'auto', color: 'var(--a4)', fontSize: '12px' }}>●</span>}
                      </Link>
                    );
                  })}
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
