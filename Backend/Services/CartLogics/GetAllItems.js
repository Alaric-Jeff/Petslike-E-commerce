import CartItemModel from "../../Models/CartItemModel.js";
import CartModel from "../../Models/CartModel.js";
import ProductModel from "../../Models/ProductModel.js";
import logger from "../../Utils/logger.js";

async function GetAllitemsInCart(cartId, userId){
    try{
        const items = await CartItemModel.findAll({
            include: [
                {
                    model: CartModel,
                    where: {
                        userId: userId,
                        id: cartId
                    }
                },
                {
                    model: ProductModel,
                    attributes: ["productId", "productName", "productStock", "productPrice", "productImage", "productBrand", "animalType", "dietCategory", "lifeStage", "productDescription"]
                }
            ]
        });

        logger.info("Retrieved all items in cart: ", cartId);
        return items;
    }catch(err){
        logger.error("Error in retrieving all items in cart: ", cartId);
        throw err;
    }
}

async function GetCartItemCount(cartId, userId) {
    try {
        const cart = await CartModel.findOne({
            where: {
                id: cartId,
                userId: userId
            },
            include: [{
                model: CartItemModel,
                attributes: ['id']
            }]
        });

        if (!cart) {
            throw new Error('Cart not found');
        }
        const itemCount = cart.CartItems ? cart.CartItems.length : 0;
        if (cart.itemCount !== itemCount) {
            await cart.update({ itemCount });
        }

        logger.info(`Retrieved item count for cart ${cartId}: ${itemCount}`);
        return itemCount;
    } catch (err) {
        logger.error(`Error in retrieving item count for cart ${cartId}: ${err.message}`);
        throw err;
    }
}

export { GetAllitemsInCart, GetCartItemCount };