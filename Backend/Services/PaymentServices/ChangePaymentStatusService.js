import PaymentModel from '../../Models/PaymentModel.js';
import logger from '../../Utils/logger.js';

async function ChangeStatusService(paymentId, status){
    try{
        const newStatus = await PaymentModel.update({
            where: {
                paymentId
            },
            status
        })

        logger.info("Successfully changed payment status in the database")
        return newStatus;

    }catch(err){
        logger.error("Failed to change the payment status in database, reason: ", err)
        throw new err;
    }
}

export default ChangeStatusService;