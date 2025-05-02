import ProductModel from "../Models/ProductModel.js";
import logger from "../Utils/logger.js";

async function UpdateProduct(productId, FormData){
    try{

        const productToUpdate = await ProductModel.findByPk({
            where:{
                productId: productId
            }
        })

        productToUpdate.set(FormData)
        await productToUpdate.save();
    }catch(err){
        logger.error("Error in updating in services, reason: ", err)
    }
}
export default UpdateProduct;
