import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string; // lucide-react icon name
  category: 'healthcare' | 'education' | 'women-empowerment' | 'legal-aid' | 'welfare' | 'digital-skills' | 'entrepreneurship';
  image?: string;
  challenge?: string;
  solution?: string;
  futureVision?: string;
  goals?: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true, maxlength: 200 },
  icon: { type: String, default: 'heart' },
  category: { 
    type: String, 
    required: true,
    enum: ['healthcare', 'education', 'women-empowerment', 'legal-aid', 'welfare', 'digital-skills', 'entrepreneurship']
  },
  image: { type: String },
  challenge: { type: String },
  solution: { type: String },
  futureVision: { type: String },
  goals: [{ type: String }],
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Prevent model recompilation in dev
export const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);