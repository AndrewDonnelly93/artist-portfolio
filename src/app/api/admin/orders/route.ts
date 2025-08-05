import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function GET() {
  try {
    const payments = await stripe.paymentIntents.list({ limit: 1000 }); // last 1000 payments

    const simplifiedPayments = payments.data.map((p) => ({
      id: p.id,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      customer_email: p.receipt_email ?? null,
      created: p.created,
      metadata: p.metadata,
    }));

    return NextResponse.json(simplifiedPayments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}
