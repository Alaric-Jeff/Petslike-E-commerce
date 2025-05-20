import { GetAllitemsInCart } from "../../../Services/CartLogics/GetAllItems.js";
import logger from "../../../Utils/logger.js";

const GetItemsController = async (req, res) => {
    const {cartId} = req.body;
    const {userId} = req.params;

    if(!cartId || !userId){
        logger.info("Incomplete fields");
        return res.status(400).json({
            success: false,
            message: "Incomplete fields"
        })
    }

    try{
        const items = await GetAllitemsInCart(cartId, userId);
        logger.info("Items retrieved successfully");
        return res.status(200).json({
            success: true,
            message: "Items retrieved successfully",
            items: items
        });
        
    }catch(err){
        logger.error("Error occured in GetItemsController, error: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }

};

export default GetItemsController;