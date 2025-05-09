import ProductModel from "../../Models/ProductModel.js";
import logger from "../../Utils/logger.js";
async function DeleteProduct(userId){
    try{
        await ProductModel.destroy({
            where: {
                userId: userId
            }
        })
    }catch(err){
        logger.error("Error deleting product in services, reason: ", err)
        throw err;
    }
};

export default DeleteProduct;