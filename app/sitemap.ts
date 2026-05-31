import type { MetadataRoute } from 'next';

const BASE = 'https://sindhcitizenwelfare.org';

const programSlugs = [
  'ambulance-health',
  'educational-centers',
  'computer-training',
  'industrial-homes',
  'women-works-hub',
  'legal-aid-hub',
  'social-welfare',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/projects`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contact`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
    ...programSlugs.map((slug) => ({
      url: `${BASE}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
