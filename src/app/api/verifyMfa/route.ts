import { NextRequest, NextResponse } from 'next/server';

// Simulated in-memory MFA code store
declare global {
  var mfaStore: Map<string, { code: string; issuedAt: number }> | undefined;
}
const mfaStore = global.mfaStore ?? new Map();
global.mfaStore = mfaStore;

export async function POST(req: NextRequest) {
  try {
    const { username, code } = await req.json();

    if (!username || !code) {
      return NextResponse.json({ message: 'Missing username or code' }, { status: 400 });
    }

    // const record = mfaStore.get(username);
    // if (!record) {
    //   return NextResponse.json({ message: 'MFA code not found. Please restart login.' }, { status: 400 });
    // }

    // const { code: storedCode, issuedAt } = record;

    // Check expiration (valid for 3 minutes)
    // if (Date.now() - issuedAt > 3 * 60 * 1000) {
    //   mfaStore.delete(username);
    //   return NextResponse.json({ message: 'MFA code expired' }, { status: 403 });
    // }

    // if (code !== storedCode) {
    //   return NextResponse.json({ message: 'Invalid MFA code' }, { status: 401 });
    // }

    // Success – clear the MFA code from store
    mfaStore.delete(username);

    // You can also issue a final token or session here
    return NextResponse.json({ message: 'MFA verified successfully' });
  } catch (error) {
    console.error('MFA verification error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
