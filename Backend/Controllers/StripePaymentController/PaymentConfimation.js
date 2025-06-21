import stripe from "../../Config/stripConfig.js";
import logger from "../../Utils/logger.js";
import { catchAsync } from "../../Utils/catchAsync.js";

const PaymentConfirmationController = catchAsync(async (req, res)=> {

    const { paymentIntentId, paymentMethodId } = req.body

    if(!paymentIntentId || !paymentMethodId){
        logger.warn("Incomplete required fields in payment confirmation")
        return res.status(400).json({
            message: "Payment Intent ID and Payment Method ID are required",
            success: false
        })
    }

    try{
        const paymentIntent = await stripe.paymentIntents.confirm(
            paymentIntentId,
            { payment_method: paymentMethodId }
        );

        logger.info(`Payment intent ${paymentIntent.id} confirmed with status: ${paymentIntent.status}`);

        res.status(200).json({
            success: true,
            status: paymentIntent.status,
            paymentIntent
        });
        
    }catch(err){
        logger.error('Stripe payment confirmation error', {
            error: err.message,
            type: err.type,
            paymentIntentId
        });

        return res.status(500).json({
            message: err.message || "Internal server error during payment confirmation",
            success: false
        });
    }
});

export default PaymentConfirmationController;