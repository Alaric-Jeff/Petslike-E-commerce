import CartItemModel from "../../Models/CartItemModel.js";
import logger from "../../Utils/logger.js";

async function AddItem(productId, cartId, quantity, totalPrice) {
    try {
        const [item, created] = await CartItemModel.findOrCreate({
            where: { productId, cartId },
            defaults: { quantity, totalPrice }
        });
        if (!created) {
            await item.update({ quantity: item.quantity + quantity, totalPrice: item.totalPrice + totalPrice });
            logger.info("Item quantity updated in cart");
        } else {
            logger.info("Item added to cart successfully");
        }
    } catch (err) {  
        logger.error("Error in AddItem: ", err);
        throw err;
    }
}

export default AddItem;
