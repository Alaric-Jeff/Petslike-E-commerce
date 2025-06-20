import UpdateProduct from "../../Services/ProductLogics/UpdateProduct.js";
import logger from "../../../Utils/logger.js";

const UpdateProductController = async (req, res) => {
    const{productId, FormData} = req.body;

    if(!productId || !FormData){
        logger.info("Invalid or missing productId in UpdateProductController");
        return res.status(400).json({
            message: "Invalid or missing productId",
            success: false
        });
    }

    try{
        await UpdateProduct(productId, FormData);
        logger.info("Product updated successfully in controller for productId: ", productId);

        return res.status(200).json({
            message: "Product updated successfully",
            success: true
        });

    }catch(err){
        logger.error("Error in UpdateProductController: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export default UpdateProductController;