import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      date: '24 Aug 2023',
      referenceId: '#834343434341',
      recipientName: 'Bloom Enterprise Sdn Bhd',
      recipientNote: 'Recipient references will go here',
      transactionType: 'DuitNow payment',
      amount: 'RM 1,200.00'
    },
    {
      date: '14 Jul 2023',
      referenceId: '#834343434342',
      recipientName: 'Muhammad Andy Asmawi',
      recipientNote: 'Recipient references will go here...',
      transactionType: 'DuitNow payment',
      amount: 'RM 54,810.16'
    },
    {
      date: '12 Jul 2023',
      referenceId: '#834343434343',
      recipientName: 'Utilities Company Sdn Bhd',
      recipientNote: 'Recipient references will go here',
      transactionType: 'DuitNow payment',
      amount: 'RM 100.00'
    }
  ]);
}