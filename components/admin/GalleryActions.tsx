'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteGalleryItem, toggleGalleryPublished, deleteTeamMember } from '@/actions';

export function GalleryActions({ id, published }: { id: string; published: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <button onClick={async () => { setLoading(true); await toggleGalleryPublished(id, !published); router.refresh(); setLoading(false); }}
        disabled={loading} style={{ padding: '8px 10px', border: '1px solid var(--line)', borderRadius: '2px', background: 'transparent', fontSize: '12px', color: published ? 'var(--soft)' : 'var(--g7)', cursor: 'pointer' }}>
        {published ? 'Unpublish' : 'Publish'}
      </button>
      <button onClick={async () => { if (!confirm('Delete?')) return; setLoading(true); await deleteGalleryItem(id); router.refresh(); setLoading(false); }}
        disabled={loading} style={{ padding: '8px 10px', border: '1px solid rgba(192,57,43,.3)', borderRadius: '2px', background: 'transparent', fontSize: '12px', color: '#c0392b', cursor: 'pointer' }}>
        ✕
      </button>
    </>
  );
}

export function TeamActions({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <button onClick={async () => { if (!confirm('Delete team member?')) return; setLoading(true); await deleteTeamMember(id); router.refresh(); setLoading(false); }}
      disabled={loading} style={{ padding: '6px 12px', border: '1px solid rgba(192,57,43,.3)', borderRadius: '2px', background: 'transparent', fontSize: '12px', color: '#c0392b', cursor: 'pointer' }}>
      ✕ Delete
    </button>
  );
}

export default GalleryActions;