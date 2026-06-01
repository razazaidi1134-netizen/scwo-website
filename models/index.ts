import mongoose, { Schema, model, models, Document } from 'mongoose';

// ─── Re-export existing models ─────────────────────────────────────────────
export { ContactMessage } from './ContactMessage';
export { User } from './User';
export { Project } from './Project';

// ─── Program ───────────────────────────────────────────────────────────────
export interface IProgram extends Document {
  title: string; slug: string; shortDescription: string;
  fullDescription: string; featuredImage: string; icon: string;
  seoTitle: string; seoDescription: string;
  published: boolean; displayOrder: number;
}

const ProgramSchema = new Schema<IProgram>({
  title:            { type: String, required: true, trim: true },
  slug:             { type: String, required: true, unique: true, lowercase: true },
  shortDescription: { type: String, required: true },
  fullDescription:  { type: String, default: '' },
  featuredImage:    { type: String, default: '' },
  icon:             { type: String, default: '🤝' },
  seoTitle:         { type: String, default: '' },
  seoDescription:   { type: String, default: '' },
  published:        { type: Boolean, default: false },
  displayOrder:     { type: Number, default: 0 },
}, { timestamps: true });

export const Program = models.Program || model<IProgram>('Program', ProgramSchema);

// ─── Gallery ───────────────────────────────────────────────────────────────
export interface IGallery extends Document {
  title: string; slug: string; description: string; category: string;
  images: string[]; featuredImage: string; eventDate: Date;
  location: string; published: boolean;
  videoUrls: string[];
  mediaType: 'images' | 'videos' | 'both';
}

const GallerySchema = new Schema<IGallery>({
  title:         { type: String, required: true },
  slug:          { type: String, required: true, unique: true, lowercase: true },
  description:   { type: String, default: '' },
  category:      { type: String, required: true, enum: [
    'Healthcare Activities', 'Education Programs', 'Women Empowerment',
    'Volunteer Work', 'Food Distribution', 'Ambulance Services',
    'Community Events', 'Legal Aid Camps',
  ]},
  images:        [{ type: String }],
  featuredImage: { type: String, default: '' },
  eventDate:     { type: Date, default: Date.now },
  location:      { type: String, default: 'Karachi, Sindh' },
  published:     { type: Boolean, default: false },
  videoUrls:     [{ type: String }],
  mediaType:     { type: String, enum: ['images', 'videos', 'both'], default: 'images' },
}, { timestamps: true });

export const Gallery = (models.Gallery || model<IGallery>('Gallery', GallerySchema)) as mongoose.Model<IGallery>;

// ─── TeamMember ────────────────────────────────────────────────────────────
export interface ITeamMember extends Document {
  name: string; designation: string; bio: string; image: string;
  socialLinks: { facebook?: string; instagram?: string; linkedin?: string; };
  displayOrder: number; published: boolean;
}

const TeamMemberSchema = new Schema<ITeamMember>({
  name:         { type: String, required: true },
  designation:  { type: String, required: true },
  bio:          { type: String, default: '' },
  image:        { type: String, default: '' },
  socialLinks:  {
    facebook:  { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin:  { type: String, default: '' },
  },
  displayOrder: { type: Number, default: 0 },
  published:    { type: Boolean, default: false },
}, { timestamps: true });

export const TeamMember = models.TeamMember || model<ITeamMember>('TeamMember', TeamMemberSchema);

// ─── DonationSettings ──────────────────────────────────────────────────────
export interface IDonationSettings extends Document {
  suggestedAmounts: number[]; bankName: string; accountTitle: string;
  accountNumber: string; iban: string; easypaisaNumber: string;
  jazzcashNumber: string; qrImage: string; donationMessage: string;
}

const DonationSettingsSchema = new Schema<IDonationSettings>({
  suggestedAmounts: [{ type: Number }],
  bankName:         { type: String, default: '' },
  accountTitle:     { type: String, default: 'Sindh Citizen Welfare Organization' },
  accountNumber:    { type: String, default: '' },
  iban:             { type: String, default: '' },
  easypaisaNumber:  { type: String, default: '' },
  jazzcashNumber:   { type: String, default: '' },
  qrImage:          { type: String, default: '' },
  donationMessage:  { type: String, default: 'Your contribution helps SCWO serve communities across Sindh.' },
}, { timestamps: true });

export const DonationSettings = models.DonationSettings || model<IDonationSettings>('DonationSettings', DonationSettingsSchema);

// ─── SiteSettings ─────────────────────────────────────────────────────────
export interface ISiteSettings extends Document {
  siteName: string; tagline: string; logo: string; contactEmail: string;
  phoneNumbers: string[];
  socialLinks: { facebook: string; instagram: string; youtube: string; };
  officeAddress: string;
  seoDefault: { title: string; description: string; };
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  siteName:     { type: String, default: 'Sindh Citizen Welfare Organization' },
  tagline:      { type: String, default: 'Humanity Comes First' },
  logo:         { type: String, default: '/logo.png' },
  contactEmail: { type: String, default: 'info@sindhcitizenwelfare.org' },
  phoneNumbers: [{ type: String }],
  socialLinks: {
    facebook:  { type: String, default: 'https://www.facebook.com/sindhcitizenwelfare/' },
    instagram: { type: String, default: 'https://www.instagram.com/sindhcitizenwelfareorg/' },
    youtube:   { type: String, default: 'https://www.youtube.com/@sindhcitizenwelfare' },
  },
  officeAddress: { type: String, default: '1-A Falak Avenue, Nazimabad #01, Karachi' },
  seoDefault: {
    title:       { type: String, default: 'SCWO | Humanitarian NGO Karachi' },
    description: { type: String, default: 'SCWO is a humanitarian NGO in Karachi serving communities across Sindh.' },
  },
}, { timestamps: true });

export const SiteSettings = models.SiteSettings || model<ISiteSettings>('SiteSettings', SiteSettingsSchema);