import { z } from 'zod';

export const ProgramSchema = z.object({
  title:            z.string().min(2, 'Title required'),
  slug:             z.string().min(2, 'Slug required').regex(/^[a-z0-9-]+$/, 'Slug: lowercase letters, numbers, hyphens only'),
  shortDescription: z.string().min(10, 'Short description required'),
  fullDescription:  z.string().optional().default(''),
  featuredImage:    z.string().optional().default(''),
  icon:             z.string().optional().default('🤝'),
  seoTitle:         z.string().optional().default(''),
  seoDescription:   z.string().optional().default(''),
  published:        z.boolean().optional().default(false),
  displayOrder:     z.number().optional().default(0),
});

export const GallerySchema = z.object({
  title:         z.string().min(2, 'Title required'),
  slug:          z.string().min(2).regex(/^[a-z0-9-]+$/),
  description:   z.string().optional().default(''),
  category:      z.enum([
    'Healthcare Activities', 'Education Programs', 'Women Empowerment',
    'Volunteer Work', 'Food Distribution', 'Ambulance Services',
    'Community Events', 'Legal Aid Camps',
  ]),
  images:        z.array(z.string()).optional().default([]),
  featuredImage: z.string().optional().default(''),
  eventDate:     z.string().optional(),
  location:      z.string().optional().default('Karachi, Sindh'),
  published:     z.boolean().optional().default(false),
  videoUrls:     z.array(z.string()).optional().default([]),
  mediaType:     z.enum(['images', 'videos', 'both']).optional().default('images'),
});

export const TeamMemberSchema = z.object({
  name:         z.string().min(2, 'Name required'),
  designation:  z.string().min(2, 'Designation required'),
  bio:          z.string().optional().default(''),
  image:        z.string().optional().default(''),
  socialLinks:  z.object({
    facebook:  z.string().optional().default(''),
    instagram: z.string().optional().default(''),
    linkedin:  z.string().optional().default(''),
  }).optional().default({ facebook: '', instagram: '', linkedin: '' }),
  displayOrder: z.number().optional().default(0),
  published:    z.boolean().optional().default(false),
});

export const DonationSettingsSchema = z.object({
  suggestedAmounts: z.array(z.number()).optional().default([500, 1000, 2500, 5000, 10000]),
  bankName:         z.string().optional().default(''),
  accountTitle:     z.string().optional().default(''),
  accountNumber:    z.string().optional().default(''),
  iban:             z.string().optional().default(''),
  easypaisaNumber:  z.string().optional().default(''),
  jazzcashNumber:   z.string().optional().default(''),
  qrImage:          z.string().optional().default(''),
  donationMessage:  z.string().optional().default(''),
});

export const SiteSettingsSchema = z.object({
  siteName:     z.string().min(2),
  tagline:      z.string().optional().default(''),
  contactEmail: z.string().email().optional().or(z.literal('')),
  phoneNumbers: z.array(z.string()).optional().default([]),
  socialLinks: z.object({
    facebook:  z.string().optional().default(''),
    instagram: z.string().optional().default(''),
    youtube:   z.string().optional().default(''),
  }).optional().default({ facebook: '', instagram: '', youtube: '' }),
  officeAddress: z.string().optional().default(''),
  seoDefault: z.object({
    title:       z.string().optional().default(''),
    description: z.string().optional().default(''),
  }).optional().default({ title: '', description: '' }),
});

export type ProgramInput       = z.infer<typeof ProgramSchema>;
export type GalleryInput        = z.infer<typeof GallerySchema>;
export type TeamMemberInput     = z.infer<typeof TeamMemberSchema>;
export type DonationSettingsInput = z.infer<typeof DonationSettingsSchema>;
export type SiteSettingsInput   = z.infer<typeof SiteSettingsSchema>;