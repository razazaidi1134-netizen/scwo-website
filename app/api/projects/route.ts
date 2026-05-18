import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Project } from '@/models/Project';

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({ isActive: true }).sort({ order: 1 }).lean();
    return NextResponse.json(JSON.parse(JSON.stringify(projects)));
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const { title, slug, description, shortDescription, icon, category, image, challenge, solution, futureVision, goals, order } = await request.json();

    if (!title || !description || !shortDescription || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const project = await Project.create({ title, slug: finalSlug, description, shortDescription, icon, category, image, challenge, solution, futureVision, goals, order });

    return NextResponse.json(JSON.parse(JSON.stringify(project)), { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create project' }, { status: 500 });
  }
}