import {GetAllitemsInCart} from "../../Services/CartServices/GetAllItems.js";
import logger from "../../Utils/logger.js";

const GetAllItemsController = async (req, res) => {

    const {userId, cartId} = req.params;
    if(!userId || !cartId) {
        logger.info("Invalid or missing userId or cartId in GetAllItemsController");
        return res.status(400).json({
            message: "Invalid or missing userId or cartId",
            success: false
        });
    }
    try{
        await GetAllitemsInCart(cartId, userId)
            .then(async (items) => {
                if(items.length === 0) {
                    logger.info("No items found in cart for userId: ", userId, " and cartId: ", cartId);
                    return res.status(404).json({
                        message: "No items found in cart",
                        success: false
                    });
                }
                logger.info("Retrieved all items in cart for userId: ", userId, " and cartId: ", cartId);
                return res.status(200).json({
                    message: "Items retrieved successfully",
                    success: true,
                    data: items
                });
            });

    }catch(err){
        logger.error("Error in GetAllItemsController: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export default GetAllItemsController;