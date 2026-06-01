'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { Gallery, TeamMember, DonationSettings, SiteSettings } from '@/models';
import { ContactMessage } from '@/models/ContactMessage';
import { GallerySchema, TeamMemberSchema, DonationSettingsSchema, SiteSettingsSchema } from '@/types/schemas';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

// ─── GALLERY ──────────────────────────────────────────────────────────────

export async function getGalleryItems(category?: string) {
  await connectDB();
  const filter = category ? { published: true, category } : { published: true };
  return Gallery.find(filter).sort({ eventDate: -1 }).lean();
}

export async function getGalleryItemBySlug(slug: string) {
  await connectDB();
  return Gallery.findOne({ slug, published: true }).lean();
}

export async function getAllGalleryItems() {
  await connectDB();
  return Gallery.find().sort({ createdAt: -1 }).lean();
}

export async function createGalleryItem(formData: FormData) {
  await connectDB();
  const title = formData.get('title') as string;
  const raw = {
    title,
    slug:          formData.get('slug') as string || slugify(title),
    description:   formData.get('description') as string || '',
    category:      formData.get('category') as string,
    images:        (formData.get('images') as string || '').split(',').filter(Boolean),
    featuredImage: formData.get('featuredImage') as string || '',
    eventDate:     formData.get('eventDate') as string || new Date().toISOString(),
    location:      formData.get('location') as string || 'Karachi, Sindh',
    published:     formData.get('published') === 'true',
    videoUrls:     (formData.get('videoUrls') as string || '').split(',').filter(Boolean),
    mediaType:     (formData.get('mediaType') as string) || 'images',
  };
  const validated = GallerySchema.safeParse(raw);
  if (!validated.success) return { error: validated.error.flatten().fieldErrors };
  try {
    await Gallery.create(validated.data);
    revalidatePath('/admin/gallery');
    revalidatePath('/gallery');
    return { success: true };
  } catch (e: any) {
    if (e.code === 11000) return { error: { slug: ['Slug already exists'] } };
    return { error: { _: ['Failed to create activity'] } };
  }
}

export async function updateGalleryItem(id: string, formData: FormData) {
  await connectDB();
  const raw = {
    title:         formData.get('title') as string,
    slug:          formData.get('slug') as string,
    description:   formData.get('description') as string || '',
    category:      formData.get('category') as string,
    images:        (formData.get('images') as string || '').split(',').filter(Boolean),
    featuredImage: formData.get('featuredImage') as string || '',
    eventDate:     formData.get('eventDate') as string,
    location:      formData.get('location') as string || 'Karachi, Sindh',
    published:     formData.get('published') === 'true',
    videoUrls:     (formData.get('videoUrls') as string || '').split(',').filter(Boolean),
    mediaType:     (formData.get('mediaType') as string) || 'images',
  };
  const validated = GallerySchema.safeParse(raw);
  if (!validated.success) return { error: validated.error.flatten().fieldErrors };
  await Gallery.findByIdAndUpdate(id, validated.data);
  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
  return { success: true };
}

export async function deleteGalleryItem(id: string) {
  await connectDB();
  await Gallery.findByIdAndDelete(id);
  revalidatePath('/admin/gallery');
  return { success: true };
}

export async function toggleGalleryPublished(id: string, published: boolean) {
  await connectDB();
  await Gallery.findByIdAndUpdate(id, { published });
  revalidatePath('/admin/gallery');
  return { success: true };
}

// ─── TEAM ─────────────────────────────────────────────────────────────────

export async function getTeamMembers() {
  await connectDB();
  return TeamMember.find({ published: true }).sort({ displayOrder: 1 }).lean();
}

export async function getAllTeamMembers() {
  await connectDB();
  return TeamMember.find().sort({ displayOrder: 1 }).lean();
}

export async function createTeamMember(formData: FormData) {
  await connectDB();
  const raw = {
    name:         formData.get('name') as string,
    designation:  formData.get('designation') as string,
    bio:          formData.get('bio') as string || '',
    image:        formData.get('image') as string || '',
    socialLinks: {
      facebook:  formData.get('facebook') as string || '',
      instagram: formData.get('instagram') as string || '',
      linkedin:  formData.get('linkedin') as string || '',
    },
    displayOrder: Number(formData.get('displayOrder')) || 0,
    published:    formData.get('published') === 'true',
  };
  const validated = TeamMemberSchema.safeParse(raw);
  if (!validated.success) return { error: validated.error.flatten().fieldErrors };
  await TeamMember.create(validated.data);
  revalidatePath('/admin/team');
  revalidatePath('/team');
  return { success: true };
}

