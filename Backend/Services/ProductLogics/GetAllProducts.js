import ProductModel from "../../Models/ProductModel.js";
import logger from "../../Utils/logger.js";

async function GetAllProducts(){
   try{
    const Products = await ProductModel.findAll();
    return Products;
   }catch(err){
    logger.error("Error occured in fetching orders in services, reason: ", err)
    throw err;
   }
};

export default GetAllProducts;
