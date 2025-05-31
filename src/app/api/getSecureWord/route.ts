import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// In-memory store to simulate a session store
const store = new Map<
  string,
  { secureWord: string; issuedAt: number; lastRequestedAt: number }
>();

const SECRET = 'ruwan-secret-key';
const RATE_LIMIT_INTERVAL_MS = 10 * 1000; // 10 seconds

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { message: 'Invalid username' },
        { status: 400 }
      );
    }

    const now = Date.now();
    const existing = store.get(username);

    // Check rate limit
    if (existing && now - existing.lastRequestedAt < RATE_LIMIT_INTERVAL_MS) {
      return NextResponse.json(
        { message: 'You must wait before requesting a new secure word.' },
        { status: 429 }
      );
    }

    // Generate secure word using HMAC (username + timestamp + secret)
    const issuedAt = now;
    const hmac = crypto.createHmac('sha256', SECRET);
    hmac.update(username + issuedAt);
    const secureWord = hmac.digest('hex').substring(0, 6); // Shorten to 6 chars

    // Save to in-memory store
    store.set(username, {
      secureWord,
      issuedAt,
      lastRequestedAt: now,
    });

    return NextResponse.json({ secureWord, issuedAt });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
