import CartModel from "../../Models/CartModel.js";
import CartItemModel from "../../Models/CartItemModel.js";
import logger from "../../Utils/logger.js";

async function GetCarts(userId){
    try{
        const carts = await CartModel.findAll({
            where: {
                userId: userId
            },
            include: [{
                model: CartItemModel,
                attributes: ['cartId']
            }]
        }); 

        for(const cart of carts){
            const itemCount = cart.items?.length || 0;
            await cart.update({itemCount})
        }

        logger.info("Retrieved all carts for user: ", userId);
        return carts;
    }catch(err){
        logger.error("Error in retrieving all carts for user: ", userId);
        throw err;
    }
}

export default GetCarts;