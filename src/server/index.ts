import express from 'express';
import Stripe from 'stripe';

const app = express();
const port = process.env.PORT || 3000;

// Initialize Stripe with secret key from .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27' as const, // Using a stable version
});

// Route for creating checkout sessions
app.post('/api/stripe/checkout', express.json(), async (req, res) => {
  try {
    const { priceId } = req.body as { priceId: string };
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: 'https://your-vercel-domain.com/success',
      cancel_url: 'https://your-vercel-domain.com/cancel',
    });
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout session creation failed:', error);
    res.status(500).json({ error: 'Checkout session creation failed' });
  }
});

// Webhook handler
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'] as string | string[] | undefined;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  
  if (!sig) {
    return res.status(400).send('Missing stripe-signature header');
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Payment succeeded for session:', session.id);
      // Handle subscription activation
      break;
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription updated:', subscription.id);
      // Handle subscription changes
      break;
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription canceled:', subscription.id);
      // Handle subscription cancellation
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

app.listen(port, () => {
  console.log(`✅ Stripe API server running on port ${port}`);
});