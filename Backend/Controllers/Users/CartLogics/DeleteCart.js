import DeleteCart from '../../../Services/CartLogics/DeleteCart.js'
import logger from '../../../Utils/logger.js'

const DeleteCartController = async (req, res) => {

    const { cartId } = req.body;

    if (!cartId) {
        logger.info("Incomplete fields");
        return res.status(400).json({
            success: false,
            message: "Incomplete fields"
        })
    }
    try{
        await DeleteCart(cartId);
        logger.info("Cart deleted successfully");
        return res.status(200).json({
            success: true,
            message: "Cart deleted successfully"
        });
    }catch(err){
        logger.error("Error occured in DeleteCartController, error: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

export default DeleteCartController;