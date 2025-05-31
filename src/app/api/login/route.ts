import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, hashedPassword, secureWord, issuedAt } = await req.json();

    if (!username || !hashedPassword || !secureWord || !issuedAt) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const now = Date.now();
    if (now - issuedAt > 60_000) {
      return NextResponse.json({ message: 'Secure word expired' }, { status: 403 });
    }

    // Optionally validate the secureWord format, length, etc.

    const mockToken = `mock-jwt-${Date.now()}`;
    return NextResponse.json({ token: mockToken });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
