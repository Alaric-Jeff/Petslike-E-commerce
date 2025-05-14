import ProductModel from '../../Models/ProductModel.js';
import logger from '../../Utils/logger.js';
async function DeleteProduct(productId){
    try{
        await ProductModel.destroy({
            where: {
                productId: productId
            }
        })
    }catch(err){
        logger.error("Error deleting product in services, reason: ", err)
        throw err;
    }
};

export default DeleteProduct;