import CreatePaymentIntentController from "../../Controllers/StripePaymentController/CreatePaymentIntent.js";
import PaymentCancellationController from "../../Controllers/StripePaymentController/PaymentCancellationController.js";
import PaymentConfirmationController from "../../Controllers/StripePaymentController/PaymentConfimation.js";
import PaymentStatusCheckController from "../../Controllers/StripePaymentController/PaymentStatusCheck.js";
import RefundPaymentController from "../../Controllers/StripePaymentController/RefundPayment.js";

import express from 'express';

const router = express.Router();

router
    .post('/create-payment-intent', CreatePaymentIntentController)
    .post('/confirm-payment', PaymentConfirmationController)
    .post('/cancel-payment', PaymentCancellationController)
    .post('/check-payment-status', PaymentStatusCheckController)
    .post('/refund-payment', RefundPaymentController);

export default router;



