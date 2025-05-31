'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Transaction = {
  date: string;
  referenceId: string;
  recipientName: string;
  recipientNote: string;
  transactionType: string;
  amount: string;
};

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('login-success');
    if (!isLoggedIn) {
      router.push('/');
      return;
    }

    const fetchTransactions = async () => {
      const res = await fetch('/api/transaction-history');
      const data = await res.json();
      setTransactions(data);
    };

    fetchTransactions();
  }, [router]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Reference ID</th>
              <th className="py-3 px-4">To</th>
              <th className="py-3 px-4">Transaction Type</th>
              <th className="py-3 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx} className="border-t text-sm text-gray-600">
                <td className="py-3 px-4 whitespace-nowrap">{tx.date}</td>
                <td className="py-3 px-4 whitespace-nowrap">{tx.referenceId}</td>
                <td className="py-3 px-4">
                  <div className="font-medium">{tx.recipientName}</div>
                  <div className="text-gray-500 text-xs">{tx.recipientNote}</div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">{tx.transactionType}</td>
                <td className="py-3 px-4 whitespace-nowrap">{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
