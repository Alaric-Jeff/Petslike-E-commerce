import PaymentModel from '../../Models/PaymentModel.js';
import logger from '../../Utils/logger.js';

async function CreatePaymentIntentService(userId, paymentIntentId, status, currency, amount){
    try{
        await PaymentModel.create({
            userId,
            paymentIntentId,
            status,
            currency,
            amount
        })
        logger.info("Succesfully stored intent in the database")
        return;
    }catch(err){
        logger.error("Failed to store the intent in the database")
        throw new err;
    }
}

export default CreatePaymentIntentService