'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createGalleryItem, updateGalleryItem } from '@/actions';
import ImageUpload from './ImageUpload';
import Image from 'next/image';

const CATEGORIES = [
  'Healthcare Activities', 'Education Programs', 'Women Empowerment',
  'Volunteer Work', 'Food Distribution', 'Ambulance Services',
  'Community Events', 'Legal Aid Camps',
];

function slugify(t: string) { return t.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim(); }

const fieldStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '2px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', color: 'var(--ink)', background: '#fff', outline: 'none' };
const labelStyle: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--g8)', display: 'block', marginBottom: '8px' };

export default function GalleryForm({ item }: { item?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [title, setTitle] = useState(item?.title || '');
  const [slug, setSlug] = useState(item?.slug || '');
  const [featuredImage, setFeaturedImage] = useState(item?.featuredImage || '');
  const [images, setImages] = useState<string[]>(item?.images || []);
  const [published, setPublished] = useState(item?.published || false);
  const [addingImg, setAddingImg] = useState('');

  const addImage = (url: string) => { if (url) { setImages(prev => [...prev, url]); setAddingImg(''); } };
  const removeImage = (idx: number) => setImages(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const fd = new FormData(e.currentTarget);
    fd.set('featuredImage', featuredImage);
    fd.set('images', images.join(','));
    fd.set('published', String(published));

    const result = item ? await updateGalleryItem(item._id, fd) : await createGalleryItem(fd);
    setLoading(false);
    if (result?.error) { setErrors(result.error as any); return; }
    router.push('/admin/gallery');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>

          {/* Title, slug, category */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '28px 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Title <span style={{ color: 'var(--a5)' }}>*</span></label>
                <input name="title" value={title} onChange={e => { setTitle(e.target.value); if (!item) setSlug(slugify(e.target.value)); }} style={fieldStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Slug <span style={{ color: 'var(--a5)' }}>*</span></label>
                <input name="slug" value={slug} onChange={e => setSlug(e.target.value)} style={fieldStyle} required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Category <span style={{ color: 'var(--a5)' }}>*</span></label>
                <select name="category" defaultValue={item?.category || ''} style={{ ...fieldStyle, cursor: 'pointer' }} required>
                  <option value="">Select…</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Event Date</label>
                <input name="eventDate" type="date" defaultValue={item?.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : ''} style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>Location</label>
                <input name="location" defaultValue={item?.location || 'Karachi, Sindh'} style={fieldStyle} />
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '28px 32px' }}>
            <label style={labelStyle}>Description</label>
            <textarea name="description" defaultValue={item?.description || ''} rows={4} style={{ ...fieldStyle, resize: 'vertical' }} placeholder="Describe this welfare activity..." />
          </div>

          {/* Multi-image gallery */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', padding: '28px 32px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '20px' }}>
              Gallery Images ({images.length})
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {images.map((url, idx) => (
                <div key={idx} style={{ position: 'relative', aspectRatio: '1', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--line)' }}>
                  <Image src={url} alt="" fill style={{ objectFit: 'cover' }} sizes="120px" />
                  <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '4px', right: '4px', width: 22, height: 22, borderRadius: '2px', background: 'rgba(0,0,0,.7)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px' }}>✕</button>
                </div>
              ))}
            </div>
            <ImageUpload value={addingImg} onChange={url => { addImage(url); }} label="Add Image to Gallery" />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderBottom: 'none', padding: '24px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '16px' }}>Visibility</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--g7)' }} />
              <span style={{ fontSize: '14px', color: 'var(--g9)', fontWeight: 600 }}>Published</span>
            </label>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--line)', padding: '24px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '16px' }}>Featured Image</div>
            <ImageUpload value={featuredImage} onChange={setFeaturedImage} />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            {loading ? 'Saving…' : item ? 'Update Activity' : 'Create Activity'}
          </button>
        </div>
      </div>
    </form>
  );
}