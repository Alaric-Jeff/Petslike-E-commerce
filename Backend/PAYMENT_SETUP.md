# Stripe Payment Integration Setup Guide

## Prerequisites

1. **Stripe Account**: Sign up at [stripe.com](https://stripe.com)
2. **API Keys**: Get your publishable and secret keys from Stripe Dashboard
3. **Webhook Endpoint**: Set up webhook endpoint in Stripe Dashboard

## Environment Variables

Add these to your `.env` file:

```env
# Stripe Configuration
STRIPE_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Setup Steps

### 1. Install Stripe Package
```bash
npm install stripe
```

### 2. Configure Webhook Endpoint
In your Stripe Dashboard:
1. Go to Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/payments/webhook`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
4. Copy the webhook signing secret to your `.env` file

### 3. Frontend Integration

#### Install Stripe.js
```html
<script src="https://js.stripe.com/v3/"></script>
```

#### Initialize Stripe
```javascript
const stripe = Stripe('pk_test_your_publishable_key_here');
```

#### Create Payment Form
```html
<form id="payment-form">
  <div id="card-element"></div>
  <button type="submit">Pay</button>
</form>
```

#### Handle Payment
```javascript
import { processPayment } from './payment-example.js';

const cardElement = elements.create('card');
cardElement.mount('#card-element');

document.getElementById('payment-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  try {
    const result = await processPayment(29.99, cardElement);
    if (result.success) {
      alert('Payment successful!');
    } else {
      alert('Payment failed!');
    }
  } catch (error) {
    console.error('Payment error:', error);
    alert('Payment failed: ' + error.message);
  }
});
```

## API Endpoints

### Payment Intent
- **POST** `/payments/create-payment-intent` - Create a new payment intent
- **POST** `/payments/confirm-payment` - Confirm a payment intent
- **GET** `/payments/payment-status/:paymentIntentId` - Get payment status

### Customer Management
- **POST** `/payments/create-customer` - Create a new customer
- **POST** `/payments/create-payment-method` - Create a payment method

### Refunds
- **POST** `/payments/refund` - Process a refund

### Webhooks
- **POST** `/payments/webhook` - Handle Stripe webhooks

## Request Examples

### Create Payment Intent
```javascript
const response = await fetch('/payments/create-payment-intent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_jwt_token'
  },
  body: JSON.stringify({
    amount: 29.99,
    currency: 'usd',
    metadata: {
      orderId: 'order_123',
      productId: 'prod_456'
    }
  })
});
```

### Confirm Payment
```javascript
const response = await fetch('/payments/confirm-payment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_jwt_token'
  },
  body: JSON.stringify({
    paymentIntentId: 'pi_1234567890',
    paymentMethodId: 'pm_1234567890'
  })
});
```

## Security Considerations

1. **Never expose secret keys** in frontend code
2. **Always verify webhook signatures** using the webhook secret
3. **Use HTTPS** in production
4. **Validate all input data** on the server
5. **Implement proper authentication** for all payment endpoints

## Testing

### Test Card Numbers
- **Success**: `4242424242424242`
- **Decline**: `4000000000000002`
- **Requires Authentication**: `4000002500003155`

### Test CVC
- Any 3-digit number (e.g., `123`)

### Test Expiry
- Any future date (e.g., `12/25`)

## Error Handling

The payment system includes comprehensive error handling:

```javascript
try {
  const result = await processPayment(amount, cardElement);
  // Handle success
} catch (error) {
  if (error.type === 'card_error') {
    // Handle card errors
    console.error('Card error:', error.message);
  } else if (error.type === 'validation_error') {
    // Handle validation errors
    console.error('Validation error:', error.message);
  } else {
    // Handle other errors
    console.error('Payment error:', error.message);
  }
}
```

## Production Checklist

- [ ] Use production Stripe keys
- [ ] Set up proper webhook endpoints
- [ ] Implement proper error handling
- [ ] Add logging for payment events
- [ ] Set up monitoring and alerts
- [ ] Test all payment flows
- [ ] Implement proper security measures
- [ ] Set up backup payment methods
- [ ] Configure proper CORS settings
- [ ] Set up SSL/TLS certificates

## Support

For issues with:
- **Stripe API**: Check [Stripe Documentation](https://stripe.com/docs)
- **Integration**: Check the example files in this project
- **Configuration**: Verify your environment variables and webhook setup 