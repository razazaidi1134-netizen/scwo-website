'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/projects', label: 'Programs' },
  { href: '/gallery',  label: 'Gallery' },
  { href: '/contact',  label: 'Contact' },
];

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/sindhcitizenwelfare/',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sindhcitizenwelfareorg/',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@sindhcitizenwelfare',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--g9)"/>
      </svg>
    ),
  },
];

export default function Header() {
  const pathname   = usePathname();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      style={{ background: 'var(--g9)', borderBottom: '1px solid rgba(255,255,255,.05)' }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,.3)]' : ''}`}
    >
      {/* ── Top social bar ── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.15)' }}>
        <div className="container-custom flex items-center justify-between" style={{ height: '36px' }}>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase' }}>
            Humanity Comes First · Since 2024
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,.45)',
                  border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: '2px',
                  transition: 'all .2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--a4)';
                  e.currentTarget.style.borderColor = 'var(--a5)';
                  e.currentTarget.style.background = 'rgba(212,160,23,.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,.45)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div className="container-custom flex items-center justify-between h-[84px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5" onClick={() => setOpen(false)}>
          <div
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{ width: '54px', height: '54px', border: '2px solid var(--a5)', boxShadow: '0 0 0 2px var(--g9)', background: 'var(--g9)' }}
          >
            <Image
              src="/logo.png"
              alt="SCWO Logo"
              width={54}
              height={54}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <strong style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 600, fontSize: 17, letterSpacing: '0.02em', color: '#fff' }}>
              SCWO
            </strong>
            <small style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'var(--a4)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 2 }}>
              Humanity Comes First
            </small>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 text-sm font-medium transition-colors duration-200"
              style={{ color: isActive(link.href) ? 'var(--a4)' : 'rgba(255,255,255,.85)' }}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px]" style={{ background: 'var(--a5)' }} />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact" className="btn btn-outline">Volunteer</Link>
          <Link href="/contact#donate" className="btn btn-primary">Donate Now →</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded transition-colors"
          style={{ color: 'rgba(255,255,255,.85)' }}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" aria-hidden /> : <Menu className="w-6 h-6" aria-hidden />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      {/* ── Mobile nav ── */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden px-4 pb-6"
          style={{ borderTop: '1px solid rgba(255,255,255,.08)', background: 'var(--g9)' }}
        >
          <nav className="flex flex-col pt-4 gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium transition-colors"
                style={{
                  color: isActive(link.href) ? 'var(--a4)' : 'rgba(255,255,255,.8)',
                  borderLeft: isActive(link.href) ? '2px solid var(--a5)' : '2px solid transparent',
                }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile social links */}
          <div className="flex gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,.5)',
                  border: '1px solid rgba(255,255,255,.12)',
                  borderRadius: '2px',
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <Link href="/contact" className="btn btn-outline w-full text-center justify-center" onClick={() => setOpen(false)}>
              Volunteer
            </Link>
            <Link href="/contact#donate" className="btn btn-primary w-full text-center justify-center" onClick={() => setOpen(false)}>
              Donate Now →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}