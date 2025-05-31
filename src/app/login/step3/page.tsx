'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SHA256 from 'crypto-js/sha256';

export default function Step3() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const username = localStorage.getItem('login-username');
    const secureWord = localStorage.getItem('secure-word');
    const issuedAt = parseInt(localStorage.getItem('secure-word-issuedAt') || '0', 10);

    if (!username || !secureWord || !issuedAt) {
      setError('Session expired. Please start over.');
      router.push('/login/step1');
      return;
    }

    // Check if secure word is still valid
    const now = Date.now();
    if (now - issuedAt > 60_000) {
      setError('Secure word expired. Please start over.');
      router.push('/login/step1');
      return;
    }

    try {
      const hashedPassword = SHA256(password).toString();

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, hashedPassword, secureWord, issuedAt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store mock token/session (in real case: cookie or secure storage)
      localStorage.setItem('auth-token', data.token);
      router.push('/login/mfa'); // Go to MFA step
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center text-gray-700">Step 3: Enter Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 mb-3 border rounded text-gray-900 placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
