import DeleteOrder from '../../../Services/OrderLogics/DeleteOrder.js';
import logger from '../../../Utils/logger.js';

const DeleteOrderController = async (req, res)=> {

    const{orderId} = req.body;  

    if(!orderId){
        logger.error("order id is undefined");
        return res.status(400).json({
            success: false,
            message: "Order ID is undefined"
        })
    }

    try{
        await DeleteOrder(orderId);
        logger.info("Order deleted successfully with ID: ", orderId);
        return res.status(200).json({
            success: true,
            message: `Successfully deleted order with ID: ${orderId}`
        })
    }catch(err){
        logger.error("Error in Delete Order Controller: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export default DeleteOrderController;