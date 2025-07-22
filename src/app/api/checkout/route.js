import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(req) {
  const body = await req.json();
  const { title, id, price } = body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: title,
            },
            unit_amount: price * 100, // in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/gallery`,
      metadata: {
        paintingId: id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
