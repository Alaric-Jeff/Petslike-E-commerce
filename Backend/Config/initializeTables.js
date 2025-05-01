import UserModel from '../Models/UserModel.js'
import ProductModel from '../Models/ProductModel.js'
import OrderModel from '../Models/OrderModel.js'
import logger from '../Utils/logger.js'

const initializeTables = async ()=> {
   try{
        await UserModel.sync();
        console.log("User Model have been checked/created")
        await ProductModel.sync();
        console.log("Product Model have been checked/created")
        await OrderModel.sync();
        console.log("Order Model have been checked/created")
        console.log('All tables have been checked/created');
   }catch(err){
    logger.error("Error occured in initalizing tables, reason: ", err);
   }
}

export default initializeTables;
