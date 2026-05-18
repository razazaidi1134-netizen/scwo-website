'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateDonationSettings, updateSiteSettings } from '@/actions';
import ImageUpload from './ImageUpload';

const fieldStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '2px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', color: 'var(--ink)', background: '#fff', outline: 'none' };
const labelStyle: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--g8)', display: 'block', marginBottom: '8px' };
const sectionStyle: React.CSSProperties = { background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '28px 32px' };

// ─── DONATION SETTINGS FORM ───────────────────────────────────────────────

export function DonationSettingsForm({ settings }: { settings: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [qrImage, setQrImage] = useState(settings?.qrImage || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.set('qrImage', qrImage);
    await updateDonationSettings(fd);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>

          {/* Suggested amounts */}
          <div style={sectionStyle}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '16px' }}>Suggested Amounts (PKR)</div>
            <label style={labelStyle}>Comma-separated amounts</label>
            <input name="suggestedAmounts" defaultValue={settings?.suggestedAmounts?.join(', ') || '500, 1000, 2500, 5000, 10000'} style={fieldStyle} placeholder="500, 1000, 2500, 5000, 10000" />
            <p style={{ fontSize: '12px', color: 'var(--soft)', marginTop: '6px' }}>These will appear as clickable pills on the donation form.</p>
          </div>

          {/* Bank details */}
          <div style={sectionStyle}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '20px' }}>Bank Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div><label style={labelStyle}>Bank Name</label><input name="bankName" defaultValue={settings?.bankName || ''} style={fieldStyle} /></div>
              <div><label style={labelStyle}>Account Title</label><input name="accountTitle" defaultValue={settings?.accountTitle || ''} style={fieldStyle} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div><label style={labelStyle}>Account Number</label><input name="accountNumber" defaultValue={settings?.accountNumber || ''} style={fieldStyle} /></div>
              <div><label style={labelStyle}>IBAN</label><input name="iban" defaultValue={settings?.iban || ''} style={fieldStyle} /></div>
            </div>
          </div>

          {/* Mobile wallets */}
          <div style={sectionStyle}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '20px' }}>Mobile Wallets</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div><label style={labelStyle}>EasyPaisa Number</label><input name="easypaisaNumber" defaultValue={settings?.easypaisaNumber || ''} style={fieldStyle} /></div>
              <div><label style={labelStyle}>JazzCash Number</label><input name="jazzcashNumber" defaultValue={settings?.jazzcashNumber || ''} style={fieldStyle} /></div>
            </div>
          </div>

          {/* Donation message */}
          <div style={{ ...sectionStyle, borderBottom: '1px solid var(--line)' }}>
            <label style={labelStyle}>Donation CTA Message</label>
            <textarea name="donationMessage" defaultValue={settings?.donationMessage || ''} rows={3} style={{ ...fieldStyle, resize: 'vertical' }} />
          </div>
        </div>

        {/* Sidebar — QR image */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{ background: '#fff', border: '1px solid var(--line)', padding: '24px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '16px' }}>Payment QR Code</div>
            <ImageUpload value={qrImage} onChange={setQrImage} label="Upload QR Code" />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            {saved ? '✓ Saved!' : loading ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </div>
    </form>
  );
}

// ─── SITE SETTINGS FORM ───────────────────────────────────────────────────

export function SiteSettingsForm({ settings }: { settings: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await updateSiteSettings(fd);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <div style={sectionStyle}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '20px' }}>Organization Info</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div><label style={labelStyle}>Site Name</label><input name="siteName" defaultValue={settings?.siteName || ''} style={fieldStyle} required /></div>
            <div><label style={labelStyle}>Tagline</label><input name="tagline" defaultValue={settings?.tagline || ''} style={fieldStyle} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div><label style={labelStyle}>Contact Email</label><input name="contactEmail" type="email" defaultValue={settings?.contactEmail || ''} style={fieldStyle} /></div>
            <div><label style={labelStyle}>Office Address</label><input name="officeAddress" defaultValue={settings?.officeAddress || ''} style={fieldStyle} /></div>
          </div>
        </div>
        <div style={sectionStyle}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '20px' }}>Phone Numbers (one per line)</div>
          <textarea name="phoneNumbers" defaultValue={settings?.phoneNumbers?.join('\n') || ''} rows={3} style={{ ...fieldStyle, resize: 'vertical' }} placeholder="+92 300 9267605&#10;+92 330 2164412" />
        </div>
        <div style={sectionStyle}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '20px' }}>Social Links</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div><label style={labelStyle}>Facebook</label><input name="facebook" defaultValue={settings?.socialLinks?.facebook || ''} style={fieldStyle} /></div>
            <div><label style={labelStyle}>Instagram</label><input name="instagram" defaultValue={settings?.socialLinks?.instagram || ''} style={fieldStyle} /></div>
            <div><label style={labelStyle}>YouTube</label><input name="youtube" defaultValue={settings?.socialLinks?.youtube || ''} style={fieldStyle} /></div>
          </div>
        </div>
        <div style={{ ...sectionStyle, borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '20px' }}>Default SEO</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <div><label style={labelStyle}>Default SEO Title</label><input name="seoTitle" defaultValue={settings?.seoDefault?.title || ''} style={fieldStyle} /></div>
            <div><label style={labelStyle}>Default SEO Description</label><textarea name="seoDescription" defaultValue={settings?.seoDefault?.description || ''} rows={2} style={{ ...fieldStyle, resize: 'vertical' }} /></div>
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ marginTop: '8px', alignSelf: 'flex-start' }}>
          {saved ? '✓ Saved!' : loading ? 'Saving…' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}

export default DonationSettingsForm;