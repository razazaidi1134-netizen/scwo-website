import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import { ContactMessage } from '@/models/ContactMessage';

// ⚠️ In-memory rate limit resets on cold starts — use Upstash Redis for production
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return true;
  }
  if (record.count >= 5) return false;
  record.count += 1;
  return true;
}

function sanitize(input: string): string {
  return input.replace(/[<>]/g, '').trim().slice(0, 2000);
}

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    await connectDB();
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json({ error: 'Message must be between 10 and 2000 characters.' }, { status: 400 });
    }

    await ContactMessage.create({
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone) : undefined,
      subject: sanitize(subject),
      message: sanitize(message),
      isRead: false,
    });

    return NextResponse.json({ success: true, message: 'Thank you! We will get back to you soon.' }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}