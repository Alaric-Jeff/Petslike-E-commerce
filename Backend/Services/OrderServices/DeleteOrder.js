import OrderModel from '../../Models/OrderModel.js'
import logger from '../../Utils/logger.js';

async function DeleteOrder(orderId){
    try{
        
        const order = await OrderModel.findByPk(orderId);

        if(!order){
            logger.error("Order not found with ID: ", orderId);
            throw new error("Order not found");
        }

        await order.destroy();
        logger.info("Order deleted successfully with ID: ", orderId);
    }catch(err){
        logger.error("Error occurred in deleting order in services, reason: ", err);
        throw err;
    }
}

export default DeleteOrder;