import OrderModel from '../../Models/OrderModel.js'
import logger from '../../Utils/logger.js';

async function DeleteOrder(orderId){
    try{
        await OrderModel.destroy({
            where: {orderId: orderId}
        });      
    }catch(err){
        logger.error("Error occurred in deleting order in services, reason: ", err);
        throw err;
    }
}

export default DeleteOrder;