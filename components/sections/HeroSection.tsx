'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const metaItems = [
  { label: 'Est.',      value: '2024' },
  { label: 'Programs',  value: '07' },
  { label: 'Province',  value: 'Sindh' },
];

const tickerItems = [
  'Healthcare Hub', 'Education Hub', 'Computer Training',
  'Women Works Hub', 'Legal Aid Hub', 'Industrial Homes', 'Social Welfare',
];

export default function HeroSection() {
  const repeated = [...tickerItems, ...tickerItems];

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'var(--g9)',
          color: '#fff',
          padding: '100px 0 160px',
          minHeight: 600,
        }}
      >
        {/* Ambient radial glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 80% 20%, rgba(212,160,23,.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(20,90,63,.4) 0%, transparent 60%)',
          }}
        />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">

            {/* ── Left: copy ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="eyebrow"
                style={{ color: 'rgba(255,255,255,.5)' }}
              >
                Humanitarian NGO · Karachi, Pakistan
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontSize: 'clamp(52px, 7vw, 80px)',
                  fontWeight: 400,
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  margin: '24px 0 28px',
                }}
              >
                Humanity <em style={{ fontStyle: 'italic', color: 'var(--a4)', fontWeight: 300 }}>Comes</em><br />
                First.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ fontSize: 18, color: 'rgba(255,255,255,.75)', maxWidth: 520, marginBottom: 36, lineHeight: 1.65 }}
              >
                Sindh Citizen Welfare Organization is a humanitarian non-profit based in Karachi,
                dedicated to transforming lives across Sindh through healthcare, education,
                women empowerment, legal aid, and social welfare.
              </motion.p>

              {/* CTAs — stack on mobile, row on sm+ */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 mb-12"
              >
                <Link href="/contact#donate" className="btn btn-primary btn-lg">
                  Donate Now →
                </Link>
                <Link href="/contact" className="btn btn-outline btn-lg">
                  Volunteer
                </Link>
                <Link href="/projects" className="btn btn-dark btn-lg">
                  Our Programs
                </Link>
              </motion.div>

              {/* Meta stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-wrap gap-8 pt-8"
                style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}
              >
                {metaItems.map((item) => (
                  <div key={item.label}>
                    <small
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 11,
                        letterSpacing: '0.15em',
                        color: 'var(--a4)',
                        display: 'block',
                        marginBottom: 4,
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.label}
                    </small>
                    <strong style={{ fontFamily: 'var(--font-fraunces), serif', fontWeight: 500, fontSize: 18 }}>
                      {item.value}
                    </strong>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: visual (desktop only) ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative hidden lg:block"
              style={{ height: 560 }}
            >
              {/* Main photo — Nadia Bano */}
              <div
                className="absolute top-0 right-0"
                style={{
                  width: 370,
                  height: 480,
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid rgba(212,160,23,0.3)',
                  background: 'var(--g9)',
                }}
              >
                <Image
                  src="/nadia-bano.jpg"
                  alt="Nadia Bano — President & Co-Founder, SCWO"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top center', mixBlendMode: 'luminosity' }}
                  priority
                  sizes="370px"
                />
                <div
                  className="absolute inset-0 z-10"
                  style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(10,46,30,.88) 100%)' }}
                />
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 5,
                  background: 'linear-gradient(135deg, rgba(10,46,30,0.4) 0%, rgba(10,46,30,0.1) 40%, rgba(10,46,30,0.5) 100%)'
                }} />
                <p
                  className="absolute z-20"
                  style={{
                    bottom: 28, left: 28, right: 28,
                    fontFamily: 'var(--font-fraunces), serif',
                    fontStyle: 'italic',
                    fontSize: 14,
                    color: 'rgba(255,255,255,.95)',
                    borderLeft: '2px solid var(--a5)',
                    paddingLeft: 12,
                  }}
                >
                  Nadia Bano — President &amp; Co-Founder, SCWO
                </p>
              </div>

              {/* Gold stamp */}
              <div
                className="absolute bottom-0 left-0"
                style={{ width: 270, background: 'var(--a5)', padding: 28, borderRadius: 2 }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-fraunces), serif',
                    fontSize: 60,
                    fontWeight: 600,
                    color: 'var(--g9)',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  7
                </span>
                <div style={{ width: 40, height: 2, background: 'var(--g9)', margin: '14px 0' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-fraunces), serif',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--g9)',
                    display: 'block',
                    marginBottom: 4,
                  }}
                >
                  Active Programs
                </span>
                <small
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    color: 'var(--g9)',
                    textTransform: 'uppercase',
                    opacity: .8,
                  }}
                >
                  Across Sindh
                </small>
              </div>

              {/* Live badge */}
              <div
                className="absolute z-30"
                style={{
                  bottom: '90px',
                  right: '-5px',
                  background: 'var(--cream)',
                  padding: '16px 20px',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  boxShadow: '0 16px 40px rgba(0,0,0,.4)',
                  borderRadius: 2,
                }}
              >
                <span
                  className="blink flex-shrink-0"
                  style={{ width: 10, height: 10, background: '#16a34a', borderRadius: '50%', display: 'block' }}
                />
                <div>
                  <small
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 10,
                      letterSpacing: '0.15em',
                      color: 'var(--au)',
                      textTransform: 'uppercase',
                      marginBottom: 2,
                    }}
                  >
                    Status
                  </small>
                  <strong style={{ fontSize: 13, color: 'var(--ink)' }}>Actively Serving</strong>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div
        style={{
          background: 'var(--a5)',
          color: 'var(--g9)',
          padding: '18px 0',
          overflow: 'hidden',
          borderTop: '1px solid var(--au)',
          borderBottom: '1px solid var(--au)',
        }}
      >
        <div className="ticker-track">
          {repeated.map((item, i) => (
            <span key={i} className="inline-flex items-center" style={{ gap: 64 }}>
              {item}
              {i < repeated.length - 1 && (
                <span style={{ opacity: .4, fontSize: 18 }}>✦</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
