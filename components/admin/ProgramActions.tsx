'use client';

import { useState } from 'react';
import { deleteProgram, toggleProgramPublished } from '@/actions/programs';
import { useRouter } from 'next/navigation';

export default function ProgramActions({ id, published }: { id: string; published: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Delete this program? This cannot be undone.')) return;
    setLoading(true);
    await deleteProgram(id);
    router.refresh();
    setLoading(false);
  };

  const handleToggle = async () => {
    setLoading(true);
    await toggleProgramPublished(id, !published);
    router.refresh();
    setLoading(false);
  };

  return (
    <>
      <button onClick={handleToggle} disabled={loading} style={{
        fontSize: '12px', color: published ? 'var(--soft)' : 'var(--g7)',
        padding: '6px 10px', border: '1px solid var(--line)', borderRadius: '2px',
        background: 'transparent', cursor: 'pointer',
      }}>
        {published ? 'Unpublish' : 'Publish'}
      </button>
      <button onClick={handleDelete} disabled={loading} style={{
        fontSize: '12px', color: '#c0392b',
        padding: '6px 10px', border: '1px solid rgba(192,57,43,.3)', borderRadius: '2px',
        background: 'transparent', cursor: 'pointer',
      }}>✕</button>
    </>
  );
}