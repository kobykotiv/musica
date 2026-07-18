# Stripe Webhook Endpoints Setup

## Test Environment (Development)

### 1. Create Test Webhook Endpoint
- Go to: https://dashboard.stripe.com/test/webhooks
- Click **"Add endpoint"**
- **URL**: `https://musica-inky-sigma.vercel.app/api/webhook` (or your local tunnel URL for testing)
- **Description**: `Test webhook for musica app - development`
- **Events to send**: Select these events:
  - `setup_intent.created`
  - `setup_intent.succeeded`
  - `setup_intent.setup_failed`
  - `checkout.session.completed`
  - `checkout.session.expired`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`

### 2. Get Test Signing Secret
- After creating, click **"Reveal"** next to **Signing secret**
- Copy the value (starts with `whsec_`)
- Add to `.env.local`:
  ```env
  STRIPE_WEBHOOK_SECRET=whsec_test_...
  ```

### 3. Thin Payload Handling
- Thin payloads contain minimal data (e.g., `data` field may only have `object.id`)
- Update handler logic to handle sparse data:
  ```ts
  // Example: Handle thin payload for setup_intent.created
  if (event.type === 'setup_intent.created') {
    const intentId = event.data.object.id;
    // Make additional API call to get full intent details if needed
    const fullIntent = await stripe.setupIntents.retrieve(intentId);
  }
  ```

## Production Environment

### 1. Create Production Webhook Endpoint
- Go to: https://dashboard.stripe.com/webhooks (live mode)
- Click **"Add endpoint"**
- **URL**: `https://musica-inky-sigma.vercel.app/api/webhook`
- **Description**: `Production webhook for musica app`
- **Events to send**: Same events as test environment

### 2. Get Production Signing Secret
- Click **"Reveal"** next to **Signing secret**
- Copy the value (starts with `whsec_`)
- Add to `.env.production`:
  ```env
  STRIPE_WEBHOOK_SECRET=whsec_live_...
  ```

## Thin Payload Best Practices
- Thin payloads reduce data transfer but require careful handling
- Always verify event type before processing
- Use `stripe.webhooks.constructEvent` to parse both thin and snapshot payloads
- Test with Stripe CLI: `stripe listen --forward-to http://localhost:3000/webhook`