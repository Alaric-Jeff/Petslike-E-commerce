import CartModel from "../../Models/CartModel.js";
import logger from "../../Utils/logger.js";

async function CreateCart(userId){
    try{
        await CartModel.create({
            userId,
            status: "active",
            totalAmount: 0.00
        });
        
        logger.info("Cart created successfully in services for userId: ", userId);
        return;
    }catch(err){
        logger.error("Error in CreateCart: ", err);
        throw err;
    }
};

export default CreateCart;