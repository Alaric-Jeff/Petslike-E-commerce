import UpdateProduct from '../../../Services/ProductLogics/UpdateProduct.js'
import logger from "../../../Utils/logger.js";

const UpdateProductController = async (req, res) => {
    const {FormData} = req.body;
    const {productId} = req.params;

    if(!productId || !FormData){
        logger.info("Incomplete fields")
        return res.status(400).json({
            success: false,
            message: "Incomplete fields",
            error: "Missing required fields"
        })
    }

    try{
        await UpdateProduct(productId, FormData);
        return res.status(200).json({
            success: true,
            message: `Successfully updated product ${productId}`
        })
    }catch(err){
        logger.error("Error occured in updating products controller, reason: ", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
};

export default UpdateProductController;