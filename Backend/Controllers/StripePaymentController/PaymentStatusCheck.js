import stripe from "../../Config/stripConfig.js";
import logger from "../../Utils/logger.js";
import { catchAsync } from "../../Utils/catchAsync.js";

const PaymentStatusCheckController = catchAsync(async (req, res)=> {

    const{paymentIntentId} = req.body;

    if(!paymentIntentId){
        logger.info("payment intent id is invalid, received payment intent id: ", paymentIntentId)
        return res.status(400).json({
            message: "Payment ID is undefined",
            success: false
        })
    }

    try{
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

        if(!paymentIntent) {
            logger.info("Stripe error occured while checking the status of payment")
            return res.status(400).json({
                message: "Error occured while checking the payment status",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            message: "Successfully checked status of the payment",
            status: paymentIntent.status
        })

    }catch(err){
        logger.error("Stripe error in payment check status, reason: ", err)
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
});

export default PaymentStatusCheckController;
