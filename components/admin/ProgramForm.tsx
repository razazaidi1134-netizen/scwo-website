'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProgram, updateProgram } from '@/actions/programs';
import ImageUpload from './ImageUpload';

const ICONS = ['🏥','🎓','💻','✂️','⚖️','🌊','🤝','🌾','👩','🏫','💊','🚑','📚','🌍'];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

const fieldStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px',
  border: '1px solid var(--line)', borderRadius: '2px',
  fontFamily: "'Manrope', sans-serif", fontSize: '14px', color: 'var(--ink)',
  background: '#fff', outline: 'none',
};
const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
  letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--g8)',
  display: 'block', marginBottom: '8px',
};

export default function ProgramForm({ program }: { program?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [title, setTitle] = useState(program?.title || '');
  const [slug, setSlug] = useState(program?.slug || '');
  const [icon, setIcon] = useState(program?.icon || '🤝');
  const [featuredImage, setFeaturedImage] = useState(program?.featuredImage || '');
  const [published, setPublished] = useState(program?.published || false);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!program) setSlug(slugify(v));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const fd = new FormData(e.currentTarget);
    fd.set('icon', icon);
    fd.set('featuredImage', featuredImage);
    fd.set('published', String(published));

    const result = program
      ? await updateProgram(program._id, fd)
      : await createProgram(fd);

    setLoading(false);
    if (result?.error) { setErrors(result.error as any); return; }
    router.push('/admin/programs');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>

        {/* Main fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>

          {/* Title + Slug */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '28px 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Title <span style={{ color: 'var(--a5)' }}>*</span></label>
                <input name="title" value={title} onChange={e => handleTitleChange(e.target.value)} style={fieldStyle} placeholder="Healthcare Hub" required />
                {errors.title && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px' }}>{errors.title[0]}</p>}
              </div>
              <div>
                <label style={labelStyle}>Slug <span style={{ color: 'var(--a5)' }}>*</span></label>
                <input name="slug" value={slug} onChange={e => setSlug(e.target.value)} style={fieldStyle} placeholder="healthcare-hub" required />
                {errors.slug && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px' }}>{errors.slug[0]}</p>}
              </div>
            </div>
          </div>

          {/* Short description */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '28px 32px' }}>
            <label style={labelStyle}>Short Description <span style={{ color: 'var(--a5)' }}>*</span></label>
            <textarea name="shortDescription" defaultValue={program?.shortDescription || ''} rows={3}
              style={{ ...fieldStyle, resize: 'vertical' }} placeholder="Brief description shown on program cards..." required />
            {errors.shortDescription && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px' }}>{errors.shortDescription[0]}</p>}
          </div>

          {/* Full description */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '28px 32px' }}>
            <label style={labelStyle}>Full Description</label>
            <textarea name="fullDescription" defaultValue={program?.fullDescription || ''} rows={8}
              style={{ ...fieldStyle, resize: 'vertical' }} placeholder="Detailed program description for the program detail page..." />
          </div>

          {/* SEO */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', padding: '28px 32px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '20px' }}>SEO Settings</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>SEO Title</label>
                <input name="seoTitle" defaultValue={program?.seoTitle || ''} style={fieldStyle} placeholder="Healthcare Hub | SCWO" />
              </div>
              <div>
                <label style={labelStyle}>Display Order</label>
                <input name="displayOrder" type="number" defaultValue={program?.displayOrder || 0} style={fieldStyle} />
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <label style={labelStyle}>SEO Description</label>
              <textarea name="seoDescription" defaultValue={program?.seoDescription || ''} rows={2}
                style={{ ...fieldStyle, resize: 'vertical' }} placeholder="SEO meta description..." />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>

          {/* Publish */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '24px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '16px' }}>Visibility</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: 'var(--g7)' }} />
              <span style={{ fontSize: '14px', color: 'var(--g9)', fontWeight: 600 }}>Published (Live)</span>
            </label>
            <p style={{ fontSize: '12px', color: 'var(--soft)', marginTop: '8px', lineHeight: 1.6 }}>
              Unchecked = Draft. Drafts are not visible on the website.
            </p>
          </div>

          {/* Icon picker */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '24px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '16px' }}>Icon</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {ICONS.map(i => (
                <button key={i} type="button" onClick={() => setIcon(i)} style={{
                  width: 38, height: 38, fontSize: '20px',
                  border: `2px solid ${icon === i ? 'var(--a5)' : 'var(--line)'}`,
                  borderRadius: '2px', background: icon === i ? 'var(--a1)' : '#fff',
                  cursor: 'pointer',
                }}>{i}</button>
              ))}
            </div>
          </div>

          {/* Featured image */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', padding: '24px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '16px' }}>Featured Image</div>
            <ImageUpload value={featuredImage} onChange={setFeaturedImage} />
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            {loading ? 'Saving…' : program ? 'Update Program' : 'Create Program'}
          </button>
        </div>
      </div>
    </form>
  );
}