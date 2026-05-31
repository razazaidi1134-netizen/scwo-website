'use client';

import { useRouter } from 'next/navigation';

const CATEGORIES = [
  'Healthcare Activities',
  'Education Programs',
  'Women Empowerment',
  'Volunteer Work',
  'Food Distribution',
  'Ambulance Services',
  'Community Events',
  'Legal Aid Camps',
];

export default function GalleryFilters({ active }: { active?: string }) {
  const router = useRouter();

  const go = (cat?: string) => {
    router.push(cat ? `/gallery?category=${encodeURIComponent(cat)}` : '/gallery');
  };

  const btnStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-mono), monospace',
    fontSize: '10px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '8px 16px',
    border: '1px solid',
    borderColor: isActive ? (active ? 'var(--a5)' : 'var(--g9)') : 'var(--line)',
    background: isActive ? (active ? 'var(--a5)' : 'var(--g9)') : 'transparent',
    color: isActive ? (active ? 'var(--g9)' : '#fff') : 'var(--soft)',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all .2s',
    whiteSpace: 'nowrap' as const,
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
      <button type="button" onClick={() => go()} style={btnStyle(!active)}>
        All Activities
      </button>
      {CATEGORIES.map((cat) => (
        <button key={cat} type="button" onClick={() => go(cat)} style={btnStyle(active === cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}
