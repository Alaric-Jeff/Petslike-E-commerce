import UpdateProduct from "../../Services/UpdateProduct.js";
import ProductModel from "../../Models/ProductModel.js";
import logger from "../../Utils/logger.js";

const UpdateProductController = async (req, res) => {
    const {productId, FormData} = req.body;

    if(!productId || !FormData){
        logger.debug("Incomplete fields")
        return res.status(400).json({message: "Incomplete fields"})
    }

    try{
        await UpdateProduct(productId, FormData);
        return res.status(200).json({message: `successfully updated product ${productId}`})
    }catch(err){
        logger.error("Error occured in updating products controller, reason: ", err)
        return res.status(500).json({message: "Internal server error"})
    }
};

export default UpdateProductController;