import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getSiteSettings } from '@/actions';
import { SiteSettingsForm } from '@/components/admin/SettingsForms';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const settings = await getSiteSettings() as any;

  return (
    <div>
      <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '8px' }}>— Admin / Settings</div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 400, color: 'var(--g9)', letterSpacing: '-0.02em', margin: 0 }}>
          Site <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>Settings</em>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--soft)', marginTop: '6px' }}>
          Organization info, contact details, social links, and SEO defaults.
        </p>
      </div>
      <SiteSettingsForm settings={settings} />
    </div>
  );
}