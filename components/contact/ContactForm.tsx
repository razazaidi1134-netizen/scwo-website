'use client';

import { useState, FormEvent } from 'react';

interface FormData { name: string; email: string; phone: string; subject: string; message: string; }
interface FormErrors { [key: string]: string; }

const subjects = [
  { value: 'donation',          label: 'Donation Inquiry' },
  { value: 'volunteer',         label: 'Volunteer Opportunity' },
  { value: 'healthcare',        label: 'Healthcare Program' },
  { value: 'education',         label: 'Education Program' },
  { value: 'women-empowerment', label: 'Women Empowerment' },
  { value: 'legal-aid',         label: 'Legal Aid' },
  { value: 'general',           label: 'General Inquiry' },
  { value: 'other',             label: 'Other' },
];

const fieldStyle = (error?: string): React.CSSProperties => ({
  width: '100%',
  padding: '14px 16px',
  background: error ? 'rgba(200,0,0,.04)' : '#fff',
  border: `1px solid ${error ? '#c0392b' : 'var(--line)'}`,
  borderRadius: '2px',
  fontFamily: "'Manrope', sans-serif",
  fontSize: '14px',
  color: 'var(--ink)',
  outline: 'none',
  transition: 'border-color .2s',
});

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '10px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--g8)',
  display: 'block',
  marginBottom: '8px',
  fontWeight: 500,
};

const errorStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '10px',
  color: '#c0392b',
  marginTop: '4px',
  letterSpacing: '0.05em',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors]     = useState<FormErrors>({});
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim())    e.name    = 'Name is required';
    if (!formData.email.trim())   e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email';
    if (!formData.subject)        e.subject = 'Please select a subject';
    if (!formData.message.trim()) e.message = 'Message is required';
    else if (formData.message.length < 10) e.message = 'At least 10 characters required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setStatus('success');
      setStatusMsg(data.message || 'Your message has been sent. We\'ll be in touch soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err: unknown) {
      setStatus('error');
      setStatusMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} noValidate>

      {/* Status banners */}
      {status === 'success' && (
        <div style={{
          padding: '16px 20px',
          background: 'rgba(20,90,63,.06)',
          border: '1px solid var(--g6)',
          borderLeft: '3px solid var(--a5)',
          borderRadius: '2px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '16px' }}>✓</span>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', color: 'var(--g7)', textTransform: 'uppercase', marginBottom: '4px' }}>Message Sent</div>
            <div style={{ fontSize: '14px', color: 'var(--g8)' }}>{statusMsg}</div>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div style={{
          padding: '16px 20px',
          background: 'rgba(192,57,43,.05)',
          border: '1px solid rgba(192,57,43,.3)',
          borderLeft: '3px solid #c0392b',
          borderRadius: '2px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '16px' }}>⚠</span>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', color: '#c0392b', textTransform: 'uppercase', marginBottom: '4px' }}>Error</div>
            <div style={{ fontSize: '14px', color: 'var(--ink)' }}>{statusMsg}</div>
          </div>
        </div>
      )}

      {/* Name + Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Full Name <span style={{ color: 'var(--a5)' }}>*</span></label>
          <input
            type="text" name="name" value={formData.name} onChange={handleChange}
            placeholder="Your full name" style={fieldStyle(errors.name)}
            onFocus={e => { e.target.style.borderColor = 'var(--a5)'; }}
            onBlur={e  => { e.target.style.borderColor = errors.name ? '#c0392b' : 'var(--line)'; }}
          />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>
        <div>
          <label style={labelStyle}>Email Address <span style={{ color: 'var(--a5)' }}>*</span></label>
          <input
            type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder="you@example.com" style={fieldStyle(errors.email)}
            onFocus={e => { e.target.style.borderColor = 'var(--a5)'; }}
            onBlur={e  => { e.target.style.borderColor = errors.email ? '#c0392b' : 'var(--line)'; }}
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>
      </div>

      {/* Phone + Subject */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Phone <span style={{ color: 'var(--soft)', fontWeight: 400 }}>(Optional)</span></label>
          <input
            type="tel" name="phone" value={formData.phone} onChange={handleChange}
            placeholder="+92 300 1234567" style={fieldStyle()}
            onFocus={e => { e.target.style.borderColor = 'var(--a5)'; }}
            onBlur={e  => { e.target.style.borderColor = 'var(--line)'; }}
          />
        </div>
        <div>
          <label style={labelStyle}>Subject <span style={{ color: 'var(--a5)' }}>*</span></label>
          <select
            name="subject" value={formData.subject} onChange={handleChange}
            style={{ ...fieldStyle(errors.subject), background: errors.subject ? 'rgba(200,0,0,.04)' : '#fff', cursor: 'pointer' }}
            onFocus={e => { e.target.style.borderColor = 'var(--a5)'; }}
            onBlur={e  => { e.target.style.borderColor = errors.subject ? '#c0392b' : 'var(--line)'; }}
          >
            <option value="">Select a subject</option>
            {subjects.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          {errors.subject && <p style={errorStyle}>{errors.subject}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>Message <span style={{ color: 'var(--a5)' }}>*</span></label>
        <textarea
          name="message" value={formData.message} onChange={handleChange}
          rows={5} placeholder="Tell us how we can help…"
          style={{ ...fieldStyle(errors.message), resize: 'vertical' }}
          onFocus={e => { e.target.style.borderColor = 'var(--a5)'; }}
          onBlur={e  => { e.target.style.borderColor = errors.message ? '#c0392b' : 'var(--line)'; }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          {errors.message
            ? <p style={errorStyle}>{errors.message}</p>
            : <span />}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--soft)', letterSpacing: '0.1em' }}>
            {formData.message.length}/2000
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary btn-lg"
        style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
      >
        {status === 'loading' ? (
          <>
            <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid var(--g9)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            Sending…
          </>
        ) : 'Send Message →'}
      </button>

      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', color: 'var(--soft)', textAlign: 'center', textTransform: 'uppercase' }}>
        We&apos;ll never share your information
      </p>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}