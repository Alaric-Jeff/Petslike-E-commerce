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
        logger.info("status: ", status)
        logger.error("Failed to store the intent in the database, datas: ", {
            userId,
            paymentIntentId,
            status,
            currency,
            amount,
        
        })
        logger.error("Error occurred while storing payment intent in the database: ", err);
        throw err;
    }
}

export default CreatePaymentIntentService