import { log } from "winston";
import CartItemModel from "../../Models/CartItemModel.js";
import logger from "../../Utils/logger.js";

async function DeleteItem(cartItemId){
    try{
        await CartItemModel.destroy({
            where: {
                cartItemId: cartItemId
            }
        })
        logger.info("Successfully deleted item")
    }catch(err){
        logger.error("Error in deleting item, reason: ", err)
        throw err;
    }
};

export default DeleteItem;