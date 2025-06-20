import ProductModel from "../../Models/ProductModel.js";
import logger from "../../Utils/logger.js";

async function GetSortedProducts(categories) {
    try{
        const whereClause = {}

        if(categories.lifeStage) whereClause.lifeStage = categories.lifeStage;
        if(categories.foodCategory) whereClause.foodCategory = categories.foodCategory;
        if(categories.dietCategory) whereClause.dietCategory = categories.dietCategory;
        if(categories.animalType) whereClause.animalType = categories.animalType;

        logger.info("Products sorted successfully in services");
        return await ProductModel.findAll({
            where: whereClause,
            order: [['productPrice', 'ASC']]
        });

    }catch(err){
        logger.error("Error sorting products in services, reason: ", err);
        throw err;
    }
}

export default GetSortedProducts;