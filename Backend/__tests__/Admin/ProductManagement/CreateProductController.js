import CreateProduct from '../../../Services/ProductLogics/CreateProduct.js';
import logger from "../../../Utils/logger.js";

const CreateProductController = async (req, res) => {
    const {
        productName,
        productPrice,
        productStock,
        foodCategory,
        dietCategory,
        lifeStage,
        productDescription,
        productImage,
        productBrand,
        animalType
    } = req.body;

    if (
        !productName || productPrice == null || productStock == null ||
        !foodCategory || !dietCategory || !lifeStage ||
        !productDescription || !productImage || !productBrand || !animalType
    ) {
        logger.debug("Incomplete fields received in create product controller."); 
        return res.status(400).json({
            success: false,
            message: "Incomplete fields",
            error: "Missing required fields"
        });
    }

    try {

        await CreateProduct(
            productName,
            productPrice,
            productStock,
            foodCategory,
            dietCategory,
            lifeStage,
            productDescription,
            productImage,
            productBrand,
            animalType
        );

        logger.info(`Successfully created product: ${productName}`);
        return res.status(200).json({
            success: true,
            message: "Successfully created product"
        });
    } catch (err) {
        logger.error("Error in creating product controller, reason:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

export default CreateProductController;
