import UserModel from '../Models/UserModel.js'
import ProductModel from '../Models/ProductModel.js'
import OrderModel from '../Models/OrderModel.js'
import ProfileModel from '../Models/ProfileModel.js'
import logger from '../Utils/logger.js'
import CartItemModel from '../Models/CartItemModel.js'
import CartModel from '../Models/CartModel.js'


const initializeTables = async ()=> {
   try{
        await UserModel.sync({ force: false });
        logger.info("User Model have been checked/created");
        
        await ProductModel.sync({ force: false });
        logger.info("Product Model have been checked/created");
        
        await CartModel.sync({force: false});
        logger.info("Cart Model have been checked/created")

        await CartItemModel.sync({force: false});
        logger.info("Cart Items Model have been checked/created")
        
        await OrderModel.sync({ force: false });
        logger.info("Order Model have been checked/created");
        
        await ProfileModel.sync({ force: false });
        logger.info("Profile Model have been checked/created");
        
        logger.info('All tables have been checked/created');
   }catch(err){
    logger.error("Error occurred in initializing tables, reason: ", err);
    throw err;
   }
}

export default initializeTables;
