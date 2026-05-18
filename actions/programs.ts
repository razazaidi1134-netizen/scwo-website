'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { Program } from '@/models';
import { ProgramSchema } from '@/types/schemas';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export async function getPrograms() {
  await connectDB();
  return Program.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
}

export async function getProgramBySlug(slug: string) {
  await connectDB();
  return Program.findOne({ slug }).lean();
}

export async function createProgram(formData: FormData) {
  await connectDB();

  const raw = {
    title:            formData.get('title') as string,
    slug:             formData.get('slug') as string || slugify(formData.get('title') as string),
    shortDescription: formData.get('shortDescription') as string,
    fullDescription:  formData.get('fullDescription') as string || '',
    featuredImage:    formData.get('featuredImage') as string || '',
    icon:             formData.get('icon') as string || '🤝',
    seoTitle:         formData.get('seoTitle') as string || '',
    seoDescription:   formData.get('seoDescription') as string || '',
    published:        formData.get('published') === 'true',
    displayOrder:     Number(formData.get('displayOrder')) || 0,
  };

  const validated = ProgramSchema.safeParse(raw);
  if (!validated.success) return { error: validated.error.flatten().fieldErrors };

  try {
    await Program.create(validated.data);
    revalidatePath('/admin/programs');
    revalidatePath('/projects');
    return { success: true };
  } catch (e: any) {
    if (e.code === 11000) return { error: { slug: ['Slug already exists'] } };
    return { error: { _: ['Failed to create program'] } };
  }
}

export async function updateProgram(id: string, formData: FormData) {
  await connectDB();

  const raw = {
    title:            formData.get('title') as string,
    slug:             formData.get('slug') as string,
    shortDescription: formData.get('shortDescription') as string,
    fullDescription:  formData.get('fullDescription') as string || '',
    featuredImage:    formData.get('featuredImage') as string || '',
    icon:             formData.get('icon') as string || '🤝',
    seoTitle:         formData.get('seoTitle') as string || '',
    seoDescription:   formData.get('seoDescription') as string || '',
    published:        formData.get('published') === 'true',
    displayOrder:     Number(formData.get('displayOrder')) || 0,
  };

  const validated = ProgramSchema.safeParse(raw);
  if (!validated.success) return { error: validated.error.flatten().fieldErrors };

  try {
    await Program.findByIdAndUpdate(id, validated.data);
    revalidatePath('/admin/programs');
    revalidatePath('/projects');
    return { success: true };
  } catch {
    return { error: { _: ['Failed to update program'] } };
  }
}

export async function deleteProgram(id: string) {
  await connectDB();
  await Program.findByIdAndDelete(id);
  revalidatePath('/admin/programs');
  revalidatePath('/projects');
  return { success: true };
}

export async function toggleProgramPublished(id: string, published: boolean) {
  await connectDB();
  await Program.findByIdAndUpdate(id, { published });
  revalidatePath('/admin/programs');
  revalidatePath('/projects');
  return { success: true };
}