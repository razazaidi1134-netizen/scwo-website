import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import FooterSocials from './FooterSocials';

const quickLinks = [
  { href: '/',               label: 'Home' },
  { href: '/about',          label: 'About Us' },
  { href: '/projects',       label: 'Our Programs' },
  { href: '/gallery',        label: 'Our Activities' },
  { href: '/contact',        label: 'Contact Us' },
  { href: '/contact#donate', label: 'Donate Now' },
];

const programLinks = [
  { href: '/projects/ambulance-health',    label: 'Healthcare Hub' },
  { href: '/projects/educational-centers', label: 'Education Hub' },
  { href: '/projects/computer-training',   label: 'Computer Training' },
  { href: '/projects/industrial-homes',    label: 'Industrial Homes' },
  { href: '/projects/women-works-hub',     label: 'Women Works Hub' },
  { href: '/projects/legal-aid-hub',       label: 'Legal Aid Hub' },
  { href: '/projects/social-welfare',      label: 'Social Welfare' },
];

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/sindhcitizenwelfare/',
    svg: 'facebook' as const,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sindhcitizenwelfareorg/',
    svg: 'instagram' as const,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@sindhcitizenwelfare',
    svg: 'youtube' as const,
  },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--g9)', color: 'rgba(255,255,255,.6)' }}>
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full bg-white overflow-hidden flex-shrink-0"
                style={{ width: 48, height: 48, border: '2px solid var(--a5)' }}>
                <Image src="/logo.png" alt="SCWO Logo" width={48} height={48}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 17, color: '#fff', fontWeight: 600 }}>SCWO</div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: '0.15em', color: 'var(--a4)', textTransform: 'uppercase' }}>
                  Humanity Comes First
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Sindh Citizen Welfare Organization is a registered non-profit serving underprivileged
              communities across Sindh since 2024 through seven structured welfare programs.
            </p>
            <FooterSocials socials={socials} variant="icons" />
          </div>

          {/* Quick links */}
          <div>
            <h5 className="mb-5 text-sm font-bold uppercase tracking-widest" style={{ color: '#fff' }}>Quick Links</h5>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors duration-150 hover:text-white flex items-center gap-2"
                    style={{ color: 'rgba(255,255,255,.55)' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--a5)', flexShrink: 0, display: 'inline-block' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h5 className="mb-5 text-sm font-bold uppercase tracking-widest" style={{ color: '#fff' }}>Programs</h5>
            <ul className="space-y-3 text-sm">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors duration-150 hover:text-white flex items-center gap-2"
                    style={{ color: 'rgba(255,255,255,.55)' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--a5)', flexShrink: 0, display: 'inline-block' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="mb-5 text-sm font-bold uppercase tracking-widest" style={{ color: '#fff' }}>Contact</h5>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--a5)' }} />
                <span style={{ color: 'rgba(255,255,255,.55)' }}>1-A Falak Avenue,<br />Nazimabad #01, Karachi</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--a5)' }} />
                <div className="space-y-1">
                  <a href="tel:+923009267605" className="block transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,.55)' }}>+92 300 9267605</a>
                  <a href="tel:+923302164412" className="block transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,.55)' }}>+92 330 2164412</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--a5)' }} />
                <a href="mailto:info@sindhcitizenwelfare.org" className="transition-colors hover:text-white break-all"
                  style={{ color: 'rgba(255,255,255,.55)' }}>info@sindhcitizenwelfare.org</a>
              </li>
            </ul>
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 10 }}>
                Follow Us
              </div>
              <FooterSocials socials={socials} variant="text" />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="pt-8 mb-6" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <p className="text-xs text-center leading-relaxed" style={{ color: 'rgba(255,255,255,.18)' }}>
            NGO in Karachi · Welfare Organization in Pakistan · Women Empowerment NGO · Education Support Sindh ·
            Healthcare Welfare Services · Social Welfare Organization · Legal Aid NGO Pakistan · Humanitarian NGO Sindh
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-5" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div className="container-custom flex flex-col sm:flex-row justify-between items-center gap-2">
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} Sindh Citizen Welfare Organization · All Rights Reserved
          </span>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase' }}>
            Humanity Comes First · Since 2024
          </span>
        </div>
      </div>
    </footer>
  );
}