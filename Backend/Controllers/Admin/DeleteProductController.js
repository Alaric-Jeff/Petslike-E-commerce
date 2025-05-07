import { log } from "winston";
import DeleteProduct from "../../Services/DeleteProduct.js";
import logger from "../../Utils/logger.js";

const DeleteProductController = async (req, res) => {

    const {productId} = req.params;

    if(!productId){
        logger.debug("Product ID is missing in request");
        return res.status(400).json({
            success: false,
            message: "Product ID is required"
        });
    }

    try{
        await DeleteProduct(productId);
        logger.info("Product deleted successfully");
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }catch(err){
        logger.error("Error in DeleteProductController, reason: ", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

export default DeleteProductController;

