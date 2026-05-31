import type { Metadata } from 'next';
import { Fraunces, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://scwo-website.vercel.app'),
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
    url: 'https://scwo-website.vercel.app',
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
  url: 'https://scwo-website.vercel.app',
  logo: 'https://scwo-website.vercel.app/logo.png',
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
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
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
