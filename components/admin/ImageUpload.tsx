'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Upload Image' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('Image must be under 10MB'); return; }

    setUploading(true);
    setError('');

    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'scwo_uploads');
      fd.append('folder', 'scwo');

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: fd }
      );
      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        setError('Upload failed. Check Cloudinary config.');
      }
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      {/* Preview */}
      {value && (
        <div style={{ position: 'relative', marginBottom: '12px', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--line)' }}>
          <Image src={value} alt="Preview" width={280} height={160} style={{ objectFit: 'cover', width: '100%', height: '160px', display: 'block' }} />
          <button type="button" onClick={() => onChange('')} style={{
            position: 'absolute', top: '8px', right: '8px',
            width: 28, height: 28, borderRadius: '2px',
            background: 'rgba(0,0,0,.6)', color: '#fff', border: 'none',
            cursor: 'pointer', fontSize: '14px',
          }}>✕</button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        style={{
          border: '2px dashed var(--line)', borderRadius: '2px',
          padding: '24px', textAlign: 'center', cursor: 'pointer',
          background: uploading ? 'var(--paper)' : '#fff',
          transition: 'all .2s',
        }}
      >
        {uploading ? (
          <div style={{ fontSize: '13px', color: 'var(--soft)' }}>Uploading…</div>
        ) : (
          <>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>↑</div>
            <div style={{ fontSize: '13px', color: 'var(--soft)' }}>
              {value ? 'Replace image' : label} · Drop or click
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--soft)', opacity: 0.6, marginTop: '4px' }}>
              JPG, PNG, WEBP · Max 10MB
            </div>
          </>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

      {/* URL fallback */}
      <div style={{ marginTop: '12px' }}>
        <input
          type="text" value={value} onChange={e => onChange(e.target.value)}
          placeholder="Or paste image URL…"
          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line)', borderRadius: '2px', fontFamily: "'Manrope', sans-serif", fontSize: '12px', color: 'var(--soft)', background: '#fff', outline: 'none' }}
        />
      </div>

      {error && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '6px' }}>{error}</p>}
    </div>
  );
}