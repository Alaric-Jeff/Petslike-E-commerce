import DeleteCart from "../../Services/CartLogics/DeleteCart.js";
import logger from "../../../Utils/logger.js";

const DeleteCartController = async (req, res) => {

    const { cartId } = req.params;

    if(!cartId) {
        logger.info("Invalid or missing cartId in DeleteCartController");
        return res.status(400).json({
            message: "Invalid or missing cartId",
            success: false
        });
    }

    try{
        await DeleteCart(cartId);
        logger.info("Cart deleted successfully in controller for cartId: ", cartId);
        return res.status(200).json({
            message: "Cart deleted successfully",
            success: true
        });
    }catch(err){
        logger.error("Error in DeleteCartController: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export default DeleteCartController;    