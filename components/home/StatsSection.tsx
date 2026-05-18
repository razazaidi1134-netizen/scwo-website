'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { num: '7',     suffix: '',  label: 'Active Programs',   sub: 'Running across Sindh' },
  { num: 500,     suffix: '+', label: 'Students Supported', sub: 'Education & digital skills' },
  { num: 1200,    suffix: '+', label: 'Families Helped',    sub: 'Direct welfare support' },
  { num: 5,       suffix: '+', label: 'Districts Covered',  sub: 'Across Sindh province' },
];

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof target !== 'number') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCounter({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const isNum = typeof stat.num === 'number';
  const { count, ref } = useCountUp(isNum ? (stat.num as number) : 0);

  return (
    <div
      ref={ref}
      style={{
        padding: '48px 32px',
        borderRight: index < stats.length - 1 ? '1px solid var(--line)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}
    >
      {/* Counter number */}
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontSize: '72px',
        fontWeight: 400,
        color: 'var(--g9)',
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}>
        {isNum ? count : stat.num}
        <span style={{ color: 'var(--a5)' }}>{stat.suffix}</span>
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase' as const,
        color: 'var(--soft)',
        marginTop: '16px',
        display: 'block',
      }}>{stat.label}</div>

      {/* Sub-label */}
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
    <section style={{ background: 'var(--cream)', padding: '0 64px' }}>
      <div className="container-custom">
        {/* Counters row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}>
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}