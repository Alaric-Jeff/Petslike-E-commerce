import GetAllProducts from '../../../Services/ProductLogics/GetAllProducts.js'
import logger from '../../../Utils/logger.js'

const GetAllProductsController = async (req, res) => {
    try{
        const products = await GetAllProducts();
        logger.info("Fetched all products");
        return res.status(200).json({
            success: true,
            message: "Get Products Success",
            products: products
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

export default GetAllProductsController;