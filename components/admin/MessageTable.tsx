'use client';

import { useState } from 'react';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessageTable({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState<Message | null>(null);

  const markAsRead = async (id: string) => {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: true }),
    });
    if (res.ok) setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: true } : m));
  };

  const deleteMsg = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessages(prev => prev.filter(m => m._id !== id));
      if (selected?._id === id) setSelected(null);
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  // ── Empty state ──
  if (messages.length === 0) return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--line)',
      borderRadius: '2px',
      padding: '80px 32px',
      textAlign: 'center',
    }}>
      <div style={{
        width: 64, height: 64,
        borderRadius: '2px',
        background: 'var(--paper)',
        border: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
        fontSize: '28px',
      }}>✉</div>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '22px', fontWeight: 400, color: 'var(--g9)', marginBottom: '6px' }}>
        No messages yet
      </h3>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--soft)' }}>
        Contact form submissions will appear here
      </p>
    </div>
  );

  return (
    <>
      {/* Summary bar */}
      <div style={{
        display: 'flex',
        gap: '1px',
        background: 'var(--line)',
        borderRadius: '2px 2px 0 0',
        overflow: 'hidden',
        marginBottom: '1px',
      }}>
        {[
          { label: 'Total',  value: messages.length },
          { label: 'Unread', value: unreadCount },
          { label: 'Read',   value: messages.length - unreadCount },
        ].map(({ label, value }) => (
          <div key={label} style={{
            flex: 1,
            background: label === 'Unread' && unreadCount > 0 ? 'var(--g9)' : 'var(--paper)',
            padding: '16px 24px',
          }}>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '28px',
              color: label === 'Unread' && unreadCount > 0 ? 'var(--a4)' : 'var(--g9)',
              lineHeight: 1,
            }}>{value}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: label === 'Unread' && unreadCount > 0 ? 'rgba(255,255,255,.5)' : 'var(--soft)',
              marginTop: '4px',
            }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{
        background: '#fff',
        border: '1px solid var(--line)',
        borderRadius: '0 0 2px 2px',
        overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 1fr 120px 100px',
          gap: '0',
          background: 'var(--paper)',
          borderBottom: '1px solid var(--line)',
          padding: '0',
        }}>
          {['Status', 'From', 'Subject', 'Date', 'Actions'].map((col, i) => (
            <div key={col} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--soft)',
              padding: '12px 16px',
              textAlign: i === 4 ? 'right' : 'left',
            }}>{col}</div>
          ))}
        </div>

        {/* Rows */}
        {messages.map((msg) => (
          <div
            key={msg._id}
            onClick={() => { setSelected(msg); if (!msg.isRead) markAsRead(msg._id); }}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 1fr 120px 100px',
              borderBottom: '1px solid var(--line)',
              cursor: 'pointer',
              background: !msg.isRead ? 'rgba(212,160,23,.04)' : '#fff',
              transition: 'background .15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--paper)')}
            onMouseLeave={e => (e.currentTarget.style.background = !msg.isRead ? 'rgba(212,160,23,.04)' : '#fff')}
          >
            {/* Status */}
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
              {!msg.isRead ? (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: 'var(--a5)',
                  color: 'var(--g9)',
                  padding: '3px 8px',
                  borderRadius: '2px',
                  fontWeight: 700,
                }}>New</span>
              ) : (
                <span style={{ fontSize: '12px', color: 'var(--soft)', opacity: 0.4 }}>✓</span>
              )}
            </div>

            {/* From */}
            <div style={{ padding: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--g9)' }}>{msg.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--soft)', marginTop: '2px' }}>{msg.email}</div>
            </div>

            {/* Subject */}
            <div style={{ padding: '16px', fontSize: '14px', color: 'var(--soft)', alignSelf: 'center' }}>{msg.subject}</div>

            {/* Date */}
            <div style={{ padding: '16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--soft)', alignSelf: 'center' }}>
              {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>

            {/* Actions */}
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
              {!msg.isRead && (
                <button
                  onClick={(e) => { e.stopPropagation(); markAsRead(msg._id); }}
                  title="Mark as read"
                  style={{
                    width: 30, height: 30,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--line)',
                    borderRadius: '2px',
                    background: 'transparent',
                    color: 'var(--soft)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    transition: 'all .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--a5)'; e.currentTarget.style.color = 'var(--a5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--soft)'; }}
                >✓</button>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); deleteMsg(msg._id); }}
                title="Delete"
                style={{
                  width: 30, height: 30,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid var(--line)',
                  borderRadius: '2px',
                  background: 'transparent',
                  color: 'var(--soft)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  transition: 'all .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c0392b'; e.currentTarget.style.color = '#c0392b'; e.currentTarget.style.background = 'rgba(192,57,43,.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--soft)'; e.currentTarget.style.background = 'transparent'; }}
              >✕</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Message modal ── */}
      {selected && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(10,46,30,.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', zIndex: 50,
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '2px',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid var(--line)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div style={{
              padding: '20px 28px',
              borderBottom: '1px solid var(--line)',
              background: 'var(--g9)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--a4)',
                  marginBottom: '6px',
                }}>{selected.subject}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.7)' }}>
                  From: <strong style={{ color: '#fff' }}>{selected.name}</strong>
                  {' '}({selected.email}){selected.phone && ` · ${selected.phone}`}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  width: 32, height: 32, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,.15)',
                  borderRadius: '2px',
                  background: 'transparent',
                  color: 'rgba(255,255,255,.6)',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >✕</button>
            </div>

            {/* Modal body */}
            <div style={{ padding: '28px' }}>
              <p style={{ fontSize: '15px', color: 'var(--soft)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {selected.message}
              </p>
            </div>

            {/* Modal footer */}
            <div style={{
              padding: '16px 28px',
              borderTop: '1px solid var(--line)',
              background: 'var(--paper)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
              flexWrap: 'wrap',
            }}>
              {!selected.isRead && (
                <button
                  onClick={() => { markAsRead(selected._id); setSelected(null); }}
                  className="btn btn-outline"
                  style={{ borderColor: 'var(--a5)', color: 'var(--a5)' }}
                >
                  ✓ Mark as Read
                </button>
              )}
              <button
                onClick={() => deleteMsg(selected._id)}
                className="btn"
                style={{ border: '1px solid rgba(192,57,43,.4)', color: '#c0392b', background: 'transparent', borderRadius: '2px' }}
              >
                ✕ Delete
              </button>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="btn btn-primary"
              >
                Reply via Email →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}