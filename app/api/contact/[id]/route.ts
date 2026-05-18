import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { ContactMessage } from '@/models/ContactMessage';

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any).role === 'admin';
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!await checkAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const body = await request.json();
  const message = await ContactMessage.findByIdAndUpdate(params.id, { isRead: body.isRead }, { new: true });
  if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (!await checkAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const message = await ContactMessage.findByIdAndDelete(params.id);
  if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}