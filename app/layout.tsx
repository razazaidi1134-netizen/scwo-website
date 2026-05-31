import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://sindhcitizenwelfare.org'),
  title: {
    default: 'Sindh Citizen Welfare Organization (SCWO) | NGO in Karachi Pakistan',
    template: '%s | SCWO',
  },
  description: 'SCWO is a humanitarian NGO in Karachi, Pakistan providing healthcare, education, women empowerment, legal aid, and social welfare services across Sindh.',
  keywords: ['NGO in Karachi', 'welfare organization in Pakistan', 'Sindh welfare organization', 'humanitarian NGO Sindh', 'women empowerment NGO Pakistan', 'education NGO Karachi', 'legal aid NGO Pakistan', 'social welfare organization Karachi'],
  authors: [{ name: 'Sindh Citizen Welfare Organization' }],
  creator: 'SCWO',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'Sindh Citizen Welfare Organization (SCWO) | NGO in Karachi Pakistan',
    description: 'Humanity Comes First. Empowering Communities Across Sindh Through Healthcare, Education & Welfare.',
    type: 'website',
    url: 'https://sindhcitizenwelfare.org',
    siteName: 'Sindh Citizen Welfare Organization',
    locale: 'en_PK',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sindh Citizen Welfare Organization - Humanity Comes First',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sindh Citizen Welfare Organization (SCWO) | NGO in Karachi',
    description: 'Humanity Comes First. Empowering Communities Across Sindh Through Healthcare, Education & Welfare.',
    images: ['/og-image.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Sindh Citizen Welfare Organization',
  alternateName: 'SCWO',
  url: 'https://sindhcitizenwelfare.org',
  logo: 'https://sindhcitizenwelfare.org/logo.png',
  description: 'A humanitarian NGO in Karachi, Pakistan providing healthcare, education, women empowerment, legal aid, and social welfare services across Sindh.',
  foundingDate: '2024',
  founder: { '@type': 'Person', name: 'Nadia Bano' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Office #1-A, 1/2 Falak Avenue, Nazimabad #01',
    addressLocality: 'Karachi',
    addressRegion: 'Sindh',
    addressCountry: 'PK',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-300-9267605',
    contactType: 'customer service',
    availableLanguage: ['English', 'Urdu'],
  },
  sameAs: [
    'https://www.facebook.com/sindhcitizenwelfare/',
    'https://www.instagram.com/sindhcitizenwelfareorg/',
    'https://www.youtube.com/@sindhcitizenwelfare',
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
