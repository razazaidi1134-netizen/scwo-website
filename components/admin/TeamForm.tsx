'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTeamMember, updateTeamMember } from '@/actions';
import ImageUpload from './ImageUpload';

const fieldStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '2px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', color: 'var(--ink)', background: '#fff', outline: 'none' };
const labelStyle: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--g8)', display: 'block', marginBottom: '8px' };

export default function TeamForm({ member }: { member?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [image, setImage] = useState(member?.image || '');
  const [published, setPublished] = useState(member?.published || false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const fd = new FormData(e.currentTarget);
    fd.set('image', image);
    fd.set('published', String(published));
    const result = member ? await updateTeamMember(member._id, fd) : await createTeamMember(fd);
    setLoading(false);
    if (result?.error) { setErrors(result.error as any); return; }
    router.push('/admin/team');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '28px 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Full Name <span style={{ color: 'var(--a5)' }}>*</span></label>
                <input name="name" defaultValue={member?.name || ''} style={fieldStyle} required />
                {errors.name && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px' }}>{errors.name[0]}</p>}
              </div>
              <div>
                <label style={labelStyle}>Designation <span style={{ color: 'var(--a5)' }}>*</span></label>
                <input name="designation" defaultValue={member?.designation || ''} style={fieldStyle} placeholder="President & Co-Founder" required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Bio</label>
                <textarea name="bio" defaultValue={member?.bio || ''} rows={4} style={{ ...fieldStyle, resize: 'vertical' }} />
              </div>
              <div>
                <label style={labelStyle}>Display Order</label>
                <input name="displayOrder" type="number" defaultValue={member?.displayOrder || 0} style={fieldStyle} />
              </div>
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--line)', padding: '28px 32px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '20px' }}>Social Links</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[{ name: 'facebook', label: 'Facebook URL' }, { name: 'instagram', label: 'Instagram URL' }, { name: 'linkedin', label: 'LinkedIn URL' }].map(({ name, label }) => (
                <div key={name}>
                  <label style={labelStyle}>{label}</label>
                  <input name={name} defaultValue={member?.socialLinks?.[name] || ''} style={fieldStyle} placeholder="https://..." />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '24px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '16px' }}>Visibility</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--g7)' }} />
              <span style={{ fontSize: '14px', color: 'var(--g9)', fontWeight: 600 }}>Published</span>
            </label>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--line)', padding: '24px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '16px' }}>Photo</div>
            <ImageUpload value={image} onChange={setImage} />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            {loading ? 'Saving…' : member ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </div>
    </form>
  );
}