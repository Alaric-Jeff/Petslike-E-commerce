import express from 'express';
import CreatePaymentIntentController from '../Controllers/StripePaymentController/CreatePaymentIntent.js';
import PaymentConfirmationController from '../Controllers/StripePaymentController/PaymentConfimation.js';
import PaymentCancellationController from '../Controllers/StripePaymentController/PaymentCancellationController.js';
import PaymentStatusCheckController from '../Controllers/StripePaymentController/PaymentStatusCheck.js';
import RefundPaymentController from '../Controllers/StripePaymentController/RefundPayment.js';
import WebHookHandler from '../Controllers/StripePaymentController/WebHookHandler.js';

const router = express.Router();

// Payment Intent routes
router.post('/create-payment-intent', CreatePaymentIntentController);
router.post('/confirm-payment', PaymentConfirmationController);
router.post('/cancel-payment', PaymentCancellationController);
router.post('/check-status', PaymentStatusCheckController);

// Refund routes
router.post('/refund', RefundPaymentController);

// Webhook route (no authentication needed)
router.post('/webhook', WebHookHandler);

export default router; 