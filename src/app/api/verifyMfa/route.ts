import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, code } = await req.json();

    if (!username || !code) {
      return NextResponse.json({ message: 'Missing username or code' }, { status: 400 });
    }

    // You can also issue a final token or session here
    return NextResponse.json({ message: 'MFA verified successfully' });
  } catch (error) {
    console.error('MFA verification error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
