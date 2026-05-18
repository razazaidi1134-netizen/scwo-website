'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLogin() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,   // ← MUST be false to avoid redirect loop
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else if (result?.ok) {
      // Manual redirect after successful login
      window.location.href = '/admin/dashboard';
    }
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: '#fff',
    border: '1px solid var(--line)',
    borderRadius: '2px',
    fontFamily: "'Manrope', sans-serif",
    fontSize: '14px',
    color: 'var(--ink)',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'var(--g8)',
    display: 'block',
    marginBottom: '8px',
    fontWeight: 500,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--g9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 60% 40%, rgba(212,160,23,.12) 0%, transparent 55%)' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fff', border: '2px solid var(--a5)', overflow: 'hidden', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/logo.png" alt="SCWO" width={72} height={72} style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a4)', marginBottom: '8px' }}>Admin Portal</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '32px', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}>
            SCWO <em style={{ fontStyle: 'italic', color: 'var(--a4)' }}>Dashboard</em>
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.5)', marginTop: '8px' }}>Sign in to manage your organization</p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: '2px', border: '1px solid var(--line)', overflow: 'hidden' }}>

          {/* Card header */}
          <div style={{ background: 'var(--paper)', padding: '14px 32px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--a5)', display: 'block' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)' }}>Secure Login</span>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Error */}
            {error && (
              <div style={{ padding: '14px 18px', background: 'rgba(192,57,43,.05)', border: '1px solid rgba(192,57,43,.25)', borderLeft: '3px solid #c0392b', borderRadius: '2px', fontSize: '13px', color: '#c0392b' }}>
                ⚠ {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@sindhcitizenwelfare.org"
                required
                style={fieldStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--a5)'; }}
                onBlur={e  => { e.target.style.borderColor = 'var(--line)'; }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={fieldStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--a5)'; }}
                onBlur={e  => { e.target.style.borderColor = 'var(--line)'; }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? 'var(--g8)' : 'var(--g9)',
                color: '#fff',
                border: 'none',
                borderRadius: '2px',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />
                  Signing in…
                </>
              ) : 'Sign In →'}
            </button>
          </form>

          {/* Footer */}
          <div style={{ padding: '14px 32px', borderTop: '1px solid var(--line)', background: 'var(--paper)', textAlign: 'center' }}>
            <Link href="/" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--soft)', textDecoration: 'none' }}>
              ← Back to Website
            </Link>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)' }}>
          Sindh Citizen Welfare Organization · Secured
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}