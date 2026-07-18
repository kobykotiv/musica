import express, { Request, Response } from 'express';
import { Stripe } from 'stripe';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-06-24',  // Updated to match expected format
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
});

app.use(express.json());

app.post('/webhook', async (req: Request, res: Response) => {
  try {
    const event = await stripe.webhooks.constructEvent(
      req.body, req.headers['stripe-signature'] as string,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    // Handle the event
    switch (event.type) {
      case 'setup_intent.created':
        // Handle setup intent creation
        console.log('Setup intent created:', event.data.object);
        break;
      case 'checkout.session.completed':
        // Handle successful payment
        console.log('Payment completed:', event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).send(`Webhook Error: ${errorMessage}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});