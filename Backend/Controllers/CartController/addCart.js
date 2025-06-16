import CreateCart from '../../Services/CartLogics/CreateCart.js'
import logger from '../../../Utils/logger.js';

const AddCartController = async (req, res) => {
    const{ userId} = req.body;

        if(!userId){
            logger.info("Incomplete fields");
            return res.status(400).json({
                success: false,
                message: "Incomplete fields"
            })
        }

    try{

        await CreateCart(userId);
        logger.info("Cart created successfully");
        return res.status(200).json({
            success: true,
            message: "Cart created successfully"
        });
        
    }catch(err){
        logger.error("Error occured in AddCartController, error: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

export default AddCartController;