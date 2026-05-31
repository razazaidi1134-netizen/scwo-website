import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Contact SCWO | Welfare Organization Karachi Pakistan',
  description: 'Contact Sindh Citizen Welfare Organization (SCWO) for donations, volunteer opportunities, partnerships, and humanitarian support initiatives.',
  openGraph: {
    title: 'Contact SCWO | Welfare Organization Karachi Pakistan',
    description: 'Contact SCWO for donations, volunteering, partnerships, and humanitarian support in Karachi, Pakistan.',
    url: 'https://sindhcitizenwelfare.org/contact',
  },
};

const contactDetails = [
  {
    num: '01',
    label: 'Address',
    lines: ['Office #1-A, 1/2 Falak Avenue,', 'Nazimabad #01, Karachi, Pakistan'],
    hrefs: null,
  },
  {
    num: '02',
    label: 'Phone',
    lines: ['+92 300 9267605', '+92 330 2164412'],
    hrefs: ['tel:+923009267605', 'tel:+923302164412'],
  },
  {
    num: '03',
    label: 'Email',
    lines: ['info@sindhcitizenwelfare.org'],
    hrefs: ['mailto:info@sindhcitizenwelfare.org'],
  },
];

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
  { day: 'Saturday',        time: '10:00 AM – 2:00 PM' },
  { day: 'Sunday',          time: 'Closed' },
];

export default function ContactPage() {
  return (
    <div>
      <style>{`
        .contact-detail-link { display:block; font-size:14px; color:var(--g8); font-weight:500; text-decoration:none; line-height:1.6; transition:color .2s; }
        .contact-detail-link:hover { color:var(--a5); }
        .contact-back-link { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:var(--soft); text-decoration:none; transition:color .2s; }
        .contact-back-link:hover { color:var(--a5); }
      `}</style>

      {/* ── HERO ── */}
      <div style={{ background: 'var(--g9)', color: '#fff', padding: '100px 0 120px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(212,160,23,.12) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div className="container-custom" style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>Reach Out</div>
          <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.03em', margin: '20px 0 24px' }}>
            Get in <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>touch</em>.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.7)', maxWidth: '520px', lineHeight: 1.65 }}>
            We welcome partnerships, volunteers, donors, and supporters who share our vision of
            building a stronger and more compassionate society across Sindh.
          </p>
          <div style={{ display: 'flex', gap: '48px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,.1)', flexWrap: 'wrap' }}>
            {[{ label: 'Response Time', value: '24–48 hrs' }, { label: 'Location', value: 'Karachi' }, { label: 'Open', value: 'Mon – Sat' }].map(({ label, value }) => (
              <div key={label}>
                <small style={{ fontFamily: "var(--font-mono), monospace", fontSize: '11px', letterSpacing: '0.15em', color: 'var(--a4)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>{label}</small>
                <strong style={{ fontFamily: "var(--font-fraunces), serif", fontSize: '18px', fontWeight: 500 }}>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section style={{ background: 'var(--cream)', padding: '100px 0' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-start">

            {/* Form panel */}
            <AnimatedSection>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '2px', padding: 'clamp(24px, 4vw, 48px)' }}>
                <div className="eyebrow">Send a Message</div>
                <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: '36px', fontWeight: 400, color: 'var(--g9)', margin: '16px 0 8px', letterSpacing: '-0.02em' }}>
                  How can we help?
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--soft)', marginBottom: '32px', lineHeight: 1.7 }}>
                  Questions about programs, volunteering, or donations? We&apos;d love to hear from you.
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>

              {/* Contact details */}
              <AnimatedSection delay={0.1}>
                <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', borderRadius: '2px 2px 0 0', overflow: 'hidden' }}>
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--line)', background: 'var(--g9)' }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--a4)' }}>Contact Details</span>
                  </div>
                  {contactDetails.map(({ num, label, lines, hrefs }) => (
                    <div key={label} style={{ display: 'flex', gap: '16px', padding: '20px 28px', borderBottom: '1px solid var(--line)', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', color: 'var(--a5)', flexShrink: 0, marginTop: '2px' }}>{num}</span>
                      <div>
                        <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '6px' }}>{label}</div>
                        {lines.map((line, i) =>
                          hrefs ? (
                            <a key={i} href={hrefs[i]} className="contact-detail-link">{line}</a>
                          ) : (
                            <span key={i} style={{ display: 'block', fontSize: '14px', color: 'var(--soft)', lineHeight: 1.7 }}>{line}</span>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Office hours */}
              <AnimatedSection delay={0.15}>
                <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none' }}>
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--g8)' }}>Office Hours</span>
                  </div>
                  {hours.map(({ day, time }) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px', borderBottom: '1px solid var(--line)' }}>
                      <span style={{ fontSize: '13px', color: 'var(--soft)' }}>{day}</span>
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: '11px', color: time === 'Closed' ? 'rgba(74,74,74,.4)' : 'var(--g8)', letterSpacing: '0.05em' }}>{time}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Donate CTA */}
              <AnimatedSection delay={0.2}>
                <div id="donate" style={{ background: 'var(--a5)', padding: '32px 28px' }}>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--g8)', marginBottom: '12px', opacity: 0.7 }}>Support Our Mission</div>
                  <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: '24px', fontWeight: 400, color: 'var(--g9)', marginBottom: '12px', lineHeight: 1.2 }}>
                    Your support <em style={{ fontStyle: 'italic' }}>saves lives</em>.
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--g8)', lineHeight: 1.7, marginBottom: '20px' }}>
                    Contributions fund healthcare, education, and welfare for underprivileged communities across Sindh.
                  </p>
                  <button className="btn btn-dark btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                    Donate Now →
                  </button>
                </div>
              </AnimatedSection>

              {/* Volunteer CTA */}
              <AnimatedSection delay={0.25}>
                <div style={{ background: 'var(--g9)', color: '#fff', padding: '32px 28px', borderRadius: '0 0 2px 2px' }}>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--a4)', marginBottom: '12px' }}>Get Involved</div>
                  <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: '22px', fontWeight: 400, color: '#fff', marginBottom: '10px', lineHeight: 1.2 }}>
                    Become a <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>Volunteer</em>.
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.6)', lineHeight: 1.7 }}>
                    Select &ldquo;Volunteer Opportunity&rdquo; in the contact form to express your interest and join our team.
                  </p>
                </div>
              </AnimatedSection>

            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
