import DeleteItem from "../../Services/CartServices/DeleteItem.js";
import logger from "../../Utils/logger.js";

const DeleteItemController = async (req, res) => {

    const { cartItemId } = req.params;

    if(!cartItemId) {
        logger.info("Invalid or missing cartItemId in DeleteItemController");
        return res.status(400).json({
            message: "Invalid or missing cartItemId",
            success: false
        });
    }

    try{
        await DeleteItem(cartItemId);
        logger.info("Item deleted successfully in controller for cartItemId: ", cartItemId);
        return res.status(200).json({
            message: "Item deleted successfully",
            success: true
        });
    }catch(err){
        logger.error("Error in DeleteItemController: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export default DeleteItemController;    