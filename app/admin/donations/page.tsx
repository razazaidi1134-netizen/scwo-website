import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getDonationSettings } from '@/actions';
import { DonationSettingsForm } from '@/components/admin/SettingsForms';

export default async function DonationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const settings = await getDonationSettings() as any;

  return (
    <div>
      <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a5)', marginBottom: '8px' }}>— Admin / Donations</div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 400, color: 'var(--g9)', letterSpacing: '-0.02em', margin: 0 }}>
          Donation <em style={{ fontStyle: 'italic', color: 'var(--a5)' }}>Settings</em>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--soft)', marginTop: '6px' }}>
          Configure donation amounts, payment details, and messaging.
        </p>
      </div>
      <DonationSettingsForm settings={settings} />
    </div>
  );
}