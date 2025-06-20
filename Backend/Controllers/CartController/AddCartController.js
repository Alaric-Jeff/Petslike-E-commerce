import CreateCart from '../../Services/CartLogics/CreateCart.js'
import logger from '../../../Utils/logger.js';

const AddCartController = async (req, res) => {

    const {userId} = req.params;

    if(!userId || typeof userId !== 'string') {
        logger.info("Invalid or missing userId in AddCartController");
        return res.status(400).json({
            message: "Invalid or missing userId",
            success: false
        });
    }

    try{
        await CreateCart(userId);
        logger.info("Cart created successfully in controller for userId: ", userId);
        return res.status(201).json({
            message: "Cart created successfully",
            success: true
        }); 
    }catch(err){
        logger.error("Error in AddCartController: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export default AddCartController;