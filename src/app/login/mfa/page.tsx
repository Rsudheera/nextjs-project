'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MfaPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const username = typeof window !== 'undefined' ? localStorage.getItem('login-username') : '';

  useEffect(() => {
    if (!username) {
      router.push('/login/step1');
    }
  }, [username, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/verifyMfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAttemptsLeft((prev) => prev - 1);
        throw new Error(data.message || 'Verification failed');
      }

      // Save mock session token or flag
      localStorage.setItem('login-success', 'true');

      // Redirect to mock dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center text-gray-800">MFA Verification</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            pattern="\d*"
            placeholder="Enter 6-digit code"
            className="w-full px-3 py-2 mb-3 border rounded text-gray-900 placeholder-gray-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <p className="text-sm text-gray-600 mb-2">Attempts left: {attemptsLeft}</p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading || attemptsLeft <= 0}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
}
