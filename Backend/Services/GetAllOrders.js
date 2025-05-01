import OrderModel from "../Models/OrderModel.js";
import logger from "../Utils/logger.js";

const GetAllOrders = async ()=> {

   try{
    const AllOrders = await OrderModel.findAll();
    return AllOrders;
   }catch(err){
    logger.error("Error occured in fetching orders in services, reason: ", err)
   }
};

export default GetAllOrders;
