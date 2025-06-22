import AddItem from "../../Services/CartServices/AddItem.js";
import logger from "../../Utils/logger.js";

const AddItemController = async (req, res) => {

    const{ productId, cartId, quantity, totalPrice } = req.body;

    if(!productId || !cartId || !quantity || !totalPrice){
        logger.info("Invalid or missing parameters in AddItemController");
        return res.status(400).json({
            message: "Invalid or missing parameters",
            success: false
        });
    }

    try{
        await AddItem(productId, cartId, quantity, totalPrice);
        logger.info("Item added to cart successfully in controller for productId: ", productId);
        return res.status(200).json({
            message: "Item added to cart successfully",
            success: true
        });
    }catch(err){
        logger.error("Error in AddItemController: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export default AddItemController;