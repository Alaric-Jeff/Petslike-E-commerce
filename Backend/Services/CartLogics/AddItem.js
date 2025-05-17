import CartItemModel from "../../Models/CartItemModel.js";
import logger from "../../Utils/logger.js";

async function AddItem(productId, cartId, quantity){
    try{
        await CartItemModel.create({
            productId,
            cartId,
            quantity
        });
        logger.info("Item added to cart successfully");
    }catch(err){
        logger.error("Error in AddItem: ", err);
        throw err;
    }
};

export default AddItem;
