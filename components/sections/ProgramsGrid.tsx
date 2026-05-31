'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const programs = [
  {
    slug: 'ambulance-health',
    num: '01',
    icon: '🏥',
    title: 'Healthcare Hub',
    desc: 'Emergency healthcare support and ambulance services for underprivileged communities across Sindh.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'educational-centers',
    num: '02',
    icon: '🎓',
    title: 'Education Hub',
    desc: 'Educational support programs for deserving students and underprivileged communities across Sindh.',
    img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'computer-training',
    num: '03',
    icon: '💻',
    title: 'Computer Training',
    desc: 'Digital skills and computer education programs for students and youth seeking modern employment.',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'women-works-hub',
    num: '04',
    icon: '👩‍💼',
    title: 'Women Works Hub',
    desc: 'Vocational training and skill-building programs helping women achieve financial independence.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'legal-aid-hub',
    num: '05',
    icon: '⚖️',
    title: 'Legal Aid Hub',
    desc: 'Legal awareness and free advisory support for underprivileged communities across Sindh.',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'industrial-homes',
    num: '06',
    icon: '✂️',
    title: 'Industrial Homes',
    desc: 'Vocational training helping women build sustainable income through sewing and handicrafts.',
    img: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'social-welfare',
    num: '07',
    icon: '🤝',
    title: 'Social Welfare',
    desc: 'Support services for widows, orphans, elderly citizens, and deserving families in Sindh.',
    img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=80',
  },
];

export default function ProgramsGrid() {
  return (
    <section style={{ background: 'var(--g9)', color: '#fff', padding: '120px 0' }}>
      <div className="container-custom">

        {/* Section head */}
        <AnimatedSection>
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>
                Our Programs
              </div>
              <h2 style={{ color: '#fff' }}>
                Seven pillars of <em>impact</em>.
              </h2>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 12,
                color: 'rgba(255,255,255,.4)',
                letterSpacing: '0.1em',
              }}
            >
              07 ACTIVE PROGRAMS
            </div>
          </div>
        </AnimatedSection>

        {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: 1,
            background: 'rgba(255,255,255,.08)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {programs.map((program, i) => (
            <motion.div
              key={program.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{ height: '100%' }}
            >
              <Link href={`/projects/${program.slug}`} className="prog-card block" style={{ height: '100%' }}>
                {/* Thumbnail */}
                <div
                  style={{
                    height: 140,
                    backgroundImage: `url('${program.img}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    borderBottom: '1px solid var(--a5)',
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(10,46,30,.3) 0%, rgba(10,46,30,.85) 100%)' }}
                  />
                  <span
                    className="absolute z-10"
                    style={{
                      top: 16, left: 16,
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 11,
                      color: 'var(--a4)',
                      letterSpacing: '0.15em',
                      background: 'rgba(10,46,30,.6)',
                      padding: '4px 10px',
                      border: '1px solid rgba(212,160,23,.3)',
                    }}
                  >
                    {program.num}
                  </span>
                </div>

                {/* Icon bubble */}
                <div
                  className="absolute z-10 flex items-center justify-center"
                  style={{
                    bottom: -24, right: 24,
                    width: 52, height: 52,
                    background: 'var(--a5)',
                    borderRadius: '50%',
                    fontSize: 22,
                    border: '4px solid var(--g9)',
                  }}
                >
                  {program.icon}
                </div>

                {/* Body */}
                <div style={{ padding: '36px 28px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: 22,
                      fontWeight: 500,
                      marginBottom: 10,
                      color: '#fff',
                    }}
                  >
                    {program.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 14, lineHeight: 1.6, flex: 1 }}>
                    {program.desc}
                  </p>
                  <span className="prog-arrow">→</span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* CTA tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: programs.length * 0.07 }}
            style={{ height: '100%' }}
          >
            <div
              style={{
                background: 'var(--a5)',
                minHeight: 300,
                padding: '40px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                className="eyebrow"
                style={{ color: 'var(--g9)' }}
              >
                Get Involved
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontSize: 30,
                  color: 'var(--g9)',
                  fontWeight: 500,
                  marginTop: 'auto',
                  marginBottom: 24,
                }}
              >
                Support a program today.
              </h3>
              <Link href="/contact#donate" className="btn btn-dark btn-lg" style={{ alignSelf: 'flex-start' }}>
                Donate Now →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* View all */}
        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12">
            <Link href="/projects" className="btn btn-outline btn-lg">
              View All Programs →
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
