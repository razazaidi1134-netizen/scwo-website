import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

export const metadata: Metadata = {
  title: 'Sindh Citizen Welfare Organization (SCWO) | NGO in Karachi Pakistan',
  description: 'SCWO is a humanitarian NGO in Karachi, Pakistan providing healthcare, education, women empowerment, legal aid, and social welfare services across Sindh.',
  keywords: ['NGO in Karachi', 'welfare organization in Pakistan', 'Sindh welfare organization', 'humanitarian NGO Sindh', 'women empowerment NGO Pakistan', 'education NGO Karachi', 'legal aid NGO Pakistan', 'social welfare organization Karachi'],
  openGraph: {
    title: 'Sindh Citizen Welfare Organization (SCWO) | NGO in Karachi Pakistan',
    description: 'Humanity Comes First. Empowering Communities Across Sindh Through Healthcare, Education & Welfare.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,500&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}