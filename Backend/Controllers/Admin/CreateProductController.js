import ProductModel from "../../Models/ProductModel.js";
import CreateProduct from "../../Services/CreateProduct.js";
import logger from "../../Utils/logger.js";

const CreateProductController = async (req, res) => {
    const {productName, productPrice, productQuantity, meatType, lifeStage} = req.body;

    if(!productName || !productPrice || !productQuantity || !meatType || !lifeStage){
        logger.debug("Incomplete fields recieved in create product controller. "); 
        return res.status(400).json({
            success: false,
            message: "Incomplete fields",
            error: "Missing required fields"
        })
    }

    try{
        await CreateProduct(productName, productPrice, productQuantity, meatType, lifeStage);
        logger.info(`successfully created product ${productName}`)

        return res.status(200).json({
            success: true,
            message: "Succesfully created product"
        })
        
    }catch(err){
        logger.error("Error in creating product contoller, reason: ", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
};

export default CreateProductController;