export async function updateTeamMember(id: string, formData: FormData) {
  await connectDB();
  const raw = {
    name:         formData.get('name') as string,
    designation:  formData.get('designation') as string,
    bio:          formData.get('bio') as string || '',
    image:        formData.get('image') as string || '',
    socialLinks: {
      facebook:  formData.get('facebook') as string || '',
      instagram: formData.get('instagram') as string || '',
      linkedin:  formData.get('linkedin') as string || '',
    },
    displayOrder: Number(formData.get('displayOrder')) || 0,
    published:    formData.get('published') === 'true',
  };
  const validated = TeamMemberSchema.safeParse(raw);
  if (!validated.success) return { error: validated.error.flatten().fieldErrors };
  await TeamMember.findByIdAndUpdate(id, validated.data);
  revalidatePath('/admin/team');
  return { success: true };
}

export async function deleteTeamMember(id: string) {
  await connectDB();
  await TeamMember.findByIdAndDelete(id);
  revalidatePath('/admin/team');
  return { success: true };
}

// ─── DONATIONS ────────────────────────────────────────────────────────────

export async function getDonationSettings() {
  await connectDB();
  let settings = await DonationSettings.findOne().lean();
  if (!settings) {
    settings = await DonationSettings.create({
      suggestedAmounts: [500, 1000, 2500, 5000, 10000],
      donationMessage: 'Your contribution helps SCWO serve communities across Sindh.',
    });
  }
  return settings;
}

export async function updateDonationSettings(formData: FormData) {
  await connectDB();
  const amountsRaw = formData.get('suggestedAmounts') as string;
  const raw = {
    suggestedAmounts: amountsRaw ? amountsRaw.split(',').map(Number).filter(n => !isNaN(n)) : [500, 1000, 2500, 5000, 10000],
    bankName:         formData.get('bankName') as string || '',
    accountTitle:     formData.get('accountTitle') as string || '',
    accountNumber:    formData.get('accountNumber') as string || '',
    iban:             formData.get('iban') as string || '',
    easypaisaNumber:  formData.get('easypaisaNumber') as string || '',
    jazzcashNumber:   formData.get('jazzcashNumber') as string || '',
    qrImage:          formData.get('qrImage') as string || '',
    donationMessage:  formData.get('donationMessage') as string || '',
  };
  const validated = DonationSettingsSchema.safeParse(raw);
  if (!validated.success) return { error: validated.error.flatten().fieldErrors };
  await DonationSettings.findOneAndUpdate({}, validated.data, { upsert: true });
  revalidatePath('/admin/donations');
  revalidatePath('/contact');
  return { success: true };
}

// ─── SITE SETTINGS ────────────────────────────────────────────────────────

export async function getSiteSettings() {
  await connectDB();
  let settings = await SiteSettings.findOne().lean();
  if (!settings) {
    settings = await SiteSettings.create({
      siteName: 'Sindh Citizen Welfare Organization',
      tagline: 'Humanity Comes First',
      phoneNumbers: ['+92 300 9267605', '+92 330 2164412'],
    });
  }
  return settings;
}

export async function updateSiteSettings(formData: FormData) {
  await connectDB();
  const raw = {
    siteName:     formData.get('siteName') as string,
    tagline:      formData.get('tagline') as string || '',
    contactEmail: formData.get('contactEmail') as string || '',
    phoneNumbers: (formData.get('phoneNumbers') as string || '').split('\n').map(s => s.trim()).filter(Boolean),
    socialLinks: {
      facebook:  formData.get('facebook') as string || '',
      instagram: formData.get('instagram') as string || '',
      youtube:   formData.get('youtube') as string || '',
    },
    officeAddress: formData.get('officeAddress') as string || '',
    seoDefault: {
      title:       formData.get('seoTitle') as string || '',
      description: formData.get('seoDescription') as string || '',
    },
  };
  const validated = SiteSettingsSchema.safeParse(raw);
  if (!validated.success) return { error: validated.error.flatten().fieldErrors };
  await SiteSettings.findOneAndUpdate({}, validated.data, { upsert: true });
  revalidatePath('/admin/settings');
  return { success: true };
}

// ─── MESSAGES ─────────────────────────────────────────────────────────────

export async function getMessages(filter?: { isRead?: boolean }) {
  await connectDB();
  const query = filter?.isRead !== undefined ? { isRead: filter.isRead } : {};
  return ContactMessage.find(query).sort({ createdAt: -1 }).limit(200).lean();
}

export async function markMessageRead(id: string, isRead: boolean) {
  await connectDB();
  await ContactMessage.findByIdAndUpdate(id, { isRead });
  revalidatePath('/admin/messages');
  return { success: true };
}

export async function deleteMessage(id: string) {
  await connectDB();
  await ContactMessage.findByIdAndDelete(id);
  revalidatePath('/admin/messages');
  return { success: true };
}

export async function getDashboardStats() {
  await connectDB();
  const [programs, gallery, team, messages, unread] = await Promise.all([
    (await import('@/models')).Program.countDocuments(),
    Gallery.countDocuments(),
    TeamMember.countDocuments(),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ isRead: false }),
  ]);
  return { programs, gallery, team, messages, unread };
}