'use client';

import { motion } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  style?: CSSProperties;
}

export default function AnimatedSection({ children, className = '', delay = 0, direction = 'up', style }: Props) {
  const offsets = {
    up:    { y: 40, x: 0 },
    down:  { y: -40, x: 0 },
    left:  { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none:  { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedStagger({
  children,
  className = '',
  staggerDelay = 0.1,
  style,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
