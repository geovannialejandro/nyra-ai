import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PRICE_TO_CREDITS: Record<string, number> = {
  'price_1U43QBIALhl7T1t8KYbUmqcm': 5,
  'price_1U43XmIALhl7T1t8ERlZgZAF': 20,
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id!;

    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    });
    const priceId = fullSession.line_items?.data[0]?.price?.id;
    const creditsToAdd = priceId ? PRICE_TO_CREDITS[priceId] || 0 : 0;

    if (creditsToAdd > 0) {
      await supabase.rpc('add_credits', { p_user_id: userId, p_amount: creditsToAdd });
    }
  }

  return NextResponse.json({ received: true });
}
