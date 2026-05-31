'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';

const counters = [
  { num: '7',     suffix: '',  label: 'Active Welfare Programs' },
  { num: '2024',  suffix: '',  label: 'Year Established' },
  { num: '1000',  suffix: '+', label: 'Families Served' },
  { num: '100',   suffix: '%', label: 'Community Focused' },
];

const impacts = [
  {
    icon: '🏥',
    title: 'Healthcare Support',
    desc: 'Providing emergency medical assistance and ambulance support for deserving communities across Sindh.',
  },
  {
    icon: '📚',
    title: 'Education & Digital Skills',
    desc: 'Supporting students through educational centers, coaching programs, and digital training initiatives.',
  },
  {
    icon: '👩‍💼',
    title: 'Women Empowerment',
    desc: 'Helping women gain vocational skills, financial independence, and sustainable livelihood opportunities.',
  },
  {
    icon: '⚖️',
    title: 'Legal & Social Welfare',
    desc: 'Providing legal awareness, social support, and welfare assistance for vulnerable families.',
  },
];

export default function ImpactCards() {
  return (
    <section style={{ background: 'var(--cream)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Watermark */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          top: 50, right: -80,
          fontFamily: 'var(--font-fraunces), serif',
          fontSize: '300px',
          fontWeight: 700,
          color: 'rgba(15,76,53,.04)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
          whiteSpace: 'nowrap',
        }}
      >
        IMPACT
      </div>

      <div className="container-custom relative">

        {/* Head */}
        <AnimatedSection>
          <div style={{ marginBottom: 80, maxWidth: 700 }}>
            <div className="eyebrow">Our Impact</div>
            <h2
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: 'clamp(36px, 4.5vw, 54px)',
                fontWeight: 400,
                margin: '20px 0 20px',
                color: 'var(--g9)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Creating real change <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>across Sindh</em>.
            </h2>
            <p style={{ fontSize: 18, color: 'var(--soft)' }}>
              SCWO is committed to improving lives through structured humanitarian programs designed to
              address healthcare challenges, educational barriers, women empowerment, and social welfare needs.
            </p>
          </div>
        </AnimatedSection>

        {/* Counters row */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginBottom: 80 }}
        >
          {counters.map((c, i) => (
            <motion.div
              key={c.label}
              className="counter-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="counter-num">
                {c.num}<span style={{ fontSize: '0.6em', color: 'var(--a5)' }}>{c.suffix}</span>
              </div>
              <div className="counter-label">{c.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Impact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="card card-hover"
              style={{ borderTop: '3px solid var(--a5)' }}
            >
              <div
                className="flex items-center justify-center mb-5"
                style={{
                  width: 52, height: 52,
                  background: 'var(--a1)',
                  borderRadius: 2,
                  fontSize: 24,
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontSize: 20,
                  fontWeight: 500,
                  color: 'var(--g9)',
                  marginBottom: 12,
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: 'var(--soft)', fontSize: 14, lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <AnimatedSection delay={0.3}>
          <div
            className="mt-16 px-8 py-6 text-center"
            style={{ borderLeft: '3px solid var(--a5)', background: 'var(--paper)', borderRadius: 2 }}
          >
            <p
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontStyle: 'italic',
                fontSize: 18,
                color: 'var(--g8)',
                lineHeight: 1.6,
              }}
            >
              "Every initiative launched by SCWO focuses on creating sustainable community impact
              while promoting dignity, equality, and opportunity for all."
            </p>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}