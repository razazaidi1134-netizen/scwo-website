'use client';

import React from 'react';

type SvgName = 'facebook' | 'instagram' | 'youtube';

interface Social { label: string; href: string; svg: SvgName; }

function SvgIcon({ name }: { name: SvgName }) {
  if (name === 'facebook') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
  if (name === 'instagram') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

export default function FooterSocials({ socials, variant }: { socials: Social[]; variant: 'icons' | 'text' }) {
  if (variant === 'icons') {
    return (
      <div className="flex gap-2">
        {socials.map(({ label, href, svg }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 2, transition: 'all .2s', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--a4)'; e.currentTarget.style.borderColor = 'var(--a5)'; e.currentTarget.style.background = 'rgba(212,160,23,.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; e.currentTarget.style.background = 'transparent'; }}
          ><SvgIcon name={svg} /></a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {socials.map(({ label, href, svg }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,.45)', fontSize: 13, textDecoration: 'none' }}>
          <span style={{ color: 'var(--a5)' }}><SvgIcon name={svg} /></span>
          {label}
        </a>
      ))}
    </div>
  );
}
