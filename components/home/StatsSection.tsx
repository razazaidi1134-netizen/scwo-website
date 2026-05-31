'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { num: '7',     suffix: '',  label: 'Active Programs',    sub: 'Running across Sindh' },
  { num: 500,     suffix: '+', label: 'Students Supported', sub: 'Education & digital skills' },
  { num: 1200,    suffix: '+', label: 'Families Helped',    sub: 'Direct welfare support' },
  { num: 5,       suffix: '+', label: 'Districts Covered',  sub: 'Across Sindh province' },
];

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(target); // default to final value (SSR-safe)
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof target !== 'number') return;

    // Reset to 0 for client-side animation
    setCount(0);

    // Fallback: if IntersectionObserver unavailable, show final number immediately
    if (typeof IntersectionObserver === 'undefined') {
      setCount(target);
      return;
    }

    // Safety fallback: show final number after 2.5s if animation never triggers
    const fallback = setTimeout(() => {
      if (!started.current) {
        started.current = true;
        setCount(target);
      }
    }, 2500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          clearTimeout(fallback);
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [target, duration]);

  return { count, ref };
}

function StatCounter({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const isNum = typeof stat.num === 'number';
  const { count, ref } = useCountUp(isNum ? (stat.num as number) : 0);

  return (
    <div
      ref={ref}
      className="py-10 px-6 sm:px-8 flex flex-col"
      style={{
        borderRight: index < stats.length - 1 ? '1px solid var(--line)' : 'none',
        borderBottom: index < 2 ? '1px solid var(--line)' : 'none',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-fraunces), serif',
        fontSize: 'clamp(48px, 6vw, 72px)',
        fontWeight: 400,
        color: 'var(--g9)',
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}>
        {isNum ? count : stat.num}
        <span style={{ color: 'var(--a5)' }}>{stat.suffix}</span>
      </div>

      <div style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '11px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase' as const,
        color: 'var(--soft)',
        marginTop: '16px',
      }}>{stat.label}</div>

      <div style={{
        fontSize: '13px',
        color: 'var(--soft)',
        opacity: 0.7,
        marginTop: '4px',
      }}>{stat.sub}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section style={{ background: 'var(--cream)', padding: '0' }}>
      <div className="container-custom">
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
