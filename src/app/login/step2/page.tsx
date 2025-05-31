'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Step2() {
  const router = useRouter();
  const [secureWord, setSecureWord] = useState('');
  const [username, setUsername] = useState('');
  const [issuedAt, setIssuedAt] = useState(0);
  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    const storedWord = localStorage.getItem('secure-word');
    const storedUsername = localStorage.getItem('login-username');
    const storedIssuedAt = localStorage.getItem('secure-word-issuedAt');

    if (!storedWord || !storedIssuedAt || !storedUsername) {
      router.push('/login/step1'); // fallback to step 1 if missing data
      return;
    }

    setSecureWord(storedWord);
    setUsername(storedUsername);
    const issuedAtTime = parseInt(storedIssuedAt, 10);
    setIssuedAt(issuedAtTime);

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - issuedAtTime) / 1000);
      const timeLeft = 60 - elapsed;
      setRemainingTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  const handleNext = () => {
    if (remainingTime <= 0) {
      alert('Secure word has expired. Please restart login.');
      router.push('/login/step1');
    } else {
      router.push('/login/step3');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <h1 className="text-xl font-semibold mb-4 text-gray-700">Step 2: Secure Word</h1>
        <p className="mb-2 text-gray-800">
          Hello, <span className="font-bold">{username}</span>
        </p>
        <p className="text-lg font-mono bg-gray-200 px-3 py-2 rounded inline-block mb-4 text-gray-900">
          {secureWord}
        </p>
        <p className={`text-sm mb-4 ${remainingTime <= 10 ? 'text-red-500' : 'text-gray-600'}`}>
          Secure word will expire in {remainingTime} seconds.
        </p>
        <button
          className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
