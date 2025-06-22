import CreateProduct from '../../Services/ProductServices/CreateProduct.js'
import logger from '../../Utils/logger.js'

const CreateProductController = async (req, res)=> {
    const{
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

    if(!productName || !productPrice || !productStock || !foodCategory || !dietCategory || !lifeStage || !animalType){
        logger.info("Missing required fields")
        return res.status(400).json({
            message: "Missing required fields",
            success: false
        })
    }

    try{
        const product = await CreateProduct(  productName,
        productPrice,
        productStock,
        foodCategory,
        dietCategory,
        lifeStage,
        productDescription,
        productImage,
        productBrand,
        animalType);

        logger.info("Successfully added product with id: ", product.productId);

        return res.status(200).json({
            message: `Successfully added product, id: ${product.id}`,
            success: true
        })


    }catch(err){
        logger.error("Error occurred in adding product controller")
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
};

export default CreateProductController;