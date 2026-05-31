'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function DonationCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: 'var(--g9)' }}>
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,.06) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(212,160,23,.08)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(20,90,63,.25)' }} />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-lg mb-8"
              style={{ background: 'rgba(255,255,255,.1)' }}
            >
              <Heart className="w-8 h-8" style={{ color: 'var(--a4)', fill: 'var(--a4)' }} />
            </motion.div>

            <h2
              className="mb-5"
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 400,
                color: '#fff',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Your Support Can{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>Change Lives</em>
            </h2>

            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '17px', lineHeight: 1.75, marginBottom: '16px' }}>
              Every contribution helps SCWO continue its humanitarian mission across Sindh.
              Your support directly contributes to healthcare services, educational
              initiatives, women empowerment programs, legal aid, and social welfare
              support for deserving communities.
            </p>

            <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '15px', marginBottom: '40px' }}>
              Together, we can create a stronger, more compassionate, and empowered society.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact#donate" className="btn btn-primary btn-lg">
                Donate Today →
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg">
                Support Our Mission
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
