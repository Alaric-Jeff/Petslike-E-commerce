import GetSortedProducts from '../../Services/ProductLogics/GetSorted.js'
import logger from '../../Utils/logger.js';
export const GetSortedProductsController = async (req, res) => {
    
    const categories = req.body.categories;

    if (!categories || typeof categories !== 'object') {
        logger.info("Invalid object or missing categories in sorting controller");
        return res.status(400).json({
            message: "Invalid or missing categories",
            success: false
        });
    }

    try {
        const products = await GetSortedProducts(categories);
        logger.info("Products sorted successfully in GetSortedProductsController");
        return res.status(200).json({
            message: "Products sorted successfully",
            success: true,
            data: products
        });
    } catch (err) {
        logger.error("Error occurred in GetSortedProductsController, reason: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export default GetSortedProductsController;