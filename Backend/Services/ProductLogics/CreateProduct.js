import ProductModel from '../../Models/ProductModel.js'
import logger from '../../Utils/logger.js';

async function CreateProduct(productName, productPrice, productQuantity, meatType, lifeStage){
    try{
        await ProductModel.create({
            productName,
            productPrice,
            productQuantity,
            meatType,
            lifeStage
        })
    }catch(err){
        logger.error("Error adding product in services, reason: ", err)
        throw err;
    }
}

export default CreateProduct;