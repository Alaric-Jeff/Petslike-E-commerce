import GetProductsByCategory from '../../../Services/ProductLogics/GetProductsByCategory.js'
import logger from '../../../Utils/logger.js';

const GetProductByCategoryController = async (req, res) => {
    const {category} = req.body;

    if(!category){
        logger.info("Category is undefined");
        return res.status(400).json({
            success: false,
            message: "category is undefined"
        })
    }

    try{
        const products = await GetProductsByCategory(category);
        logger.info("Products successully fetched by category: ", category)
        return res.status(200).json({
            success: true,
            message: "Succesully fetched sorted product",
            products
        })

    }catch(err){
        logger.error("Error occured in get product controller based in category");
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err
        })
    }
};

export default GetProductByCategoryController;