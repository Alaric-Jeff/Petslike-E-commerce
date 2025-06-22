import GetCarts from "../../Services/CartServices/GetCarts.js";
import logger from "../../Utils/logger.js";

const GetCartsController = async (req, res) => {

    const { userId } = req.params;
    if(!userId) {
        logger.info("Invalid or missing userId in GetCartsController");
        return res.status(400).json({
            message: "Invalid or missing userId",
            success: false
        });
    }
    
    try{
        const carts = await GetCarts(userId);
        if(carts.length === 0) {
            logger.info("No carts found for userId: ", userId);
            return res.status(404).json({
                message: "No carts found",
                success: false
            });
        }
        logger.info("Retrieved all carts for userId: ", userId);
        return res.status(200).json({
            message: "Carts retrieved successfully",
            success: true,
            data: carts
        });
    }catch(err){
        logger.error("Error in GetCartsController: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export default GetCartsController;