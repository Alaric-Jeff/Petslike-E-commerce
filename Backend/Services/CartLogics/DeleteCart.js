import CartModel from "../../Models/CartModel.js";
import logger from "../../Utils/logger.js";

async function DeleteCart(cartId){
    try{
        await CartModel.destroy({
            where: {
                cartId: cartId
            }
        })
        logger.info("Successfully deleted cart it: ", cartId)
    }catch(err){
        logger.error(`Error in deleting cart ${cartId}, reason: ${err.message}`)
        throw err;
    }
}

export default DeleteCart;