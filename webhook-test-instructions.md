# Testing Stripe Webhooks Locally

## 1. Set up a webhook endpoint in Stripe Dashboard

- **URL**: `https://musica-inky-sigma.vercel.app/api/webhook` (or the URL where your local server is running)
- **Description**: `Local test endpoint for setup_intent events`
- **Events to send**: Select the events you want to test (e.g., `setup_intent.created`, `checkout.session.completed`)

## 2. Get the Signing Secret

- After creating the endpoint, Stripe will show a **Signing secret** (starts with `whsec_`).
- Add it to your `.env.local` file:
  ```env
  STRIPE_WEBHOOK_SECRET=whsec_...
```
## 3. Run your server

- Start the server that handles the webhook:
  ```bash
  bun run src/server/index.ts
  ```

## 4. (Optional) Use Stripe CLI for automatic forwarding

If you have the Stripe CLI installed, you can forward events directly:
```bash
stripe listen --forward-to https://musica-inky-sigma.vercel.app/api/webhook
```
The CLI will provide a public URL that forwards events to your local endpoint and will automatically update the webhook endpoint URL in Stripe.

## 5. Verify in Dashboard

- In the Stripe Dashboard, you can view recent deliveries under **Developers → Webhooks → Logs**.
- Look for a `200 OK` response to confirm Stripe received a successful response from your endpoint.

### Helpful Description Example
When you create the endpoint, give it a clear description like:
`Local development webhook for music streaming app` 
so you can easily identify it later.