import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { ContactMessage } from '@/models/ContactMessage';
import MessageTable from '@/components/admin/MessageTable';

export default async function MessagesPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'admin') {
    redirect('/admin/login');
  }

  await connectDB();
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(100).lean();

  return (
    <div>
      {/* Page header */}
      <div style={{
        paddingBottom: '24px',
        marginBottom: '32px',
        borderBottom: '1px solid var(--line)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--a5)',
            marginBottom: '8px',
          }}>
            — Admin / Messages
          </div>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 400,
            color: 'var(--g9)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: 0,
          }}>
            Contact <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>Messages</em>
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--soft)', marginTop: '6px' }}>
            Manage inquiries from website visitors
          </p>
        </div>

        {/* Stats pill */}
        <div style={{
          background: 'var(--g9)',
          padding: '12px 20px',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', display: 'block', animation: 'blink 2s infinite' }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--a4)',
          }}>
            Inbox Active
          </span>
        </div>
      </div>

      <MessageTable initialMessages={JSON.parse(JSON.stringify(messages))} />

      <style>{`@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.3;} }`}</style>
    </div>
  );
}