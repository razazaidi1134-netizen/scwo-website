'use client';

import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function DonationCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 green-gradient" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 mb-8"
            >
              <Heart className="w-8 h-8 text-accent-400 fill-accent-400" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              Your Support Can{' '}
              <span className="text-accent-400">Change Lives</span>
            </h2>

            <p className="text-primary-200 text-lg leading-relaxed mb-4">
              Every contribution helps SCWO continue its humanitarian mission across Sindh.
              Your support directly contributes to healthcare services, educational
              initiatives, women empowerment programs, legal aid, and social welfare
              support for deserving communities.
            </p>

            <p className="text-primary-300 text-base mb-10">
              Together, we can create a stronger, more compassionate, and empowered society.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact#donate" className="btn-amber px-10 py-4 text-base">
                Donate Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-outline-white px-10 py-4 text-base">
                Support Our Mission
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
