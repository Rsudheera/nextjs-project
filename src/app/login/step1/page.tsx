'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Step1() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/getSecureWord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to get secure word');
      }

      // Store username and secure word in localStorage or pass via search params/state
      localStorage.setItem('login-username', username);
      localStorage.setItem('secure-word', data.secureWord);
      localStorage.setItem('secure-word-issuedAt', data.issuedAt);

      // Redirect to step 2
      router.push('/login/step2');
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center text-gray-700">Step 1: Enter Username</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 mb-3 border rounded text-gray-900 placeholder-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700"
            disabled={loading}
          >
            {loading ? 'Requesting...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
