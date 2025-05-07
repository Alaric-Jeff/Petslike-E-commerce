import OrderModel from '../Models/OrderModel.js'
import logger from '../Utils/logger.js';

async function CreateOrder(productId, productName, productQuantity, productPrice){
    try{
        await OrderModel.create({
            productId,
            productName,
            productQuantity,
            productPrice
        });
    }catch(err){
        logger.error(err);
        throw err;
    }
};

export default CreateOrder;