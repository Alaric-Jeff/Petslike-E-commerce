import ProductModel from '../../Models/ProductModel.js';
import logger from "../../Utils/logger.js";

async function GetProductsByCategory(category){
    try{
        const products = await ProductModel.findAll({
            where: {
                meatType: category
            }
        });
        return products;
    }catch(err){
        logger.error("Error in GetProductsByCategory, reason: ", err);
        throw err;
    }
}

export default GetProductsByCategory;
