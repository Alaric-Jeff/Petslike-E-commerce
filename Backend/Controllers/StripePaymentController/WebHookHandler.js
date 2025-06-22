import stripe from "../../Config/stripConfig.js";
import logger from "../../Utils/logger.js";
import { catchAsync } from "../../Utils/catchAsync.js";
import dotenv from "dotenv";
dotenv.config();

const WebHookHandler = catchAsync(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !endpointSecret) {
        logger.error("Missing stripe signature or webhook secret");
        return res.status(400).json({
            success: false,
            message: "Invalid webhook request"
        });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        logger.error("Webhook signature verification failed:", err.message);
        return res.status(400).json({
            success: false,
            message: "Webhook signature verification failed"
        });
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            logger.info("Payment succeeded:", paymentIntent.id);
            // TODO: Update your database with payment success
            break;
            
        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            logger.warn("Payment failed:", failedPayment.id);
            // TODO: Update your database with payment failure
            break;
            
        case 'payment_intent.canceled':
            const canceledPayment = event.data.object;
            logger.info("Payment canceled:", canceledPayment.id);
            // TODO: Update your database with payment cancellation
            break;
            
        default:
            logger.info(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
});

export default WebHookHandler;