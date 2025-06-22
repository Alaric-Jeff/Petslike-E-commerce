import stripe from "../../Config/stripConfig.js";
import logger from "../../Utils/logger.js";
import { catchAsync } from "../../Utils/catchAsync.js";


const RefundPaymentController = catchAsync(async (req, res)=> {

      const { paymentIntentId, amount } = req.body;

        if(!paymentIntentId || !amount || amount <= 0 || isNaN(amount)){
            logger.info("Invalid payment intent id or amount, received: ", { paymentIntentId, amount });
            return res.status(400).json({
                message: "Payment ID or amount is invalid",
                success: false
            });
        }

    try{
        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
            amount: Math.round(amount * 100) 
        });

        if(!refund) {
            logger.info("Stripe error occurred while processing the refund");
            return res.status(400).json({
                message: "Error occurred while processing the refund",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            message: "Refund processed successfully",
            refundId: refund.id
        });
    }catch(err){
        logger.error("Error in refunding payment, reason: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})

export default RefundPaymentController; 