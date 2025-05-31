'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const jwt = localStorage.getItem('auth-token');
    if (!jwt) {
      router.replace('/login/step1');
    } else {
      setToken(jwt);
    }
  }, [router]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-700 mb-6">You have successfully logged in using multi-step authentication.</p>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm text-gray-600">
            <strong>Your Token:</strong> {token}
          </p>
        </div>
      </div>
    </div>
  );
}
