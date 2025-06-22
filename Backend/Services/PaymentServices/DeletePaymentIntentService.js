import PaymentModel from '../../Models/PaymentModel.js';
import logger from '../../Utils/logger.js';

async function DeletePaymentIntentService(paymentId){
    try{
        await PaymentModel.destroy({
            where: {
                paymentId
            }
        })
        logger.info("Successfully deleted payment id: ", paymentId)
        return;
    }catch(err){
        logger("Failed to delete payment in the database, reason: ", err)
        throw new err;
    }
}