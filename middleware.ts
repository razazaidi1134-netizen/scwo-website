import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Do nothing — auth is handled by getServerSession in each admin page/layout
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};