import stripe from "../../Config/stripConfig.js";
import logger from "../../Utils/logger.js";
import ChangeStatusService from "../../Services/PaymentServices/ChangePaymentStatusService.js";
import { catchAsync } from "../../Utils/catchAsync.js";

const PaymentCancellationController = catchAsync(async (req, res)=> {

    const{paymentIntentId} = req.body;

    if(!paymentIntentId){
        logger.info("Payment intent id is missing")
        return res.status(400).json({
            success: false,
            message: "Missing payment intent id"
        })
    }

    try{
        const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);

        if(!paymentIntent){
            logger.info("Payment intent not found")
            return res.status(404).json({
                success: false,
                message: "Payment intent not found"
            })
        }

        await ChangeStatusService(paymentIntent.id, paymentIntent.status);

        logger.info("Cancellation of payment intent is successful")

        return res.status(200).json({
            message: "Successfully canceled payment",
            success: true,
            paymentIntentId: paymentIntent.id,
            status: paymentIntent.status
        })

    }catch(err){
        logger.error("Stripe error in payment cancellation, reason: ", err)
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
});

export default PaymentCancellationController